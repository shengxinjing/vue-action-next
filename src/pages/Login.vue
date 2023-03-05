<script setup lang="ts">
import CanvasBackground from '@/components/CanvasBackground.vue'

import { reactive, computed } from 'vue';
import SparkMD5 from 'spark-md5'

import { UserOutlined, LockOutlined,EditOutlined } from '@ant-design/icons-vue';
import {loginApi} from '@/api/user'
interface FormState {
  email: string;
  passwd: string;
  captcha: string;
}
    const formState = reactive<FormState>({
      email: '316783812@qq.com',
      passwd: '316783812',
      captcha:""
    });
    const onFinish = async (values: any) => {
      const obj:FormState = {
        email: values.email,
        passwd: SparkMD5.hash(values.passwd),
        captcha: values.captcha
      }
      const ret = await loginApi(obj)
      console.log(ret)
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    }
    const disabled = computed(() => {
      return !(formState.email && formState.passwd);
    });

    function handleHi(){
      fetch('/api/user/hi', {
      headers: {
        apikey:'dasheng123'
      },
    }).then(res => res.json()).then((res) => {
      // eslint-disable-next-line no-console
      console.log(res)
    })
    }

</script>

<template>
 <div class="login-container">
      <div class="login-form">
        <div class="login-title">Vue + Typescript</div>
        <a-form
    :model="formState"
    name="normal_login"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    :labelCol="{ span: 4 }"
  >
    <a-form-item
      label="邮箱"
      name="email"
      :rules="[
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'The input is not valid E-mail!' }
      ]"
    >
      <a-input v-model:value="formState.email">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="密码"
      name="passwd"
      :rules="[
        { required: true, message: 'Please input your passwd!' },
        { min: 6,max:20, message: '6-20' }
      ]"
    >
      <a-input-password v-model:value="formState.passwd">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
  <a-form-item label="验证码" name="captcha" :rules="[
        { required: true, message: 'Please input your captcha!' },
    ]">
    <a-space>
      <a-input v-model:value="formState.captcha">
      <template #prefix>
        <EditOutlined />
      </template>
    </a-input>
    <img src="/api/captcha" alt="">


    </a-space>



    </a-form-item>


    <a-form-item>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      <a-button @click="handleHi" type="primary">
        Hi12
      </a-button>
    </a-form-item>
  </a-form>
      </div>
      <CanvasBackground />
    </div>
</template>

<style >

.login-container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 550px;
    height: 100%;
    background-color: #eee;
    background-image: url(/bg.svg);
    background-position: 50%;
    background-size: 100% 100%;
    background-size: cover;
}
.login-container .login-form{
  width:500px;
  padding:20px 25px;
  background-color: rgba(255,255,255,0.8);
  border-radius: 20px;
  z-index:10;
  /* height: 500px; */
}
.login-container .login-form .login-title{
  padding: 25px;
  text-align:center;
  font-size: 48px;
  font-weight: bold;
  white-space: nowrap;

}
            
            
.ant-btn{
  margin-right:8px;
}</style>
