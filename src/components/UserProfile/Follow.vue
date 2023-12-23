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
                <div v-if="followList && followList.length">
                    <div class="grid">
                        <div class="each" v-for="item in  currentPageData " :key="item.user_id">
                            <div class="avatar">
                                <div class="avatar-box"><img :src="item.avatar" alt="" @click="jump(item.user_id)"> </div>
                            </div>
                            <div class="word">
                                <div class="wordcontain">
                                    <div class="name">
                                        <p @click="jump(item.user_id)">{{ item.username }}</p>
                                    </div>
                                    <div class="works" @click="jump(item.user_id)">
                                        <p>作品数：{{ item.works }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="unfollowicon" v-show="!isVisitor">
                                <unfollow style="cursor: pointer;" @click="unfollow(item.user_id)"></unfollow>
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
                        <p>请先关注用户再来吧！</p>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import unfollow from "./unfollow.vue";
import followAPI from "@/api/follow";
import Swal from "sweetalert2";
import back from '../back.vue'
import anime from 'animejs';
import none from './None.vue';
import loading from "./loading.vue";
import "./svg.css"
export default {
    setup() {
        return {
            page: ref(1),
        };
    },
    components: {
        back,
        unfollow,
        none,
        loading,
    },
    data() {
        return {
            isLoading: true,
            user_id: null,
            isVisitor: false,
            currentPage: 1,
            itemsPerPage: 8,
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
        back() {
            this.$router.push({ name: 'map', params: { id: this.$data.user_id } });
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
            const routePath = `/user/${id}`
            window.open(routePath, '_blank');
            // this.$router.push({ name: "user", params: { id: id }, target: '_blank' })
        },
        async getList() {
            try {
                this.$data.isLoading = true; // 开始加载，显示 loading 状态
                const data = { "user_id": this.$data.user_id };
                const response = await followAPI.followList(data);
                // 等待实际数据加载完成，然后更新列表和 loading 状态
                this.$data.followList = response.data.following_list;
            } catch (error) {
                console.error("Error fetching data:", error);
                // 处理错误情况
            } finally {
                this.$data.isLoading = false; // 数据加载完成，隐藏 loading 状态
            }
        },
        async unfollow(id) {
            Swal.fire({
                title: "确定取关该用户?",
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
                        "author_id": id
                    }
                    const response = await followAPI.unFollow(data)
                    this.$data.followList = this.$data.followList.filter(user => user.user_id !== id);
                    this.$store.commit('setFollows', this.$data.followList.length)
                    Swal.fire({
                        title: "您已取关该用户",
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
    grid-template-rows: repeat(4, 1fr);
    /* 三行，每行等高 */
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3vw;
    grid-row-gap: 1vh;

    .each {
        display: flex;
        border-radius: 10px;
        border: 1px solid grey;
        padding-left: 2vw;
        padding-right: 2vw;
    }

    .avatar {
        height: auto;
        display: flex;
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

    .word {
        margin-left: 2vw;
        display: flex;
        align-items: center;
    }

    .name {
        display: flex;
        height: 3vh;
        margin-top: auto;
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



    .works {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .works p {
        font-size: 12px;
        cursor: pointer;
    }

    .unfollowicon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
    }

}
</style>