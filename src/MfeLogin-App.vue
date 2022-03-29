<template>
  <div class="login">
    Login - Micro Frontend
   <el-input v-model="username" placeholder="Username" />
   <el-input v-model="password" placeholder="Password" />
   <el-button @click="doLogin">Login</el-button>
   <el-button @click="doLogout">Logout</el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { login, logout, auth$ } from "ModuleAuth/ModuleAuth";
import { ElInput, ElButton } from "element-plus"
export default {
  name: "App",
  components: {
    ElInput,
    ElButton
  },
  setup() {
    // console.log("hola desde login")
    // console.log(auth$)
    // console.log(login)

    const username = ref('')
    const password = ref('')

    const doLogin = () => {
      login(username.value, password.value)
      username.value = null
      password.value = null
    }

    const doLogout = () => {
      logout()
    }

     auth$.subscribe((payload) => {
      if (payload.error) {
        alert(payload.error)
      }
    });

    return {
      username,
      password,
      doLogin,
      doLogout
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.login {
  padding: 10px;
  background-color: lightgray;
  position: absolute;
  right: 45px;
  top: 20px;
  width: 200px;
  background-color: #20b2aa;
  border: solid 2px blueviolet; 
}
</style>
