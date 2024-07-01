<script setup lang="ts">
import { reactive, ref } from "vue";
// import { countDeviceNum } from "@/api";
import { leftTopData } from '@/api/dataScreen';
import CountUp from "@/components/count-up";
import {ElMessage} from "element-plus"

const duration = ref(2);
const state = reactive({
  totalNum: 0,
  supervisorNum: 0,
  inspectorNum: 0,
  exceedNum: 0,
});
const getData = async () => {
  try {
    const response = await leftTopData();
    if (response.data.code === 0) {
      console.log("左上--数据总览", response.data.data);
      state.totalNum = response.data.data.infoTotal;
      state.supervisorNum = response.data.data.infoSupervisorCount;
      state.inspectorNum = response.data.data.infoInspectorCount;
      state.exceedNum = response.data.data.exceedTotal;
    } else {
      ElMessage.error(response.data.msg);
    }
  } catch (error) {
    ElMessage.error("请求失败，请检查网络连接");
  }
};

getData();
</script>

<template>
  <ul class="user_Overview flex">
    <li class="user_Overview-item" style="color: #00fdfa">
      <div class="user_Overview_nums allnum">
        <CountUp :endVal="state.totalNum" :duration="duration" />
      </div>
      <p>信息总数</p>
    </li>
    <li class="user_Overview-item" style="color: #07f7a8">
      <div class="user_Overview_nums online">
        <CountUp :endVal="state.supervisorNum" :duration="duration" />
      </div>
      <p>监督信息数量</p>
    </li>
    <li class="user_Overview-item" style="color: #e3b337">
      <div class="user_Overview_nums offline">
        <CountUp :endVal="state.inspectorNum" :duration="duration" />
      </div>
      <p>网格信息数量</p>
    </li>
    <li class="user_Overview-item" style="color: #f5023d">
      <div class="user_Overview_nums laramnum">
        <CountUp :endVal="state.exceedNum" :duration="duration" />
      </div>
      <p>污染超标数量</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.left-top {
  width: 100%;
  height: 100%;
}

.user_Overview {
  li {
    flex: 1;

    p {
      text-align: center;
      height: 16px;
      font-size: 16px;
    }

    .user_Overview_nums {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 22px;
      margin: 50px auto 30px;
      background-size: cover;
      background-position: center center;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      &.bgdonghua::before {
        animation: rotating 14s linear infinite;
      }
    }

    .allnum {
      &::before {
        background-image: url("@/assets/img/left_top_lan.png");
      }
    }

    .online {
      &::before {
        background-image: url("@/assets/img/left_top_lv.png");
      }
    }

    .offline {
      &::before {
        background-image: url("@/assets/img/left_top_huang.png");
      }
    }

    .laramnum {
      &::before {
        background-image: url("@/assets/img/left_top_hong.png");
      }
    }
  }
}
</style>
