<script setup lang="ts">
import { useUserStore } from "@/store";
import { MdSave } from "@vicons/ionicons4";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { ref, reactive } from "vue";
import { changeUserInfo } from "@/api/modules/user";
import { Message } from "@/utils/public";

const userStore = useUserStore();

const change_visible = ref(false); // 修改封面图显示
const image = ref(null);
// 封面图选择
const handleFileSelect = (args: any) => {
  // console.log("args: ", args)
  image.value = args.file.file;
};

// 修改用户信息
const username = ref<string>(userStore.userInfo.username); // 用户名
const password = ref<string>(""); // 密码
const confirmPassword = ref<string>(""); // 再次输入密码

// 修改用户信息
const handleChange = async () => {
  const obj: any = {};
  obj.avatar = image.value || null;
  obj.username = username.value || null;
  obj.password = password.value || null;
  obj.confirmPassword = confirmPassword.value || null;
  try {
    const result = await changeUserInfo(obj);
    if ((result.data.code = "200")) {
      Message("success", "修改成功");
      userStore.getInfoOfUser();
    }
  } catch (error) {
    console.log("handleChange error: ", error);
  } finally {
    password.value = "";
    confirmPassword.value = "";
  }
  change_visible.value = false;
};
</script>
<template>
  <div class="my-center-container">
    <!-- 用户信息 -->
    <div class="header">
      <div class="user-info">
        <n-avatar
          round
          :size="100"
          :src="userStore.userInfo.avatar"
        />
        <div class="right">
          <p>昵称: {{ userStore.userInfo.username }}</p>
          <p>电话号码: {{ userStore.userInfo.telephone }}</p>
          <p>注册时间: {{ userStore.userInfo.registerDay }}</p>
        </div>
      </div>
      <n-button
        strong
        secondary
        type="primary"
        @click="change_visible = true"
      >
        修改信息
      </n-button>
    </div>
    <!-- 总结 -->
    <div class="summarize">
      <div class="resources">
        <n-card title="我的资源">
          <div class="content">
            <div class="likes">
              <p class="num-show">{{ userStore.userInfo.resources.likes }}</p>
              <p>被点赞数</p>
            </div>
            <div class="collections">
              <p class="num-show">
                {{ userStore.userInfo.resources.collections }}
              </p>
              <p>被收藏数</p>
            </div>
          </div>
        </n-card>
      </div>
      <!-- <div class="backlogs">
        <n-card title="我的待办">
          <div class="content">
            <div class="likes">
              <p class="num-show">{{ userStore.userInfo.backlog.allCount }}</p>
              <p>待办总数</p>
            </div>
            <div class="collections">
              <p class="num-show">
                {{ userStore.userInfo.backlog.finishCount }}
              </p>
              <p>已完成数</p>
            </div>
          </div> -->
          <!-- <template #footer>
            <n-statistic
              label="待办总结"
              :value="userStore.userInfo.backlog.finishCount"
            >
              <template #prefix>
                <n-icon>
                  <md-save />
                </n-icon>
              </template> 
              <template #suffix>
                / {{ userStore.userInfo.backlog.allCount }}
              </template>
            </n-statistic>
          </template> -->
        <!-- </n-card>
      </div> -->
      <div class="article">
        <n-card title="我的社区">
          <div class="content">
            <div class="likes">
              <p class="num-show">{{ userStore.userInfo.article.likes }}</p>
              <p>被点赞数</p>
            </div>
            <div class="collections">
              <p class="num-show">
                {{ userStore.userInfo.article.collections }}
              </p>
              <p>被收藏数</p>
            </div>
          </div>
        </n-card>
      </div>
      <div class="article">
        <n-card title="自习室">
          <div class="content">
            <div class="likes">
              <p class="num-show">{{ userStore.userInfo.article.likes }} h</p>
              <p>自习时长</p>
            </div>
            <div class="collections">
              <p class="num-show">
                {{ userStore.userInfo.article.collections }}
              </p>
              <p>自习次数</p>
            </div>
          </div>
        </n-card>
      </div>
    </div>
    <!-- 修改信息 -->
    <n-modal v-model:show="change_visible">
      <n-card
        style="width: 600px"
        title="修改用户信息"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header>
          <div>标题</div>
        </template>
        <n-upload
          :default-upload="false"
          :max="1"
          @change="handleFileSelect"
        >
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon
                size="48"
                :depth="3"
              >
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px">
              点击或者拖动文件到该区域来上传
            </n-text>
            <n-p
              depth="3"
              style="margin: 8px 0 0 0"
            >修改头像 </n-p>
          </n-upload-dragger>
        </n-upload>
        <!-- 表单字段 -->
        <n-form
          label-placement="top"
          :label-width="80"
        >
          <n-form-item label="用户名">
            <n-input v-model:value="username" />
          </n-form-item>
          <n-form-item label="密码">
            <n-input
              v-model:value="password"
              auto-complete
              type="password"
              placeholder="请输入原密码"
            />
          </n-form-item>
          <n-form-item
            first
            label="重复密码"
          >
            <n-input
              v-model:value="confirmPassword"
              auto-complete
              type="password"
              placeholder="请再次输入密码"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="button-groups">
            <n-button type="primary" @click="handleChange"> 确定 </n-button
            ><n-button
              type="error"
              @click="
                () => {
                  change_visible = false;
                  password = '';
                  confirmPassword = '';
                }
              "
            >
              取消
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<style scoped lang="scss">
.my-center-container {
  padding: 20px rem(30);
  .header {
    padding: 20px;
    border: 1px solid #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
    border-radius: 4px;
    &:hover {
      box-shadow: 1px 1px 0 1px #e4e4e4aa;
    }
    .user-info {
      display: flex;
      .right {
        margin-left: 1em;
        line-height: 2;
      }
    }
  }
  .summarize {
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .resources,
    .backlogs,
    .article {
      width: 40%;
      // margin: 25px 0;
      .content {
        padding-right: 40%;
        justify-content: space-around;
        display: flex;
        text-align: center;
        .num-show {
          font-size: 20px;
          line-height: 2;
        }
      }
    }
  }
}

.button-groups {
  display: flex;
  flex-direction: row-reverse;
}
.button-groups > * {
  margin-left: 2em;
}
</style>
