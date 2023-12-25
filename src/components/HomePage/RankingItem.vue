<template>
    <div id='itemroot'>

        <div class="numcoin" :id="['numcoin' + this.information.rank]">
            <div class="num" :id="['num' + this.information.rank]">{{ this.information.rank }}</div>
        </div>

        <div id='right'>

            <div id='up'>

                <div style="font-weight: bold; white-space: nowrap;">
                    <router-link v-if="rout == 1" class="link" :to="{path:'/article/' + this.information.Id}" tag="a" target="_blank">
                        {{ this.information.title }}
                    </router-link>
                    <router-link v-if="rout == 2" class="link" :to="{path:'/article/' + this.information.Id}" tag="a" target="_blank">
                        {{ this.information.title }}
                    </router-link>
                    <router-link v-if="rout == 3" class="link" :to="{path:'/author/' + this.information.Id}" tag="a" target="_blank">
                        {{ this.information.title }}
                    </router-link>
                    <router-link v-if="rout == 4" class="link" @click.prevent :to="{path:'/article/1'}" tag="a" target="_blank">
                        {{ this.information.title }}
                    </router-link>
                </div>

                <div style="font-size: 10px; text-align: right; display: flex; white-space: nowrap; margin-top: 2px;">
                    {{ this.information.papers }} {{ this.type }}
                </div>

            </div>

            <el-progress v-if="getPercentage" :percentage='getPercentage' :show-text='false' color="#26BEB8"
                :stroke-width="9" style="margin-top: 6px;"></el-progress>

        </div>

    </div>
</template>
  
<script>
import gsap from "gsap";
export default {
    name: 'RankingItem',
    props: ['information', 'type', 'rout'],
    data() {
        return {
            info: {
                rank: 0,
                title: "",
                papers: 0,
                maximum: 0,
            },
            loaded: false,
        }
    },
    computed: {
        getPercentage() {
            return this.information.papers * 100 / this.information.maximum;
        }
    },
    mounted() {


        switch (this.information.rank) {
            case 1:
                gsap.set("#numcoin" + this.information.rank, { backgroundImage: 'linear-gradient(to bottom right, #feff0b, #d1bb10)' })
                break;
            case 2:
                gsap.set('#numcoin' + this.information.rank, { backgroundImage: 'linear-gradient(to bottom right, #e9e9e9, #8f8f8f)' })
                break;
            case 3:
                gsap.set('#numcoin' + this.information.rank, { backgroundImage: 'linear-gradient(to bottom right, goldenrod, #996633)' })
                break;
            default:
                gsap.set('#numcoin' + this.information.rank, { backgroundColor: '#e6e6e6' })
                gsap.set('#num' + this.information.rank, { color: 'grey' })
        }

    },
}
</script>
  
<style scoped>
#itemroot {
    /* outline: #21ff06 dotted thick; */
    display: flex;
    margin-bottom: 12px;
}

.numcoin {
    width: 20px;
    height: 20px;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 5px;
}

.num {
    font-size: 15px;
    font-weight: bolder;
    color: white;
}

#right {
    width: 240px;
}

#up {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.link {
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: 540;
    color: rgb(0, 0, 0);
}
</style>
  