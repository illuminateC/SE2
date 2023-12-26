<template>
    <body>
        <div class="profile-box">
            <div class="avatar-box" ref="avatar" @mouseover="changeStyle($refs.avatar, 'pointer')">
                <img class="avatar" :src="user.avatar" @click="uploadAvatar">
                <input type="file" accept="image/*" ref="fileInput" @change="changeUpload">
                <div v-if="this.$data.isVisitor" class="follow-box">
                    <button class="follow-button" @click="follow">
                        <div style="font-size: 15px;" v-if="this.$data.isFollow == 'false'">FOLLOW</div>
                        <div style="font-size: 15px;" v-else>UNFOLLOW</div>
                    </button>
                </div>
            </div>
            <div class="personal-info">
                <p>个人简介</p>
                <span ref="info" @mouseover="changeStyle($refs.info, 'pointer')" @click="changeInfo">{{ user.introduction
                }}</span>
            </div>
            <div class="mailbox">
                <mailbox></mailbox>
                <span>{{ user.email }}</span>
            </div>
            <div class="instruction">
                <el-icon size="large" style="top: 3px;color:#b0b0b0">
                    <OfficeBuilding />
                </el-icon>
                <span>{{ user.institution }}</span>
            </div>
            <div class="moveDiv" @click="jumpFollow">
                <p>关注</p>
                <span> {{ follows }}</span>
            </div>
            <div class="moveDiv" @click="jumpStar">
                <p>收藏</p>
                <span> {{ collections }}</span>
            </div>
            <div class="moveDiv" v-show="user.is_admin && !isVisitor" @click="jumpReview">
                <p>前往审核信息</p>
            </div>
        </div>
        <div class="head-box">
            <video autoplay muted loop>
                <source src="../../assets/wallpaper.mp4" type="video/mp4">
            </video>
            <div class="headbottom-container">
                <div class="name-box" ref="name" @mouseover="changeStyle($refs.name, 'pointer')" @click="changeName">
                    <p>{{ user.nickname }}</p>

                </div>
                <div v-if="!this.$data.isVisitor" class="message-box" @click="jumpMessage">
                    <MessageBox :isIn="this.$props.isIn"></MessageBox>
                </div>
            </div>

        </div>
        <el-dialog id="cropDialog" v-model="isVisible" width="70%">
            <div class="container">
                <img id="cropImg">
            </div>
            <div class="bottom">
                <div class="previewBox"></div>
                <div class="upload"><button class="upload-button" @click="upload">上传</button></div>
            </div>
        </el-dialog>
        <router-view></router-view>
    </body>
</template>

