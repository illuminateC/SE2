<template>
    <div id="nav_bar">
        <div class="nav_bar_frame">
            <div class="nav_bar_icon">
                <div class="nav_bar_icon_title_bold" @click="backtostartpage">Xpertise</div>
                <div class="nav_bar_icon_title" @click="backtostartpage">Scholar</div>
                <el-button class="view" type="text" @click="change">{{ $t("message.language") }}</el-button>
            </div>
            <div class="nav_bar_action_frame">
                <div v-if="logged_in === false">
                    <router-link tag="div" class="nav_bar_action_link" to="/register">
                        {{ $t("message.register") }}
                    </router-link>
                    <router-link tag="div" class="nav_bar_action_link" to="/login">
                        {{ $t("message.login") }}
                    </router-link>
                </div>
                <div v-else>
                    <div class="nav_bar_action_link" v-if="isnotsettled">
                        <router-link tag="div" class="nav_bar_action_link" :to="'/settle'">
                            {{ $t("message.settle") }}
                        </router-link>
                    </div>
                    <div class="nav_bar_action_link" v-else-if="issettled">
                        <router-link tag="div" class="nav_bar_action_link" :to="'/portal/' + author()">
                            {{ $t("message.portal") }}
                        </router-link>
                    </div>
                    <router-link tag="div" class="nav_bar_action_link" :to="'/userinfo'">
                        {{ $t("message.personal") }}
                    </router-link>
                    <div class="nav_bar_action_link" v-if="isadmin">
                        <router-link tag="div" class="nav_bar_action_link" :to="'/admin'">
                            {{ $t("message.admin") }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav_bar_underline"></div>
    </div>
</template>
  
<script>
export default {
    name: "TopBar",
    props: [],
    mounted() {
        if (localStorage.getItem('userid')) {
            this.logged_in = true;
            this.user_info.user_type = localStorage.getItem('user_type');
            this.user_info.user_id = localStorage.getItem('userid');
        }
    },
    data() {
        return {
            active_index: 0,
            logged_in: false,
            user_info: {
                user_type: null,
                user_id: null,
            },
        };
    },
    computed: {
        isadmin() {
            return this.user_info.user_type && this.user_info.user_type == 3
        },
        isnotsettled() {
            return this.user_info.user_type && this.user_info.user_type == 1
        },
        issettled() {
            return this.user_info.user_type && this.user_info.user_type == 2
        }
    },
    methods: {
        change() {
            this.$emit('change');
        },
        author() { return localStorage.getItem("authorId") },
        backtostartpage() {
            this.$router.push('/home').then(() => {
                window.location.reload();
            });
        },
        onIndexChange(i) {
            console.log("change");
            this.active_index = i;
            console.log(i);
            this.$forceUpdate();
            this.$router.push(pages[this.active_index].url);

        },
        logout() {
            localStorage.clear()
            this.user_info.user_type = null;
            this.logged_in = false;
            this.$router.push('/login')
            window.location.reload();
        }
    }
};
</script>
  
<style scoped>
#nav_bar {
    position: fixed;
    z-index: 1000;
    top: 0px;
    height: 46px;
    width: 100vw;
    vertical-align: middle;
}

.nav_bar_frame {
    vertical-align: middle;
    height: 45px;
    background-color: white;
    opacity: 0.8;
    backdrop-filter: blur(50px);
    width: 100%;
}

.nav_bar_underline {
    /* position: relative; */
    bottom: 0px;
    height: 0.5px;
    opacity: 1;
    background-color: grey;
    width: 100vw;
}

.nav_bar_icon {
    margin-left: 25px;
    float: left;
    line-height: 45px;
    font-family: "MavenPro";
    vertical-align: middle;
    height: 45px;
}

.nav_bar_icon_title_bold {
    display: inline;
    font-weight: bold;
}

.nav_bar_icon_title {
    display: inline;
}

.nav_bar_item_outer_frame {
    float: left;
    margin-left: 20px;
}

.nav_bar_item {
    display: inline;
    color: black;
    margin: 0px 10px 10px 0px;
    line-height: 45px;
}

.nav_bar_item_active {
    display: inline;
    line-height: 45px;
    border-bottom-style: outset;
    border-bottom-color: black;
    border-bottom-width: 2px;
    font-weight: bold;
    height: 45px;
    width: 100%;
}

.nav_bar_action_frame {
    float: right;
    margin-right: 50px;
}

.nav_bar_action_link {
    display: inline;
    line-height: 45px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.9);
    font-weight: bold;
    margin-left: 10px;
    font-size: 17px;
}

.view:hover {
    display: center;
    color: rgba(41, 146, 252, 0.9);
    font-weight: bold;
    margin-left: 10px;
    font-size: 17px;
}

.view {
    display: center;
    color: rgba(0, 0, 0, 0.9);
    font-weight: bold;
    margin-left: 10px;
    font-size: 17px;
}
</style>
  