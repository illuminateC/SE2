<template>
    <body>
        <PersonalInfo :is-visitor="false" :is-In="true"></PersonalInfo>
        <Message></Message>
    </body>
</template>

<script>
import PersonalInfo from '@/components/UserProfile/PersonalInfo.vue';
import Message from '@/components/UserProfile/Message.vue';
export default {

    components: {
        PersonalInfo,
        Message,
    },
    created() {
        ;
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