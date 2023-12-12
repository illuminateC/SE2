<template>
    <div class="messagecontainer">

        <div class="button" @click="back">
            <back :height="30" :width="30"></back>
        </div>
        <div class="message-box">
            <div class="message" v-for="item in currentPageData" :key="item.id" @click="read(item.id)">
                <li>{{ item.text }}</li>
            </div>

        </div>
        <div class="changePage">
            <n-pagination v-model:page="currentPage" :page-count="100" :page-slot="7" />
        </div>

    </div>
    <el-dialog v-model="isDialog"></el-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import Swal from 'sweetalert2'
import back from "../back.vue";
export default defineComponent({
    components: {
        back,
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
            allData: [{ "id": 1, "text": "消息1" },
            { "id": 2, "text": "消息2" },
            { "id": 3, "text": "消息3" },
            { "id": 4, "text": "消息4" },
            { "id": 5, "text": "消息5" },
            { "id": 6, "text": "消息6" },
            { "id": 7, "text": "消息7" },
            { "id": 8, "text": "消息8" },
            { "id": 9, "text": "消息9" },
            { "id": 20, "text": "消息10" },
            { "id": 11, "text": "消息11" }],
            isDialog: false,

        };
    },
    computed: {
        totalItems() {
            return this.allData.length;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
        currentPageData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.allData.slice(start, end);
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
        back() { this.$router.push({ name: "currentUser" }) },
        read(messageId) {
            // this.isDialog = true
            console.log("delete" + messageId)
            const message = this.allData.find(item => item.id === messageId).text
            Swal.fire(message);
        },
    },
    mounted() {
        // 模拟从后端获取数据
        // 这里使用随机生成的邮箱作为示例数据
        // for (let i = 0; i < 100; i++) {
        //     this.allData.push({ id: i + 1, email: `user${i + 1}@example.com` });
        // }
    },
})
</script>

<style  scoped>
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

.messagecontainer {
    position: relative;
    width: 55vw;
    height: 65vh;
    margin-left: 30vw;
    background-color: whitesmoke;
    padding-top: 10px;
    border-radius: 10px;
    box-shadow: 4px 3px 5px rgba(0, 0, 0, 0.5);
}

.message-box {
    margin: 2vh 7% 2vh 7%;
    width: 86%;
    height: 50vh;
    border-radius: 8px;
    background-color: rgb(230, 230, 230);
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    border: 1px solid #ccc;
    box-shadow: 10px 10px 1px #ddd;
}

.changePage {
    width: 100%;
    display: flex;
    justify-content: center;
}

.message-box li {
    grid-row: span 1;
}

.message {}


.message:hover {
    background-color: wheat;
    cursor: pointer;
}
</style>