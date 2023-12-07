<template>
    <body>
        <PersonalInfo />
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

        }
    },
    created() {
        console.log(1);
    },

}
</script>

<style scoped>
body {
    width: 90vw;
    margin: 0 5vw;
    font:
        0.9em/1.2 Arial,
        Helvetica,
        sans-serif;
}
</style>