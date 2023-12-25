<template>
    <div id="root">
        <div id="title">
            <span>{{ this.title }}</span>
        </div>
        <div id="rank">
            <RankingItem v-for="(item, i) in itemList" :information="item" :key="i" :type="itemType" :rout="rout" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import RankingItem from "./RankingItem.vue";
export default {
    name: "RankingList",
    props: ["title", "type", "rout"],
    components: {
        RankingItem,
    },
    data() {
        return {
            searchState: {},
            result: [],
            itemList: [],
            itemType: "",
        };
    },
    methods: {
        getHomepage() {
            const that = this;
            axios({
                method: 'post',
                url: 'http://123.249.124.181/api/search/homepage',
            })
                .then(function (res) {
                    if (that.title == 'Recommend') {
                        that.result = res.data.newest_work[0].results
                        that.itemList = that.result.slice(0, 4);
                        for (let i = 0; i < that.itemList.length; i++) {
                            that.itemList[i].rank = i + 1;
                            that.itemList[i].papers = that.itemList[i].cited_by_count;
                            var cutIndex = that.itemList[i].id.lastIndexOf("/") + 1;
                            var Id = that.itemList[i].id.substring(cutIndex);
                            that.itemList[i].Id = Id;
                            if (that.itemList[i].title.length > 22) {
                                that.itemList[i].title = that.itemList[i].title.slice(0, 22) + "...";
                            }
                        }
                    }
                    else if (that.title == 'Top Paper') {
                        that.result = res.data.most_cited_work[0].results
                        that.itemList = that.result.slice(0, 5);
                        that.itemList.splice(3, 1);
                        for (let i = 0; i < that.itemList.length; i++) {
                            that.itemList[i].rank = i + 1;
                            that.itemList[i].papers = that.itemList[i].cited_by_count;
                            var cutIndex = that.itemList[i].id.lastIndexOf("/") + 1;
                            var Id = that.itemList[i].id.substring(cutIndex);
                            that.itemList[i].Id = Id;
                            if (that.itemList[i].title.length > 20) {
                                that.itemList[i].title = that.itemList[i].title.slice(0, 20) + "...";
                            }
                        }
                    }
                    else if (that.title == 'Top Author') {
                        that.result = res.data.most_cited_authors[0].results
                        that.itemList = that.result.slice(0, 4);
                        for (let i = 0; i < that.itemList.length; i++) {
                            that.itemList[i].rank = i + 1;
                            that.itemList[i].title = that.itemList[i].display_name;
                            that.itemList[i].papers = that.itemList[i].cited_by_count;
                            var cutIndex = that.itemList[i].id.lastIndexOf("/") + 1;
                            var Id = that.itemList[i].id.substring(cutIndex);
                            that.itemList[i].Id = Id;
                        }
                    }
                    else if (that.title == 'Top Affiliation') {
                        that.result = res.data.most_cited_institutions[0].results
                        that.itemList = that.result.slice(0, 4);
                        for (let i = 0; i < that.itemList.length; i++) {
                            that.itemList[i].rank = i + 1;
                            that.itemList[i].title = that.itemList[i].display_name;
                            that.itemList[i].papers = that.itemList[i].cited_by_count;
                            if (that.itemList[i].title.length > 18) {
                                that.itemList[i].title = that.itemList[i].title.slice(0, 18) + "...";
                            }
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created() {
        this.itemType = this.type;
        if (this.title == 'Recommend') {
            let recommend;
            if (this.$Cookies.get('commandId') == null || this.$Cookies.get('commandId') == "[]") {
                recommend = [{id: "0"}];
            }
            else {
                recommend = JSON.parse(this.$Cookies.get('commandId'));
            }
            let that = this;
            axios({
                method: 'post',
                url: 'http://123.249.124.181/api/search/entity/search/list',
                data: {
                    "entity_type": "works",
                    "params": {
                        "filter": {
                            "concepts.id": recommend[0].id
                        },
                        "page": 1,
                        "per_page": 15,
                        "search": "",
                        "sort": {
                            "cited_by_count": "desc"

                        }
                    }
                }
            })
                .then(function (res) {
                    that.result = res.data.list_of_entity_data[0].results
                    that.itemList = that.result.slice(0, 4);
                    for (let i = 0; i < that.itemList.length; i++) {
                        that.itemList[i].rank = i + 1;
                        that.itemList[i].papers = that.itemList[i].cited_by_count;
                        var cutIndex = that.itemList[i].id.lastIndexOf("/") + 1;
                        var Id = that.itemList[i].id.substring(cutIndex);
                        that.itemList[i].Id = Id;
                        if (that.itemList[i].title.length > 22) {
                            that.itemList[i].title = that.itemList[i].title.slice(0, 22) + "...";
                        }
                    }
                })
                .catch(function (error) {
                    that.getHomepage();
                });
        } else {
            this.getHomepage();
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
