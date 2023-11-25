<template>
    <div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            Username: this.$Cookies.get('user_info')
        }
    },
    created() {
        console.log(this.Username);
    },
}
</script>

<style lang="scss" scoped></style>