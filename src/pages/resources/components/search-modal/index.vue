<!--
 * @Description: 搜索 modal
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-09-05 10:19:31
 * @LastEditors: mzc
 * @LastEditTime: 2022-09-07 21:36:54
-->
<script setup lang="ts">
import Modal from "@components/Modal/index.vue";
import { ref, watch } from "vue";
import Input from "./components/Input.vue";
import { useSearch } from "./hooks";
import { useResourcesStore } from "@/store";
import { useRouter } from "vue-router";
import { getRoute } from "@apis/modules/resources";
import {
  MAIN_RESOURCE_FOLDERITEM,
  MAIN_RESOURCE_RESOURCEITEM,
} from "@constants/route";

const resourcesStore = useResourcesStore();
const router = useRouter();

const emits = defineEmits(["update:show"]);

// const tag = ref<"r" | "f" | "file" | "">("");
const tag = ref<0 | 1 | 2 | 3>(0);
const value = ref("");
const { result } = useSearch(tag, value);

/**
 * @description: 前往资源目录
 * @param { number } sId 资源ID
 * @return {*}
 * @author: mzc
 */

const gotoR = async (sId: number) => {
  try {
    const result = await (await getRoute("r", sId)).data.data;
    let records: singlePath[] = [];
    for (let i = 0; i < result.length; i++) {
      const cur = resourcesStore.getRecordFromMap({ sId: result[i].sId });
      if (cur.length) {
        records = cur;
      } else {
        records = [
          ...records,
          {
            text: result[i].text,
            path: {
              name: MAIN_RESOURCE_RESOURCEITEM,
              params: {
                sId: result[i].sId,
              },
            },
          },
        ];
        resourcesStore.addRecordToMap({ sId: result[i].sId }, records);
      }
    }
    router.push({
      name: MAIN_RESOURCE_RESOURCEITEM,
      params: {
        sId,
      },
    });
  } catch (err) {}
};

/**
 * @description: 前往文件夹目录
 * @param {number} fId 资源目录
 * @return {*}
 * @author: mzc
 */

const gotoF = async (sId: number, foId: number) => {
  try {
    const result = await (await getRoute("f", foId)).data.data;
    let records: singlePath[] = [];
    for (let i = 0; i < result.length; i++) {
      const text = result[i].text;
      Reflect.deleteProperty(result[i], "text");
      const cur = resourcesStore.getRecordFromMap(result[i]);
      if (cur.length) {
        records = cur;
      } else {
        records = [
          ...records,
          {
            text,
            path: {
              name: result[i].foId
                ? MAIN_RESOURCE_FOLDERITEM
                : MAIN_RESOURCE_RESOURCEITEM,
              params: result[i],
            },
          },
        ];
        resourcesStore.addRecordToMap(result[i], records);
      }
    }
    router.push({
      name: MAIN_RESOURCE_FOLDERITEM,
      params: {
        sId,
        foId,
      },
    });
  } catch (err) {
    console.log("gotoF error", err);
  }
};
</script>
<template>
  <Modal
    show
    mask-background="transparent"
    :has-footer="false"
    @update:show="$emit('update:show', false)"
    :class="$style.modal"
  >
    <template #header>
      <Input
        :value="value"
        :tag="tag"
        placeholder="请输入"
        :class="$style.input"
        @update:value="
          (text) => {
            value = text;
          }
        "
        @clear-value="
          () => {
            value = '';
            tag = 0;
          }
        "
        @clear-tag="tag = 0"
      />
    </template>
    <template #body>
      <!-- tag选择 static -->
      <section class="section-lists">
        <ul v-show="!tag && !result">
          <li @click="tag = 1">
            <svg-icon className="icon-icon-test" class="icon" />
            <span>资源</span>
          </li>
          <li @click="tag = 2">
            <svg-icon className="icon-wenjianjia" class="icon" />
            <span>文件夹</span>
          </li>
          <li @click="tag = 3">
            <svg-icon className="icon-wendangicon" class="icon" />
            <span>文件</span>
          </li>
        </ul>
        <!-- data-resources -->
        <ul v-if="result?.resources">
          <li
            v-for="item in result.resources"
            :key="item.sId"
            @click="gotoR(item.sId)"
          >
            <svg-icon className="icon-icon-test" class="icon" />
            <span>{{ item.text }}</span>
          </li>
        </ul>
        <!-- data-folders -->
        <ul v-if="result?.folders">
          <li
            v-for="item in result.folders"
            :key="item.foId"
            @click="gotoF(item.sId, item.foId)"
          >
            <svg-icon className="icon-wenjianjia" class="icon" />
            <span>{{ item.text }}</span>
          </li>
        </ul>
        <!-- data-files -->
        <ul v-if="result?.files">
          <li v-for="item in result.files" :key="item.fId">
            <svg-icon className="icon-wendangicon" class="icon" />
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </section>
    </template>
  </Modal>
</template>
<style scoped lang="scss">
.input-container {
  flex: 1;
}
.section-lists {
  max-height: 40px * 6;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  ul {
    li {
      height: 40px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: map-get($map: $gray-colors, $key: 100);
      }
      .icon {
        font-size: 20px;
        margin-left: 16px;
      }
      span {
        @include middleFont(16px);
        margin-left: 16px;
      }
    }
  }
}
</style>
<style module>
.modal {
  box-shadow: 0px 16px 48px 0px rgba(40, 40, 50, 0.2),
    0px 2px 8px 0px rgba(40, 40, 50, 0.06), 0px 0px 1px 1px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;
}

.input {
  flex: 1;
}
</style>
