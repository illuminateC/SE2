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
                        <div class="each" @mouseover="setHoveredId(item.id)" @mouseleave="resetHoverId()">
                            <collectionicon></collectionicon>
                            <li @click="jump(item.id)">{{ item.name }}</li>
                            <div class="changeicon" v-show="hoveredId === item.id && !isVisitor">
                                <changeicon @click="changename(item.id)"></changeicon>
                                <deleteicon @click="deletecollect(item.id)"></deleteicon>
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
import back from '../back.vue'
import anime from 'animejs';
import collectionicon from "./collection.vue";
import collectionAPI from "@/api/collection";
import changeicon from "./change.vue";
import Swal from "sweetalert2";
import deleteicon from "./deleteicon.vue";
export default {
    setup() {
        return {
            page: ref(1),
        };
    },
    components: {
        back,
        collectionicon,
        changeicon,
        deleteicon
    },
    data() {
        return {
            isVisitor: false,
            currentPage: 1,
            itemsPerPage: 10,
            height: 30,
            width: 30,
            starList: [],
            hoveredId: null

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
        const hasIdParam = this.$route.params.hasOwnProperty('id');
        this.$data.isVisitor = hasIdParam;
        this.getList()
    },
    created() {
        this.getList()
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
            const hasIdParam = this.$route.params.hasOwnProperty('id');
            this.$router.push({ name: "starList", params: { starId: id }, query: { isVisitor: hasIdParam } })
        },
        async getList() {
            const response = await collectionAPI.collectionGetAll()
            // console.log(response.data)
            this.$data.starList = response.data.package_list
            console.log(response.data)
        },
        setHoveredId(id) {
            this.$data.hoveredId = id
        },
        resetHoverId() {
            this.$data.hoveredId = null
        },
        async changename(id) {
            Swal.fire({
                title: "请输入一个新名称",
                input: "text",
                inputAttributes: {
                    maxlength: "15",
                    autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "确认",
                preConfirm: async (name) => {
                    try {
                        const data = {
                            "package_name": name,
                            "package_id": id
                        }
                        // const data = new FormData()
                        const response = await collectionAPI.changePackageName(data)

                        if (response.data.result == -1) {
                            throw new Error("名称不能为空")
                        }
                        const starToUpdate = this.$data.starList.find(star => star.id === id)
                        if (starToUpdate) {
                            starToUpdate.name = name
                        }
                        return name;
                    } catch (error) {
                        Swal.showValidationMessage(error);
                    }

                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "名称修改成功",
                        icon: 'success'
                    })
                }
            })
        },
        async deletecollect(id) {
            Swal.fire({
                title: "确定删除该收藏夹?",
                text: "注意：该操作不可逆!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "确认删除!",
                cancelButtonText: "取消"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const data = { "package_id_list": [id] }
                    const response = await collectionAPI.deleteCollectionPackage(data)
                    this.$data.starList = this.$data.starList.filter(star => star.id !== id);
                    Swal.fire({
                        title: "收藏夹已删除！",
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
        cursor: pointer;
        width: 27vw;
    }

    .each:hover {
        color: rgba(41, 146, 252, 0.9);
    }

    .each li {
        display: flex;
        font-size: 20px;
        cursor: pointer;
        margin-left: 25px;
        justify-content: center;
        align-items: center;

    }

    .changeicon {
        margin-left: auto
    }

}
</style>