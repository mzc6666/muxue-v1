import { ref, Ref, watchEffect } from "vue";
import {
  getPrimaryBacklogDetail,
  getTImesBacklogDetail,
} from "@/api/modules/backlog";

const useDetail = (id: Ref<number>, type: Ref<string>) => {
  const detailInfo = ref({});

  watchEffect(() => {
    const callback =
      type.value === "normal" ? getPrimaryBacklogDetail : getTImesBacklogDetail;
    callback(id.value)
      .then((res) => {
        detailInfo.value = res.data.data;
      })
      .catch((error) => {});
  });

  return {
    detailInfo,
  };
};

export default useDetail;
