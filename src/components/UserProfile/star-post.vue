<template>
    <div class="right-box">
        <div class="right">
            <div v-if="isLoading" class="svg">
                <div class="svgcontain">
                    <loading></loading>
                    <p>加载中，请稍候。</p>
                </div>
            </div>
            <div v-else>
                <div class="head">
                    <div class="backButton" @click="back">
                        <back :height="height" :width="width" @mouseover="handleOver" @mouseout="handleOut"></back>
                    </div>
                </div>
                <div v-if="starList && starList.length">
                    <div class="grid">
                        <div v-for="item in  currentPageData" :key="item.id">
                            <div class="each" @mouseover="setHoverId(item.id)" @mouseleave="resetHoverId()">
                                <work></work>
                                <li @click="jump(item.id)">{{ item.title }}</li>
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
                <div v-else class="svg">
                    <div class="svgcontain">
                        <none></none>
                        <p>请先收藏论文再来吧！</p>
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
import loading from "./loading.vue";
import "./svg.css"
import none from "./None.vue";
export default {
    mounted() {
        const hasIdParam = this.$route.params.hasOwnProperty('id');
        if (hasIdParam) {
            this.$data.user_id = this.$route.params.id
            const userInfoString = this.$Cookies.get('user_info');
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                if (this.$data.user_id != userInfo.id) this.$data.isVisitor = true;
            } else {
                this.$data.isVisitor = true;
            }
        }
        this.$data.collection_id = this.$route.params.starId
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
        loading,
        none,
    },
    data() {
        return {
            isLoading: false,
            collection_id: null,
            hoveredId: null,
            isVisitor: false,
            isPost: false,
            currentPage: 1,
            itemsPerPage: 5,
            height: 30,
            width: 30,
            starList: [],
            user_id: ""
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
            this.$router.push({ name: 'star', params: { id: this.$data.user_id } });
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
            window.open("/article/"+id)
        },
        setHoverId(id) {
            this.$data.hoveredId = id
            const value = this.$data.isVisitor
        },
        resetHoverId() {
            this.$data.hoveredId = null
        },
        async getList(flag, id) {
            if (!flag) {
                try {
                    this.$data.isLoading = true
                    const data = { "collection_package_id": id }
                    const response = await collectionAPI.collectionGetEach(data)
                    this.$data.starList = response.data.work_list
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    this.$data.isLoading = false
                }
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



    .each {
        display: flex;

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