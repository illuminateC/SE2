<template>
    <h1>Login</h1>
    <form @submit.prevent="login">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>

        <button type="submit">Login</button>

    </form>
    <button @click="getCookie">Get User Info</button>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            // 获取用户输入的用户名和密码


            // 在实际应用中，你可能会将用户名和密码发送到服务器进行验证
            // 如果验证通过，可以将用户信息保存到 cookie

            // 以下是保存到 cookie 的示例，使用 js-cookie 库
            // Cookies.set('user_info', { username });
            console.log(this.username);
            // 清空输入框

            this.setCookie(this.username);
            // 在这里你可以跳转到登录后的页面或执行其他操作
            this.username = '';
            this.password = '';
        },
        setCookie(username) {
            console.log("set");
            let curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列 
            let valueData = JSON.stringify({
                username: username,
                timer: curtime
            });
            this.$Cookies.set('user_info', valueData); // 这里的30表示cookie的过期时间（以天为单位）


        },

        // 获取cookie
        getCookie() {

            const userInfoString = this.$Cookies.get('user_info');
            console.log(userInfoString);
            if (userInfoString) {
                // 如果获取到了cookie字符串，解析为对象
                const userInfo = JSON.parse(userInfoString);
                console.log(userInfo.username);
            } else {
                console.log("Cookie不存在");
            }
        }
    },
}
</script>

<style lang="scss" scoped></style>