<script>
import MessageBox from '@/components/UserProfile/MessageBox.vue'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import Swal from 'sweetalert2';
import userAPI from '@/api/user';
import followAPI from '@/api/follow'
import { mapState } from 'vuex';
import mailbox from '@/components/UserProfile/mailbox.vue'
export default {
    props: {
        // isVisitor: {
        //     type: Boolean,
        //     default: false
        // },
        isIn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isVisible: false,
            cropperInstance: null,
            isAdmin: true,
            user: {
                user_id: "",
                username: "",
                nickname: "",
                email: "",
                introduction: "",
                follows: "",
                collections: "",
                name: "",
                gateway_id: "",
                institution: "",
                avatar: "",
                unread_message_count: 0
            },
            loginId: "",
            currentId: "",
            isVisitor: "",
            hasIdParam: false,
            isFollow: false,
        }
    },
    computed: {
        ...mapState(['follows']),
        ...mapState(['collections']),
        ...mapState(['unreads'])
    },
    mounted() {
        const hasIdParam = this.$route.params.hasOwnProperty('id');
        if (hasIdParam) {
            this.$data.currentId = this.$route.params.id;
            const userInfoString = this.$Cookies.get('user_info');
            if (userInfoString) {
                this.getInfo(this.$data.currentId)
                const userInfo = JSON.parse(userInfoString);
                this.$data.loginId = userInfo.id
                if (this.$data.loginId != this.$data.currentId) this.$data.isVisitor = true;
            } else {
                alert("请先登录！")
                this.$router.push({ name: "HomePage" })
                this.$data.isVisitor = true;
            }

        }
    },
    created() {
    },
    components: {
        MessageBox,
        mailbox,
    },
    methods: {
        uploadAvatar() { if (!this.$props.isVisitor) this.$refs.fileInput.click() },
        changeUpload(e) {
            this.$data.isVisible = true
            const avatarFile = e.target.files[0]
            this.$refs.fileInput.value = null;
            let reader = new FileReader();
            reader.readAsDataURL(avatarFile)
            reader.onload = (e) => {
                let dataURL = reader.result;
                document.querySelector('#cropImg').src = dataURL;

                if (this.$data.cropperInstance) {
                    this.$data.cropperInstance.destroy();
                }
                const image = document.getElementById('cropImg');
                this.$data.cropperInstance = new Cropper(image, {
                    aspectRatio: 16 / 16,
                    viewMode: 0,
                    minContainerWidth: 20,
                    minContainerHeight: 20,
                    dragMode: 'move',
                    preview: [document.querySelector('.previewBox')]
                })
            }
        },
        upload() {
            this.$data.cropperInstance.getCroppedCanvas({
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            }).toBlob(async (blob) => {
                console.log(blob)
                const data = new FormData()
                data.append("avatar", blob);
                try {
                    const response = await userAPI.uploadAvatar(data)
                    this.$data.user.avatar = response.data.url

                } catch (error) {
                    alert("上传头像过大，上传失败！")
                }
                this.isVisible = false;
            })
        },
        jumpMessage() {
            this.$router.push({ name: 'message' })
        },
        jumpFollow() {
            this.$router.push({ name: 'follow' })
        },
        jumpStar() {
            this.$router.push({ name: 'star' })
        },
        jumpReview() {
            this.$router.push({ name: 'review' })
        },
        changeStyle(element, cursorType) {

            if (!this.isVisitor) {
                // 直接操作DOM来修改样式
                element.style.cursor = cursorType;
            }
        },
        changeName() {
            if (this.isVisitor) return;
            Swal.fire({
                title: "请输入一个新昵称",
                input: "text",
                inputAttributes: {
                    maxlength: "15",
                    autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "确认",
                preConfirm: async (nickname) => {
                    try {
                        const data = {
                            "field_to_change": "nickname",
                            "new_value": nickname
                        }
                        const response = await userAPI.changeInfo(data)
                        if (response.data.msgno == -1) {
                            throw new Error("昵称不能为空")
                        }

                        this.$data.user.nickname = nickname
                        return response.data.nickname;
                    } catch (error) {
                        Swal.showValidationMessage(`${error}`);
                    }

                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "昵称修改成功",
                        icon: 'success'
                    })
                }
            })
        },
        changeInfo() {
            if (this.isVisitor) return;
            Swal.fire({
                inputPlaceholder: "Type your message here...",
                input: "textarea",
                inputLabel: "简介",
                inputAttributes: {
                    maxlength: "100",
                    autocapitalize: "off",
                    "aria-label": "Type your message here"
                },
                showCancelButton: true,
                confirmButtonText: "确认",
                preConfirm: async (info) => {
                    try {
                        const data = {
                            "field_to_change": "introduction",
                            "new_value": info
                        }
                        const response = await userAPI.changeInfo(data)
                        if (response.data.msgno == -1) {
                            throw new Error("简介不能为空")
                        }
                        this.$data.user.introduction = info
                        return response.data.info;
                    } catch (error) {
                        Swal.showValidationMessage(`${error}`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "简介修改成功",
                        icon: 'success'
                    })
                }
            })
        },
        async getAvatar() {
            try {
                const data = { "user_id": this.$data.currentId }
                const response = await userAPI.getAvatar(data)
                this.$data.user.avatar = response.data.avatar_url;
                // console.log(response.data.msgno)
                this.$store.dispatch('updateAvatar', this.$data.user.avatar);
            } catch (error) {
                console.error(response.data.msg)
            }
        },
        async getInfo(id) {
            var data = { "user_id": id }
            var response = await userAPI.getInfo(data)
            if (response.data.msgno == -1) {
                this.$router.push({ "name": "HomePage" })
                alert(response.data.msg)
                return
            }
            this.$data.user = response.data.result
            this.$store.commit('setFollows', this.$data.user.follows)
            this.$store.commit('setCollections', this.$data.user.collections)
            this.$store.commit('setUnreads', this.$data.user.unread_message_count)
            data = { "user_id": this.$data.loginId, "author_id": id }
            response = await followAPI.isFollow(data)
            this.$data.isFollow = response.data.is_follow
            console.log(this.$data.isFollow)
        },
        updateFollowCount(newCount) {
            this.user.follows = newCount;
        },
        async follow() {
            if (this.$data.isFollow == 'false') {
                this.$data.isFollow = 'true'
                const data = { author_id: this.$data.currentId }
                const response = await followAPI.follow(data)

            }
            else {
                this.$data.isFollow = 'false'
                const data = { author_id: this.$data.currentId }
                const response = await followAPI.unFollow(data)
            }
        }

    },

}
</script>

<style scoped>
body {
    width: 95vw;
    height: 90vh;
    margin: 0 2.5vw;
    font:
        0.9em/1.2 Arial,
        Helvetica,
        sans-serif;
    position: relative;
    background-color: rgb(248, 248, 248);
    border-radius: 20px;
}

