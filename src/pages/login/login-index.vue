<!--
 * @Description: 登录界面
 * @Version: 
 * @Autor: mzc
 * @Date: 2022-08-04 19:57:24
 * @LastEditors: Austral
 * @LastEditTime: 2023-05-15 10:14:07
-->
<script setup lang="ts">
import InputItem from "./components/Input/input.vue";
import { reactive, ref, computed } from "@vue/reactivity";
import { Message } from "@/utils/public";
import router from "@/route";
import {
  getAuthCode,
  loginByAuthCode,
  LoginByPassword,
} from "@apis/modules/login";
import { MAIN } from "@constants/route";
import { useUserStore } from "@/store";

const userStore = useUserStore();

/*  验证码登录 */
const login_authCode = reactive({
  telephone: "",
  authCode: "",
  handleLogin: () => {
    if (
      verifyTel(login_authCode.telephone) &&
      verifyAuthCode(login_authCode.authCode)
    ) {
      if (!autoRegister.value) {
        return;
      }
      loginByAuthCode(login_authCode.telephone, login_authCode.authCode)
        .then((res) => {
          console.log("loginByAuthCode res", res);
          userStore.setToken(res.data.data);
          if (nextAutoLogin.value) {
            window.localStorage.setItem("token", res.data.data);
          }
          router.push({ name: MAIN });
        })
        .catch((err) => {
          console.log("loginByAuthCode error: ", err);
        });
    } else {
      Message("error", "信息错误，请重新输入");
    }
  },
});
/* 密码登录 */
const login_pass = reactive({
  telephone: "",
  password: "",
  handleLogin: () => {
    if (verifyTel(login_pass.telephone) && verifyPass(login_pass.password)) {
      LoginByPassword(login_pass.telephone, login_pass.password)
        .then((res) => {
          console.log("LoginByPassword res", res);
          userStore.setToken(res.data.data);
          if (nextAutoLogin.value) {
            window.localStorage.setItem("token", res.data.data);
          }
          router.push({ name: MAIN });
        })
        .catch((err) => {
          console.log("LoginByPassword", err);
        });
    } else {
      Message("error", "信息错误，请重新输入");
    }
  },
});
// 下次自动登录
const nextAutoLogin = ref(false);
// 未注册自动注册
const autoRegister = ref(false);

const tagIndex = ref(0);
const offsetStyle = computed(() => ({
  left: -100 * tagIndex.value + "%",
}));
// 手机号码的验证函数
const verifyTel = (tel: string) =>
  /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(
    tel
  );
