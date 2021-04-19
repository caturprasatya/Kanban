import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button'


new Vue({
  GSignInButton,
  render: h => h(App),
}).$mount('#app');