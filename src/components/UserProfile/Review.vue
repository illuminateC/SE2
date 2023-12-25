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
                <div v-if="reviewList && reviewList.length">
                    <div class="review-box">
                        <div class="review" v-for="item in currentPageData" :key="item.id" @click="read(item)">
                            <div class="each" @mouseover="setHoveredId(item.id)" @mouseleave="resetHoverId()">
                                <div style="display: flex; width: 80%;">
                                    <div class="title">{{ item.name }}</div>
                                    <div class="time">{{ new Date(item.time).toLocaleString() }}</div>
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
                        <p>您还没有收到需要审核的信息！</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="clicked">
        <div style="width: 100%;">
            <span style=" word-wrap: break-word; text-indent: 2em;">
                {{ current.content }} 
            </span>
          
        </div>
<div style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;" >
    <div style="height: auto; width: auto; padding-top: 5px; padding-bottom: 5px; padding-left:10px ;padding-right: 10px;" v-for="item in current.images" :key="item">
    <img  style="width: 40vh;" :src="item" alt="">
</div>

</div>
<button @click="review(current.id,1)">1</button>
<button @click="review(current.id,2)">2</button>
    </el-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import Swal from 'sweetalert2'
import back from "../back.vue";
import anime from "animejs";
import loading from "./loading.vue";
import none from "./None.vue";
import './svg.css'
import reviewAPI from "@/api/review";
import userAPI from "@/api/user";
export default defineComponent({
    components: {
        back,
        loading,
        none,
    },
    setup() {
        return {
            page: ref(1),
        };
    },
    data() {
        return {
            currentPage: 1, // 当前页码
            itemsPerPage: 5, // 每页显示的条目数量
            reviewList: [],
            isDialog: false,
            height: 30,
            width: 30,
            isLoading: false,
            user_id: "",
            hoveredId: "",
            clicked:false,
            current:null,
        };
    },
    computed: {
        totalItems() {
            return this.reviewList.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        currentPageData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.reviewList.slice(start, end);
        },
        visiblePages() {
            const pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

    },
    async mounted() {
        const hasIdParam = this.$route.params.hasOwnProperty('id');
        if (hasIdParam) {
            this.$data.user_id = this.$route.params.id
            const userInfoString = this.$Cookies.get('user_info');
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                if (this.$data.user_id != userInfo.id) {
                    this.$router.push({ name: "map", params: { "id": this.$data.user_id } })
                } else {
                    const data = { "user_id": this.$data.user_id }
                    const response = await userAPI.getInfo(data)
                    if (response.data.result.is_admin == false) {
                        this.$router.push({ name: "map", params: { "id": this.$data.user_id } })
                    }
                }
            } else {
                this.$router.push({ name: "map", params: { "id": this.$data.user_id } })
            }
        }
        this.getList();
    },
    methods: {
        back() { this.$router.push({ name: "map", params: { id: this.$data.user_id } }) },
        async read(id) {
this.$data.clicked=true
this.$data.current = id

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
        setHoveredId(id) {
            this.$data.hoveredId = id
        },
        resetHoverId() {
            this.$data.hoveredId = null
        },
        async getList() {
            try {
                this.$data.isLoading = true;
                const data = { "status": 0 }
                const response = await reviewAPI.read(data);
                this.$data.reviewList = response.data.application_list;
                console.log(this.$data.reviewList)
            }
            catch (error) {
                console.error("Error fetching data:", error);
                // 处理错误情况
            } finally {
                this.$data.isLoading = false; // 数据加载完成，隐藏 loading 状态
            }
        },
        async handle(id, op) {
            const data = { "id": id, "op": op }
            const response = await reviewAPI.review(data);

        },
        async review(id,op){
const data={"id":id,"op":op}
const response = await reviewAPI.review(data)
this.$data.reviewList=this.$data.reviewList.filter(review =>review.id!=this.current.id)
this.$data.clicked=false
        }
    }
})
</script>

<style  scoped>
.right-box {
    display: flex;
    margin-top: 3vh;

    .right {
        margin-left: 3vw;
        width: 90%;
        height: 65vh;
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

.button {
    display: flex;
    align-items: center;
    margin-left: 0;
    width: fit-content;
    transition: all 0.3s ease;
    margin-left: 3px;
}

.button:hover {
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 4px 3px 5px #ddd;
    transform: translate(-2px, -2px);
}

.review-box {
    margin: 0 7% 2vh 7%;
    width: 86%;
    height: 47vh;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-row-gap: 1vh;
}

.changePage {
    width: 100%;
    display: flex;
    justify-content: center;
}

.review-box li {
    grid-row: span 1;
}

.review {
    border: 1px solid grey;
    border-radius: 10px;

    .each {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .title {
        display: flex;
        margin-left: 4vw;
        font-size: 15px;
        font-weight: bold;
    }

    .time {
        display: flex;
        margin-left: auto;
    }
}



.review:hover {
    background-color: wheat;
    cursor: pointer;
}
</style>