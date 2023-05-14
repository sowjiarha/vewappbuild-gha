<template>
  <v-app none class="white">
    <!-- <v-navigation-drawer v-if="user.type === 'SuperAdmin'" app style="z-index:22;"
        permanent
      >
        <v-list>
          <v-list-item class="px-2">
              <v-img style="width:80%;" src="./assets/amara_logo.png"></v-img>
          </v-list-item>

          
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link @click="changeTab('')">
            <v-list-item-icon>
              <v-icon>mdi-desktop-mac-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item link style="position: fixed; width:100%;bottom: 50px;">
            <v-list-item-content>
              <v-list-item-title class="text-h6" style="line-height:30px;">{{user.display_name}}
              </v-list-item-title>
              <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout()" link style="position: fixed; width:100%;bottom: 10px;">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->
      <v-app-bar v-if="user.sub_type || user.type" app style="background: white !important;">
      <v-row style=" width: 100%; min-width: 100%;">
        <v-col cols="2">
          <v-img style="width:80%;" src="./assets/amara_logo.png"></v-img>
        </v-col>
        <v-col cols="7" style="align-self:center;">
          
        </v-col>
        
        <v-col style="text-align: left;" cols="2">
          {{user.display_name}}<br>{{user.email}}
        </v-col>
        <v-col style="text-align: right;" cols="1">
          <v-icon @click="logout()" style="    padding: 10px;
    background: #e8e8e8;
    border-radius: 32px;
    color: #96969a;;">mdi-logout</v-icon>
        </v-col>
      </v-row>
      
    <!-- --><div style=" width:100%;   
    padding-bottom: 10px;">
    
    </div>
  </v-app-bar>

  
  <v-main>
    <v-snackbar
          :timeout="6000"
          :color="snackbar.color"
          :multi-line="snackbar.mode === 'multi-line'"
          :vertical="snackbar.mode === 'vertical'"
          v-model="snackbar.show"
        >
          <div class="d-flex justify-space-between align-center">
            <div>{{ snackbar.text }}</div>
            <v-btn text @click.native="snackbar.show = false">Close</v-btn>
          </div>
        </v-snackbar>
    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view />
    </v-container>
  </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

import { mapState } from 'vuex';
// import addCompany from './components/dialogs/AddCompany';
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    // addCompany
  },

  data: () => ({
    items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
        searchCompany: '',
    //
  }),
  computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
  methods: {
    openModal () {
      console.log(this);
    },
    logout () {
      axios.post(`${process.env.VUE_APP_API_URL_FB}logout`).then((response) => {
        if (response && response.data.status === 200) {
          this.$store.dispatch('deleteSession', 'logout');
          this.$router.push('/login');
        } else {
          this.$notify({
            group: 'foo',
            title: 'Error while logging out!',
            type: 'warn'
          });
          this.$store.dispatch('deleteSession', 'logout');
          this.$router.push('/login');
        }
      }, () => {
        this.$store.dispatch('deleteSession', 'logout');
        this.$router.push('/login');
      });
    },
    changeTab (url) {
      this.$router.push(`/${url}`);
    }
  }
};
</script>
<style lang="scss">
  .container--fluid {
    padding: 0 !important; 
  }
  .grecaptcha-badge {
    display:none !important;
    box-shadow: none !important;
  }
.v-btn--active {
    background-color: #050550 !important;
  }
.disabledView {
  .v-btn--active {
    background-color: #858585 !important;
  }
}
.headingprofile {
  text-align: left;
  h2 {
        color: #263238;
    
    // font-family: Montserrat;
    font-weight: 500;
    line-height: 1.1;
    font-size: 20px;
    margin: 0 0 6px;
    width: 100%;
  }
}
.activeTab {
  border-bottom: 3px solid #050550;;
}
</style>