// 密码的验证函数
const verifyPass = (password: string) => {
  // const reg =
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]])[A-Za-z\d`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]{8,}$/;
  // return reg.test(password);
  return true;
};
// 短信验证码的验证函数
const verifyAuthCode = (value: string) => /^\d{6}$/.test(value);
const msg = ref("发送验证码");
const clickable = ref(true);
const handleBtnClick = () => {
  if (verifyTel(login_authCode.telephone)) {
    // console.log("telephone format is right");
    getAuthCode(login_authCode.telephone).then((res: any) => {
      console.log("getAuthCode result", res);
      if (res.data.code === "200") {
        clickable.value = false;
        let time = 59;
        const timer = setInterval(() => {
          if (time === 0) {
            msg.value = "发送验证码";
            clickable.value = true;
            clearInterval(timer);
            return;
          }
          msg.value = time + "s";
          time--;
        }, 1000);
      }
    });
  } else {
    Message("error", "手机号码不正确,请重新输入");
  }
};
</script>
<template>
  <div class="login-page">
    <img src="logo.png" />
    <div class="multi-ways">
      <!-- options -->
      <ul class="tabs">
        <li
          :class="[tagIndex === 0 ? 'active' : '']"
          @click="tagIndex = 0"
        >
          短信登录
        </li>
        <li
          :class="[tagIndex === 1 ? 'active' : '']"
          @click="tagIndex = 1"
        >
          账号登录
        </li>
      </ul>
      <!-- forms -->
      <div class="forms">
        <div
          class="contents"
          :style="offsetStyle"
        >
          <!-- 验证码登录 -->
          <section class="login-code">
            <input-item
              placeholder="请输入"
              type="text"
              v-model:value="login_authCode.telephone"
              :clearable="true"
              :verifyFn="verifyTel"
            />
            <input-item
              placeholder="请输入验证码"
              :authCode="true"
              type="text"
              :maxLen="6"
              v-model:value="login_authCode.authCode"
              :verifyFn="verifyAuthCode"
            >
              <template #authCode>
                <button
                  class="send-code"
                  :disabled="!clickable"
                  @click="handleBtnClick"
                >
                  {{ msg }}
                </button>
              </template>
            </input-item>
            <button
              :class="[autoRegister ? '' : 'unclickable']"
              @click="login_authCode.handleLogin"
            >
              登录
            </button>
            <n-checkbox v-model:checked="nextAutoLogin">下次自动登录</n-checkbox>
            <n-checkbox v-model:checked="autoRegister">未注册手机登录时会自动创建新账号，我已阅读并
              同意服务协议和隐私权条款</n-checkbox>
          </section>
          <!-- 密码登录 -->
          <section class="login-password">
            <input-item
              placeholder="请输入手机号码"
              type="text"
              v-model:value="login_pass.telephone"
              :clearable="true"
              :verifyFn="verifyTel"
            />
            <input-item
              placeholder="请输入登录密码"
              type="password"
              v-model:value="login_pass.password"
              :verifyFn="verifyPass"
              :switchable="true"
            />
            <button @click="login_pass.handleLogin">登录</button>
            <div>
              <n-checkbox v-model:checked="nextAutoLogin">下次自动登录</n-checkbox>
              <span class="forget">忘记密码</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* button */
@mixin Button() {
  width: 100%;
  @include BigFont(20px);
  padding: 10px 0;
  color: #fff;
  border-radius: 10px;
  transition: background 0.3s ease-in;
  background: map-get($map: $green-colors, $key: 600);
  cursor: pointer;
  &.unclickable {
    background: map-get($map: $gray-colors, $key: 400);
    cursor: not-allowed;
  }
}
.login-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.8) 0%,
    rgba(99, 102, 241, 0.5) 40.71%,
    rgba(103, 232, 249, 0.5) 100%
  );
  img {
    width: 150px;
    height: 75px;
    background-color: map-get($green-colors, 500);
    margin-bottom: 50px;
  }
  .multi-ways {
    width: 420px;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;
    ul.tabs {
      display: flex;
      justify-content: space-around;
      background-color: map-get($map: $green-colors, $key: 400);
      li {
        @include middleFont(20px);
        padding: 20px 0;
        cursor: pointer;
        color: map-get($map: $gray-colors, $key: 200);
        &.active {
          color: #fff;
        }
      }
    }
    div.forms {
      position: relative;
      overflow: hidden;
      div.contents {
        position: relative;
        width: 200%;
        display: flex;
        text-align: left;
        transition: all 0.5s;
        > section {
          width: 100%;
          padding: 24px 30px 0;
          display: flex;
          flex-direction: column;
          // align-items: center;
          button {
            @include Button;
            @include BigFont(20px);
          }
        }
        section.login-code,
        section.login-password {
          > * {
            margin-bottom: 30px;
          }
        }
        section.login-password {
          div {
            display: flex;
            justify-content: space-between;
            .forget {
              color: map-get($map: $gray-colors, $key: 400);
            }
          }
        }
        section.login-code {
          button.send-code {
            background: none;
            @include BigFont(14px);
            color: map-get($map: $green-colors, $key: 500);
            cursor: pointer;
          }
        }
        section.qr-code {
          justify-content: center;
          align-items: center;
          div.er-wei-ma {
            width: 150px;
            height: 150px;
            border-radius: 20px;
            background-color: green;
          }
          > * {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
