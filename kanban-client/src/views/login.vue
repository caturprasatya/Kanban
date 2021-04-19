<template>
<!-- LOGIN -->
    <div class="container mb-5">
        <div id="loginpage">
            <h2 class="mt-5" style="color: whitesmoke; text-align: center; font-family: 'Poppins', sans-serif;"> Kanban Board </h2>
            <div class="mt-1">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div class="card card-signin my-5">
                                <div class="card-body">
                                    <h5 class="card-title text-center">Sign In</h5>
                                    <form class="form-signin">
                                        <div class="form-label-group">
                                            <input v-model="email" type="email" id="emaillogin" class="form-control" placeholder="Email address" required autofocus>
                                            <label for="emaillogin">Email address</label>
                                        </div>
                                        
                                        <div class="form-label-group">
                                            <input v-model="password" type="password" id="passwordlogin" class="form-control" placeholder="Password" required>
                                            <label for="passwordlogin">Password</label>  
                                        </div>
                                        <div class="row">
                                            <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" id="btn-submit" @click.prevent="login">Sign in</button>
                                            <br>
                                            <div class="d-flex justify-content-center">
                                                <GoogleLogin 
                                                :params="params" 
                                                :renderParams="renderParams" 
                                                :onSuccess="onSuccess" 
                                                :onFailure="onFailure"></GoogleLogin>
                                            </div>
                                            <br>
                                            <hr>
                                            <br>
                                            <button class="btn btn-lg btn-facebook btn-block text-uppercase" id="btn-go-sign-up-page" @click.prevent="movePage" >Sign Up</button>
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
<!-- END LOGIN PAGE -->

</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    props : ["baseUrl"],
    components : {
        GoogleLogin
    },
    data(){
        return {
            email : '',
            password : '',
            params: {
                client_id: '125852395339-ivqd9289j9gbddqhej3l2sle3d41c5ql.apps.googleusercontent.com'
            },
            renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
        }
    },
    methods : {
        login(){
            this.$emit('emitLogin', this.email, this.password)
            this.email = ''
            this.password = ''
        },
        onSuccess(googleUser) {
      
            let id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
         
            this.$emit('emitGoogleLogin', id_token)
        },
        onFailure (error) {
            // `error` contains any error occurred.
            console.log('OH NOES', error)
        },
        movePage(){
            this.$emit('emitRegisterPage')
        }

    }
}

</script>

<style>
</style> 