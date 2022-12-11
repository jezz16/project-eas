<script setup>
import Navbar from "../components/NavbarLoggedIn.vue";
</script>
<template>
  <Navbar />
  <div
    class="h-screen w-full bg-[url('/assets/bg1.jpg')] bg-cover bg-no-repeat bg-fixed"
  >
    <div class="flex-1 flex items-center justify-center">
      <div class="mt-10">
        <button
          @click="this.$router.push('/create')"
          class="text-white bg-white/30 hover:bg-white/20 text-lg px-3 py-1.5 rounded-lg font-semibold hover:text-gray-100 transition ease-in-out duration-[250ms]"
        >
          Create your links
        </button>
        <h1
          class="text-3xl text-center text-600 font-semibold mb-11 text-white pt-5"
        >
          Your Shortened Link List
        </h1>
        <div
          v-for="link in links"
          :key="link"
          class="rounded-lg bg-white/30 hover:bg-white/20 transition ease-in-out duration-[150ms] backdrop-blur-lg py-2 px-2 w-[50rem] my-3"
        >
          <div class="flex items-center">
            <div
              class="container flex flex-wrap justify-between items-center mx-auto"
            >
              <a
                class="text-base font-semibold text-white my-1 mx-3 rounded hover:text-gray-400 transition ease-in-out duration-[250ms]"
                target="_blank"
                v-bind:href="link.customPath"
                >{{ link.customPath.replace("http://", "") }}</a
              >
              <p
                class="text-base font-semibold text-white/50 my-1 mx-2 rounded text-s"
              >
                {{ link.realLink }}
              </p>
            </div>
            <p
              class="flex bg-white-900 text-base font-semibold border-2 text-white py-1 px-3 rounded"
            >
              {{ link.click }}
            </p>
            <p class="text-white/0">--</p>
            <button
              v-if="!link.showForm"
              @click="link.showForm = !link.showForm"
              class="bg-white px-2 py-1 rounded-md text-gray-900 font-medium mr-3 hover:bg-white/30 transition ease-in-out duration-200"
            >
              Edit
            </button>
            <button @click="deleteLink(link.id)" class="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-white hover:fill-gray-400 transition ease-in-out duration-[250ms]"
              >
                <path
                  d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                />
              </svg>
            </button>
          </div>
          <div v-if="link.showForm" class="py-3">
            <div class="flex justify-between px-3 pb-2">
              <div>
                <label for="" class="text-white font-medium">Custom Link</label
                ><br />
                <div class="flex">
                  <p class="text-white">localhost:5173/ &nbsp;</p>
                  <input v-model="newCustomPath" type="text" class="rounded" />
                </div>
              </div>
              <div>
                <label for="" class="text-white font-medium">Real Link</label
                ><br />
                <input v-model="newRealLink" type="text" class="rounded" />
              </div>
            </div>
            <div class="px-3 pt-2 gap-2">
              <button
                @click="updateItem(link.id, link.customPath, link.realLink)"
                class="px-2 bg-white mr-2 text-gray-900 rounded-md py-0.5 font-medium"
              >
                Edit
              </button>
              <button
                @click="link.showForm = !link.showForm"
                class="ml-2 px-2 bg-white text-gray-900 rounded-md py-0.5 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../firebase.js";

export default {
  data() {
    return {
      links: [],
      showForm: false,
      newCustomPath: "",
      newRealLink: "",
    };
  },
  mounted() {
    this.getLinks();
    document.getElementById("user-email").innerHTML =
      localStorage.getItem("userEmail");
  },
  beforeMount() {
    this.checkUid();
  },
  methods: {
    async getLinks() {
      const res = await axios
        .get("http://localhost:8000/api/links", {
          params: { uid: localStorage.getItem("userToken") },
        })
        .then((response) => {
          console.log(response);
          const links = response.data;
          this.links.push(...response.data);
          console.log(this.links);
          console.log("berhasil ges");
        })
        .catch((err) => {
          console.log("error ges");
          console.log(err);
        });
    },

    async updateItem(id, customPath, realLink) {
      console.log(customPath);
      console.log(realLink);
      if (this.newCustomPath == "") {
        this.newCustomPath = customPath.replace("http://localhost:5173/");
      }
      if (this.newRealLink == "") {
        this.newRealLink = realLink;
      }
      const res = await axios.post("http://localhost:8000/api/update", {
        newCustomPath: this.newCustomPath,
        newRealLink: this.newRealLink,
        id: id,
      });
      this.links = [];
      this.getLinks();
      this.newCustomPath = "";
      this.newRealLink = "";
    },

    async deleteLink(id) {
      const res = await axios.post("http://localhost:8000/api/delete", {
        id: id,
      });
      this.links = [];
      this.getLinks();
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
