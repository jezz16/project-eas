<template>
  <div class="w-full flex flex-wrap pt-20">

        <div class="w-full md:w-5/5 flex flex-col">
            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl font-medium">Welcome to BISMILLAH Shortener !!! </p>
                <div class="text-center pt-12 pb-12">
                    <p>
                      <a href="/login" class="underline font-semibold visited:text-fuchsia-900">Log in</a> | 
                      <a href="/register" class="underline font-semibold visited:text-fuchsia-900">Register</a>
                    </p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>

  export default {
    mounted()
    {
      console.log(localStorage.getItem('userToken'))
    }
  }
</script>
