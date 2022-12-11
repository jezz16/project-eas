<script setup>
import Navbar from "../components/NavbarLoggedIn.vue";
</script>

<template>
  <Navbar />
  <div
    class="flex-1 flex items-center justify-center pb-20 h-screen w-full bg-[url('/assets/bg1.jpg')] text-white bg-cover bg-fixed"
  >
    <div class="">
      <h1 class="text-6xl text-center text-600 font-semibold mb-12 text-white">
        Shorten a Link
      </h1>
      <label for="real-link" class="font-medium text-2xl"
        >Destination Link</label
      ><br />
      <div
        class="flex items-center rounded-lg bg-gray-900 py-2 px-2 w-[35rem] mt-3 mb-5"
      >
        <input
          class="appearance-none bg-transparent border-none w-full text-white mx-2 leading-tight focus:outline-none placeholder-white-400/95"
          type="text"
          id="real-link"
          placeholder="http://www.long_url.com"
          v-model="realLink"
        />
      </div>

      <label for="custom-path" class="font-medium text-2xl"
        >Customize Link</label
      ><br />
      <div
        class="flex items-center rounded-lg bg-gray-900 py-2 px-4 w-[35rem] mt-3 mb-5"
      >
        <p class="font-medium">localhost:5173/</p>
        <input
          class="appearance-none bg-transparent border-none w-full text-white ml-2 leading-tight focus:outline-none placeholder-white-400/95"
          type="text"
          id="custom-path"
          placeholder="your custom link"
          v-model="customPath"
        />
      </div>

      <div>
        <button
          type="submit"
          class="flex-shrink-0 bg-red-900 hover:bg-red-700 border-white-500 hover:border-white-700 text-xs border-2 text-white py-2 px-4 rounded text-[18px] font-semibold"
          @click="addLink"
        >
          Short it !
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      domain: "http://localhost:5173/",
      realLink: "",
      customPath: "",
    };
  },
  beforeMount() {
    this.checkUid();
  },
  methods: {
    async addLink() {
      let result = this.realLink.includes("https://");
      if (result == false) {
        this.$router.push("/create");
        document.getElementById("validation").innerHTML =
          "Please enter a valid URL";
      } else {
      }

      const res = await axios
        .post("http://localhost:8000/api/addLink", {
          domain: this.domain,
          realLink: this.realLink,
          customPath: this.customPath,
          uid: localStorage.getItem("userToken"),
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log("error nambah link");
          console.log(err);
        });
    },
    checkUid() {
      if (
        localStorage.getItem("userToken") == null ||
        localStorage.getItem("userToken") == ""
      ) {
        this.$router.push("/login");
      } else {
        return;
      }
    },
  },
};
</script>
