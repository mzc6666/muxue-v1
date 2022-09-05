<script setup lang="ts">
import { reactive, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    sId?: number;
    foId?: number;
    fId?: number;
    isPublic?: 0 | 1 | 2;
    events: PermissionEvents;
  }>(),
  {}
);

const allPermission = {
  download: {
    label: "下载",
    key: "download",
    props: {
      onClick: props.onDownload,
    },
  },
  share: {
    label: "分享",
    key: "share",
    props: {
      onClick: props.onShare,
    },
  },
  public: {
    label: props.isPublic === 1 ? "公开资源" : "取消公开",
    key: "public",
    props: {
      onClick: props.onOpenResource,
    },
  },
  move: {
    label: "移动",
    key: "move",
    props: {
      onclick: props.onMove,
    },
  },
  reName: {
    label: "重命名",
    key: "rename",
    props: {
      onclick: props.onRename,
    },
  },
  details: {
    label: "查看详情",
    key: "details",
    props: {
      onclick: props.onDetails,
    },
  },
  delete: {
    label: "删除",
    key: "delete",
    props: {
      onclick: props.onDelete,
    },
  },
};

const permissions = reactive([]);
watchEffect(() => {
  // 查看资源的权限
  if (props.sId && props.isPublic) {
    if (props.sId === 0) {
    }
  }
});
</script>
<template></template>
<style scoped lang="scss"></style>
