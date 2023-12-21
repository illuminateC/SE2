<template>
    <body>
        <PersonalInfo :isVisitor="this.$props.isVisitor" />
        <MapProfile></MapProfile>
    </body>
</template>

<script>
import PersonalInfo from '../../components/UserProfile/PersonalInfo.vue';
import MapProfile from '../../components/UserProfile/MapProfile.vue';
import Follow from '@/components/UserProfile/Follow.vue';

export default {
    props: {
        isVisitor: {
            type: Boolean,
            default: true
        },
    },
    components: {
        PersonalInfo,
        MapProfile,
    },
    data() {
        return {
            // isVisitor: null,
            // userInfo: JSON.parse(this.$Cookies.get('user_info'))
        }
    },
    created() {

    },
    mounted() {
    }

}
</script>

<style scoped>
body {
    width: 95vw;
    height: 90vh;
    margin: 0 2.5vw;
    font:
        0.9em/1.2 Arial,
        Helvetica,
        sans-serif;
    position: relative;
    background-color: rgb(248, 248, 248);
}
</style>