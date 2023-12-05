<template>
    <body>
        <h1>Simple float example</h1>

        <div class="box">Float</div>

        <p class="special">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam
            dolor, eu lacinia lorem placerat vulputate.
        </p>



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
.special {
    background-color: rgb(79, 185, 227);
    padding: 10px;
    color: #fff;
}

body {
    width: 90%;
    max-width: 900px;
    margin: 0 auto;
    font:
        0.9em/1.2 Arial,
        Helvetica,
        sans-serif;
}

.box {
    float: left;
    margin: 15px;
    width: 150px;
    height: 150px;
    border-radius: 5px;
    background-color: rgb(207, 232, 220);
    padding: 1em;
}
</style>