import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Components({
    resolvers:[
      AntDesignVueResolver()
    ]
  })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  server:{
    port:9999,
    proxy:{
      "/api/":{
        // target:"http://local.shengxinjing.cn:7001/",
        target:"http://shengxinjing.cn:7001/",
        secure:false,
        changeOrigin:true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
