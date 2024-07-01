<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { leftCenterData } from "@/api/dataScreen";
import {ElMessage} from "element-plus"

let colors = ["#0BFC7F", "#A0A0A0", "#F48C02", "#F4023C"];
const option = ref({});
const state = reactive({
  aqiLevel_1: 0,
  aqiLevel_2: 0,
  aqiLevel_3: 0,
  aqiLevel_4: 0,
  aqiLevel_5: 0,
  aqiLevel_6: 0,
  totalNum: 0,
});
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};
const getData = async () => {
  try {
    const response = await leftCenterData();
    if (response.data.code === 0) {
      console.log("左中--AQI总览", response.data.data);
      state.aqiLevel_1 = response.data.data.aqiLevel_1;
      state.aqiLevel_2 = response.data.data.aqiLevel_2;
      state.aqiLevel_3 = response.data.data.aqiLevel_3;
      state.aqiLevel_4 = response.data.data.aqiLevel_4;
      state.aqiLevel_5 = response.data.data.aqiLevel_5;
      state.aqiLevel_6 = response.data.data.aqiLevel_6;
      state.totalNum = response.data.data.aqiLevel_1 + response.data.data.aqiLevel_2 + response.data.data.aqiLevel_3 + response.data.data.aqiLevel_4 + response.data.data.aqiLevel_5 + response.data.data.aqiLevel_6;
      setOption();
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    ElMessage.error("请求失败，请检查网络连接");
  }
};
getData();
const setOption = () => {
  option.value = {
    title: {
      top: "center",
      left: "center",
      text: [`{value|${state.totalNum}}`, "{name|总数}"].join("\n"),
      textStyle: {
        rich: {
          value: {
            color: "#ffffff",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 20,
            padding:[4,0,4,0]
          },
          name: {
            color: "#ffffff",
            fontSize: 16,
            lineHeight: 20,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    series: [
      {
        name: "AQI情况总览",
        type: "pie",
        radius: ["40%", "70%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: "rgba(255,255,255,0)",
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          //   position: "outside",
          rich: {
            b: {
              color: "#fff",
              fontSize: 12,
              lineHeight: 26,
            },
            c: {
              color: "#31ABE3",
              fontSize: 14,
            },
            per: {
              color: "#31ABE3",
              fontSize: 14,
            },
          },
        },
        emphasis: {
          show: false,
        },
        legend: {
          show: false,
        },
        tooltip: { show: true },

        labelLine: {
          show: true,
          length: 10, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {},
        },
        data: [
          {
            value: state.aqiLevel_1,
            name: "优级",
            itemStyle: {
              color: echartsGraphic(["#00e400", "#00e400"]),
            },
          },
          {
            value: state.aqiLevel_2,
            name: "良好",
            itemStyle: {
              color: echartsGraphic(["#ffff00", "#ffff00"]),
            },
          },
          {
            value: state.aqiLevel_3,
            name: "轻度污染",
            itemStyle: {
              color: echartsGraphic(["#ff7e00", "#ff7e00"]),
            },
          },
          {
            value: state.aqiLevel_4,
            name: "中度污染",
            itemStyle: {
              color: echartsGraphic(["#ff0000", "#ff0000"]),
            },
          },
          {
            value: state.aqiLevel_5,
            name: "重度污染",
            itemStyle: {
              color: echartsGraphic(["#99004c", "#99004c"]),
            },
          },
          {
            value: state.aqiLevel_6,
            name: "严重污染",
            itemStyle: {
              color: echartsGraphic(["#7e0023", "#7e0023"]),
            },
          },
        ],
      },
    ],
  };
};
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped lang="scss"></style>
