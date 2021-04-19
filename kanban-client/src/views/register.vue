<template>
<!-- REGISTER -->
    <div class="container">
        <div id="registerpage">
            <h2 class="mt-5" style="color: whitesmoke; text-align: center;font-family: 'Poppins', sans-serif;"> Kanban Board </h2>
            <div class="mt-4">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div class="card card-signin my-5">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Sign Up</h5>
                                    <form class="form-signin">
                                        
                                        <div class="form-label-group">
                                            <input type="text" id="reg-name" v-model="reg_name" class="form-control" placeholder="Full Name" required autofocus>
                                            <label for="reg-name">Full Name</label>
                                        </div>
                                        
                                        <div class="form-label-group">
                                            <input type="email" id="reg-email" v-model="reg_email" class="form-control" placeholder="Email address" required>
                                            <label for="reg-email">Email address</label>
                                        </div>
                                        
                                        <div class="form-label-group">
                                            <input type="password" id="reg-password" v-model="reg_password" class="form-control" placeholder="Password">
                                            <label for="reg-password">Password</label>
                                        </div>
                                        <hr class="my-4">
                                        <div class="row">
                                            <button class="btn btn-lg btn-facebook text-uppercase" type="submit" id="btn-submit-signup" @click.prevent="register">Sign Up</button> 
                                            <br>
                                            <br>
                                            <hr>
                                            <button class="btn btn-lg btn-warning text-uppercase" type="submit" id="back-login" @click.prevent="back">Back</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- END REGISTER PAGE -->
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            reg_name : '',
            reg_email : '',
            reg_password : '',
        }
    },
    props : ['baseUrl'],
    methods : {
        register(){
            this.$emit('emitRegister', this.reg_name, this.reg_email, this.reg_password)
                this.reg_name = ''
                this.reg_email = ''
                this.reg_name = ''
        },
        back(){
            this.$emit('emitLoginPage')
        }
    }
}
</script>

<style>

</style>