<script>
    export default {
        name:"encabezado",
        methods: {
            logout() {
                localStorage.clear();
                this.$router.push("login")
            },
        },
    }
</script>

<template>
   <header>
    <nav class="bg-gray-400 border-gray-400 py-2.5">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <router-link to="/" class="flex items-center">
                <img src="../assets/logo.png" class="h-12" alt="Restaurant" />
            </router-link>
            <div class="flex items-center font-medium lg:order-2">
                <a class="block py-2 pr-4 pl-3 text-white hover:bg-green-600 hover:rounded-md" @click="logout">logout</a>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <router-link to="/" class="block py-2 pr-4 pl-3 text-white hover:bg-green-600 hover:rounded-md">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/add-Rest" class="block py-2 pr-4 pl-3 text-white hover:bg-green-600 hover:rounded-md">New Restaurant</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>