<script>
    export default {
        name:"Cinput",
        emits: ["update:modelValue"],
        props: {
            type:String,
            name:String,
            modelValue:{},
        }
    }
</script>

<template>
    <input 
        :type="type" 
        :name="name"
        @input="$emit('update:modelValue',$event.target.value)" 
        autocomplete="off"
        :value="modelValue" 
        class="block py-2.5 px-0 w-full text-xl text-black bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-green-600 peer"
    /> 
</template>