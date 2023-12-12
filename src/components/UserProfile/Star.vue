<template>
    <div>
        this is a star
        <button @click="back"> back</button>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            const hasIdParam = this.$route.params.hasOwnProperty('id');
            if (hasIdParam) {
                const id = this.$route.params.id;
                this.$router.push({ name: "otherUser", params: "id" })
            }
            else this.$router.push({ name: "currentUser" })
        }
    },

}
</script>

<style lang="scss" scoped></style>