<template>
    <body>
        <PersonalInfo :isVisitor="isVisitor"></PersonalInfo>
        <star></star>
    </body>
</template>

<script>
import PersonalInfo from '@/components/UserProfile/PersonalInfo.vue';
import star from '@/components/UserProfile/star-post.vue';
export default {
    props: {
        // isVisitor: {
        //     type: Boolean,
        //     default: true
        // },
    },
    components: {
        PersonalInfo,
        star
    },
    computed: {
        isVisitor() {
            return this.$route.query.isVisitor === 'true';
        }
    },
    created() {

    },
}
</script>

<style  scoped>
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