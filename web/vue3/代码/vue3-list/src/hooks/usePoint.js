import { reactive, onMounted, onUnmounted } from "vue";

export default function () {
    let point = reactive({
        x: 0,
        y: 0
    })

    // 获取点的回调函数
    function getPosition(event) {
        console.log(event.pageX, event.pageY)
        point.x = event.pageX;
        point.y = event.pageY;
    }


    onMounted(() => {
        window.addEventListener("click", getPosition)
    })

    onUnmounted(() => {
        window.removeEventListener("click", getPosition)
    })
    return point
}