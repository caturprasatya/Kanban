<template>
    <div>

        <!-- LOGIN & REGISTER PAGE -->
        <div id="form-login">
        <!-- LOGIN -->
        <Login 
        v-if="!isLogin && pageLogin" 
        :baseUrl="baseUrl"
        @emitLogin="login"
        @emitGoogleLogin="googleLogin"
        @emitRegisterPage="registerPage"></Login>
        <Register 
        v-if="!isLogin && !pageLogin" 
        :baseUrl="baseUrl"
        @emitRegister="register"
        @emitLoginPage="loginPage"></Register>        
        </div>
        <Home v-if="isLogin" 
        :baseUrl="baseUrl"
        @emitFetchTask="fetchTask"
        @emitAddTask="addTask"
        :tasks="tasks"
        @emitDeleteTask="deleteTask"
        @emitRoleCategory="roleCategory"
        @emitPutTask="putTask"
        @emitLogout="logout"></Home>
        <!-- END -->
                
    </div>

</template> 

<script>
import axios from 'axios'
import Login from './views/login.vue';
import Register from './views/register.vue';
import Home from './views/home.vue'

export default {
    data() {
        return {
            isLogin : false,
            pageLogin : true,
            message : "Hello world",
            baseUrl : 'https://kanban-server-prasatya.herokuapp.com',
            email : '',
            update : '',
            tasks : []
            }
    },
    components : {
        Login,
        Register,
        Home
    },
    methods : {
        googleLogin(token){
          
            axios({
                url:`${this.baseUrl}/user/googlelogin`,
                method:'POST',
                data:{
                    googleToken : token
                }
            })
            .then(({data}) =>{
                let{ access_token }= data
                localStorage.setItem('access_token', access_token)
                this.isLogin = true
            })
            .catch(err =>{

            })
        },
        login(email, password){
            axios({
                method : 'POST',
                url : `${this.baseUrl}/user/login`,
                data : {
                    email,
                    password
                }
            })
            .then(({data}) =>{
                let { access_token } = data
                localStorage.setItem('access_token', access_token)
                this.isLogin = true
            })
            .catch(err =>{
                console.log(err);
            })
        },
        register(fullname, email, password){
            axios({
                url : `${this.baseUrl}/user/register`,
                method : 'POST',
                data : {
                    fullname,
                    email,
                    password
                }
            })
            .then(response =>{
                console.log(response);
                Swal.fire(
                    'Good job!',
                    'User success added',
                    'success'
                )
                this.pageLogin = true
            })
            .catch(err =>{
                console.log(err);
            })
        },
        loginPage(){
            this.pageLogin = true
        },
        registerPage(){
            this.pageLogin = false
        },
        fetchTask(){
            axios({
                method: 'GET',
                url : `${this.baseUrl}/tasks`,
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(({data}) =>{
                this.tasks = data
            })
            .catch(err =>{
                console.log(err.message);
            })
        },
        addTask(title, category){
            axios({
                url : `${this.baseUrl}/tasks`,
                method : 'POST',
                headers : {
                    access_token : localStorage.access_token
                },
                data : {
                    title,
                    category
                }
            })
            .then(response =>{
                Swal.fire(
                    'Good job!',
                    'Task success added',
                    'success'
                )
                this.fetchTask()
            })
            .catch(err =>{
                console.log(err);
            })
        },
        roleCategory(id, value){
            axios({
                url : `${this.baseUrl}/tasks/${id}`,
                method : 'PATCH',
                headers : {
                    access_token : localStorage.access_token
                },
                data : {
                    category : value
                }
            })
            .then(response =>{
                this.fetchTask()
            })
            .catch(err =>{
                if (err.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You can edit your task only',
                    })
                } else {
                    console.log(err.response);
                }
            })
        },
        putTask(id, title, category){
            axios({
                url : `${this.baseUrl}/tasks/${id}`,
                method : 'PUT',
                headers : {
                    access_token : localStorage.access_token
                },
                data:{
                    title,
                    category
                }
            })
            .then(response =>{
                this.fetchTask()
            })
            .catch(err =>{
                if (err.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You can edit your task only',
                    })
                } else {
                    console.log(err.response);
                }
            })
        },
        deleteTask(id){
            axios({
                url : `${this.baseUrl}/tasks/${id}`,
                method : 'DELETE',
                headers : {
                    access_token : localStorage.access_token
                },
            })
            .then(response =>{
                console.log(response, 'nii di app');
                this.fetchTask()
            })
            .catch(err =>{
                if (err.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'You can delete your task only',
                    })
                } else {
                    console.log(err.response);
                }
            })
        },
        logout(){
            let auth2 = gapi.auth2.getAuthInstance();
            this.isLogin = false
            localStorage.removeItem('access_token')
            auth2.signOut().then(function () {
            console.log('User signed out.');
    });
        }
    },
    beforeCreate(){
    },
    created(){
        if (localStorage.access_token) {
            this.isLogin = true
        } else {
            this.isLogin = false
        }
    },
    beforeMount (){
    }
};
</script>

<style>

</style>