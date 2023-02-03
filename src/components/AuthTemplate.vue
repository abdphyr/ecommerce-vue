<template>
  <div v-if="rLng">
    Registering ...
  </div>
  <div v-if="lLng">
    Logging...
  </div>
  <error-builder v-if="rErr" :error="r_err" />
  <error-builder v-if="lErr" :error="l_err" />
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        {{ isLogin? "Login": "Register" }}
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {{ isLogin? "Login your profile": "Create an account" }}
          </h1>
          <form @submit.prevent="handleAuth" class="space-y-4 md:space-y-6" action="#">
            <div v-if="!isLogin">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
              <input v-model="auth.name" type="text" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your name" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="auth.email" type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com" required>
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="auth.password" type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
            </div>
            <div v-if="!isLogin">
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                password</label>
              <input v-model="auth.password_confirmation" type="password" name="confirm-password" id="confirm-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
            </div>
            <div v-if="!isLogin" class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox"
                  class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required>
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a
                    class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="#">Terms and
                    Conditions</a></label>
              </div>
            </div>
            <button type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {{ isLogin? "Login": "Create an account" }}
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              {{ isLogin? "No have an account yet?": "Already have an account?" }}
              <router-link :to="isLogin ? '/register' : '/login'"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500">{{
  isLogin? "Register here":
    "Login here"
                }}
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAuthPagesStore } from '@/store';
import ErrorBuilder from './ErrorBuilder.vue';
import { useRouter } from 'vue-router';
import { useLogin, useRegister } from '@/store';
const { isLogin } = defineProps<{ isLogin: boolean }>();
const router = useRouter();
const { modif: register, isLng: rLng, err: r_err, isErr: rErr } = useRegister();
const { modif: login, isLng: lLng, err: l_err, isErr: lErr } = useLogin();

const auth = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
})

const handleAuth = () => {
  if (isLogin) {
    login({ email: auth.value.email, password: auth.value.password }, {
      onSuccess(data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      },
      onError(err) {
        console.log(err);
      }
    })
  } else {
    register({
      name: auth.value.name,
      email: auth.value.email,
      password: auth.value.password,
      password_confirmation: auth.value.password_confirmation
    }, {
      onSuccess(data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      },
      onError(err) {
        console.log(err);
      }
    })
  }
}


onMounted(() => { useAuthPagesStore().open() })
onUnmounted(() => { useAuthPagesStore().close() })
</script>