<template>
    <section>
        <!-- NAVBAR -->
        <nav class="navbar">
            <div class="item-nav">
                <img src='~asset/logo.png' alt="" width="170" height="45">
            </div>
            <div class="logout">
                <a @click.prevent="logout">Logout</a>         
            </div>
        </nav>
        <!-- END NAV -->
        
        <div id="content">
            <div class="container justify-content-between color-a">
                <div class="row justify-content-between">
                    <div class="col-lg-4 col-md-3 col-2">
                        <div class="input-group">
                            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" />
                            <button type="button" class="btn btn-outline-primary">search</button>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-1 my-auto">
                        <!-- <div class="my-auto"> -->
                            <button type="button" class="btn btn-outline-primary btn-rounded" data-bs-toggle="modal" data-bs-target="#FORM"> <i class="fas fa-plus"></i> Add Task</button>
                        <!-- </div> -->
                        <!-- <input class="btn btn-primary btn-rounded btn-block" type="submit" value="Search" /> -->
                    </div>
                </div>
            <!-- CARD -->
            <div class="row mt-4">
                <Category v-for="category in categories"
                :key="category"
                :category="category"
                :baseUrl="baseUrl"
                :filteredTask="filteredTask"
                @emitDataTask="dataTask"
                @emitSendDataTask="confirmDataTask"
                :categories="categories"
                ></Category>
            </div>
            <!-- END CARD -->
            </div>
            
            <!-- MODAL -->
            <div id="modal">
                <!-- DEATIL DATA TASK -->
                <div id="detail-task">
                    <div class="modal fade" id="detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Hello {{name}} </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click.prevent="clear"></button>
                                </div>
                                <div class="modal-body">
                                    {{title}}
                                </div>
                                <div class="modal-footer d-flex justify-content-between">
                                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                                    <button type="button" class="btn btn-primary" @click="roleCategory(categoryBefore)"> {{categoryBefore}} </button>
                                    <button type="button" class="btn btn-danger" @click="deleteTask">Delete</button>
                                    <button type="button" class="btn btn-primary" @click="roleCategory(categoryAfter)">{{categoryAfter}}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END DATA -->
                <!-- FORM ADD B-LOG -->
                <div id="form-add-task">
                    <div class="modal fade" id="FORM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h6 class="modal-title" id="exampleModalLabel">New Task</h6>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click.prevent="clear"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="title" class="col-form-label" placeholder="Title..">Title :</label>
                                            <input v-if="addTask" type="text" class="form-control" id="title" v-model="title">
                                            <input v-if="!addTask" type="text" class="form-control" id="title" v-model="title">
                                        </div>
                                        <div class="mb-3">
                                            <label for="description" class="col-form-label" placeholder="Choose category... ">Category :</label>
                                            <select class="form-control" v-model="category">
                                                <option v-if="category === 'Back-Log'" :value="category">Back-Log</option>
                                                <option v-else>Back-Log</option>
                                                <option v-if="category === 'Todo'" :value="category" >Todo</option>
                                                <option v-else>Todo</option>
                                                <option v-if="category === 'Doing'" :value="category" >Doing</option>
                                                <option v-else>Doing</option>
                                                <option v-if="category === 'Done'" :value="category" >Done</option>
                                                <option v-else>Done</option>
                                            </select>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click.prevent="clear">Close</button>
                                            <button v-if="createTask" @click.prevent="addTask" class="btn btn-primary">Send task</button>
                                            <button v-if="!createTask" @click.prevent="putTask" class="btn btn-primary">Submit task</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <!-- END FORM -->
        </div>
    </section>
            <!-- END MODAL -->
</template>

<script>
// import categoryVue from '../components/category.vue'
import Category from '../components/category.vue'


export default {
    props : ["baseUrl", "tasks"],
    data(){
        return {
            categories : ['Back-Log', 'Todo', 'Doing', 'Done'],
            title :'',
            category : '',
            categoryBefore : '',
            categoryAfter : '',
            taskId : '',
            createTask : true,
            dataTitle :'',
            name : ''
        }
    },
    components : {
        Category
    },
    methods : {
        addTask(){
            this.$emit('emitAddTask', this.title, this.category)
            this.clear()
        },
        fetchTask(){
            this.$emit('emitFetchTask')
        },
        dataTask(id, title, name, ctgBefore, ctgAfter){
            this.title = title
            this.categoryBefore = ctgBefore
            this.categoryAfter = ctgAfter
            this.taskId = id
            this.name = name
        },
        deleteTask(){
            this.$emit('emitDeleteTask', this.taskId)
        },
        roleCategory(value){
            this.$emit('emitRoleCategory', this.taskId, value)
        },
        confirmDataTask( id, title, category){
            this.category = category
            this.title = title
            this.createTask = false
            this.taskId = id
        },
        putTask(){
            this.$emit('emitPutTask', this.taskId, this.title, this.category)
            this.clear()
        },
        logout(){
            this.$emit('emitLogout')
        },
        clear(){
            this.title = ''
            this.category = ''
            this.taskId  = ''
        }


    },
    computed : {
        filteredTask(){
            
            let categoryTask = {}
            this.categories.forEach(ctg => {
                if (!categoryTask[ctg]) {
                    categoryTask[ctg] = []
                }
        
                this.tasks.forEach(task => {
                    if (task.category.toLowerCase() === ctg.toLowerCase()) {
                        categoryTask[ctg].push(task)
                    }
                }) 
            });

            return categoryTask 
        }
    },
    
    created(){
        this.fetchTask()
        this.title = ''
        this.category = ''
        this.taskId  = ''
    }
}
</script>

<style>

</style>