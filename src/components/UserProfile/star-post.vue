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
                        <div class="each" @mouseover="setHoverId(item.id)" @mouseleave="resetHoverId()">
                            <work></work>
                            <li @click="jump(item.id)">{{ item.name }}</li>
                            <div class="cancelicon" v-show="hoveredId === item.id && !isVisitor">
                                <cancelicon @click="cancel(item.id)"></cancelicon>
                            </div>

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
import { ref } from "vue";
import Swal from "sweetalert2";
import back from '../back.vue'
import anime from 'animejs';
import cancelicon from "./cancel.vue"
import collectionAPI from "@/api/collection";
import work from "./work.vue";
export default {
    mounted() {
        const isVisitor = this.$route.params.isVisitor;
        if (isVisitor !== undefined) {
            this.$data.isVisitor = isVisitor;
            this.$data.collection_id = this.$route.params.starId
        } else {
            this.$data.isPost = true
        }
        this.getList(this.$data.isPost, this.$data.collection_id)
    },
    setup() {
        return {
            page: ref(1),
        };
    },
    components: {
        back,
        cancelicon,
        work,
    },
    data() {
        return {
            collection_id: null,
            hoveredId: null,
            isVisitor: false,
            isPost: false,
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
        },
        setHoverId(id) {
            this.$data.hoveredId = id
        },
        resetHoverId() {
            this.$data.hoveredId = null
        },
        async getList(flag, id) {
            if (!flag) {
                const data = { "id": id }
                const response = await collectionAPI.collectionGetEach(data)
                this.$data.starList = response.data
            }
        },
        async cancel(work_id) {
            Swal.fire({
                title: "确定取消该收藏?",
                text: "注意：该操作不可逆!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "确认！",
                cancelButtonText: "否"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = {
                        "work_id_list": [work_id],
                        "package_id": this.$data.collection_id
                    }
                    const response = await collectionAPI.cancelWork(data)
                    this.$data.starList = this.$data.starList.filter(star => star.id !== work_id);
                    Swal.fire({
                        title: "您已取消收藏",
                        text: "",
                        icon: "success"
                    });
                }
            });
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
        width: 25vw;
    }

    .each:hover {
        color: rgba(41, 146, 252, 0.9);

    }

    .each li {
        display: flex;
        font-size: 22px;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }

}

.cancelicon {
    display: flex;
    margin-left: auto;
    justify-content: center;
    align-items: center;
}
</style>