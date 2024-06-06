<script>
    import Cinput from "@/components/input.vue"
    import labelInput from "./labelInput.vue"
    export default {
        name:"login",
        components:{
            Cinput,
            labelInput,
        },
        data() {
            return {
                email:"",
                password:"",
                showModal:false,
                titleModal:"Fail to Login",
                messageModal:"" 
            }
        },
        methods: {
            async login () {

                if(this.email==="") {
                    this.messageModal="You must enter your Email" 
                    this.openModal()

                } else if(this.password==="") { 
                    this.messageModal="You must enter your Password"
                    this.openModal() 
                } 
                else {
                    try {
                        let res = await fetch(`http://localhost:3000/users?email=${this.email}&password=${this.password}`)
                        let json = await res.json()
    
                        if(json.length === 1) { 
                            this.titleModal="Welcome"
                            this.messageModal="You have logged in successfully"
                            this.openModal()
                            localStorage.setItem("user-info",JSON.stringify(json))
                            setTimeout(()=>{
                                this.$router.push({name:"home"})
                            },3000)

                        } else {
                            this.messageModal="User not register.Incorrect Email or Password"
                            this.openModal()
                        } 

                        if(!res.ok) throw {status: res.status, statusText: res.statusText};

                    } catch(err) { console.log(err) }
                }
            },
            returnSignUp() {
                localStorage.removeItem("user-info")
            },
            openModal() {
                this.showModal=true
            },
            closeModal() {
                this.showModal=false
            }
        },
    }
</script>

<template>
    <Transition name="fade" class="fade-enter-active fade-leave-active">
        <div class="absolute top-[25%] left-[25%] w-1/2 h-1/2 bg-[#c9c9c9] border-4 border-green-600 text-black text-center z-[1] flex flex-col justify-evenly items-center rounded-[5%]" name="modal" v-show="showModal===true">
            <h2 class="text-3xl font-semibold">{{ titleModal }}</h2>
            <i class="fa-solid fa-circle-exclamation text-[#fb1313] text-7xl"></i>
            <p class="font-2xl font-medium">{{ messageModal }}</p>
            <button class="text-white bg-[#0f9942] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" @click="closeModal">Ok</button>
        </div>
    </Transition>
    <div class="h-full w-full ept-4 flex flex-col justify-center">
        <div class="h-[25%]">
            <img class="ml-auto mr-auto w-[200px]" src="../assets/logo.png">
        </div>
        <div class="h-[75%]">
            <div class="container max-w-sm mx-auto flex flex-col items-stretch px-2">
                <h2 class="font-semibold text-[#0f9942] text-4xl text-center mb-7">Login</h2>
                <div class="text-center">
                    <i class="text-[5rem] text-black fa-solid fa-user"></i>
                </div>
                <div class="relative z-0 w-full mt-6 mb-4 group">
                    <Cinput type="text" :name="email" v-model="email"/>
                    <labelInput text="Email"></labelInput>
                </div>
                <div class="relative z-0 mt-4 w-full mb-5 group">
                    <Cinput type="password" :name="password" v-model="password"/>
                    <labelInput text="Password"></labelInput>
                </div>
                <button @click="login" class="text-white bg-[#0f9942] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
                <router-link to="/sign-up" @click="returnSignUp" class="text-green-600 text-lg text-center underline">SignUp</router-link>
            </div>
        </div>
    </div> 
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>