.profile-box {
    float: left;
    margin: 8vh 0 0 10vh;
    width: 20vh;
    height: 70vh;
    border-radius: 10px;
    background-color: white;
    transition: all 0.5s ease;
    box-shadow: 4px 3px 5px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 2;

    .personal-info {
        margin: 15% 10% 0 10%;
        height: auto;
    }

    .personal-info p {
        font-size: 20px;
        font-weight: bold;
    }

    .personal-info span {
        display: block;
        margin-top: 10%;
        font-size: 13px;
        color: #9b9b9b;
        height: auto;
        word-wrap: break-word;
    }

    .mailbox {
        margin: 0 10% 0vh 7%;
        font-size: 10px;
        display: flex;
        align-items: center;
    }

    .mailbox span {}

    .instruction {
        margin: 0 10% 0vh 10%;
    }

    .instruction span {
        margin-left: 10%;
        color: #9b9b9b;
    }

    .moveDiv {
        margin-top: 2vh;
        margin-bottom: 2vh;
        display: flex;
        width: 100%;
        transition: all 0.3s ease;
        height: 30px;

    }

    .moveDiv p {
        display: block;
        margin-left: 10%;
        font-weight: 600;
        font-size: 18px;
        color: #7f7f7f;

    }

    .moveDiv span {
        display: block;
        margin-left: 35%;
        margin-top: 3%;
        font-weight: 600;
    }

    .moveDiv:hover {
        border-radius: 5px;
        box-shadow: 2px 2px 1px #a5a5a5;
        transform: translate(-2px, -2px);
    }
}

.avatar-box {
    height: 20vh;

    position: relative;
    z-index: 2;
    transition: height 0.5s;
    /*background-image: url('@/assets/avatar.jpg');
    background-size: cover;*/
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}

.avatar-box img {
    height: 100%;
    width: 100%;
    contain: none;
}



.avatar-box input {
    opacity: 0;
}

.upload-box {
    height: 20vh;
    transform: translateY(-6vh);
}

.follow-box {
    position: absolute;
    bottom: 0;
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .follow-button {
        display: flex;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        background-color: aliceblue;
        opacity: 70%;
        color: black;
        cursor: pointer;

        border-radius: 12px;

        transition: opacity 1.0s ease, box-shadow 0.5s ease, transform 0.7s ease,
            padding 0.5s ease, font-size 0.5s ease;
    }

    .follow-button:hover {
        opacity: 100%;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
        transform: translate(-2px, -2px);
    }
}



.head-box {

    background-size: contain;
    padding: 10px;
    color: #0e0e0e;
    height: 20vh;
    position: relative;
    z-index: 1;
}

.headbottom-container {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 30vh;
    width: 50%;
    transition: left 0.5s;

    .name-box {
        margin-right: 40%;
    }

    .name-box p {
        font-size: 50px;
        font-family: sans-serif;
        font-style: italic;
        color: white;
    }

    .message-box {
        display: flex;
        margin-left: auto;
    }
}



@media (max-width: 800px) {
    .profile-box {
        margin-left: 5vh;
        width: 17vh;
        height: 60vh;
    }

    .avatar-box {
        height: 17vh
    }

    .upload-box {
        height: 17vh
    }

    .headbottom-container {
        left: 22vh
    }

    .follow-box {
        .follow-button {
            padding: 0.5vh 10%;
        }
    }
}

@media (min-width: 800px) and (max-width:1200px) {
    .profile-box {
        margin-left: 10vh;
        height: 65vh;
    }

    .headbottom-container {
        left: 32vh
    }

    .follow-box {
        .follow-button {
            padding: 0.6vh 10%;
            font-size: 20px;
        }
    }

}

@media (min-width: 1200px) {
    .profile-box {
        margin-left: 15vh;
        width: 23vh;
        height: 70vh;
    }

    .avatar-box {
        height: 23vh
    }

    .upload-box {
        height: 23vh
    }

    .headbottom-container {
        left: 45vh
    }

    .follow-box {
        .follow-button {
            padding: 0.5vh 6%;
            font-size: 25px;
        }
    }
}

.upload-demo {
    opacity: 0;

}

.previewBox {
    box-shadow: 0 0 5px #adadad;
    width: 200px;
    height: 200px;
    margin-top: 30px;
    overflow: hidden;
    /*这个超出设置为隐藏很重要，否则就会整个显示出来了*/
}

.container {
    width: 100%;
}

#cropImg {
    height: 35vh;
    width: 50vw;
    box-shadow: 0 0 5px #adadad;
}

.bottom {
    display: flex;
    width: 100%;
}

.upload {
    align-self: center;
    /* 垂直居中 */
    position: relative;
    margin-left: 40%;
    border-radius: 2px;
}

.upload-button {
    height: 40px;
    width: 80px;
    background-color: aliceblue;
    cursor: pointer;
    border-radius: 5px;
    border-color: white;
}

video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;
    filter: contrast(110%) saturate(110%) brightness(150%);

}
</style>