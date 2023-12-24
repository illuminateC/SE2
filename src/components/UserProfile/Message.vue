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
                            <div class="each" @mouseover="setHoveredId(item.id)"  @mouseleave="resetHoverId()">
                               <div v-show="item.is_read===false">
                                <unread style="display: flex; margin-left: 1vw;"></unread>
                                </div>
                            
                            <div style="display: flex; width: 80%;">
                                <div class="title">{{ item.sender_name }}</div>
                                <div class="time">{{ new Date(item.time).toLocaleString() }}</div>
                            </div>
                            <div class="delete" 
                            
                            v-show="hoveredId === item.id" style="display: flex; margin-left: 3vw;">
                                <deleteicon @click.stop = "delete_message(item.id)"></deleteicon></div> 
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
import unread from "./unread.vue"
import deleteicon from "./deleteicon.vue";
export default defineComponent({
    components: {
        back,
        loading,
        none,
        unread,
        deleteicon
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
            isVisitor: "",
            hoveredId:""
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
        async read(messageId) {
            const message = this.messageList.find(item => item.id == messageId)
            message.is_read = JSON.parse('true');
            Swal.fire(message.content);
            const data={"id":messageId}
            const response = await messageAPI.readMeaage(data)

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
        async delete_message(id){
            Swal.fire({
                title: "确定删除该消息?",
                text: "注意：该操作不可逆!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "确认删除!",
                cancelButtonText: "取消"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = { "id": id }
                    const response = await messageAPI.delete_message(data)
                    this.$data.messageList = this.$data.messageList.filter(message => message.id !== id);
                    Swal.fire({
                        title: "该消息已删除！",
                        icon: "success"
                    });
                }
            });
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
    
    .each{
        display: flex;
        align-items: center;
        height: 100%;
    }
    .title{
        display: flex;
        margin-left: 2vw;
        font-size: 15px;
        font-weight: bold;
    }
    .time{
        display: flex;
        margin-left: auto;
    }
}



.message:hover {
    background-color: wheat;
    cursor: pointer;
}
</style>