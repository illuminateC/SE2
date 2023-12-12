<template>
    <body>
        <PersonalInfo :isVisitor="this.$props.isVisitor"></PersonalInfo>
        <Follow></Follow>
    </body>
</template>

<script>
import PersonalInfo from '@/components/UserProfile/PersonalInfo.vue';
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
        Follow,
    },
    created() {
        ;
    },
}
</script>

<style  scoped>
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