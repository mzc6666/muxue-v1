<script setup lang="ts">
import { getStudyRoomLists } from "@apis/modules/study-room";
import StudyRoomItem from "../../components/Study-Room-Item/Study-Room-Item.vue";
import { reactive } from "vue";
import router from "@/route";
import { MAIN_STUDYROOM_DETAIL } from "@constants/route";

const roomLists = reactive<StudyRoomItem[]>([]);

const getData = async () => {
  try {
    const result = await getStudyRoomLists();
    roomLists.push(...result.data.data);
  } catch (error) {}
};

getData();

const handleLookDetail = (id: number) => {
  router.push({
    name: MAIN_STUDYROOM_DETAIL,
    query: {
      id,
    },
  });
};
</script>
<template>
  <div class="home-lists-container">
    <StudyRoomItem
      v-for="(item, index) in roomLists"
      :key="item.roomId"
      class="room-item"
      v-bind="item"
      @go-to-room="handleLookDetail(item.roomId)"
    ></StudyRoomItem>
  </div>
</template>
<style scoped lang="scss">
.home-lists-container {
  display: flex;
  flex-wrap: wrap;
  .room-item {
    margin: 20px rem(30);
  }
}
</style>
