<template>
    <div class="card" id="card-done">
        <div class="card mb-2">
            <div class="card-header">
                <div class="p-2 bd-highlight">{{task.title}}</div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="d-flex justify-content-end">
                        <i>
                            <p class="card-text"><small class="text-muted"> <b>by  </b> {{task.User.email}}</small></p>
                        </i>
                    </div>
                </div>
                <div class="row">
                    <div class="d-flex justify-content-end">
                        <i>
                            <p class="card-text"><small class="text-muted">{{toDate(task.updatedAt)}}</small></p>
                        </i>
                    </div>
                </div>
                <div class="card-footer">
                <div class="d-flex justify-content-end">
                    <div class="my-0">
                        <span @click="sendDataTask" data-bs-toggle="modal" data-bs-target="#FORM"><i class="fas fa-edit"></i></span>
                        <span data-bs-toggle="modal" data-bs-target="#detail" @click="dataTask"><i class="fas fa-ellipsis-h"></i></span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {

        }
    },
    props : ["task", "categories"],
    methods : {
        dataTask(){
            let data = this.categories
            let ctgAfter
            let ctgBefore

            data.forEach((category, i) => {

                if (category.toLowerCase() === this.task.category.toLowerCase()) {
                    if (i === 0) {
                        ctgBefore = category
                        ctgAfter = data[i+1]
                    } else if (i === data.length - 1) {
                        ctgBefore = data[i-1]
                        ctgAfter = category
                    } else {
                        ctgBefore = data[i-1]
                        ctgAfter = data[i+1]
                    }
                }
            });


            this.$emit('emitDataTask', this.task.id, this.task.title, this.task.User.fullname, ctgBefore, ctgAfter)
        },
        sendDataTask(){
            this.$emit('emitSendDataTask', this.task.id, this.task.title, this.task.category)
        },
        toDate(date){
            let changeDate = date.split('T')[0]
            return changeDate.toString()
        }
    },
    computed: {
        
    }
}
</script>

<style>

</style>