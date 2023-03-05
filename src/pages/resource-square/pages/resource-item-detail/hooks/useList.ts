import { reactive, ref, Ref, watchEffect } from "vue";
import { getResourceContent, getFolderContent } from "@/api/modules/resources";

const useList = (id: Ref<number>, type: Ref<"resource" | "folder">) => {
  const loading: Ref<boolean> = ref(false); // 正在加载数据

  const rlists: Ref<ResourceOptions[]> = ref([]);

  const folderList: Ref<FolderOptions[]> = ref([]);

  const fileList: Ref<FileOptions[]> = ref([]);

  watchEffect(() => {
    loading.value = true;
    const callback =
      type.value === "resource" ? getResourceContent : getFolderContent;
    callback(id.value)
      .then((res) => {
        rlists.value = res.data.data.resources ?? [];
        folderList.value = res.data.data.folders ?? [];
        fileList.value = res.data.data.files ?? [];
      })
      .catch((error) => {})
      .finally(() => {
        loading.value = false;
      });
  });

  return {
    loading,
    rlists,
    folderList,
    fileList,
  };
};

export default useList;
