<script setup>
import { userRegisterService,userLoginService} from '@/api/user.ts'
import { User, Lock } from '@element-plus/icons-vue'
import {useUserStore} from '@/stores'
import { ref,watch} from 'vue'
import {useRouter} from 'vue-router'

const isRegister = ref(true)
const form = ref()
//注册 （定义的对象要与数据库信息保持一致）
//整个用于提交的form对象
const  forModel =ref({
    username: '',
    password: '',
    repassword: ''

})
//整个表单的校验规则
//1.非空校验 required:true message消息提示，trigger触发校验时机blur/change
//2.长度校验 min:XX,max:XX
//3.正则校验 pattern:正则规则  \s 非空字符
//4.自定义校验  => 自己写逻辑校验（校验函数）
// validator: (rule,value,callback)
//  (1)rule 当前校验规则相关信息
//  (2)value 所校验的表单元素目前的表单值
//  (3)callback  无论成功还是失败，都需要callback回调
//          - callback() 校验成功
//          - callback(new Error(错误信息))校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger:'blur'},
    { min: 5, max: 10, message:'用户名必须是5-10位的字符', trigger:'blur'}
  ],
  password:[
    { required: true, message: '请输入密码', trigger:'blur'},
    { pattern:  /^\S{6,15}$/,
      message:'密码必须是6-15位的非空字符', 
      trigger:'blur'}
  ],
  repassword:[
    { required: true, message: '请输入密码', trigger:'blur'},
    { pattern:  /^\S{6,15}$/,
      message:'密码必须是6-15位的非空字符', 
      trigger:'blur'},
    {
      validator: (rule,value,callback) =>{
        //判断value 和当前form 中收集的password 是否一致
        if(value !== forModel.value.password){
            callback(new Error('两次输入密码不一致'))
        }else{
          callback() //校验成功，也需要校验
        }
      },
      trigger:'blur'
    }
  ]
}

const register = async () => {
    // 遍历表单验证规则，执行表单验证逻辑
    await form.value.validate()
    
    // 表单验证通过，执行注册逻辑
    await userRegisterService(forModel.value)
    ElMessage.success('注册成功')
    isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(forModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}

//切换的时候，重置表单内容
watch(isRegister,() =>{
    forModel.value ={
       username: '',
       password: '',
       repassword: ''
    }

}
)
</script>

  <!-- 
    1、结构相关
      el-row表示一行，一行分为24份
      el-col表示列
      （1）：span="12" 代表在一行中，占12份（50%）
      （2）：span="6" 代表在一行中，占6份（25%）
      （3）：offset="3" 代表在一行中，左侧margin份数

      el-form 整个表单组件
      el-form-item 表单的一行 （一个表单域）
      el-input 表单元素（输入框） 
    2、校验相关
       （1）el-form：model = "ruleform" 绑定的整个form的数据对象
        (2) el-form: rules= "rules" 绑定的整个rules规则对象
       （3）表单元素 => v-model = "ruleform.xxx"给表单元素，绑定form的子属性
       （4）el-form-item => prop配置生效的是哪个校验规则（和rules中的字段要对应）
  -->

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单-->
      <el-form 
        :model = "forModel"
        :rules = "rules"
        ref="form" 
        size="large" 
        autocomplete="off" 
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input 
               v-model ="forModel.username" 
               :prefix-icon="User" 
               placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model = "forModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item porp="repassword">
          <el-input 
            v-model="forModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
             @click="register" 
             class="button" 
             type="primary" 
             auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>


      <!-- 登录相关表单-->
      <el-form 
            :model = "forModel"
            :rules = "rules"
            ref="form" 
            size="large" 
            autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input 
                v-model = "forModel.username"
                :prefix-icon="User" 
                placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="passworrd">
          <el-input
            v-model = "forModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button 
               @click="login"
               class="button" 
               type="primary" 
               auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: 
      url('@/assets/trialphoto_lay.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>