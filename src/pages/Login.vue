<script setup lang="ts">
import { ref } from 'vue'
import CanvasBackground from '@/components/CanvasBackground.vue'
const name = ref('Login')
</script>

<template>
 <div class="login-container">
      <div class="login-form">
        <div class="login-title">React + Typescript</div>
        
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
