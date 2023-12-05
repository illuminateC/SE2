<template>
    <div>
        1
    </div>
    <div class="box-container">
        <div>3</div>
        <div>2</div>
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

<style scoped></style>