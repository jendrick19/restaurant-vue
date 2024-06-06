<script>
import encabezado from "./encabezado.vue"
import Cinput from "@/components/input.vue"
import labelInput from "./labelInput.vue"
    export default {
        name:"updateRest",
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
        mounted() {
            let user = localStorage.getItem("user-info")
                
            if(!user) this.$router.push({name:"login"})
            
            this.getRestaurantId()
        },
        methods: {
            async getRestaurantId() {
                try {
                    let res = await fetch(`http://localhost:3000/restaurant?id=${this.$route.params.id}`)
                    let json = await res.json()

                    if(!res.ok) throw {status: res.status, statusText: res.statusText};
                    
                    this.restaurant.name = json[0].name
                    this.restaurant.address = json[0].address
                    this.restaurant.contact = json[0].contact
                    this.restaurant.rating = json[0].rating
                    this.restaurant.featured_dish = json[0].featured_dish

                } catch(err) { console.log(err) }

            }, async updateRest () {
                    try {
                        let options = {
                            method:"PUT",
                            headers: { "Content-Type": "application/json; charset=utf-8"},
                            body: JSON.stringify({
                                "name": this.restaurant.name,
                                "address":this.restaurant.address,
                                "contact": this.restaurant.contact,
                                "rating":this.restaurant.rating,
                                "featured_dish":this.restaurant.featured_dish
                            })
                        }
                        let res = await fetch(`http://localhost:3000/restaurant/${this.$route.params.id}`,options)
                        let json = await res.json()
            
                        if(!res.ok) throw {status: res.status, statusText: res.statusText}

                        alert(`You have successfully update Restaurant ${this.restaurant.name}`)
                
                        this.$router.push({name:"home"})

                    } catch(err) { console.log(err) }
            }
        }
    }
</script>
<template>
    <encabezado/>
    <div class="w-[100%] h-[97%]">
        <form class="max-w-md mx-auto flex flex-col mt-16">
        <h2 class="font-semibold text-[#0f9942] text-4xl text-center mb-7">Update Restaurant</h2>
        <div class="relative z-0 w-full mt-6 mb-4 group">
            <Cinput type="text" :name="name" v-model="restaurant.name"/>
            <labelInput text="Name Restaurant"></labelInput>
        </div>
        <div class="relative z-0 w-full mt-6 mb-4 group">
            <input type="text" autocomplete= "off" name="address" v-model="restaurant.address" class="block py-2.5 px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" required />
            <labelInput text="Address"></labelInput>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mt-6 mb-4 group">
                <input type="text" autocomplete= "off" name="featured_dish" v-model="this.restaurant.featured_dish" class="block py-2.5 px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" required />
                <labelInput text="featured Dish"></labelInput>
            </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mt-6 mb-4 group">
                <input type="text" autocomplete= "off" name="contact" v-model="this.restaurant.contact" class="block py-2.5 px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" required />
                <labelInput text="Contact (04**-***.**.**)"></labelInput>
            </div>
            <div class="relative z-0 w-full mt-6 mb-4 group">
                <input type="number" autocomplete= "off" name="rating" v-model="this.restaurant.rating" class="block py-2.5 px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer" required />
                <labelInput text="rating"></labelInput>
            </div>
        </div>
        <button type="submit" @click.prevent="updateRest" class="text-white bg-[#0f9942] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Restaurant</button>
        </form>
    </div>
</template>