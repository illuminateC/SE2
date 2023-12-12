<template>
    <div class="right-box">
        <div class="right">
            <div class="backButton">
                <button @click="back">back</button>
            </div>
            here is follow
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            const hasIdParam = this.$route.params.hasOwnProperty('id');
            if (hasIdParam) {
                const id = this.$route.params.id;
                this.$router.push({ name: "otherUser", params: id })
            }
            else this.$router.push({ name: "currentUser" })
        }
    },
}
</script>

<style scoped>
.right-box {
    display: flex;
    margin-top: 3vh;

    .right {
        margin-left: 3vw;
        width: 90%;
        height: 60vh;
        background-color: aliceblue;
    }
}
</style>