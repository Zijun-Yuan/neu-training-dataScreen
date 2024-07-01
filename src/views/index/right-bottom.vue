<script setup lang="ts">
// import { rightBottom } from "@/api";
import { rightBottomData } from "@/api/dataScreen";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";

const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 252,
    limitScrollNum: 3,
  },
  scroll: true,
});
const getData = async () => {
  try {
    const response = await rightBottomData();
    if (response.data.code === 0) {
      console.log("右下--网格监测信息", response.data.data);
      state.list = response.data.data;
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    ElMessage.error("请求失败，请检查网络连接");
  }
};
// const getData = () => {
//   rightBottom({ limitNum: 20 })
//     .then((res) => {
//       console.log("右下", res);
//       if (res.success) {
//         state.list = res.data.list;
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
const checkAQILevel = (item: any) => {
  let aqi = item.rank;
  if (aqi == 1) {
    aqi = "优级";
  } else if (aqi == 2) {
    aqi = "良好";
  } else if (aqi == 3) {
    aqi = "轻度污染";
  } else if (aqi == 4) {
    aqi = "中度污染";
  } else if (aqi == 5) {
    aqi = "重度污染";
  } else if (aqi == 6) {
    aqi = "严重污染";
  } else {
    aqi = "无效";
  }
  return aqi;
}
const checkAQIColor = (item: any) => {
  let aqi = item.rank;
  if (aqi == 1) {
    return "#00e400";
  } else if (aqi == 2) {
    return "#ffff00";
  } else if (aqi == 3) {
    return "#ff7e00";
  } else if (aqi == 4) {
    return "#ff0000";
  } else if (aqi == 5) {
    return "#99004c";
  } else if (aqi == 6) {
    return "#7e0023";
  } else {
    return "#000000";
  }
}
const locationDeal1 = (item: any) => {
  let res = item.location.split(" ");
  return res[0] + "--" + res[1];
}
const locationDeal2 = (item: any) => {
  let res = item.location.split(" ");
  return res[2];
}
const comName = computed(() => {
  if (indexConfig.value.rightBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});
// function montionFilter(val: any) {
//   // console.log(val);
//   return val ? Number(val).toFixed(2) : "--";
// }
// const handleAddress = (item: any) => {
//   return `${item.provinceName}/${item.cityName}/${item.countyName}`;
// };
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="right_bottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.rightBottomSwiper }">
    <component
      :is="comName"
      :list="state.list"
      v-model="state.scroll"
      :singleHeight="state.defaultOption.singleHeight"
      :step="state.defaultOption.step"
      :limitScrollNum="state.defaultOption.limitScrollNum"
      :hover="state.defaultOption.hover"
      :singleWaitTime="state.defaultOption.singleWaitTime"
      :wheel="state.defaultOption.wheel"
    >
      <ul class="right_bottom">
        <li class="right_center_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">网格员姓名：</span>
                <span class="text-content zhuyao"> {{ item.realName }}</span>
              </div>
              <div class="info">
                <span class="labels">AQI精确值：</span>
                <span class="text-content"> {{ item.aqiReal }}</span>
              </div>
              <div class="info">
                <span class="labels">AQI等级：</span>

<!--                <span class="text-content warning"> {{ montionFilter(item.alertvalue) }}</span>-->
                <div class="aqi-box"
                     :style="{ background: checkAQIColor(item) }">
                  <span>{{ checkAQILevel(item) }}</span>
                </div>
              </div>
            </div>

            <div class="flex">
              <div class="info">
                <span class="labels shrink-0"> 地址：</span>
                <span class="text-content ciyao truncate" style="font-size: 12px; width: 220px; display: flex; flex-direction: column;">
                  <span class="location-part">{{ locationDeal1(item) }}</span>
                <span class="location-part">{{ locationDeal2(item) }}</span>
                </span>
              </div>
              <div class="info time shrink-0">
                <span class="labels">时间：</span>
                <span class="text-content" style="font-size: 12px"> {{ item.formattedTime }}</span>
              </div>
            </div>
<!--            <div class="flex">-->
<!--              <div class="info">-->
<!--                <span class="labels">报警内容：</span>-->
<!--                <span class="text-content ciyao" :class="{ warning: item.alertdetail }">-->
<!--                  {{ item.alertdetail || "无" }}</span-->
<!--                >-->
<!--              </div>-->
<!--            </div>-->
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px;
    font-size: 14px;
    color: #fff;

    .orderNum {
      margin: 0 20px 0 -20px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 15px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }
  }
}

.right_bottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 252px;
}

.overflow-y-auto {
  overflow-y: auto;
}

.aqi-box {
  width: 80px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.location-part {
  margin-top: 4px;
  display: block;
  margin-bottom: 4px;
}
.text-content br {
  line-height: 2;
}
</style>
