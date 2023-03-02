 import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

 const useUserStore = defineStore("user",() => {
    const token : Ref<string> = ref('');

    const setToken = (token_value: string) => void (token.value = token_value)

    const clearToken = () => void (token.value = '');
    
    return {
      token,
      setToken,
      clearToken
    }
 }, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user-store',
        storage: localStorage
      }
    ]
  }
 })

export default useUserStore;