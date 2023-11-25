<template>
    <div id="root">
        <div id="title">
            <span>{{ this.title }}</span>
        </div>
        <div id="rank">
            <RankingItem v-for="(item, i) in itemList" :information="item" :key="i" :type="itemType" />
        </div>
    </div>
</template>

<script>
import RankingItem from "./RankingItem.vue";
export default {
    name: "RankingList",
    props: ["title", "type"],
    components: {
        RankingItem,
    },
    data() {
        return {
            searchState: {},
            itemList: [
                {
                    "papers": 1,
                    "rank": 1,
                    "title": "A Survey on Deep Learning for Named Entity Recognition",
                    "url": "/detail/cs/2110000000000000001",
                },
                {
                    "papers": 1,
                    "rank": 2,
                    "title": "A Survey on Deep Learning for Named Entity Recognition",
                    "url": "/detail/cs/2110000000000000001",
                },
                {
                    "papers": 1,
                    "rank": 3,
                    "title": "A Survey on Deep Learning for Named Entity Recognition",
                    "url": "/detail/cs/2110000000000000001",
                },
                {
                    "papers": 1,
                    "rank": 4,
                    "title": "A Survey on Deep Learning for Named Entity Recognition",
                    "url": "/detail/cs/2110000000000000001",
                },
            ],
            itemType: "Papers",
        };
    },
    mounted() {
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].title.length > 22) {
                this.itemList[i].title = this.itemList[i].title.slice(0, 22) + "...";
            }
        }
    }
}
</script>

<style scoped>
#root {
    box-shadow: inset 0px 0px 10px 6px rgb(50, 50, 50, 0.1);
    border: #e6e6e6 solid thin;
    border-radius: 30px;
    background-color: white;

    width: 300px;
    margin-top: 55px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 25px 0px 25px 0px;
}

#title {
    width: 150px;
    height: 35px;
    margin-bottom: 12px;

    border: #e6e6e6 solid thin;
    border-radius: 30px;
    box-shadow: 0px 0px 10px 1px #cccccc;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
}
</style>
