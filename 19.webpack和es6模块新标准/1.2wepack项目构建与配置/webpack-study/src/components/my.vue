<template>
    <div>
        <h1>你好</h1>
        <ul>
            <li>{{user[0].name}}</li>
            <li v-for="(item,index) in user" :key="index">{{item.name}} ------ {{item.age}}</li>
        </ul>
    </div>
</template>

<script>
   export default{
        data:function(){
        return {
            user:[{
                name:"sb",
                age:10
            },{
                name:"bn",
                age:20
            }]
        }
    }
   }
</script>

<style scoped>
    h1{
        color:red;
    }
</style>