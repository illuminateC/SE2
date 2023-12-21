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
                    <div v-for="item in  currentPageData" :key="item.id">
                        <div class="each">
                            <li @click="jump(item.id)">{{ item.name }}</li>
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
            itemsPerPage: 10,
            height: 30,
            width: 30,
            starList: [
                { "id": "1", "name": "123", },
                { "id": "2", "name": "333", },
                { "id": "3", "name": "123", },
                { "id": "5", "name": "123", },
                { "id": "6", "name": "333", },
                { "id": "7", "name": "123", },
                { "id": "8", "name": "123", },
                { "id": "9", "name": "333", },
                { "id": "10", "name": "123", },
                { "id": "11", "name": "123", },
                { "id": "12", "name": "333" },
                { "id": "13", "name": "123", },
                { "id": "14", "name": "123", },
                { "id": "15", "name": "333", },
                { "id": "16", "name": "123", },
                { "id": "17", "name": "123", },
                { "id": "18", "name": "333", },
                { "id": "4", "name": "123", },
            ]

        }
    },
    computed: {
        totalItems() {
            return this.starList.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        currentPageData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.starList.slice(start, end);
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

    },
    methods: {
        back() {
            this.$router.go(-1)
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
            const hasIdParam = this.$route.params.hasOwnProperty('id');
            console.log(hasIdParam)
            //this.$router.push({ name: "starList", params: { starId: id, isVisitor: hasIdParam } })
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
    grid-template-rows: repeat(5, 1fr);
    /* 三行，每行等高 */
    grid-template-columns: repeat(2, 1fr);

    .each {
        display: flex;
    }

    .each:hover {
        color: rgba(41, 146, 252, 0.9);

    }

    .each li {

        font-size: 20px;
        cursor: pointer;
    }

}
</style>