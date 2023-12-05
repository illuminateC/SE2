<template>
    <body>

        <div class="profile-box">
            <div class="avatar-box">
                
                avatar
            <div class="follow-box">follow</div>
            </div>
            Float</div>

        <div class="head-box">
            here is this name
        </div>
        <div>3</div>
    </body>
</template>

<script>
export default {
    created() {
        console.log(123);
    },
}
</script>

<style scoped>


body {
    width: 90%;
    margin: 0 auto;
    font:
        0.9em/1.2 Arial,
        Helvetica,
        sans-serif;
}
.head-box {
    background-color: rgb(79, 185, 227);
    padding: 10px;
    color: #fff;
    height:23vh;
}
.profile-box {
    float: left;
    margin: 5% 7% 0 10%;
    width: 150px;
    height: 70vh;
    border-radius: 5px;
    background-color: rgb(207, 232, 220);
    /* padding: 1em; */
}
.avatar-box{
    height: 150px;
    background-color: #f7b8b8;
}
.follow-box{
    float: bottom;
}
</style>