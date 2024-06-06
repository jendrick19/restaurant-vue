<script>
import encabezado from "./encabezado.vue"
import Cinput from "./input.vue"
import labelInput from "./labelInput.vue"
    export default {
        name:"addRest",
        components: {
            encabezado,
            Cinput,
            labelInput
        },
        data() {
            return {
                restaurant: {
                    name:"",
                    address:"",
                    contact:"",
                    featured_dish:"",
                    rating:0
                }
            }
        },
        methods: {
            async addRest() {
                try {
                    let options = {
                        method:"POST",
                        headers: { "Content-Type": "application/json; charset=utf-8"},
                        body: JSON.stringify(this.restaurant)
                    }
                    let res = await fetch("http://localhost:3000/restaurant",options);
                    let json = await res.json();
        
                    if(!res.ok) throw {status: res.status, statusText: res.statusText};

                    alert(`Restaurant successfully added ${this.restaurant.name}`)
                    this.$router.push({name:"home"})

                } catch(err) { console.log(err) }   
            }
        }, 
        mounted() {
            let user = localStorage.getItem("user-info")
                
            if(!user) this.$router.push({name:"login"})
        }
    }
</script>

<template>
    <encabezado/>
    <div class="w-[100%] h-[97%]">
        <form class="max-w-md mx-auto flex flex-col mt-16">
        <h2 class="font-semibold text-[#0f9942] text-4xl text-center mb-7">Add New Restaurant</h2>
        <div class="relative z-0 w-full mt-6 mb-4 group">
            <Cinput type="text" :name="nameRest" v-model="restaurant.name"/>
            <labelInput text="Name Restaurant"></labelInput>
        </div>
        <div class="relative z-0 w-full mt-6 mb-4 group">
            <Cinput type="text" :name="address" v-model="restaurant.address"/>
            <labelInput text="Address"></labelInput>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mt-6 mb-4 group">
                <Cinput type="text" :name="featured_dish" v-model="restaurant.featured_dish"/>
                <labelInput text="featured_dish"></labelInput>
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mt-6 mb-4 group">
                <Cinput type="text" :name="contact" v-model="restaurant.contact"/>
                <labelInput text="Contact (04**-***.**.**)"></labelInput>
            </div>
            <div class="relative z-0 w-full mt-6 mb-4 group">
                <Cinput type="number" :name="rating" v-model="restaurant.rating"/>
                <labelInput text="rating"></labelInput>
            </div>
        </div>
        <button type="submit" @click.prevent="addRest" class="text-white bg-[#0f9942] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Restaurant</button>
        </form>
    </div>
</template>