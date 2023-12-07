<template>
    <body>
        <PersonalInfo :is-visitor="this.$data.isVisitor" />
        <MapProfile></MapProfile>
    </body>
</template>

<script>
import PersonalInfo from '../../components/UserProfile/PersonalInfo.vue';
import MapProfile from '../../components/UserProfile/MapProfile.vue';
export default {
    components: {
        PersonalInfo,
        MapProfile,
    },
    data() {
        return {
            isVisitor: null,
            // userInfo: JSON.parse(this.$Cookies.get('user_info'))
        }
    },
    created() {
        console.log(1);
    },
    mounted() {
        const userId = this.$route.params.id;
        const userInfoString = this.$Cookies.get('user_info');

        if (userInfoString) {
            // 如果获取到了cookie字符串，解析为对象
            const userInfo = JSON.parse(userInfoString);
            this.$data.isVisitor = userId != userInfo.username ? true : false

        } else {
            this.$data.isVisitor = false
            console.log("Cookie不存在");
        }

        console.log(this.$data.isVisitor)
    }

}
</script>

<style scoped>
body {
    width: 90vw;
    height: 90vh;
    margin: 0 5vw;
    font:
        0.9em/1.2 Arial,
        Helvetica,
        sans-serif;
    position: relative;
    background-color: #eaeaea;
}
</style>