<template>
    <div class="bg-white">
      <nav class="flex items-center justify-between flex-wrap bg-white p-6 container mx-auto">
        <div class="w-full flex justify-between">
          <div class="block lg:inline-block text-4a98f7-900 hover:text-4a98f7-600 font-semibold text-xl pr-5">
            Hallo... <span id="user-email" class="font-bold" ></span>
        </div>
          <div class="pr-6">
            <button class="text-sm px-4 py-2 border rounded text-white font-medium bg-gray-900 hover:border-transparent hover:text-gray-800 hover:font-semibold hover:bg-4a98f7 transition ease-in-out duration-[250ms]" @click="logOut">Logout</button>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { auth } from "../firebase.js"
  import axios from 'axios'

  export default {
    methods:
    {
      async logOut() {
        const res = await axios.post("http://localhost:8000/api/logout")
        .then((response)=>{
          console.log(response.data)
          localStorage.removeItem('userToken')
          localStorage.removeItem('userEmail')
          if(localStorage.getItem('userToken'))
          {
            console.log(localStorage.getItem('userToken'))
          }
          else
          {
            console.log("Cookie kosong")
          }
          this.$router.push("/login")
        })
      }
    }
  }

</script>