<script setup lang="ts">
// import { leftBottom } from "@/api";
import { leftBottomData } from "@/api/dataScreen";
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
    singleHeight: 256,
    limitScrollNum: 4,
  },
  scroll: true,
});
const getData = async () => {
  try {
    const response = await leftBottomData();
    if (response.data.code === 0) {
      console.log("左下--公众监督信息", response.data.data);
      state.list = response.data.data;
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    ElMessage.error("请求失败，请检查网络连接");
  }
};
const checkAQILevel = (item: any) => {
  let aqi = item.aqiLevel;
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
  let aqi = item.aqiLevel;
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
  if (indexConfig.value.leftBottomSwiper) {
    return SeamlessScroll;
  } else {
    return EmptyCom;
  }
});
onMounted(() => {
  getData();
});
</script>

<template>
  <div class="left_boottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.leftBottomSwiper }">
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
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">
          <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>

            <div class="flex">
              <div class="info">
                <span class="labels">监督员姓名：</span>
                <span class="text-content zhuyao doudong wangguan"> {{ item.realName }}</span>
              </div>

              <div class="info">
                <span class="labels">时间：</span>
                <span class="text-content" style="font-size: 12px"> {{ item.formattedTime }}</span>
              </div>
            </div>

            <div class="aqi-box"
                 :style="{ background: checkAQIColor(item) }">
              <span>{{ checkAQILevel(item) }}</span>
            </div>

            <div class="info addresswrap">
              <span class="labels">地址：</span>
              <span class="text-content ciyao" style="font-size: 12px; display: flex; flex-direction: column;">
                <span class="location-part">{{ locationDeal1(item) }}</span>
                <span class="location-part">{{ locationDeal2(item) }}</span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>
</template>

<style scoped lang="scss">
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 14px;
    margin: 10px 0;
    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: -15px;
      display: flex;
      align-items: center;
      color: #fff;

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

    .inner_right {
      position: relative;
      height: 100%;
      width: 380px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }
      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 30px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
.aqi-box {
  width: 60px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.location-part {
  display: block;
  margin-bottom: 8px;
}
.text-content br {
  line-height: 2;
}
</style>
