<script setup lang="ts">
import { ref, reactive } from "vue";
import CapsuleChart from "@/components/datav/capsule-chart";
// import { ranking } from "@/api";
import { ElMessage } from "element-plus";
import { rightCenterData } from "@/api/dataScreen";

const config = ref({
  showValue: true,
  unit: "次",
});
const data = ref([]);
// const getData = () => {
//   ranking()
//     .then((res) => {
//       console.log("右中--报警排名", res);
//       if (res.success) {
//         data.value = res.data;
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
    const response = await rightCenterData();
    if (response.data.code === 0) {
      console.log("右中--城市排名 ", response.data.data);
      data.value = response.data.data.map(item => ({
        name: item.cityName,
        value: item.aqiReal
      }));
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
  <div class="right_bottom">
    <CapsuleChart :config="config" style="width: 100%; height: 260px" :data="data" />
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
