<template>
    <div class="profile-box">
        <div class="avatar-box">
            <img class="avatar">
            <el-upload v-if="!this.$props.isVisitor" class="upload-demo" action="" drag :auto-upload="false"
                :show-file-list="false" :on-change='changeUpload'>
                <!-- <div class="upload-box"></div> -->
            </el-upload>
            <div v-if="this.$props.isVisitor" class="follow-box">
                <button class="follow-button" @click="follow">FOLLOW</button>
            </div>
        </div>

        <div class="personal-info">
            <p>个人简介</p>
            <span>个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介</span>
        </div>
        <div class="instruction">
            <el-icon size="large" style="top: 3px;color:#b0b0b0">
                <OfficeBuilding />
            </el-icon>
            <span>BUAA</span>
        </div>
        <div class="moveDiv">
            <p>关注</p>
            <span> 123</span>
        </div>
        <div class="moveDiv">
            <p>收藏</p>
            <span> 123</span>
        </div>
    </div>
    <div class="head-box">
        <div class="headbottom-container">
            <div class="name-box">
                <p>here is the nick name</p>

            </div>
            <div v-if="!this.$props.isVisitor" class="message-box">
                <Message></Message>
            </div>
        </div>

    </div>
    <el-dialog id="cropDialog" v-model="isVisible" width="70%">
        <div class="container">
            <img id="cropImg">
        </div>
        <div class="bottom">
            <div class="previewBox"></div>
            <div class="upload"><button @click="upload">上传</button></div>
        </div>
    </el-dialog>
</template>

<script>
import Message from './Message.vue'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
export default {
    props: {
        isVisitor: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            isVisible: false,
            cropperInstance: null,
        }
    },
    created() {
        console.log(123);
    },
    components: {
        Message,
    },
    methods: {
        changeUpload(file, fileList) {
            let reader = new FileReader();
            this.isVisible = true
            console.log(file.raw)
            reader.readAsDataURL(file.raw)
            reader.onload = (e) => {
                let dataURL = reader.result;

                // this.option.img = dataURL
                document.querySelector('#cropImg').src = dataURL;
                if (this.cropperInstance) {
                    this.cropperInstance.destroy();
                }
                // this.$refs.cropImg.src = dataURL;
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
            // this.option.img = require(file.url)
            this.isVisible = true

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
        }
    },
}
</script>

<style scoped>
.profile-box {
    float: left;
    margin: 8vh 7vw 0 10vh;
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
        margin: 10% 10% 60% 10%;
    }

    .instruction span {
        margin-left: 10%;
        color: #9b9b9b;
    }

    .moveDiv {
        margin-top: 20%;
        margin-bottom: 20%;
        display: flex;
        width: 100%;
        transition: all 0.3s ease;

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
    background-color: #f7b8b8;
    position: relative;
    z-index: 2;
    transition: height 0.5s;
    background-image: url('@/assets/avatar.jpg');
    background-size: cover;
    border-radius: 10px 10px 0 0;
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
        flex: 0 0 80%
    }

    .name-box p {
        font-size: 40px;
        font-family: sans-serif;
        font-style: italic;
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
}
</style>