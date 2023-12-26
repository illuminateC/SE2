<template>
  <div id="login">
        <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="login-box" >
          <div class="form-container sign-up-container">
            <form>
              <h1>注册</h1>
              <div class="txtb">
                <input type="text" v-model="signupUsername" @focus="onFocus" @blur="onBlur" maxlength="16">
                <span data-placeholder="输入您的用户名"></span>
              </div>
              <!-- <div class="txtb">
                <input type="text" v-model="realname" @focus="onFocus" @blur="onBlur" maxlength="8">
                <span data-placeholder="输入您的真实姓名"></span>
              </div> -->
              <div class="txtb">
                <input type="text" v-model="email" @focus="onFocus" @blur="onBlur" maxlength="25">
                <span data-placeholder="输入您的邮箱"></span>
                <!-- <el-button round
                  style="background: white; color: black; align-items: center; justify-content: center; margin-top: 0px;"
                  @click="postCode">发送验证码</el-button> -->
              </div>
              <!-- <div class="txtb">
                <input type="password" v-model="verificationCode" @focus="onFocus" @blur="onBlur" maxlength="16">
                <span data-placeholder="输入您收到的验证码"></span>
              </div> -->
              <div class="txtb">
                <input type="password" v-model="signupPassword" @focus="onFocus" @blur="onBlur" maxlength="16">
                <span data-placeholder="密码由6-16位数字和字母组成"></span>
              </div>
              <div class="txtb">
                <input type="password" v-model="signupConfirmPassword" @focus="onFocus" @blur="onBlur" maxlength="16">
                <span data-placeholder="请再次确认密码"></span>
              </div>
              <button @click.prevent="onSignUp">注册</button>
            </form>
          </div>
          <div class="form-container sign-in-container" v-if="forget === false">
            <form>
              <h1 as>登录</h1>
              <div class="txtb">
                <input type="email" v-model="signinUsername" @focus="onFocus" @blur="onBlur">
                <span data-placeholder="用户名"></span>
              </div>
              <div class="txtb">
                <input type="password" v-model="signinPassword" @focus="onFocus" @blur="onBlur">
                <span data-placeholder="密码"></span>
              </div>
              <!-- <div class="txtb">
                <input type="text" v-model="inputCode" @focus="onFocus" @blur="onBlur" @click="getCode">
                <span data-placeholder="请输入右侧图案的值"></span>
                <canvas class="codeCanvas" ref="checkCode"></canvas>
              </div> -->
              <div
                style="float: left; text-align: left; margin-top: -10px; margin-bottom: -20px; transform: translateX(-34%);">
                <a href="#" @click.prevent="toggleForget" style="float: left; font-size: 2px; color: #adadad;;">忘记密码？</a>
              </div>
              <button @click.prevent="onSignIn()" style="margin-top: 20px;">登录</button>
            </form>
          </div>
          <div class="form-container sign-in-container" v-if="forget === true">
            <form>
              <h1 as>找回密码</h1>
              <div class="txtb">
                <input type="email" v-model="forgetUsername" @focus="onFocus" @blur="onBlur">
                <span data-placeholder="用户名"></span>
              </div>
              <div class="txtb">
                <input type="text" v-model="forgetEmail" @focus="onFocus" @blur="onBlur" maxlength="25">
                <span data-placeholder="输入您的邮箱"></span>
                <el-button round
                  style="background: white; color: black; align-items: center; justify-content: center; margin-top: 0px;"
                  @click="postForgetCode">发送验证码</el-button>
              </div>
              <div class="txtb">
                <input type="password" v-model="verificationCodeForget" @focus="onFocus" @blur="onBlur" maxlength="16">
                <span data-placeholder="输入您收到的验证码"></span>
              </div>
              <div class="txtb">
                <input type="password" v-model="forgetPassword" @focus="onFocus" @blur="onBlur">
                <span data-placeholder="新密码"></span>
              </div>
              <div class="txtb">
                <input type="password" v-model="forgetConfirmPassword" @focus="onFocus" @blur="onBlur" maxlength="16">
                <span data-placeholder="请再次确认密码"></span>
              </div>
              <div
                style="float: left; text-align: left; margin-top: -10px; margin-bottom: -20px; transform: translateX(-34%);">
                <a href="#" @click.prevent="toggleForget" style="float: left; font-size: 2px; color: #adadad;;">返回</a>
              </div>
              <button @click.prevent="changePassword" style="margin-top: 20px;">修改密码</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>已有账号？</h1>
                <p>快来打开新世界的大门吧~</p>
                <button class="ghost" @click="isRightPanelActive = false">登录</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>没有账号?</h1>
                <p>加入我们，和大家愉快玩耍吧owo</p>
                <button class="ghost" @click="isRightPanelActive = true">注册</button>
              </div>
            </div>
          </div>
        </div>
      
  </div>
