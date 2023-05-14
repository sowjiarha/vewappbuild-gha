<template>
  <div class="text-center pa-4" style="background: #e8edf2 none repeat scroll 0 0; padding: 25px 50px 50px 50px !important;">
    <v-btn style="
      position: fixed;
      top: 15px;
      z-index: 5;
      right: 30%;color: white;" class="text-right"
      depressed @click="openModal()"
      color="#050550"
    >
      <v-icon>mdi-plus</v-icon>Add company
    </v-btn>
    <div class="headingprofile">
      <v-row class="w-100 ma-0">
        <v-col cols="12">
          <v-row class="w-100 ma-0">
            <v-col @click="changeTab('')" style="cursor: pointer;" cols="1" class="pa-0">
              <span :class="$route.name === 'dashboard' ? 'activeTab' : ''" style="padding: 0 10px 5px;">
                Dashboard
              </span>
            </v-col>
            <v-col @click="changeTab('company-list')" style="cursor: pointer;" cols="2" class="pa-0">
              <span :class="$route.name !== 'dashboard' ? 'activeTab' : ''" style="padding: 0 10px 5px;">
                Company list
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <h2 style="font-weight:300; font-size:30px;">Hi, Welcome back</h2>
          <p style="font-weight:300; font-size:16px;">Amara's back-end administration panel.</p>
        </v-col>
        <v-col cols="2">
        </v-col>
        <v-col cols="1" class="text-left" style="padding-right: 0;">
          <p style="color: #878888;margin:0;">Total company</p>
          <h3 style="color: #4d575d; font-size: 25px;margin: 5px 0 0;font-weight: 300;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.companies_count">{{dashboardData.dashboard_overview.companies_count}}</h3>
        </v-col>
        <v-col cols="1" class="text-left" style="padding-left: 0;">
          <v-icon style="font-size:60px; color:#ff6b6b;">mdi-chart-bar</v-icon>
        </v-col>
        <v-col cols="1" class="text-left" style="padding-right: 0;">
          <p style="color: #878888;margin:0;" >Total users</p>
          <h3 style="color: #4d575d; font-size: 25px;margin: 5px 0 0;font-weight: 300;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.users_count">{{dashboardData.dashboard_overview.users_count}}</h3>
        </v-col>
        <v-col cols="1" class="text-left" style="padding-left: 0;">
          <v-icon style="font-size:60px; color:#6e6eff;">mdi-chart-bar</v-icon>
        </v-col>
      </v-row>
    </div>
    <div>
    <v-row style="width:100%; margin:0;">
      <v-col cols="6" class="px-0 pb-0 ">
        <v-row style="width:100%; margin:0;">
          <v-col cols="6" class="pl-0 pt-0">
            <div style="background: white; height: 100%; border-radius:10px; padding: 25px 0 25px 20px;text-align:left;">
              <div style="display:inline-block;vertical-align: top; width:60px; height:60px;background: #ff6b6b; border-radius:100px; padding: 16px;">
                <v-icon style=" font-size:30px; color: white;">mdi-office-building</v-icon>
              </div>
              <div style="display:inline-block; padding: 0 0 0 25px;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.companies_count">
                <p style="color: #878888;margin:0;">Total companies</p>
                <h3 style="color: #4d575d; line-height:48px; display:inline-block;width: 90px; font-size: 25px;    vertical-align: top;;margin: 0px 0 0;font-weight: 300;" >{{dashboardData.dashboard_overview.companies_count}}
                </h3>
                <div style="display:inline-block; border-left: 1px solid #878888; " v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.companies_status">
                  <small style="margin-left: 10px;" v-for="(u, i) in dashboardData.dashboard_overview.companies_status" :key="i">
                  <span class="text-capitalize" v-if="u.is_active">Active </span>
                  <span class="text-capitalize" v-else>Inactive </span>:<span> {{u.count}}</span><br>
                  </small>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pl-0 pt-0">
            <div style="background: white; height: 100%; border-radius:10px; padding: 25px 0 25px 20px;text-align:left;">
              <div style="display:inline-block;vertical-align: top; width:60px; height:60px;background: #63d6ff; border-radius:100px; padding: 16px;">
                <v-icon style=" font-size:30px; color: white;">mdi-account-group</v-icon>
              </div>
              <div style="display:inline-block; padding: 0 0 0 25px;">
                <p style="color: #878888;margin:0;">Total users</p>
                <h3 style="color: #4d575d; line-height:48px; display:inline-block;width: 90px; font-size: 25px;    vertical-align: top;;margin: 0px 0 0;font-weight: 300;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.users_count">{{dashboardData.dashboard_overview.users_count}}
                </h3>
                <div style="display:inline-block; border-left: 1px solid #878888;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.users_status">
                  <small style="margin-left: 10px;" v-for="(u, i) in dashboardData.dashboard_overview.users_status" :key="i">
                  <span class="text-capitalize">{{u.status}} </span>:<span> {{u.count}}</span><br>
                  </small>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pl-0">
            <div style="background: white; height: 120px; border-radius:10px; padding: 25px 30px;text-align:left;">
              <div style="display:inline-block;vertical-align: top; width:60px; height:60px;background: #6e6eff; border-radius:100px; padding: 16px;">
                <v-icon style=" font-size:30px; color: white;">mdi-office-building</v-icon>
              </div>
              <div style="display:inline-block; padding: 0 0 0 25px;">
                <p v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.account_type[1]" style="color: #878888;margin:0;">Total {{dashboardData.dashboard_overview.account_type[0].account_type}} companies</p>
                <h3 style="color: #4d575d; line-height:48px; display:inline-block;width: 90px; font-size: 25px;    vertical-align: top;;margin: 0px 0 0;font-weight: 300;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.account_type[0]">{{dashboardData.dashboard_overview.account_type[0].count}}</h3>
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pl-0">
            <div style="background: white; height: 120px; border-radius:10px; padding: 25px 30px;text-align:left;">
              <div style="display:inline-block;vertical-align: top; width:60px; height:60px;background: #f76fff; border-radius:100px; padding: 16px;">
                <v-icon style=" font-size:30px; color: white;">mdi-office-building</v-icon>
              </div>
              <div style="display:inline-block; padding: 0 0 0 25px;">
                <p v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.account_type[1]" style="color: #878888;margin:0;">Total {{dashboardData.dashboard_overview.account_type[1].account_type}} companies</p>
                <h3 style="color: #4d575d; line-height:48px; display:inline-block;width: 90px; font-size: 25px;    vertical-align: top;;margin: 0px 0 0;font-weight: 300;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.account_type[1]">{{dashboardData.dashboard_overview.account_type[1].count}}</h3>
              </div>
            </div>
          </v-col>
          <v-col cols="12" class="pl-0 text-left">
            <v-row style="width:100%; min-height:282px; align-items: center; margin:0;background: white; border-radius:10px; padding: 25px 30px;text-align:left;">
              <v-col cols="4">
                <div v-show="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.chat_response_stats.this_month.initiated" >
                  <div id="chartdiv"></div>
                </div>
                <div v-show="dashboardData && dashboardData.dashboard_overview && !dashboardData.dashboard_overview.chat_response_stats.this_month.initiated" >
                  <div style="border: 3px solid #6794dc;width: 170px;height: 170px;border-radius: 100%;padding: 60px 13px;text-align: center;">No chats this month</div>
                </div>
              </v-col>
              <v-col cols="4" style="    padding: 31px;" v-if="dashboardData && dashboardData.dashboard_overview && dashboardData.dashboard_overview.chat_response_stats">
                <p class="mb-0 heading">Total chats</p>
                <h3 style="display:inline-block; width:200px;color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;">{{dashboardData.dashboard_overview.chat_response_stats.total}}</h3>
              </v-col>
              <v-col style="border-left: 1px solid #878888; padding:0; padding-left:66px; " v-if="dashboardData" cols="4">
                <v-row class="" style="display:inline-block;">
                  <v-col cols="12">
                    <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;">{{dashboardData.dashboard_overview.chat_response_stats.initiated}}</h3>
                    Initiated
                  </v-col>
                  <v-col cols="12">
                    <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;">{{dashboardData.dashboard_overview.chat_response_stats.inProgress}}</h3>
                    Inprogress
                  </v-col>
                  <v-col cols="12">
                    <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;">{{dashboardData.dashboard_overview.chat_response_stats.completed}}</h3>
                    Completed
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="pb-0">
        <div style="margin:0; height: 614px; overflow-y: auto; background: white; border-radius:10px; padding: 0px 0px;text-align:left;" >
          <p style="color: #878888;margin:0; padding: 20px;">Activities</p>
          <div style="height: 550px; overflow-y: auto;">
          <p style="text-align: center;padding: 250px 0;">Coming soon</p>
            <!-- <v-timeline style="padding:20px 20px 0 0px;"
              align-top
              dense
            >
              <v-timeline-item
                v-for="(audit, i) in auditLog"
                :key="i"
                :color="getColor(audit.type)"
                :icon="getIcon(audit.type)"
                fill-dot
              >
                <v-card
                  :color="getColor(audit.type)"
                  dark
                >
                  <v-card-title style="font-size: 14px;padding: 0 10px; color: #263238;">
                    <v-row>
                      <v-col cols="10">
                        {{audit.type[0].toUpperCase() + audit.type.slice(1).split('_').join(' ')}}
                      </v-col>
                      <v-col cols="2">
                        <p class="mb-0" @click="viewLogDetails(audit)" style="font-size: 80%;text-decoration: underline;text-align: right;cursor:pointer;">View details</p>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text class="white pa-2 text-left text--primary">
                    <v-row>
                      <v-col cols="4">
                        {{ moment(audit.created_at).format('DD MMM YYYY hh:mm  a') }}
                      </v-col>
                      <v-col cols="8">
                        <p v-if="audit.type === 'user_login_failed'" class="mb-0">{{audit.username}}'s login failed.</p>
                        <p v-if="audit.type === 'user_login_failed'" class="mb-0">Error: {{audit.error}}</p>
                        <p v-if="audit.type === 'user_logged_in'" class="mb-0">{{audit.username}} has logged out successfully.</p>
                        <p v-if="audit.type === 'user_logged_out'" class="mb-0">{{audit.username}} has logged out successfully.</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline> -->
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row style="magin:0;">
      <v-col cols="6">
        <div class="firstNew" style="height: 400px; width:100%;background: white;border-radius: 10px; ">
          <p class="pa-4 text-left" style="color: rgb(135, 136, 136); margin: 0px;">Avatars</p>
          <v-row class="ma-0 w-100" style="max-height:335px; padding:0 20px; overflow-y: auto;">
            <v-col cols="3" v-for="(a, i) in avatarList" :key="i">
              <div class="avatarBox" style="height:147px; width:147px; border:none;">
                <v-avatar
                  size="140"
                  color="grey lighten-4"
                >
                  <div class="file-upload-form">
                    <input v-if="!a.avatar" type="file" @change="previewImage" accept="image/*">
                  </div>
                  <div class="image-preview" v-if="a && a.avatar" style="position:relative;">
                      <img style="margin-top: 5px;padding: 2px;border-radius:100%;width:100%;" class="preview" :src="a.avatar">
                      <div v-if="!a.is_active" class="overlay">Disabled</div>
                      <div @click="disableImage(a.id)" v-if="a.is_active" class="overlay1">Click here to disable</div>
                      <div @click="enableImage(a.id)" v-if="!a.is_active" class="overlay2">Click here to enable</div>
                  </div>
                </v-avatar>
              </div>
            </v-col>
            <v-col cols="3" >
              <div class="avatarBox" style="border:none;">
                <v-avatar  @click="addNewAvatar()" style="cursor:pointer;"
                  size="140"
                  color="grey lighten-4"
                >
                  <div style="padding: 5%;" icon>
                    <v-icon style=" font-size:30px; color: black;">mdi-account-plus</v-icon><br>
                    Add new
                  </div>
                </v-avatar>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6">
        <div style="height: 400px; width:100%;background: white; border-radius: 10px;">
          <p class="pa-4 text-left" style="color: rgb(135, 136, 136); margin: 0px;">Month wise company added</p>
          <div id="chartdiv1"></div>
        </div>
      </v-col>
    </v-row>
  </div>
  <addCompany ref="addcompany" class="" />
  <v-dialog
      v-model="logDetails"
      persistent
      max-width="600"
    >
      <v-card>
        <v-card-title class="text-h5">
          Audit details
        </v-card-title>
        <v-card-text>
          <v-row v-if="logData">
              <v-col cols="3">
                <strong>Date : </strong>
              </v-col>
              <v-col cols="9">
                <p class="mb-0">{{moment(logData.created_at).format('DD-MM-YYYY  HH:mm')}}</p>
              </v-col>
              <v-col cols="3">
                <strong>IP Address : </strong>
              </v-col>
              <v-col cols="9">
                <p class="mb-0" v-if="logData.extra_data">{{logData.extra_data.client_ip}}</p>
              </v-col>
              <v-col cols="3">
                <strong>User : </strong>
              </v-col>
              <v-col cols="9">
                <strong>Rajat handa</strong><br>
                <p class="mb-0">rajat@amara.ai</p>
              </v-col>
              <v-col cols="3">
                <strong>Activity in : </strong>
              </v-col>
              <v-col cols="9">
                <p class="mb-0" v-if="logData && logData.log_type">Abc company</p>
              </v-col>
              <v-col cols="3" v-if="logData.old_data">
                <strong>Old data : </strong>
              </v-col>
              <v-col cols="9" v-if="logData.old_data">
              </v-col>
              <v-col cols="3" v-if="logData.new_data">
                <strong>New data : </strong>
              </v-col>
              <v-col cols="3" v-if="logData.Activity">
                <strong>Activity: </strong>
              </v-col>
              <v-col cols="9" v-if="logData.Activity">
                  <p v-if="logData.Activity">{{logData.Activity}}</p>
              </v-col>
              
              <v-col cols="3">
                <strong>ID : </strong>
              </v-col>
              <v-col cols="9">
                <p class="mb-0" v-if="logData.id">{{logData.id}}</p>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="logDetails = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
