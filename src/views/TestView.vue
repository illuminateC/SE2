<template>
    <div>
        <p ref="myElement" @mouseover="changeStyle('pointer')" @mouseout="changeStyle('auto')">
            鼠标悬停我看看
        </p>
        <button @click="pass">123</button>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    methods: {
        changeStyle(cursorType) {
            // 直接操作DOM来修改样式
            this.$refs.myElement.style.cursor = cursorType;
        },async pass (){

var string={ username: "Admin13",
    password: "11111",
    email: "12345678@qq.com"}
axios.post('http://123.249.124.181/api/user/register',
string,
).
then(function(response){alert(response.data.msg)})
.catch(function(error){alert(error.message)})
        }
    }
};
</script>
  