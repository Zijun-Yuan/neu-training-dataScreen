<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";
import { centerBottomData } from "@/api/dataScreen";

const option = ref({});
// const getData = () => {
//   installationPlan()
//     .then((res) => {
//       console.log("中下--覆盖率+指数超标率", res);
//       if (res.success) {
//         setOption(res.data);
//       } else {
//         ElMessage({
//           message: res.msg,
//           type: "warning",
//         });
//       }
//     })
//     .catch((err) => {
//       ElMessage.error(err);
//     });
// };
const getData = async () => {
  try {
    const response = await centerBottomData();
    if (response.data.code === 0) {
      console.log("中下--盖率+指数超标率", response.data.data);
      let res = response.data.data;
      let newData = {
        province: [],
        so2: [],
        co: [],
        o3: [],
        pm25: [],
        urbanRate: []
      };
      for (let i = res.length - 1; i >= 0; i--) {
        if (res[i].urbanCoverRate != null) {
          newData.province.push(res[i].simpleName);
          newData.so2.push(res[i].so2Exceed);
          newData.co.push(res[i].coExceed);
          newData.o3.push(res[i].o3Exceed);
          newData.pm25.push(res[i].pm25Exceed);
          newData.urbanRate.push(res[i].urbanCoverRate);
        }
      }
      console.log(newData);
      setOption(newData);
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    ElMessage.error("请求失败，请检查网络连接");
  }
};
const setOption = async (newData: any) => {
  option.value = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
      // formatter: function (params: any) {
      //   // 添加单位
      //   var result = params[0].name + "<br>";
      //   params.forEach(function (item: any) {
      //     if (item.value) {
      //       if (item.seriesName == "安装率") {
      //         result += item.marker + " " + item.seriesName + " : " + item.value + "%</br>";
      //       } else {
      //         result += item.marker + " " + item.seriesName + " : " + item.value + "个</br>";
      //       }
      //     } else {
      //       result += item.marker + " " + item.seriesName + " :  - </br>";
      //     }
      //   });
      //   return result;
      // },
    },
    legend: {
      data: ["SO2污染超标数", "CO污染超标数", "城市覆盖率"],
      textStyle: {
        color: "#B4B4B4",
      },
      top: "0",
    },
    grid: {
      left: "50px",
      right: "40px",
      bottom: "30px",
      top: "20px",
    },
    xAxis: {
      data: newData.province,
      axisLine: {
        lineStyle: {
          color: "#B4B4B4",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        // axisLabel: {
        //   formatter: "{value}",
        // },
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        // axisLabel: {
        //   formatter: "{value}% ",
        // },
      },
    ],
    series: [
      {
        name: "SO2污染超标数",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#956FD4" },
            { offset: 1, color: "#3EACE5" },
          ]),
        },
        data: newData.so2,
      },
      {
        name: "CO污染超标数",
        type: "bar",
        barGap: "-100%",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(156,107,211,0.8)" },
            { offset: 0.2, color: "rgba(156,107,211,0.5)" },
            { offset: 1, color: "rgba(156,107,211,0.2)" },
          ]),
        },
        z: -12,
        data: newData.co,
      },
      {
        name: "城市覆盖率",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          color: "#F02FC2",
        },
        data: newData.urbanRate,
      },
    ],
  };
};
onMounted(() => {
  getData();
});
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style>