</template>
<script>
import axios from 'axios'
import { Login } from '@/api/login';
import qs from "qs"
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      forgetPassword: '',
      forgetConfirmPassword: '',
      verificationCodeForget: '',
      forgetUsername: '',
      forgetEmail: '',
      forget: false,
      verificationCode: '',
      realname: '',
      email: '',
      isRightPanelActive: false,
      signupUsername: '',
      signupPassword: '',
      signupConfirmPassword: '',
      signinPassword: '',
      signinUsername: '',
      inputCode: '',
      checkCode: '',
      expressValue: '',
      codeOK: false,
      forgetCodeOK: false,
      cvs: {
        w: 300, // 给出默认宽度  宽度会在图片绘制时根据长度更改
        h: 40, // 高 与input保持一致
        fontSize: 24, // 字体大小
        str: '+-*', // 符号生成范围
        line: 3 // 噪音线个数
      },
    }
  },
  components: {

  },
  methods: {
    changePassword() {
      this.forgetEmail_blur();
      if (this.forgetUsername === '') {
        this.$message.warning("请输入您的用户名");
        return;
      }
      if (this.forgetEmail === '') {
        this.$message.warning("请输入您的邮箱");
        return;
      } else if (this.forgetCodeOK === false) {
        this.$message.warning("请输入合法格式的邮箱");
        return;
      }
    //   if(this.verificationCodeForget === '') {
    //     this.$message.warning("请输入验证码");
    //     return;
    //   }
      if(this.forgetPassword === '') {
        this.$message.warning("请输入新密码");
        return;
      }
      if (this.forgetPassword !== this.forgetConfirmPassword) {
        this.$message.warning("两次输入的密码不一致！");
        return;
      }
      let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!passwordReg.test(this.forgetPassword)) {
        this.$message.warning("密码必须为6到16位数字和英文的组合！");
        return;
      }
      const formData = new FormData();
      formData.append('username', this.forgetUsername);
      formData.append('password', this.forgetPassword);
      formData.append('verification_code', this.verificationCodeForget);
      formData.append('email', this.forgetEmail);
      axios.post('http://43.143.140.26/api/user/forget', formData, {
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then(res => {
          switch (res.data.errno) {
            case 0:
              this.$message.success("修改密码成功！");
              this.forget = false;
              break;
            default:
              this.$message.error(res.data.msg);
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    toggleForget() {
      if (this.forget === true) {
        this.forget = false;
      } else {
        this.forget = true;
      }
    },
    email_blur() {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(this.email)) {
        this.codeOK = false;
      } else {
        this.codeOK = true;
      }
    },
    forgetEmail_blur() {
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(this.forgetEmail)) {
        this.forgetCodeOK = false;
      } else {
        this.forgetCodeOK = true;
      }
    },
    postForgetCode() {
      this.forgetEmail_blur();
      if (this.forgetUsername === '') {
        this.$message.warning("请输入您的用户名");
        return;
      }
      if (this.forgetEmail === '') {
        this.$message.warning("请输入您的邮箱");
        return;
      } else if (this.forgetCodeOK === false) {
        this.$message.warning("请输入合法格式的邮箱");
        return;
      } else {
        const formData = new FormData();
        formData.append('email', this.forgetEmail);
        formData.append('event', 1);
        formData.append('username', this.forgetUsername);
        axios.post('http://43.143.140.26/api/user/sendcode', formData, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
          .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("验证码已发送！");
                break;
              case 1003:
                this.$message.error(res.data.msg);
                break;
              default:
                this.$message.error("验证码发送失败");
                break;
            }
          })
      }
    },
    postCode() {
      this.email_blur();
      if (this.email === '') {
        this.$message.warning("请输入您的邮箱");
        return;
      } else if (this.codeOK === false) {
        this.$message.warning("请输入合法格式的邮箱");
        return;
      } else {
        const formData = new FormData();
        formData.append('email', this.email);
        formData.append('event', 0);
        axios.post('http://43.143.140.26/api/user/sendcode', formData, {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        })
          .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("验证码已发送！");
                break;
              default:
                this.$message.error("验证码发送失败");
                break;
            }
          })
      }
    },
    // rInt(max) {
    //   return Math.floor(Math.random() * 100000 % max);
    // },
    // // 生成随机表达式
    // rCode() {
    //   let a = this.rInt(100);
    //   let b = this.rInt(10);
    //   let op = this.cvs.str.charAt(this.rInt(this.cvs.str.length));
    //   // 表达式
    //   let code = `${a}${op}${b}=`;
    //   this.checkCode = code;
    //   // 表达式的值
    //   // eslint-disable-next-line no-eval
    //   this.expressValue = eval(code.substr(0, code.length - 1));
    //   return code;
    // },
    // // 生成随机颜色 rgba格式
    // rColor() {

    //   let a = ((Math.random() * 5 + 5) / 10).toFixed(2);
    //   return `rgba(${this.rInt(256)}, ${this.rInt(256)}, ${this.rInt(256)}, ${a})`;
    // },
    // // 验证码图片绘制
    // drawCode(domCvs) {
    //   console.log(domCvs);
    //   let _this = this;
    //   // 随机表达式
    //   let checkCode = this.rCode();
    //   // 宽设置
    //   this.cvs.w = 10 + this.cvs.fontSize * this.checkCode.length;

    //   // 判断是否支持canvas
    //   if (domCvs !== null && domCvs.getContext && domCvs.getContext('2d')) {
    //     // 设置显示区域大小
    //     domCvs.style.width = _this.cvs.w;
    //     console.log(_this.cvs.w);
    //     // 设置画板宽高
    //     domCvs.setAttribute('width', _this.cvs.w);
    //     domCvs.setAttribute('height', 60);
    //     // 画笔
    //     let pen = domCvs.getContext('2d');
    //     // 背景: 颜色  区域
    //     pen.fillStyle = '#eee';
    //     pen.fillRect(0, 10, _this.cvs.w, _this.cvs.h);
    //     // 水平线位置
    //     pen.textBaseline = 'middle'; // top middle bottom
    //     // 内容
    //     for (let i = 0; i < _this.checkCode.length; i++) {
    //       pen.fillStyle = _this.rColor(); // 随机颜色
    //       pen.font = `bold ${_this.cvs.fontSize}px 微软雅黑`; // 字体设置
    //       // 字符绘制: (字符, X坐标, Y坐标)
    //       pen.fillText(checkCode.charAt(i), 10 + _this.cvs.fontSize * i, 30 + _this.rInt(10));
    //     }
    //     // 噪音线
    //     for (let i = 0; i < _this.cvs.line; i++) {
    //       // 起点
    //       pen.moveTo(_this.rInt(_this.cvs.w) / 2, _this.rInt(_this.cvs.h) + 10);
    //       // 终点
    //       pen.lineTo(_this.rInt(_this.cvs.w), _this.rInt(_this.cvs.h) + 10);
    //       // 颜色
    //       pen.strokeStyle = _this.rColor();
    //       // 粗细
    //       pen.lineWidth = '2';
    //       // 绘制
    //       pen.stroke();
    //     }
    //   } else {
    //     this.$message.error('不支持验证码格式，请升级或更换浏览器重试');
    //   }
    // },
    // // 点击时刷新二维码
    // getCode() {
    //   let domCvs = this.$refs.checkCode;
    //   this.drawCode(domCvs);
    // },
    onSignIn: function () {
      // 检查表单是否有填写内容
      if (this.signinUsername === '' || this.signinPassword === '') {
        this.$message.warning("请输入用户名和密码！");
        return;
      }
    //   if (this.inputCode) {
    //     // eslint-disable-next-line no-eval
    //     if (eval(this.inputCode) === eval(this.expressValue)) {
    //       // 验证成功要做的事
    //       // this.$message.success('验证成功');
    //     } else {
    //       // 验证码有误
    //       this.$message.error('验证码输入错误！');
    //       return;
    //     }
    //   } else {
    //     // 输入为空
    //     this.$message.error('请输入右侧结果');
    //     return;
    //   }
      var data = {
        "username": this.signinUsername,
        "password":this.signinPassword,
      }
      Login.login(data)
      .then((res) => {
        if (res.data.msgno==0) {
            let valueData = JSON.stringify({
                id:res.data.user_id,
                isAdmin:res.data.isAdmin,
                is_authenticated:res.data.is_authenticated
            })  
            this.$Cookies.set('token', res.data.token);
            this.$Cookies.set('user_info', valueData,{expires:30});
            ElMessage.success("登录成功！");
            this.$router.push('/');
        }else{
          ElMessage.error("登录失败！请检查用户名和密码");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    },
    onSignUp: function () {
      if (this.signupUsername === '' || this.signupPassword === '' || this.signupConfirmPassword === '' || this.email === '' ) {
        this.$message.warning("请填写完整的注册信息！");
        return;
      }

      if (this.signupPassword !== this.signupConfirmPassword) {
        this.$message.warning("两次输入的密码不一致！");
        return;
      }

      let passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!passwordReg.test(this.signupPassword)) {
        this.$message.warning("密码必须为6到16位数字和英文的组合！");
        return;
      }
      var data = {
        "username": this.signupUsername,
        "password":this.signupPassword,
        "email": this.email,
      }
      Login.register(data)
      .then((res) => {
        if (res.data.msgno==0) {
            // console.log(res.data);
            ElMessage.success("注册成功！");
            this.isRightPanelActive=false;
        }else if(res.data.msgno==-1){
          ElMessage.error("用户名已存在！");
        }else{
          ElMessage.error("注册失败！");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    onFocus: function (event) {
      event.target.classList.add('focus');
    },
    onBlur: function (event) {
      if (event.target.value === '') {
        event.target.classList.remove('focus');
      }
    }
  },

}
</script>
    
<style scoped>
.my-header {
  position: fixed;
  margin-left: -10px;
  top: 0;
  /* height: 200vh; */
  /* left: 0; */
  width: 100%;
  /* height: 10vh; */
  background-color: transparent;
  /* background-color:bisque; */
  z-index: 999;
}

source {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}

video {
  object-fit: cover;
  position: fixed;
  right: 0px;
  bottom: 0px;
  min-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
  background-size: cover;
  /*加滤镜*/
  /* filter: blur(15px); //背景模糊设置 */
  /*-webkit-filter: grayscale(100%);*/
  /*filter:grayscale(100%); //背景灰度设置*/
  z-index: -11;
}

* {
  box-sizing: border-box;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.container {
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  left: 50%;
  margin: 0 auto;

}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  text-align: center;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;

}

.txtb {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 10px 0;
  display: flex;
}

.codeCanvas {
  align-items: right;
  width: 66%;
  height: 40px;
  /* margin-right: 5%; */
}

.txtb input {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  padding: 0 3px;
  height: 35px;
}

.txtb span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  transition: .5s;
}

.txtb span::after {
  content: '';
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  height: 2px;
  background-image: linear-gradient(120deg, #3498db, #8e44ad);
  transition: .5s;
}

.focus+span::before {
  top: -5px;
}

.focus+span::after {
  width: 100%;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background: #ff4b2b;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.form-container button {
  background: linear-gradient(120deg, #3498db, #8e44ad);
  border: none;
  background-size: 200%;
  color: #fff;
  transition: .5s;
}

.form-container button:hover {
  background-position: right;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-in-container form a {
  position: relative;
  left: 100px;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.sign-up-container button {
  margin-top: 20px;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}

.overlay {
  background-image: linear-gradient(120deg, #3498db, #8e44ad);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);

}

.overlay-left {
  transform: translateY(-20%);
}

.container.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

.container.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

.container.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.container.container.right-panel-active .overlay-left {
  transform: translateY(0);
}

.container.container.right-panel-active .overlay-right {
  transform: translateY(20%);
}

.bgbox {
  display: block;
  opacity: 0.9;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s, transform .25s, filter .25s;
  backface-visibility: hidden;
}

#login{
    background:url("../assets/avatar.jpg");
    height:100%;
    /* position:fixed; */
    /* background-size:100% 100%; */
}

</style>
    