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
                <div v-if="messageList && messageList.length">
                    <div class="message-box">
                        <div class="message" v-for="item in currentPageData" :key="item.id" @click="read(item.id)">
                            <li>{{ item.content }}</li>
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
                        <p>您还没有收到信息！</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Swal from 'sweetalert2'
import back from "../back.vue";
import anime from "animejs";
import loading from "./loading.vue";
import none from "./None.vue";
import './svg.css'
import messageAPI from "@/api/message";
export default defineComponent({
    components: {
        back,
        loading,
        none
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
            messageList: [],
            isDialog: false,
            height: 30,
            width: 30,
            isLoading: false,
            user_id: "",
            isVisitor: ""
        };
    },
    computed: {
        totalItems() {
            return this.messageList.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        currentPageData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.messageList.slice(start, end);
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
        this.getList();
    },
    methods: {
        back() { this.$router.push({ name: "map", params: { id: this.$data.user_id } }) },
        read(messageId) {
            // this.isDialog = true
            console.log("delete" + messageId)
            const message = this.messageList.find(item => item.id === messageId).content
            Swal.fire(message);
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
        async getList() {
            try {
                this.$data.isLoading = true;
                const data = { "receiver_id": this.$data.user_id }
                const response = await messageAPI.getMessageList(data);
                this.$data.messageList = response.data.message_list;

            }
            catch (error) {
                console.error("Error fetching data:", error);
                // 处理错误情况
            } finally {
                this.$data.isLoading = false; // 数据加载完成，隐藏 loading 状态
            }
        },

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

.message-box {
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

.message-box li {
    grid-row: span 1;
}

.message {
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    align-items: center;
}



.message:hover {
    background-color: wheat;
    cursor: pointer;
}
</style>