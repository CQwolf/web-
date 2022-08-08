<template>
  <div>
    <h1>姓：<input type="text" v-model="person.xing" /></h1>
    <h1>名：<input type="text" v-model="person.ming" /></h1>
    <h1>姓名：<input type="text" v-model="person.fullName" /></h1>
  </div>
  <!-- <button @click="hello">点我</button> -->
  <h1>
    鼠标点击点：x:{{ point.x }} <br />
    y:{{ point.y }}
  </h1>
</template>

<script>
import { reactive, computed } from "vue";
import usePoint from "@/hooks/usePoint";
export default {
  mounted() {
    console.log(this);
  },
  setup() {
    let person = reactive({
      xing: "hello",
      ming: "gggg",
    });

    let point = usePoint();
    // 计算属性
    person.fullName = computed({
      get() {
        return person.xing + "-" + person.ming;
      },
      set(value) {
        const v1 = value.split("-");
        person.xing = v1[0];
        person.ming = v1[1];
      },
    });
    // function hello() {
    //   alert(`hello ${xing} ${ming}`);
    // }

    return { person, point };
  },
};
</script>

<style lang="less">
</style>
