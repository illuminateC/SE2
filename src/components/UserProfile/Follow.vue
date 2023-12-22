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
                            <div class="avatar-box"><img :src="item.avatar" alt="" @click="jump(item.id)"> </div>
                        </div>
                        <div class=" name">
                            <p @click="jump(item.id)">{{ item.username }}</p>
                            <p>{{ item.works }}</p>
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
import followAPI from "@/api/follow";
import Swal from "sweetalert2";
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
            user_id: null,
            currentPage: 1,
            itemsPerPage: 15,
            height: 30,
            width: 30,
            followList: []

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
        const hasIdParam = this.$route.params.hasOwnProperty('id');
        if (hasIdParam) {
            this.$data.user_id = this.$route.params.id
        } else {
            const userInfoString = this.$Cookies.get('user_info');
            if (userInfoString) {
                // 如果获取到了cookie字符串，解析为对象
                const userInfo = JSON.parse(userInfoString);
                this.$data.user_id = userInfo.id
            } else {
                alert("请先登录")
            }
        }
        this.getList();
        // this.$data.followList[0].src = require("../../assets/logo.png")
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

        },
        async getList() {
            const data = { "user_id": this.$data.user_id }
            const response = await followAPI.followList(data)
            this.$data.followList = response.data.following_list
            console.log(this.$data.followList)
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