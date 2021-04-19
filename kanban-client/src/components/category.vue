<template>
    <div class="col-lg-3 col-md-6 col-12">
        <div class="card color-d">
            <div class="card-header">
                <div  id="done" >
                    <p>{{category}}</p>
                </div>
            </div>
            <div class="card-body">
                <Task v-for="task in filteredTask[category]" 
                :key="task.id"
                :task="task"
                @emitDataTask="emitDataTask"
                @emitSendDataTask="sendDataTask"
                :categories="categories"
                ></Task>
            </div>
            <div class="body-footer d-flex">
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import Task from './task.vue'

export default {
    data(){
        return {
            tasks : [],
            taskCategories : []
        }
    },
    props : ["category", "baseUrl", "filteredTask", "categories"],
    methods : {
        emitDataTask(id ,title, name, ctgBefore, ctgAfter){
            this.$emit('emitDataTask', id, title, name, ctgBefore, ctgAfter)
        },
        sendDataTask(id, title, category){
            this.$emit('emitSendDataTask', id, title, category)
        }
    },
    components : {
        Task
    },
    computed : {
        changeWord(value){
            return value.toLowerCase()
        }
    },

    beforeCreate(){
    },

    created(){
    },
    beforeMount(){
        
    }

}
</script>

<style>

</style>