<template>
  <el-upload
    v-model:file-list="this.fileList"
    class="upload-demo"
    :auto-upload="false"
    :on-change="this.handleChange"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
  >
    <el-button type="primary">Click to select</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <el-button type="primary" @click="console.log(JSON.stringify(this.fileList))"
    >Click to upload</el-button
  >
</template>
<script>
export default {
  setup() {
    // const handleChange = (uploadFile, uploadFiles) => {
    //   console.log("uploadFile: " + uploadFile);
    //   console.log("uploadFile JSON: " + JSON.stringify(uploadFile));
    //   console.log("uploadFiles: " + uploadFiles);
    //   console.log("uploadFiles JSON: " + JSON.stringify(uploadFiles));
    // };
  },
  methods: {
    handleChange (uploadFile, uploadFiles){
      console.log("uploadFile: " + uploadFile);
      console.log("uploadFile JSON: " + JSON.stringify(uploadFile));
      console.log("uploadFiles: " + uploadFiles);
      console.log("uploadFiles JSON: " + JSON.stringify(uploadFiles));
    },
    changeFile (val) {
      let formData = new FormData();
      //file是键，val.raw是要传的文件，val.name是要传的文件名
      formData.append('file', val.raw, val.name);
    },
  },
  data() {
    return {
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
};
</script>

<!-- <template>
<el-form-item label="上传模板：" prop="fileId">
    <el-upload
       ref="exampleUploadRef"
      :file-list="fileList"
      :action="postUrl"
      :limit="1"
      list-type="text"
      accept=".doc,.docx"
      class="avatar-uploader"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"   
      :name="fileName"
      :data="otherParam"
      :headers="headers"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
      :multiple="false"
      :on-success="uploadSuccess"
      :on-error="errorMessage"
      :on-change="handleChange"
    >
      <div class="uploadIcon">
        <el-icon>
          <Plus />
        </el-icon>
      </div>
      <template #tip>
        <div class="el-upload__tip text-red">只能上传doc/docx文件</div>
      </template>
    </el-upload>
</el-form-item>
</template>
<script>
export default {
setup() {
const token = store.getters["login_store/token"];
const data = reactive({
  fileName: "multipartFiles",//用于指定上传文件的字段名，也就是在后端接收上传文件时需要使用的字段名。在前端发送上传请求时，请求头中会包含该字段名和对应的文件数据，后端就可以通过这个字段名获取到上传的文件数据
  headers: {
          Authorization: "Bearer " + token //获取token数据
           },
  otherParam: {
          bucketName: "fastabp",
          fileType: "personalData",
          unzip: false
    },
   fileList:[],
   postUrl :""
})
const beforeRemove = (file, uploadFiles) => {
     if(this.status=='view'){
   ElMessage({
            message: "不允许删除！",
            type: "error",
            offset: 60
          });
          return false
        }else{
          return true
        }
};
 //文件移除操作
const  handleRemove = (file, fileList) => {
  data.fileList=fileList//或者data.fileList = []; //清空fileList所有数组    
};
  //上传文件失败
const errorMessage = (response) => {
        return ElMessage({
          message: "文件上传失败，请联系管理员",
          type: "error",
          offset: 60
        });
};
//上传文件成功
const uploadSuccess = (response, file, fileList) => {
        data.fileList.push({//得到的文件数据转换成 name url方式
          name: file.fileOrigName,
          url: file.filePreviewUrl
        });
};
//文件超出个数限制时的钩子
const handleExceed = (files, fileList) => {};
//点击文件列表中已上传的文件时的钩子,进行下载
const handlePreview = (file) => {
        console.log("file", file);
        var link = document.createElement("a"); //定义一个a标签
        link.download = file.name; //下载后的文件名称
        link.href = file.url; //需要生成一个 URL 来实现下载
        link.click(); //模拟在按钮上实现一次鼠标点击
        window.URL.revokeObjectURL(link.href);
  };
const handleChange = (uploadFile, uploadFiles) => {};
//判断上传之前文件的格式
const beforeUpload = (file) => {
        const isLt20M = file.size / 1024 / 1024 < 20;
        if (!isLt20M) {
          ElMessage({
            message: "上传图片大小不能超过 20MB!",
            type: "error",
            offset: 60
          });
        }
        var fileType = file.name.substring(file.name.lastIndexOf(".") + 1);
        const isFile = fileType === "doc" || fileType === "docx";
  
        if (!isFile) {
          ElMessage({
            message: "请选择正确的文件格式",
            type: "error",
            offset: 60
          });
          return false;
        }
        return isLt20M && isFile;
  };

onMounted(async () => {
data.postUrl = "http://XXXXX/file/uploadFile";
});

}
}
</script>
<style lang="scss" scoped>
            //修改上传图标的样式
        .uploadIcon {
                border: 1px dashed var(--el-border-color);
                border-radius: 5px;
                padding: 2px 12px;
           }
</style>
 -->
