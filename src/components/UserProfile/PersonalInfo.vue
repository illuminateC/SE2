<template>
    <div class="profile-box">
        <div class="avatar-box" ref="avatar" @mouseover="changeStyle($refs.avatar, 'pointer')">
            <img class="avatar" :src="user.avatarUrl" @click="uploadAvatar">
            <input type="file" accept="image/*" ref="fileInput" @change="changeUpload">
            <div v-if="this.$props.isVisitor" class="follow-box">
                <button class="follow-button" @click="follow">FOLLOW</button>
            </div>
        </div>

        <div class="personal-info">
            <p>个人简介</p>
            <span ref="info" @mouseover="changeStyle($refs.info, 'pointer')" @click="changeInfo">{{ user.personalInfo
            }}</span>
        </div>
        <div class="instruction">
            <el-icon size="large" style="top: 3px;color:#b0b0b0">
                <OfficeBuilding />
            </el-icon>
            <span>{{ user.instruction }}</span>
        </div>
        <div class="moveDiv" @click="jumpFollow">
            <p>关注</p>
            <span> {{ user.followNum }}</span>
        </div>
        <div class="moveDiv" @click="jumpStar">
            <p>收藏</p>
            <span> {{ user.starNum }}</span>
        </div>
    </div>
    <div class="head-box">
        <div class="headbottom-container">
            <div class="name-box" ref="name" @mouseover="changeStyle($refs.name, 'pointer')" @click="changeName">
                <p>{{ user.nickName }}</p>

            </div>
            <div v-if="!this.$props.isVisitor" class="message-box" @click="jumpMessage">
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
</template>

<script>
import MessageBox from './MessageBox.vue'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import Swal from 'sweetalert2';
import userAPI from '@/api/user';
export default {
    props: {
        isVisitor: {
            type: Boolean,
            default: false
        },
        isIn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isVisible: false,
            cropperInstance: null,
            user: {
                avatarUrl: "",
                personalInfo: "个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介",
                followNum: "123",
                starNum: "123",
                nickName: "nick name",
                instruction: "BUAA",
                id: "",
            },
            hasIdParam: false
        }
    },
    mounted() {
        // this.$data.user.avatarUrl = require('@/assets/avatar.jpg');
        this.$data.hasIdParam = this.$route.params.hasOwnProperty('id');
        if (this.$store.getters.getAvatar != null) {
            this.user.avatarUrl = this.$store.getters.getAvatar
        }
        else {
            this.getAvatar()
        }


    },
    created() {

    },
    components: {
        MessageBox,
    },
    methods: {
        uploadAvatar() { if (!this.$props.isVisitor) this.$refs.fileInput.click() },
        changeUpload(e) {
            this.$data.isVisible = true
            const avatarFile = e.target.files[0]
            let reader = new FileReader();
            reader.readAsDataURL(avatarFile)
            reader.onload = (e) => {
                let dataURL = reader.result;
                document.querySelector('#cropImg').src = dataURL;
                if (this.cropperInstance) {
                    this.cropperInstance.destroy();
                }
                const image = document.getElementById('cropImg');
                this.cropperInstance = new Cropper(image, {
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
            this.cropperInstance.getCroppedCanvas({
                maxWidth: 4096,
                maxHeight: 4096,
                fillColor: '#fff',
                imageSmoothingEnabled: true,
                imageSmoothingQuality: 'high',
            }).toBlob((blob) => {
                console.log(blob)
                this.isVisible = false;
            })
        },
        jumpMessage() {
            this.$router.push({ name: 'message' })
        },
        jumpFollow() {
            if (this.$data.hasIdParam) {
                const id = this.$route.params.id;
                this.$router.push({ name: "otherFollow", params: "id" })
            }
            else
                this.$router.push({ name: 'follow' })
        },
        jumpStar() {
            if (this.$data.hasIdParam) {
                const id = this.$route.params.id;
                this.$router.push({ name: "otherStar", params: "id" })
            }
            else
                this.$router.push({ name: 'star' })
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
                preConfirm: async (nickName) => {
                    try {
                        const data = new FormData()
                        data.append("id", this.$data.user.id)
                        data.append("nickName", nickName)
                        const response = await this.axios.post('', data)
                        if (!response.data.success) {
                            return Swal.showValidationMessage(response.data.message)
                        }
                        this.$data.user.nickName = nickName
                        return response.data.nickName;
                    } catch (error) {
                        Swal.showValidationMessage(`Request failed: ${error}`);
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
                        const data = new FormData()
                        data.append("id", this.$data.user.id)
                        data.append("introduction", info)
                        const response = await this.axios.post('', data)
                        if (!response.data.success) {
                            return Swal.showValidationMessage(response.data.message)
                        }
                        this.$data.user.personalInfo = info
                        return response.data.info;
                    } catch (error) {
                        Swal.showValidationMessage(`Request failed: ${error}`);
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
                const data = { "user_id": 1 }
                const response = await userAPI.getAvatar(data)
                this.$data.user.avatarUrl = response.data.avatar_url;
                // console.log(response.data.msgno)
                this.$store.dispatch('updateAvatar', this.$data.user.avatarUrl);
            } catch (error) {
                console.error(response.data.msg)
            }
        }

    },

}
</script>

<style scoped>
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
        margin: 15% 10% 15% 10%;
        height: 20vh;
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
    }

    .instruction {
        margin: 10% 10% 2vh 10%;
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

    .follow-button {
        padding: 0.5vh 10%;
        font-size: 16px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        background-color: aliceblue;
        opacity: 70%;
        color: black;
        cursor: pointer;
        margin-left: 3vw;
        border-radius: 8px;

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
    background-color: rgb(79, 185, 227);
    background-image: url('../../assets/background.jpg');
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

    .message-box {}
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
</style>