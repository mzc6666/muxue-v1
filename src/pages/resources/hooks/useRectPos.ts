/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2023-04-28 19:18:48
 * @LastEditors: mzc
 * @LastEditTime: 2023-04-28 20:12:06
 */
import { useEvent } from "@/hooks";
import { Ref, ref } from "vue";
import { Throttle } from "@/utils/public";
const useRectHook = (instance: Ref<HTMLElement | null> | HTMLElement) => {
  const x = ref(0);
  const y = ref(0);
  const left = ref(0);
  const top = ref(0);
  const width = ref(0);
  const height = ref(0);
  let door = false;
  useEvent("mousedown", instance, (event: MouseEvent) => {
    door = true;
    x.value = event.clientX;
    y.value = event.clientY;
    left.value = event.clientX;
    top.value = event.clientY;
  });
  useEvent("mouseup", instance, (event: MouseEvent) => {
    door = false;
    width.value = 0;
    height.value = 0;
  });
  useEvent(
    "mousemove",
    instance,
    Throttle((event: MouseEvent) => {
      if (door == false) {
        return;
      }
      let curX = event.clientX,
        curY = event.clientY;

      width.value = Math.abs(x.value - curX);
      height.value = Math.abs(y.value - curY);

      if (curX < x.value && curY < y.value) {
        // 左上角滑动
        left.value = curX;
        top.value = curY;
      } else if (curX < x.value && curY > y.value) {
        // 左下角滑动
        left.value = curX;
        top.value = y.value;
      } else if (curX > x.value && curY < y.value) {
        // 右上角滑动
        top.value = curY;
        left.value = x.value;
      }
    }, 1000 / 60)
  );
  return {
    left,
    top,
    width,
    height,
  };
};

export default useRectHook;