var count = 0;
import axios from 'axios';
import Vue from 'vue';
import { mapState } from 'vuex';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
import addCompany from './dialogs/AddCompany';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
am4core.useTheme(am4themes_animated);
  export default {
    name: 'Dashboard',

    components: {
      axios,
      infiniteScroll,
      addCompany
    },

    data: () => ({
      moment: moment,
      logDetails: false,
      logData: [],
      auditLog: [],
      data: [],
      items: [
        {
          log_type: 'Login',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'amit.kumar@hirexp.com login successfully.'
        },
        {
          log_type: 'Reminder',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'amit.kumar@hirexp.com send reminder to Acme inc...'
        },
        {
          log_type: 'Company added',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'amit.kumar@hirexp.com has created a new company Abc pvt. ltd.'
        },
        {
          log_type: 'Logout',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'amit.kumar@hirexp.com logout successfully.'
        },
        {
          log_type: 'Chat feedback',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'rajat@amara.ai Download chat feedback.'
        },
        {
          log_type: 'Company updated',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'amit.kumar@hirexp.com has updated Abc pvt. ltd.'
        },
        {
          log_type: 'Login failed',
          created_at: "2022-08-25 07:42:38.458870+00:00",
          Activity: 'rajat@amara.ai attempted to login but failed.'
        },
      ],
      imageData: '',
      imageData1: '',
      imageData2: '',
      imageData3: '',
      imageData4: '',
      imageData5: '',
      companyLogo: '',
      avatarList: [],
      pagination: {
        rowsPerPage: 10,
        page: 1,
        length: 1
      },
      busy: false,
      searchCompany: '',
      filter_type: null,
      dashboardData: null,
    }),
    watch : {
      searchCompany () {
        this.getCompanyDetails()
      }
    },
  computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
    methods: {
      viewLogDetails (data) {
        this.logDetails = true;
        this.logData = data;
      },
      addNewAvatar () {
        this.avatarList.push({
          avatar: ''
        })
      },
      getIcon (type) {
        let icon = '';
        if (type === 'user_logged_in') {
          icon = 'mdi-account-arrow-left-outline'
        }
        if (type === 'user_login_failed') {
          icon = 'mdi-account-remove-outline'
        }
        if (type === 'Reminder') {
          icon = 'mdi-bell-ring-outline'
        }
        if (type === 'Company added') {
          icon = 'mdi-office-building-outline'
        }
        if (type === 'company_settings') {
          icon = 'mdi-office-building-outline'
        }
        if (type === 'company_profile') {
          icon = 'mdi-office-building-outline'
        }
        if (type === 'plan_settings') {
          icon = 'mdi-office-building-outline'
        }
        if (type === 'user_logged_out') {
          icon = 'mdi-account-arrow-right-outline'
        }
        if (type === 'Chat feedback') {
          icon = 'mdi-download-outline'
        }
        return icon;
      },
      getColor (type) {
        let color = '';
        if (type === 'user_logged_in') {
          color = 'green lighten-4'
        }
        if (type === 'user_login_failed') {
          color = 'red lighten-4'
        }
        if (type === 'user_logged_out') {
          color = 'green lighten-4'
        }
        if (type === 'Reminder') {
          color = 'indigo lighten-4'
        }
        if (type === 'Company added') {
          color = 'indigo lighten-4'
        }
        if (type === 'plan_settings') {
          color = 'indigo lighten-4'
        }
        if (type === 'company_settings') {
          color = 'indigo lighten-4'
        }
        if (type === 'company_profile') {
          color = 'indigo lighten-4'
        }
        if (type === 'Chat feedback') {
          color = 'indigo lighten-4'
        }
        return color;
      },
      removeImage () {
        this.imageData = '';
      },
      removeImage1 () {
        this.imageData1 = '';
      },
      removeImage2 () {
        this.imageData2 = '';
      },
      removeImage3 () {
        this.imageData3 = '';
      },
      removeImage4 () {
        this.imageData4 = '';
      },
      removeImage5 () {
        this.imageData5 = '';
      },
      previewImage(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
          // create a new FileReader to read this image and convert to base64 format
          var reader = new FileReader();
          // Define a callback function to run, when FileReader finishes its job
          reader.onload = (e) => {
              // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
              // Read image as base64 and set to imageData
              if (input.files[0].size < 2000000) {
                this.imageData = e.target.result;
                this.companyLogo = input.files[0];
                this.addLogo();
              } else {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: 'Image size cannot be more then 2MB!'
                });
              }
          }
          // Start the reader job - read file as a data url (base64 format)
          reader.readAsDataURL(input.files[0]);
      }
      
  },
      addLogo () {
        const formData = new FormData();
        if (this.companyLogo) {
          formData.append('avatar', this.companyLogo);
        }
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.post(`${process.env.VUE_APP_API_URL}company/avatar/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
          if (response && response.data) {
            this.imageData = '';
            this.imageData1 = '';
            this.imageData2 = '';
            this.imageData3 = '';
            this.imageData4 = '';
            this.imageData5 = '';
            this.getAvatar();
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Company updated successfully!'
            });
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: err.response.data.error
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to fetch details, Please try again later!'
            });
          }
        });
      },
      // getAuditLog () {
      //   axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
      //   axios.get(`${process.env.VUE_APP_API_URL}company/audit`).then((response) => {
      //     if (response && response.data && response.data.results) {
      //       this.auditLog = response.data.results;
      //     }
      //   }).catch((err) => {
      //     if (err.response.status === 429) {
      //       this.$store.dispatch('updateSnackbar', {
      //         color: 'error',
      //         show: true,
      //         text: err.response.data.error
      //       });
      //     } else {
      //       this.$store.dispatch('updateSnackbar', {
      //         color: 'error',
      //         show: true,
      //         text: 'Unable to fetch audit logs, Please try again later!'
      //       });
      //     }
      //   });
      // },
      disableImage (id) {
        this.$swal({
          title: 'Are you sure?',
          text: "You want to disable this avatar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, disable!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
            axios.patch(`${process.env.VUE_APP_API_URL}company/avatar/?avatar_id=${id}`, {
              is_active: false,
            }).then((response) => {
              if (response && response.data) {
                this.getAvatar();
                this.$store.dispatch('updateSnackbar', {
                  color: 'success',
                  show: true,
                  text: 'Company updated successfully!'
                });
              }
            }).catch((err) => {
              if (err.response.status === 429) {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: err.response.data.error
                });
              } else {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: 'Unable to fetch details, Please try again later!'
                });
              }
            });
          }
        });
      },
      enableImage (id) {
        this.$swal({
          title: 'Are you sure?',
          text: "You want to enable this avatar!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, enable!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
            axios.patch(`${process.env.VUE_APP_API_URL}company/avatar/?avatar_id=${id}`, {
              is_active: true,
            }).then((response) => {
              if (response && response.data) {
                this.getAvatar();
                this.$store.dispatch('updateSnackbar', {
                  color: 'success',
                  show: true,
                  text: 'Company updated successfully!'
                });
              }
            }).catch((err) => {
              if (err.response.status === 429) {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: err.response.data.error
                });
              } else {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: 'Unable to fetch details, Please try again later!'
                });
              }
            });
          }
        });
      },
      getAvatar () {
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.get(`${process.env.VUE_APP_API_URL}company/avatar`).then((response) => {
          if (response && response.data) {
            this.avatarList = response.data;
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: err.response.data.error
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to fetch details, Please try again later!'
            });
          }
        });
      },
      logout () {
      axios.post(`${process.env.VUE_APP_API_URL}logout`).then((response) => {
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
    },
      scrollToElement() {
    const el = this.$refs.scrollToMe;

    if (el) {
      // Use el.scrollIntoView() to instantly scroll to the element
      el.scrollIntoView({behavior: 'smooth'});
    }
  },
      openDetails (item) {
        this.$router.push(`/company-details?cid=${item.id}`);
      },
      applyFilter (data) {
        this.filter_type = data;
        this.getCompanyDetails();
        this.scrollToElement();
      },
      openModal () {
        this.$refs.addcompany.dialog = true;
        this.$refs.addcompany.company = {};
        this.$refs.addcompany.company.companies_avatar = this.avatarList;
        this.$refs.addcompany.company.is_active = true;
        this.$refs.addcompany.company.chat_cobranding_enabled = false;
        this.$refs.addcompany.company.allow_stage_edit = false;
      },
      loadMore() {
      this.busy = true;
 
        setTimeout(() => {
          for (var i = 0, j = 10; i < j; i++) {
            this.data.push({ name: count++ });
          }
          this.busy = false;
        }, 1000);
      },
      editCompany (data) {
        this.$router.push(`/company-details?cid=${data.id}&editview=true`);
      },
      lineChart (val) {
        am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("chartdiv1", am4charts.XYChart);

const temp = [];
// this.$lodash.each(val, (v, key) => {
//         const t = {};
//         t.year = dayjs(new Date(key));
//         temp.push(t);
//       });
      for (const [key, value] of Object.entries(val)) {
  console.log(key, value);
  const t = {};
        t.date = key;
        t.value = value.account_type.paid ? value.account_type.paid : 0 ;
        t.value2 = value.account_type.pilot ? value.account_type.pilot : 0;
        temp.push(t);
}
// Add data
console.log(temp);
chart.data = temp;
console.log(chart.data);

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 30;
dateAxis.skipEmptyPeriods = true; 
// dateAxis.groupData = true;
dateAxis.baseInterval = {
  "timeUnit": "month",
  "count": 1
};


// Set date label formatting
dateAxis.dateFormatter.dateFormat = "yyyy-MM";

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());



  // Create series
  function createSeries(field, name) {
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "date";
    series.name = name;
    series.tooltipText = "{name}: [b]{valueY}[/]";
    series.strokeWidth = 2;
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = am4core.color("#fff");
    bullet.circle.strokeWidth = 2;
    return series;
  }

  var series1 = createSeries("value", "Paid");
  var series2 = createSeries("value2", "Pilot");

  chart.legend = new am4charts.Legend();
  chart.cursor = new am4charts.XYCursor();
},
accountTypeChart (data) {
  const that = this;
  am4core.addLicense("ch-custom-attribution");
  var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = [{
  "country": "Initiated",
  "litres": data.initiated
}, {
  "country": "InProgress",
  "litres": data.inProgress
}, {
  "country": "Completed",
  "litres": data.completed
}]

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";


// Let's cut a hole in our Pie chart the size of 40% the radius
chart.innerRadius = am4core.percent(70);

// Disable ticks and labels

pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Disable tooltips
pieSeries.slices.template.tooltipText = "{category}: {value.value}";
// pieSeries.slices.template.tooltipText = "";
pieSeries.slices.template.propertyFields.fill = "color";
pieSeries.labels.template.disabled = true;


pieSeries.ticks.template.disabled = true;
pieSeries.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
pieSeries.slices.template.events.on("hit", function(ev) {
  console.log(ev.target.dataItem.properties.category);
  if (ev.target.dataItem.properties.category === 'Paid') {
    that.applyFilter('paid');
  } else {
    that.applyFilter('pilot');
  }
})
var label = pieSeries.createChild(am4core.Label);
console.log(chart.data);
label.text = 'Chat this month';
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.fontSize = 15;
label.fontWeight = 300;
label.x = 0;
label.y = -10;
// label.x = 0;
// label.y = -25;
// var label = pieSeries.createChild(am4core.Label);
// console.log(chart.data);
// label.text = 'this month';
// label.horizontalCenter = "middle";
// label.verticalCenter = "middle";
// label.fontSize = 16;
// label.x = 0;
// label.y = -10;

var label1 = pieSeries.createChild(am4core.Label);
console.log(chart.data);
label1.text = data.total;
label1.horizontalCenter = "middle";
label1.verticalCenter = "middle";
label1.fontSize = 30;
label1.x = 0;
label1.y = 15;
      },
      getCompanyDetails () {
        const queryParams = {
          count: 'true',
          page_limit: this.pagination.rowsPerPage,
          page_offset: this.pagination.page || 1,
          raw_search_string: this.searchCompany,
          account_type: this.filter_type ? this.filter_type : undefined,
        };
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.get(`${process.env.VUE_APP_API_URL}company/dashboard?fields=dashboard_overview,companies_response_trends,chat_response_stats,chat_response_stats`, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            this.dashboardData = response.data;
            this.pagination.length = Math.ceil(response.data.companies_overview.companies_count / this.pagination.rowsPerPage);
            // console.log(this.company);
            if (response.data && response.data.dashboard_overview.chat_response_stats.this_month) {
              this.accountTypeChart(response.data.dashboard_overview.chat_response_stats.this_month);
            }
            if (response.data && response.data.dashboard_overview.companies_response_trends) {
              this.lineChart(response.data.dashboard_overview.companies_response_trends);
            }
            
          }
        }).catch((err) => {
          // if (err.response.status === 401) {
          //   this.logout();
          // }
          if (err.response.status === 429) {
            this.config.savingStage = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: err.response.data.error
            });
          }
        });
      },
      reloadPage () {
        // window.location.reload();
      },
    },
    mounted () {
      this.getCompanyDetails();
      this.loadMore();
      this.getAvatar();
      // this.getAuditLog();
      if (!this.user.email) {
        this.$router.push(`/login`);
      }
    }
  }
</script>
<style lang="scss" >
.image-preview:hover .overlay1 {
  display: block;
}
.image-preview:hover .overlay2 {
  display: block;
}
.overlay1 {
  display: none;
  position: absolute; 
  bottom: 0; 
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  color: #f1f1f1; 
  width: 100%;
  cursor:pointer;
  transition: .5s ease;
  opacity:1;
  font-size:16px;
  color: white;
  padding: 10px 0;
  text-align: center;
}
.overlay2 {
  display: none;
  position: absolute; 
  bottom: 0; 
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5); /* Black see-through */
  color: #f1f1f1; 
  width: 100%;
  cursor:pointer;
  transition: .5s ease;
  opacity:1;
  font-size:16px;
  color: white;
  padding: 10px 15px 15px 15px;
  text-align: center;
}
input[type=file] {
  cursor: pointer;
  width: 130px;
  height: 130px;
  padding:10px;
  border-radius: 10px;
  overflow: hidden;
  background: #f1f1f1;
}

input[type=file]:before {
  content: 'Drag and drop \A or \A click to add \A avatar';
  vertical-align: middle;
  white-space: pre-wrap;
  text-align: center;
  font-size: .8em;
  display: inline-block;
  background: #f1f1f1;
  padding: 20% 10px;
  font-family: Helvetica, Arial, sans-serif;
}

input[type=file]::-webkit-file-upload-button {
  visibility: hidden;
}
.heading {
  font-size: 16px;
  padding-top:10px;
}
.dashboardCount {
  font-size: 70px;
  padding:10%;
}
.mainBox {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 16px 11px rgb(0 0 0 / 6%), 0 4px 8px rgb(0 0 0 / 10%) !important;
  height: 16rem;
  transition: 0.5s;
  -webkit-transition: 0.5s;
  text-align: center;
}
.tableDash {
  text-align: left;
  padding: 10px;;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 16px 11px rgb(0 0 0 / 6%), 0 4px 8px rgb(0 0 0 / 10%) !important; 
  margin-top:15px;
}
.v-btn--active {
  background-color: #050550 !important;
}
.disabledView {
  .v-btn--active {
    background-color: #858585 !important;
  }
}
#chartdiv1 {
  height: 360px;
  width:100%;;
}

.primary--text {
  color: #050550 !important;
}
#chartdiv {
  width: 100%;
  height: 210px;
  
}
.headingprofile {
  text-align: left;
  h2 {
    color: #263238;
    font-weight: 500;
    line-height: 1.1;
    font-size: 20px;
    margin: 0 0 6px;
    width: 100%;
  }
}
.firstNew::before {
    background: #fff none repeat scroll 0 0;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0.8;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
}
.overlay {
  position: absolute; 
  bottom: 0; 
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.3); /* Black see-through */
  color: #ffffff; 
  width: 100%;
  transition: .5s ease;
  opacity:1;
  font-size:16px;
  color: white;
  padding: 72% 0 20% 0;
  text-align: center;
}
::-webkit-scrollbar-track
{
	// -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #ffffff;
}

::-webkit-scrollbar
{
	width: 12px;
	background-color: #ffffff;
}

::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	// -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #ccc;
}
.v-timeline-item__inner-dot {
  .v-icon {
    color: #263238;
  }
}
</style>
