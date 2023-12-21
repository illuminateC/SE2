<template>
    <div class="right-box">
        <div class="right">
            <!-- <div class="map-box">
                <p>here is a map</p>
                <div class="map">此处应有图片</div>
            </div>
            <div class="article-box">
                <div class="grid-item">
                    <div class="grid-head">
                        <p>我的投稿</p>
                        <div class="all" @click="jumpAll('post')">全部</div>
                    </div>
                    <div class="article-container">
                        <div>
                            <p>这是第一个</p>
                            <p href="a">xxxx</p>
                        </div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                </div>
                <div class="grid-item">
                    <div class="grid-head">
                        <p>我的收藏</p>
                        <div class="all" @click="jumpAll('star')">全部</div>
                    </div>
                    <div class="article-container">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                </div>

            </div> -->
            <swiper :slidesPerView="1" :spaceBetween="30" :pagination="{
                clickable: true,
            }" :mousewheel="true" :modules="modules" class="mySwiper">
                <swiper-slide>
                    <div class="map-box">
                        <p>here is a map11111111111</p>
                        <div class="map">此处应有图片</div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="grid-item">
                        <div class="grid-head">
                            <p>我的投稿</p>
                            <div class="all" @click="jumpAll('post')">全部</div>
                        </div>
                        <div class="article-container">
                            <div v-for="item in post" :key="item.id">
                                <div class="each-container">
                                    <Num :Number=item.id></Num>
                                    {{ item.id }}
                                    {{ item.content }}
                                </div>
                            </div>

                        </div>
                    </div>
                </swiper-slide><swiper-slide>
                    <div class="grid-item">
                        <div class="grid-head">
                            <p>我的收藏</p>
                            <div class="all" @click="jumpAll('star')">全部</div>
                        </div>
                        <div class="article-container">
                            <div v-for="item in star" :key="item.id">
                                <div class="each-container">
                                    <Num :Number=item.id></Num>
                                    {{ item.id }}
                                    {{ item.content }}
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
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import Num from './Num.vue'
// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import { Mousewheel, Pagination } from 'swiper/modules';
export default {
    data() {
        return {
            post: [
                { id: 1, content: 'THIs IS the TITLE' },
                { id: 2, content: 'Block 2' },
                { id: 3, content: 'Block 3' }
            ],
            star: [
                { id: 1, content: 'THIs IS the star' },
                { id: 2, content: 'Block 2' },
                { id: 3, content: 'Block 3' },
                { id: 4, content: 'THIs IS the TITLE' },
                { id: 5, content: 'Block 2' },

            ]
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        Num
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

        }
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
        }

        .map-box p {
            font-weight: 700;
            font-style: italic;
            font-size: larger;
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
                font-size: 40px;
                font-style: italic;
                cursor: pointer;
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