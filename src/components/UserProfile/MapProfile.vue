<template>
    <div class="right-box">
        <div class="right">

            <div style="display: flex; width: 100%;" v-if="this.$data.is_authenticated == 0">
                <div style="display: flex; width: 100%; align-items: center; justify-content: center;">
                    <None></None>
                    <p style="font-size: 20px; font-weight: bold;">仍未认领门户，去别的地方转转吧！ </p>
                </div>
            </div>
            <swiper v-else :slidesPerView="1" :spaceBetween="30" :pagination="{
                clickable: true,
            }" :mousewheel="true" :modules="modules" class="mySwiper">
                <swiper-slide>
                    <div class="map-box">
                        <div>
                            <p style="font-size:24px">数据统计</p>
                        </div>
                        <author-compare-chart class="chart" :hIndex="this.$data.author.hIndex"
                            :numOfPaper="this.$data.author.numOfPaper" :numOfCitation="this.$data.author.numOfCitation"
                            v-if="authorLoaded"></author-compare-chart>
                        <div v-else class="svg">
                            <div class="svgcontain">
                                <loadingVue></loadingVue>
                                <p>加载中，请稍候。</p>
                            </div>

                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="grid-item">
                        <div class="grid-head">
                            <p>我的投稿</p>
                            <div class="all" @click="jumpMe()">进入个人主页</div>
                        </div>
                        <div class="article-container">
                            <div v-for="(item, index) in post" :key="index">
                                <div class="each-container" @click="jumparticle(item.id)">
                                    <Num :Number="(index + 1)"></Num>
                                    {{ item.title }}
                                </div>
                            </div>

                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import AuthorCompareChart from "@/components/Charts/AuthorCompareChart.vue";
import { AuthorAPI } from "@/api/author";
import userAPI from '@/api/user';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Num from './Num.vue'
import { Search } from '@/api/search';
import loadingVue from "./loading.vue";
import 'swiper/css';
import './svg.css'
import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
import None from './None.vue';
export default {
    data() {
        return {
            post: [],
            user_id: "",
            isVisitor: false,
            gateway_id: "",
            is_authenticated: 1,
            authorLoaded: false,
            author: {},
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        Num,
        None,
        AuthorCompareChart,
        loadingVue,
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
        };
        this.getInfo()
    },
    setup() {
        return {
            modules: [Mousewheel, Pagination],
        };
    },
    methods: {
        jumpAll(name) {
            if (this.$data.hasIdParam) {
                const id = this.$route.params.id;
                this.$router.push({ name: name, params: "id" })
            } else this.$router.push({ name: name })

        },
        async getInfo() {
            var data = { "user_id": this.$data.user_id }
            var response = await userAPI.getInfo(data)
            if (response.data.msgno == -1) {
                return
            }
            if (response.data.result.is_authenticated == 1) {
                this.$data.is_authenticated = 1
                const parts = response.data.result.gateway_id.split('/');
                this.$data.gateway_id = parts[parts.length - 1]
                data = {
                    "entity_type": "works",
                    "params": {
                        "filter": {
                            "authorships.author.id": this.$data.gateway_id
                        },
                        "page": 1,
                        "per_page": 5,
                        "search": "",
                        "sort": {
                            "cited_by_count": "desc"
                        }
                    }
                }
                response = await Search.getSearchDataList(data)
                this.$data.post = response.data.list_of_entity_data[0].results
                this.initAuthorInformation()
            } else {
                this.$data.is_authenticated = 0
            }
        },
        jumparticle(id) {
            const parts = id.split('/');
            const articleId = parts[parts.length - 1]
            this.$router.push({ name: "articleDetail", params: { articleId: articleId } })
        },
        jumpMe() {
            this.$router.push({ name: "Author", params: { authorId: this.$data.gateway_id } })
        },
        initAuthorInformation() {
            var data = {
                "entity_type": "authors",
                "params": {
                    id: this.$data.gateway_id
                }
            };
            AuthorAPI.getAuthorInformation(data)
                .then((res) => {
                    if (res.data.msgno === 1) {
                        this.$data.author.numOfPaper = res.data.specific_entity_data.works_count;
                        this.$data.author.numOfCitation = res.data.specific_entity_data.cited_by_count;
                        this.$data.author.hIndex = res.data.specific_entity_data.summary_stats.h_index;
                        this.$data.authorLoaded = true
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
}
</script>

<style  scoped>
.right-box {
    /* margin: 0 0 0 50% */
    display: flex;

    .right {
        margin-left: 2vw;

        width: 90%;
        display: flex;

        .map-box {
            width: 100%;
            height: 100%;
            padding-left: 3vw;
            padding-right: 3vw;
            padding-top: 1vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .map-box p {
            font-weight: 700;
        }

        .grid-item {
            width: 100%;
            height: 93%;
            background-color: rgb(254, 254, 254);
            border-radius: 5px;
            display: flex;
            flex-flow: column wrap;
            padding-left: 3vw;
            padding-right: 3vw;
            padding-top: 1vh;
            padding-bottom: 1vh;

            .grid-head {
                display: flex;
                width: 100%;

                .all {
                    margin-left: auto;
                    cursor: pointer;
                    font-size: 15px;
                    display: flex;
                    align-items: center;
                }

                .all:hover {
                    color: rgba(41, 146, 252, 0.9);

                }


            }

            .grid-head p {
                font-weight: 700;
                font-size: 23px;
            }

        }

        .article-container {
            flex-grow: 1;
            display: grid;
            grid-template-rows: repeat(5, 1fr);

            .each-container {
                display: flex;
                font-size: 18px;
                font-style: italic;
                cursor: pointer;
                align-items: center;
            }

            .each-container:hover {
                color: rgba(41, 146, 252, 0.9);
            }
        }


    }
}

.mySwiper {
    margin-top: 3vh;
    height: 60vh;
    border-radius: 15px;


    .swiper {
        width: 100%;
        height: 10vh;
    }

    .swiper-slide {

        background: #fff;
        /* Center slide text vertically */
        display: flex;

    }


}
</style>