<template>
    <swiper :slidesPerView="1" :spaceBetween="30" :pagination="{
        clickable: true,
    }" :mousewheel="true" :modules="modules" class="mySwiper">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
    </swiper>

    <button @click="login">login</button>
    <button @click="logout">logout</button>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';



// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';
import userAPI from '@/api/user';
import CookiesPlugin from '@/cookies-plugin';
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Mousewheel, Pagination],
        };
    },
    methods: {
        login() {
            let valueData = JSON.stringify({
                id: 2,
            });
            this.$Cookies.set('user_info', valueData, { expires: 30 });
            // this.$Cookies.set('token', "4!p7t7)mo5sg=m45+dc)epwre$45ltko_x*m1=g#sv*2f4$+!b")
        },
        async logout() {

            const response = await userAPI.logout()
            this.$Cookies.remove('token')
            alert(response.data.msg)

        }
    },
};
</script>
<style>
#app {
    height: 100%;
}

html,
body {
    position: relative;
    height: 100%;
}

body {
    background: #eee;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
}

.swiper {
    width: 100%;
    height: 20vh;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>