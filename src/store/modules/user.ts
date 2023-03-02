 import { defineStore } from 'pinia'
import { reactive, ref, type Ref } from 'vue'
import { getUserInfo } from '@/api/modules/user'
import { AxiosResponse } from 'axios';

 const useUserStore = defineStore("user",() => {
    const token : Ref<string> = ref('');

    const setToken = (token_value: string) => void (token.value = token_value)

    const clearToken = () => void (token.value = '');


    const userInfo : Ref<any> = ref({});
    
    const getInfoOfUser = async () => {
      try {
        const result : AxiosResponse =  await getUserInfo();
        userInfo.value = result.data.data;
        console.log("userInfo: ",userInfo.value)
      } catch(error) {
        console.log('getInfoOfUser error: ',error);
      }
    }

    return {
      token,
      setToken,
      clearToken,
      userInfo,
      getInfoOfUser
    }
 }, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
        storage: localStorage,
        paths: ['token']
      },
      {
        key: 'userInfo-store',
        storage: sessionStorage,
        paths: ['userInfo']
      }
    ]
  }
 })

export default useUserStore;