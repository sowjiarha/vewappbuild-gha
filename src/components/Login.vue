<template>
  <div class="text-center landing">
      <v-row>
          <v-col cols="12" style="    padding: 30% 10%; height:100vh; background:#0000008f; ">
            <img style="width:15%; position:absolute; top:40px; left:40px;" src="../assets/amara_logo_white.png" alt="">
            <div>
              <div class="align-center btn-bg" style="padding: 35px; border-radius:10px; ">
                <h3 style="font-size:40px; color:white; padding-bottom:10px;">Welcome back</h3>
                <v-btn  id="customBtn" class="customGPlusSignIn cursor-pointer ggl-btn" style="color: #fff !important;" @click="connectWith('google')" outlined color="#050550">Sign in with Google</v-btn>
              </div>
            </div>
          </v-col>
      </v-row>
  </div>
</template>

<script>
/*eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import VueAuthenticate from 'vue-authenticate-fork';
import { mapState } from 'vuex';
Vue.prototype.$http = axios;
Vue.use(VueAuthenticate, {
  baseUrl: `${process.env.VUE_APP_API_URL_FB}`, // Your API domain

  // bindRequestInterceptor () {
  //   // axios.interceptors.request.use((request, next) => {
  //   //   console.log('request', request);
  //   //   if (this.isAuthenticated()) {
  //   //     request.headers.set('Authorization', [
  //   //       this.options.tokenType, this.getToken()
  //   //     ].join(' '));
  //   //   } else {
  //   //     delete request.headers.Authorization;
  //   //   }

  //   //   next((response) => {
  //   //     try {
  //   //       const responseJson = JSON.parse(response[this.options.responseDataKey]);
  //   //       if (responseJson[this.options.tokenName]) {
  //   //         this.setToken(responseJson);
  //   //         delete responseJson[this.options.tokenName];
  //   //         return responseJson;
  //   //       }
  //   //     } catch (e) { console.log(e); }
  //   //     return response;
  //   //   });
  //   // });
  //   axios.interceptors.request.use((request, next) => {
  //     console.log('request', request);
  //     if (this.isAuthenticated()) {
  //       request.headers.set('Authorization', [
  //         this.options.tokenType, this.getToken()
  //       ].join(' '));
  //     } else {
  //       delete request.headers.Authorization;
  //     }
  //   }, error => Promise.reject(error));
  // },
  providers: {
    google: {
      scope: ['https://www.googleapis.com/auth/userinfo.email', 'profile'],
      optionalUrlParams: ['prompt', 'access_type'],
      accessType: 'offline',
      // responseType: 'code',
      prompt: 'consent',
      clientId: '896455913326-uk7r10kn2qj1ll74pnqngr4qh395gsa3.apps.googleusercontent.com',
      name: 'google',
      url: 'mfa/social_auth/google/',
      // authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      // requiredUrlParams: ['scope'],
      // scopePrefix: 'openid',
      // scopeDelimiter: ' ',
      // display: 'popup',
      // oauthType: '2.0'
    }
  }
});

export default {
    components: {
        axios,
    },
    name: 'Login',
    data: () => ({
        loading: false,
        forceDialog: true,
    }),
    computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
  beforeMount () {
    const user = localStorage.getItem('CHATBOT_USER');
    if (localStorage.getItem('CHATBOT_USER')) {
      if (user.milestone_active) {
        this.$router.push('/');
      } else if (user.adhoc_active) {
        this.$router.push('/ad-hoc');
      }
      this.$router.push('/');
    }
    if (this.$route.query.u && this.$route.query.p) {
      this.email = this.$route.query.u;
      this.password = atob(this.$route.query.p);
      this.getData();
    } else {
      this.refreshing = true;
    }
  },
    methods: {
    connectWith (provider) {
      this.$auth.authenticate(provider).then((response) => {
        if (response.data && response.status === 200) {
          this.$router.push('/');
          this.$store.dispatch('createSession', response.data);
          window.location.reload();
          this.userData = response.data;
          this.loading = false;
          this.$store.dispatch('createSession', response.data);
          this.userData = response.data;
        }
      }).catch((err) => {
        if (err.response && err.response.status === 400) {
          this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: err.response.data.error
        });
        }
      });
    },
    }
}
</script>
<style lang="scss">
.landing {
  overflow: hidden;
  background: url('../assets/background.jpg');
background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
}
.btn-bg {
      background: #ffffff66;
          width: 32%;
    height: 200px;
    position: absolute;
    top: 40%;
    left: 10%;
}
</style>