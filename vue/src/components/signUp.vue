<script>
    import Cinput from "@/components/input.vue"
    import labelInput from "./labelInput.vue"
    export default {
        name:"signUp",
        components:{
            Cinput,
            labelInput
        },
        data() {
            return {
                name:"",
                email:"",
                password:""
            }
        },
        methods: {
            async signUp() {
                try {
                    let options = {
                        method:"POST",
                        headers: { "Content-Type": "application/json; charset=utf-8"},
                        body: JSON.stringify({
                            "first_name": this.name,
                            "email":this.email,
                            "password": this.password,
                         })
                    }
                    let res = await fetch("http://localhost:3000/users",options);
                    let json = await res.json();
        
                    if(!res.ok) throw {status: res.status, statusText: res.statusText};

                    alert(`You have successfully registered ${this.email}`)
                    localStorage.setItem("user-info",JSON.stringify(json))
                    this.$router.push({name:"login"})

                } catch(err) { console.log(err) }
            }
        },
        mounted() {
            let user = localStorage.getItem("user-info")
                
            if(user) this.$router.push({name:"home"})
        }
    }
</script>

<template>
    <div class="h-full w-full pt-4 flex flex-col justify-center">
        <div class="h-[20%]">
            <img class="ml-auto mr-auto w-[200px]" src="../assets/logo.png">
        </div>
        <div class="h-[80%]">
            <div class="container max-w-sm mx-auto flex flex-col items-stretch px-2">
                <h2 class="font-semibold text-[#0f9942] text-4xl text-center mb-6">SignUp</h2>
                <div class="text-center">
                    <i class=" text-[5rem] text-black fa-solid fa-user-plus"></i>
                </div>
                <div class="relative z-0 w-full mt-6 mb-4 group">
                    <Cinput type="text" :name="name" v-model="name"/>
                    <labelInput text="Name"></labelInput>
                </div>
                <div class="relative z-0 w-full mt-6 mb-4 group">
                    <Cinput type="text" :name="email" v-model="email"/>
                    <labelInput text="Email"></labelInput>
                </div>
                <div class="relative z-0 mt-4 w-full mb-5 group">
                    <Cinput type="password" :name="password" v-model="password"/>
                    <labelInput text="Password"></labelInput>
                </div>
                <button @click="signUp" class="text-white bg-[#0f9942] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">SignUp</button>
                <router-link to="/login" @click="returnSignUp" class="text-green-600 text-lg text-center underline">Login</router-link>
            </div>
        </div>
    </div> 
</template>
