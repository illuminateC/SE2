<template>
    <div>
        <p ref="myElement" @mouseover="changeStyle('pointer')" @mouseout="changeStyle('auto')">
            鼠标悬停我看看
        </p>
    </div>
</template>
  
<script>
export default {
    methods: {
        changeStyle(cursorType) {
            // 直接操作DOM来修改样式
            this.$refs.myElement.style.cursor = cursorType;
        }
    }
};
</script>
  