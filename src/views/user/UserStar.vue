<template>
    <body>
        <PersonalInfo :isVisitor="this.$props.isVisitor"></PersonalInfo>
        <Star></Star>
    </body>
</template>

<script>
import PersonalInfo from '@/components/UserProfile/PersonalInfo.vue';
import Star from '@/components/UserProfile/Star.vue';
export default {
    props: {
        isVisitor: {
            type: Boolean,
            default: true
        },
    },
    components: {
        PersonalInfo,
        Star
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