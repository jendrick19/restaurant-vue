<script>
import encabezado from "./encabezado.vue"
    export default {
        name:"home",
        data() {
            return {
                name:"",
                restaurants:[],
            }
        },
        components: {
            encabezado
        },
        methods: {
         deleteRest(index) {
            let id = 0;
            this.restaurants.splice(index,1)
            this.restaurants.forEach(element => {
                element.id = id;
                id++;
    
            });
         }   

        },
        async mounted() {
            let user = localStorage.getItem("user-info")
      
            if(!user) this.$router.push({name:"login"})

            this.name = JSON.parse(user)[0].first_name

            try {
                let res = await fetch("http://localhost:3000/restaurant")
                let json = await res.json()
                
                this.restaurants=json
        
                if(!res.ok) throw {status: res.status, statusText: res.statusText};

            } catch(err) { console.log(err) }
        },
    }
</script>
<template>
    <encabezado :props.message="this.mensaje"/>
    <h1>Hello {{this.name}}, Welcome to Home Page</h1>
    <di class="flex flex-col ml-auto mr-auto w-[95%]">
        <h2 class="font-semibold text-[#0f9942] text-4xl text-center mb-7">List of Restaurants</h2>
        <table class="border-solid border-[#16a34a] border-2 text-center w-full">
            <tr class="bg-[#16a34a] text-white">
                <td class="w-[10%] h-6">Name</td>
                <td class="w-[25%] h-6">Contact</td>
                <td class="w-[20%] h-6">Address</td>
                <td class="w-[10%] h-6">Featured Dish</td>
                <td class="w-[5%] h-6">Rating</td>
                <td class="w-[10%] h-6">Action</td>
            </tr>
            <tr v-for="rest in restaurants" :key="rest.id">
                <td class="w-[10%] h-6">{{ rest.name }}</td>
                <td class="w-[25%] h-6">{{ rest.contact }}</td>
                <td class="w-[20%] h-6">{{ rest.address }}</td>
                <td class="w-[10%] h-6">{{ rest.featured_dish }}</td>
                <td class="w-[5%] h-6">{{ rest.rating }}</td>
                <td class="w-[10%] h-6">
                    <router-link :to="'/update-Rest/'+rest.id" @click="selectUpdate">
                        <i class="fa-solid fa-pen-to-square fa-xl text-black ml-2"></i>
                    </router-link>
                    <i @click="deleteRest(rest.id)" class="fa-solid fa-trash-can fa-xl text-black ml-2"></i>
                </td>
            </tr>
        </table>
    </di>
</template>
