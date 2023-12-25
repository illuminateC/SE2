<template>
    <div id="nav_bar">
        <div class="nav_bar_frame">
            <div class="nav_bar_icon">
                <div class="nav_bar_icon_title_bold" @click="backtostartpage">Spider</div>
                <div class="nav_bar_icon_title" @click="backtostartpage">Scholar</div>
                <el-button class="view" type="text" @click="change">{{ $t("message.language") }}</el-button>
            </div>
            <div class="nav_bar_action_frame">
                <div v-if="logged_in === false">
                    <router-link tag="div" class="nav_bar_action_link" to="/login">
                        {{ $t("message.login") }}
                    </router-link>
                </div>
                <div v-else>
                    <router-link tag="div" class="nav_bar_action_link" :to="{path:'/user/' + this.user_info.id}">
                        {{ $t("message.personal") }}
                    </router-link>
                    <div class="nav_bar_action_link" v-if="isadmin">
                        <router-link tag="div" class="nav_bar_action_link" :to="'/admin'">
                            {{ $t("message.admin") }}
                        </router-link>
                    </div>
                    <div class="nav_bar_action_link">
                        <el-button class="view" type="text" @click="logout">{{ $t("message.logout") }}</el-button>
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
        if (this.$Cookies.get('user_info') != null) {
            this.logged_in = true;
            this.user_info = JSON.parse(this.$Cookies.get('user_info'));
        }
    },
    created() {
        if (this.$Cookies.get('user_info') != null) {
            this.logged_in = true;
            this.user_info = JSON.parse(this.$Cookies.get('user_info'));
        }
        console.log(this.$Cookies.get('user_info'))
    },
    data() {
        return {
            active_index: 0,
            logged_in: false,
            user_info: {
                isAdmin: null,
                id: null,
                is_authenticated: null
            },
        };
    },
    computed: {
        isadmin() {
            return this.user_info.isAdmin == true
        },
        isnotsettled() {
            return this.user_info.is_authenticated != 1
        },
        issettled() {
            return this.user_info.is_authenticated == 1
        }
    },
    methods: {
        change() {
            this.$emit('change');
        },
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
            this.$Cookies.remove('user_info');
            this.$Cookies.remove('commandId');
            this.$Cookies.remove('commandIdNum');
            this.logged_in = false;
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
  