<template>
    <el-upload class="upload-demo" action="" drag :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>

    </el-upload>
    <!-- <div v-if="isVisible">
        <div class="cropper-content">
            <div class="cropper" style="text-align:center">
                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                    :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                    :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber" :centerBox="option.centerBox" :infoTrue="option.infoTrue"
                    :fixedBox="option.fixedBox"></vueCropper>
            </div>
        </div>

    </div> -->
    <el-dialog id="cropDialog" v-model="isVisible" width="70%" custom-class="my">
        <div class="container">
            <img id="cropImg">
        </div>
        <div class="bottom">
            <div class="previewBox"></div>
            <div class="upload"><button @click="upload">上传</button></div>
        </div>
    </el-dialog>
</template>

<script >
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
    data() {
        return {
            isVisible: false,
            // option: {
            //     img: "", // 裁剪图片的地址
            //     info: true, // 裁剪框的大小信息
            //     outputSize: 0.8, // 裁剪生成图片的质量
            //     outputType: 'jpeg', // 裁剪生成图片的格式
            //     canScale: false, // 图片是否允许滚轮缩放
            //     autoCrop: true, // 是否默认生成截图框
            //     // autoCropWidth: 300, // 默认生成截图框宽度
            //     // autoCropHeight: 200, // 默认生成截图框高度
            //     fixedBox: true, // 固定截图框大小 不允许改变
            //     fixed: true, // 是否开启截图框宽高固定比例
            //     fixedNumber: [7, 5], // 截图框的宽高比例
            //     full: true, // 是否输出原图比例的截图
            //     canMoveBox: true, // 截图框能否拖动
            //     original: false, // 上传图片按照原始比例渲染
            //     centerBox: false, // 截图框是否被限制在图片里面
            //     infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            // },
            cropperInstance: null,
        }
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
            })
        }

    },
}

</script>

<style scoped>
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
    height: 40vh;
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