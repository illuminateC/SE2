<template>
    <div class="right-box">
        <div class="right">
            <div class="head">
                <div class="backButton" @click="back">
                    <back :height="height" :width="width" @mouseover="handleOver" @mouseout="handleOut"></back>
                </div>
            </div>
            <div>
                <div class="grid">
                    <div v-for="item in  currentPageData " :key="item.id">
                        <div class="avatar">
                            <div class="avatar-box"><img :src="item.src" alt="" @click="jump(item.id)"> </div>
                        </div>
                        <div class=" name">
                            <p @click="jump(item.id)">{{ item.name }}</p>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="changePage">
                        <n-pagination v-model:page="currentPage" :page-count="totalPages" :page-slot="7" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import back from '../back.vue'
import anime from 'animejs';
export default {
    setup() {
        return {
            page: ref(1),
        };
    },
    components: {
        back,
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 15,
            height: 30,
            width: 30,
            followList: [
                { "id": "1", "name": "123", src: "../../assets/logo.png" },
                { "id": "2", "name": "333", src: "" },
                { "id": "3", "name": "123", src: "../../assets/logo.png" },
                { "id": "5", "name": "123", src: "../../assets/logo.png" },
                { "id": "6", "name": "333", src: "" },
                { "id": "7", "name": "123", src: "../../assets/logo.png" },
                { "id": "8", "name": "123", src: "../../assets/logo.png" },
                { "id": "9", "name": "333", src: "" },
                { "id": "10", "name": "123", src: "../../assets/logo.png" },
                { "id": "11", "name": "123", src: "../../assets/logo.png" },
                { "id": "12", "name": "333", src: "" },
                { "id": "13", "name": "123", src: "../../assets/logo.png" },
                { "id": "14", "name": "123", src: "../../assets/logo.png" },
                { "id": "15", "name": "333", src: "" },
                { "id": "16", "name": "123", src: "../../assets/logo.png" },
                { "id": "17", "name": "123", src: "../../assets/logo.png" },
                { "id": "18", "name": "333", src: "" },
                { "id": "4", "name": "123", src: "../../assets/logo.png" },
            ]

        }
    },
    computed: {
        totalItems() {
            return this.followList.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        currentPageData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.followList.slice(start, end);
        },
        visiblePages() {
            const pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

    },
    mounted() {
        this.$data.followList[0].src = require("../../assets/logo.png")
    },
    methods: {
        back() {
            const hasIdParam = this.$route.params.hasOwnProperty('id');
            if (hasIdParam) {
                const id = this.$route.params.id;
                this.$router.push({ name: "otherUser", params: id })
            }
            else this.$router.push({ name: "currentUser" })
        },
        handleOver() {
            anime({
                targets: this.$data,
                height: 40,
                width: 40,
                duration: 300, // 过渡动画的持续时间
                easing: 'easeInOutQuad' // 缓动函数
            })
        },
        handleOut() {
            anime({
                targets: this.$data,
                height: 30,
                width: 30,
                duration: 300, // 过渡动画的持续时间
                easing: 'easeInOutQuad' // 缓动函数
            })
        },
        jump(id) {

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
        background-color: white;
        border-radius: 20px;
        box-shadow: 4px 3px 5px rgba(0, 0, 0, 0.5);
        padding-left: 2vw;
        padding-right: 2vw;
        padding-top: 2vh;
        padding-bottom: 2vh;
        display: flex;
        flex-flow: column wrap;

        .head {
            height: 5vh;
            display: flex;
        }

        .backButton {
            cursor: pointer;
        }

        .bottom {
            margin-top: auto;

            .changePage {
                display: flex;
                justify-content: center;
            }
        }
    }
}

.grid {
    height: 45vh;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    /* 三行，每行等高 */
    grid-template-columns: repeat(5, 1fr);

    .avatar {
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;

        .avatar-box {

            height: 75px;
            width: 75px;
            background-color: #ddd;
            overflow: hidden;
            border-radius: 50%;
        }

        .avatar-box img {
            height: 100%;
            width: 100%;
            contain: none;

        }

        .avatar-box:hover {
            height: 85px;
            width: 85px;
        }

    }

    .name {
        display: flex;
        height: 3vh;
        justify-content: center;
        align-items: center;
    }

    .name p {
        font-size: 16px;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
    }

    .name:hover {
        color: rgba(41, 146, 252, 0.9);
    }

    .name p:hover {
        font-size: 20px;
    }
}
</style>