<template>
  <div class="text-center pt-0 onlyThis pa-4" style="background: #e8edf2 none repeat scroll 0 0; padding: 25px 50px 50px 50px !important;">
  <!-- <v-btn style="
    position: fixed;
    top: 15px;
    z-index: 5;
    right: 30%;color: white;" class="text-right"
    depressed @click="openModal()"
    color="#050550"
  >
    <v-icon>mdi-plus</v-icon>Add company
  </v-btn> -->
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
            <span :class="$route.name === 'companyList' ? 'activeTab' : ''" style="padding: 0 10px 5px;">
              Company list
            </span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6">
        <h2 style="font-weight:300; font-size:30px;">Hi, Welcome back</h2>
        <p style="font-weight:300; font-size:16px;">Amara's back-end administration panel.</p>
      </v-col>
      <v-col cols="6">
      </v-col>
    </v-row>
    
  </div>
      <v-toolbar flat style="height:60px !important; border-radius: 10px 10px 0 0;    padding: 11px 0 0 50px;">

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->

      <template v-slot:extension>
        <v-tabs
        v-model="tabs"
        >
          <v-tabs-slider style="color: #050550 !important;"></v-tabs-slider>
          
          <v-tab
            href="#c_details"
            class="app--text"
          >Company details
          </v-tab>

          <v-tab @click="getAdmins($route.query.cid)"
            href="#c_admins"
            class="app--text"
          >Admins
          </v-tab>
          <v-tab @click="getSatges($route.query.cid)"
            href="#c_touchpoints"
            class="app--text"
          >Touchpoints
          </v-tab>
          <v-tab href="#c_summary"
            class="app--text"
          >Company summary
          </v-tab>
          
        </v-tabs>
      </template>
      
    </v-toolbar>
    <div style="z-index:2; position: absolute;right: 5%;top: 190px;;">
    <v-btn class="mr-2" v-if="tabs === 'c_details'" style="z-index:99999; color: white;" @click="editDetails(companyData);" color="#050550">
      <v-icon class="mr-2">mdi-square-edit-outline</v-icon> Edit
    </v-btn>
    <v-btn class="mr-2" v-if="tabs === 'c_admins'" style="z-index:99999; color: white;" @click="openAdminModal()" color="#050550">
      <v-icon class="mr-2">mdi-plus</v-icon> Add admin
    </v-btn>
    <v-btn v-if="tabs === 'c_touchpoints'" class="text-right mr-2" style="z-index:99999; color: white;"
      depressed @click="openTouchpointModal()"
      color="#050550" 
    >
      <v-icon class="mr-2">mdi-plus</v-icon> Add touchpoint
    </v-btn>
    <!-- <v-btn v-if="tabs === 'c_summary'" class="mr-2" style="z-index:99999; color: white;" @click="sendReminder(companyData)" color="#050550">
        <v-icon class="mr-2">mdi-bell-ring-outline</v-icon> Send reminder
      </v-btn>
    <v-btn class="mr-2" style="z-index:99999; color: white;" @click="downloadRating(companyData)" color="#050550">
        <v-icon class="mr-2">mdi-cloud-download-outline</v-icon> Happiness index
      </v-btn> -->
    </div>
    

    <v-tabs-items style="border-radius:  0 0 10px 10px;padding: 0 60px 25px; min-height: 400px;" v-model="tabs">
      <v-tab-item v-if="companyData"
        :value="'c_details'"
      >
        <v-card flat  style="box-shadow:none;">
          <v-row class="w-100 ma-0 pt-4">
            <h3>Basic details</h3>
            <v-col cols="12" class="pl-0 pt-0 my-4" style="background: #f8f8f8; border-radius:10px;">
              <v-row class="w-100 ma-0 text-left" style="    align-items: center;">
                <v-col cols="2">
                  <img v-if="companyData.company_details && companyData.company_details.company_logo" style="width:80%;"  :src="companyData.company_details.company_logo">
                  <img v-else style="width:80%;"  src="../assets/noLogo.png">
                </v-col>
                <v-col cols="3" style="    font-size: 25px;font-weight: 500;">
                  {{companyData.company_details.company_name}}
                  <v-tooltip bottom v-if="companyData.plan_details.account_type === 'Paid' || companyData.plan_details.account_type === 'paid'">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" style="color:green; border: 1px solid; padding: 2px;border-radius: 100%;" >
                                          mdi-currency-usd
                                        </v-icon>
                        </template>
                        <span>Paid</span>
                      </v-tooltip>
                      <v-tooltip bottom v-else>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs"
                            v-on="on" style="border: 1px solid;padding: 2px;border-radius: 100%;" >
                                          mdi-currency-usd-off
                                        </v-icon>
                        </template>
                        <span>Pilot</span>
                      </v-tooltip>
                </v-col>
                <v-col cols="7">
                <!-- <label>Account status</label> -->
                <v-radio-group disabled
                  v-model="companyData.company_details.is_active"
                  row
                >
                  <v-radio color="#050550"
                    label="Active"
                    :value="true"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Inactive"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
              </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Brand name</p>
                    <span style="font-weight:bold;">{{companyData.company_details.brand_name}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="   padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Industry type</p>
                    <span style="font-weight:bold;">{{companyData.company_details.company_type}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="   padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Go live date</p>
                    <span style="font-weight:bold;" v-if="companyData.company_details.activatedAt">{{formatDate1(companyData.company_details.activatedAt)}}</span>
                    <span style="font-weight:bold;" v-else>--</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="   padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Employee strength</p>
                    <span style="font-weight:bold;" v-if="companyData.company_details.employee_strength">{{companyData.company_details.employee_strength}}</span>
                    <span style="font-weight:bold;" v-else>--</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="   padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;" >Users booked</p>
                    <span style="font-weight:bold;" v-if="companyData.company_details.user_booked">{{companyData.company_details.user_booked}}</span>
                    <span style="font-weight:bold;" v-else>--</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Address</p>
                    <span style="font-weight:bold;">{{companyData.company_details.company_address}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="   padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Country</p>
                    <span style="font-weight:bold;">{{companyData.company_details.country}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                </v-col>
              </v-row>
              <p class="mb-0 mt-4 text-left pl-3" style="font-weight: 600;">Avatars</p><br>
              <v-row class="w-100 ma-0">
                <v-col cols="12" v-if="companyData && companyData.company_details && companyData.company_details.companies_avatar">
                  <v-row class="w-100 ma-0">
                    <v-col cols="3" v-for="(a, i) in companyData.company_details.companies_avatar" :key="i">
                      <div class="avatarBox" :style="companyData.company_details.company_avatar == i ? `border-color:#050550; border-width: 2px; position:relative;` : ''" >
                        <img style="margin-top:10px; padding: 0px 30%; width:100%;" :src="a" alt="">
                        <v-icon v-if="companyData.company_details.company_avatar == i" class="mb-0" style="position: absolute; top: 0; right:5px; text-align: center; font-size:40px !important; color:#050550;">mdi-check-all</v-icon>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <p class="mb-0 mt-4 text-left pl-3" style="font-weight: 600;">SPOC details</p>
              <v-row class="w-100 ma-0 text-left" style="    align-items: center;">
                
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">SPOC name</p>
                    <span style="font-weight:bold;">{{companyData.company_details.spoc_name}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">SPOC email</p>
                    <span style="font-weight:bold;">{{companyData.company_details.spoc_email}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">SPOC phone</p>
                    <span style="font-weight:bold;">{{companyData.company_details.spoc_phone}}</span>
                  </div>
                </v-col>
              </v-row>
                <p class="mb-0 mt-4 text-left pl-3" style="font-weight: 600;">Social URLs</p>
                <v-row class="w-100 ma-0 text-left" style="    align-items: center;">
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                  <p class="mb-0" style="font-size: 80%;">Facebook url</p>
                  <span style="font-weight:bold;" v-if="companyData.company_details.facebook_link">{{companyData.company_details.facebook_link}}</span>
                  <span v-else>--</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                  <p class="mb-0" style="font-size: 80%;">Glassdoor url</p>
                  <span style="font-weight:bold;" v-if="companyData.company_details.glassdoor_link">{{companyData.company_details.glassdoor_link}}</span>
                  <span v-else>--</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                  <p class="mb-0" style="font-size: 80%;">Linkedin url</p>
                  <span style="font-weight:bold;" v-if="companyData.company_details.linkedin_link">{{companyData.company_details.linkedin_link}}</span>
                  <span v-else>--</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                  <p class="mb-0" style="font-size: 80%;">jobStreet url</p>
                  <span style="font-weight:bold;" v-if="companyData.company_details.jobStreet_link">{{companyData.company_details.jobStreet_link}}</span>
                  <span v-else>--</span>
                  </div>
                </v-col>
                
                
              </v-row>
              
            </v-col>
            <h3 >Plan details</h3>
            <v-col cols="12" class="my-4" style="background: #f8f8f8; border-radius:10px;">
              <v-row class="w-100 ma-0 text-left">
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Title</p>
                    <span style="font-weight:bold;">{{companyData.plan_details.title}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Adhoc active</p>
                    <span style="font-weight:bold" v-if="companyData.plan_details.adhoc_active">Yes</span>
                  <span style="font-weight:bold" v-else>No</span>
                  </div>
                </v-col>
                <v-col cols="4" v-if="companyData.plan_details.adhoc_active">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Adhoc limit</p>
                    <span style="font-weight:bold;">{{companyData.plan_details.adhoc_limit}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Touchpoints active</p>
                    <span style="font-weight:bold" v-if="companyData.plan_details.milestone_active">Yes</span>
                  <span style="font-weight:bold" v-else>No</span>
                  </div>
                </v-col>
                <v-col cols="4" v-if="companyData.plan_details.adhoc_active">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Touchpoints limit</p>
                    <span style="font-weight:bold">{{companyData.plan_details.milestone_limit}}</span>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px;">
                    <p class="mb-0" style="font-size: 80%;">Exit active</p>
                    <span style="font-weight:bold" v-if="companyData.plan_details.exit_active">Yes</span>
                  <span style="font-weight:bold" v-else>No</span>
                  </div>
                </v-col>
                </v-row>
            </v-col>
            <h3 >Company settings</h3>
            <v-col cols="12" class="my-4" style="background: #f8f8f8; border-radius:10px;">
              <v-row class="w-100 ma-0 text-left">
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                    <p class="mb-0" style="font-size: 80%;">Co-branding</p>
                    <!-- <v-bottom-navigation :class="editView ? '' : 'disabledView'" style="height:35px;margin-top:6px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="companyData.company_details.chat_cobranding_enabled"  color="white">
                      <v-btn :value="false">
                      <span>Disabled</span>
                      </v-btn>

                      <v-btn :value="true">
                      <span>Enabled</span>
                      </v-btn>
                      
                  </v-bottom-navigation> -->
                  <v-radio-group disabled
                  v-model="companyData.company_details.chat_cobranding_enabled"
                  row
                >
                  <v-radio color="#050550"
                    label="Enable"
                    :value="true"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Disable"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                    <p class="mb-0" style="font-size: 80%;">Resolution summary</p>
                    <!-- <v-bottom-navigation :class="editView ? '' : 'disabledView'" style="height:35px; margin-top:6px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="companyData.company_settings.enable_resolution_summary"  color="white">
                      <v-btn value="0">
                      <span>Disabled</span>
                      </v-btn>

                      <v-btn value="1">
                      <span>Enabled</span>
                      </v-btn>
                      
                  </v-bottom-navigation> -->
                  <v-radio-group disabled
                  v-model="companyData.company_settings.enable_resolution_summary"
                  row
                >
                  <v-radio color="#050550"
                    label="Optional"
                    value="1"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Mandatory"
                    value="2"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Disable"
                    value="0"
                  ></v-radio>
                </v-radio-group>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                    <p class="mb-0" style="font-size: 80%;">Touchpoint edit</p>
                    <!-- <v-bottom-navigation style="height:35px; margin-top:6px; width:160px; float:left;"  :class="editView ? '' : 'disabledView'" v-model="companyData.company_details.allow_stage_edit"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
               </v-bottom-navigation> -->
               <v-radio-group disabled
                  v-model="companyData.company_details.allow_stage_edit"
                  row
                >
                  <v-radio color="#050550"
                    label="Enable"
                    :value="true"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Disable"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
                  </div>
                </v-col>

                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                    <p class="mb-0" style="font-size: 80%;">Employer Branding</p>
                    <!-- <v-bottom-navigation style="height:35px; margin-top:6px; width:160px; float:left;"  :class="editView ? '' : 'disabledView'" v-model="companyData.company_settings.enable_brand_promotion_feedback"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
               </v-bottom-navigation> -->
               <v-radio-group disabled
                  v-model="companyData.company_settings.enable_brand_promotion_feedback"
                  row
                >
                  <v-radio color="#050550"
                    label="Enable"
                    :value="true"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Disable"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
                  </div>
                </v-col>
                <v-col cols="4" v-if="companyData.company_settings.enable_brand_promotion_feedback">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:107px;">
                    <p class="mb-0" style="font-size: 80%;">Select employer branding</p>
                    <v-autocomplete :disabled="!editView"  v-if="companyData.company_settings.enable_brand_promotion_feedback"
                        :items="LinkItem"
                        v-model="companyData.company_settings.brand_promotion_feedback_field"
                        item-text="name" hide-details
                        placeholder="Select employer branding"
                        outlined dense
                      ></v-autocomplete>
                  </div>
                </v-col>
                <v-col cols="4">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                    <p class="mb-0" style="font-size: 80%;">Auto assign</p>
                    <!-- <v-bottom-navigation :class="editView ? '' : 'disabledView'" style="height:35px; margin-top:6px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="companyData.company_settings.enable_auto_assign"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group disabled
                  v-model="companyData.company_settings.enable_auto_assign"
                  row
                >
                  <v-radio color="#050550"
                    label="Enable"
                    :value="true"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Disable"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
                  </div>
                </v-col>
                <v-col cols="4" v-if="companyData.company_settings.enable_auto_assign">
                  <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:107px;">
                    <p class="mb-0" style="font-size: 80%;">Auto assignd to</p>
                    <v-autocomplete style="margin-top:6px;" :disabled="!editView"  v-if="companyData.company_settings.enable_auto_assign"
                        :items="autoAssignItem" hide-details
                        v-model="companyData.company_settings.auto_assign_reference_field"
                        item-text="name"
                        placeholder="Select employer branding"
                        outlined dense
                      ></v-autocomplete>
                  </div>
                </v-col>

              <v-col cols="4">
                <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                    <p class="mb-0" style="font-size: 80%;">Alert word</p>
                    <!-- <v-bottom-navigation style="height:35px; width:160px; margin-top:6px; float:left;" @click.native="enableAlertWords" :class="editView ? '' : 'disabledView'" v-model="companyData.company_settings.chat_alert_word_notification"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group disabled
                  v-model="companyData.company_settings.chat_alert_word_notification"
                  row
                >
                  <v-radio color="#050550"
                    label="Enable"
                    :value="true"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Disable"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
                  </div>
              </v-col>
              <v-col cols="12" v-if="companyData.company_settings.chat_alert_word_notification">
                <div style="padding:10px; border: 1px solid #bdbdbd;border-radius: 10px; min-height:90px;">
                  <p class="mb-0" style="font-size: 80%;">Selected alert words</p>
                    <v-chip v-for="(w, i) in companyData.company_settings.chat_alert_words" :key="i"
                    color="#050550" 
                    class="text-capitalize mr-2 mt-2"
                    outlined
                    >
                    <strong class="text-capitalize">{{ w }}</strong>
                    </v-chip>
                </div>
              </v-col>
              </v-row>
            </v-col>
            
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :value="'c_admins'"
      >
        <v-card class="py-4"  style="box-shadow:none;">
          <div v-if="companyAdmins.length < 1" style="border:1px solid #d7d7d7; padding:10%">
            <img style="width:15%;" src="../assets/amara_avatar.png" alt=""><br>
            <p style="margin-bottom:10px;    color: #9e9e9e !important; font-weight:400;    font-size: 26px;">You haven’t added any admin yet. Please add admin!</p>
            <v-btn class="text-right" style="color: white;"
              depressed @click="openAdminModal()"
              color="#050550"
            >
              Add admin
            </v-btn>  
          </div>
          <div v-if="companyAdmins.length > 0">
            <v-row class="w-100 ma-0 text-left">
              <v-col cols="1">
                S/N
              </v-col>
              <v-col cols="3">
                Name
              </v-col>
              <v-col cols="2">
                Department
              </v-col>
              <v-col cols="2">
                Joining date
              </v-col>
              <v-col cols="1">
                Gender
              </v-col>
              <v-col cols="1">
                Location
              </v-col>
              <v-col cols="2">
                Actions
              </v-col>
            </v-row>
            <v-row class="w-100 ma-0 text-left" v-for="(s, i) in companyAdmins"  :key="i">
              <v-col cols="1">
                {{i+1}}
              </v-col>
              <v-col cols="3">
                {{s.display_name}}<br>
                {{s.email}}
              </v-col>
              <v-col cols="2">
                {{s.department}}
              </v-col>
              <v-col cols="2">
                {{ moment(s.joining_date).format('DD MMM YYYY') }}
              </v-col>
              <v-col cols="1">
                <span v-if="s.gender">{{s.gender}}</span>
                <span v-else>--</span>
              </v-col>
              <v-col cols="1" @click="getSatgeDetails(s.stage_details.survey, s.stage_details.id)">
                {{s.location}}
              </v-col>
              <v-col cols="2" >
                <v-btn icon  @click="openAdminModal(s)">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn v-if="s.user_id" text outlined @click="resendEmail(s.user_id)">
                  Resend email
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :value="'c_touchpoints'"
      >
        <v-card style="box-shadow:none;">
          <div v-if="companyTouchpoints.length < 1" style="border:1px solid #d7d7d7; padding:10%">
            <img style="width:15%;" src="../assets/amara_avatar.png" alt=""><br>
            <p style="margin-bottom:10px;    color: #9e9e9e !important; font-weight:400;    font-size: 26px;">You haven’t added any touchpoint yet. Please add touchpoint!</p>
            <v-btn class="text-right" style="color: white;"
              depressed :loading="loading" @click="openTouchpointModal()"
              color="#050550" 
            >
              Add touchpoint
            </v-btn>  
          </div>
          <div v-if="companyTouchpoints.length > 0">
            <v-row class="w-100 ma-0 text-left">
              <v-col cols="1">
                S/N
              </v-col>
              <v-col cols="3">
                Touchpoint
              </v-col>
              <v-col cols="2">
                Trigger time
              </v-col>
              <v-col cols="2">
                Status
              </v-col>
              <v-col cols="2">
                Chat for user
              </v-col>
              <v-col cols="2">
                Action
              </v-col>
            </v-row>
            <v-row class="w-100 ma-0 text-left" v-for="(s, i) in companyTouchpoints"  :key="i">
              <v-col cols="1">
                {{((pagination.page-1)*10)+i+1}}
              </v-col>
              <v-col cols="3" v-if="s.stage_details">
                {{s.stage_details.title}}
              </v-col>
              <v-col cols="2" v-if="s.stage_details">
                {{s.stage_details.trigger_time_ym_formatted}}
              </v-col>
              <v-col cols="2" v-if="s.stage_details">
                <v-chip class="text-capitalize">{{s.stage_details.status}}</v-chip>
              </v-col>
              <v-col cols="2" v-if="s.stage_details">
                <span v-if="s.stage_details.chatFromUser__name">{{s.stage_details.chatFromUser__name}}</span>
                <span v-else>--</span>
              </v-col>
              <v-col cols="2" v-if="s.stage_details">
                <v-btn small v-if="s.stage_details.status === 'live'" outlined @click="deactivateStage(s.stage_details.id)" style=" margin-top:-10px;   color: rgb(5, 5, 80) !important;" color="#050550">
                    Deactivate
                  </v-btn>
                  <v-btn small v-if="s.stage_details.status !== 'live'" outlined @click="getSatgeDetails(s.stage_details.survey, s.stage_details.id)" style=" margin-top:-10px;   color: rgb(5, 5, 80) !important;" color="#050550">
                    Activate
                  </v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="d-flex" v-if="companyTouchpoints.length > 0">
        <v-flex xs1></v-flex>
        <v-flex class="pr-4 mb-0 ml-3" xs10 style="text-align:center">
          <v-pagination
            class="adhoc--text"
            color="primary"
            v-model="pagination.page"
            :length="pagination.length"
            :total-visible="7"
            @input="getSatges($route.query.cid)"
            circle
          ></v-pagination>
        </v-flex>
        <v-flex xs1></v-flex>
      </div>
        </v-card>
      </v-tab-item>
      <v-tab-item v-if="companyData"
        :value="'c_summary'"
      >
        <v-card flat  style="box-shadow:none;">
          <h3 class="my-2 text-left">Chat details</h3>
          <v-row style="width:100%;    align-items: center; margin:0;    background: rgb(248, 248, 248); border-radius:10px; padding: 25px 30px;text-align:left;">
            
            <v-col cols="3" style="    padding: 31px;" v-if="companyData && companyData.summary && companyData.summary.chat_response_stats">
            <p class="mb-0 heading">Total chats</p>
            <h3 style="display:inline-block; width:200px;color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;">{{companyData.summary.chat_response_stats.total}}</h3>
            </v-col>
            <v-col cols="3">
              <p class="mb-0 heading">Initiated</p>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-if="companyData.summary.chat_response_stats.initiated">{{companyData.summary.chat_response_stats.initiated}}</h3>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-else>--</h3>
              
            </v-col>
             <v-col cols="3">
               <p class="mb-0 heading">Inprogress</p>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-if="companyData.summary.chat_response_stats.inProgress">{{companyData.summary.chat_response_stats.inProgress}}</h3>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-else>--</h3>
              
            </v-col>
            <v-col cols="3">
              <p class="mb-0 heading">Completed</p>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-if="companyData.summary.chat_response_stats.completed">{{companyData.summary.chat_response_stats.completed}}</h3>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-else>--</h3>
              
            </v-col>
          </v-row>
          <h3 class="my-2 text-left">User details</h3>
          <v-row style="width:100%;    align-items: center; margin:0;    background: rgb(248, 248, 248); border-radius:10px; padding: 25px 30px;text-align:left;">
            
            <v-col cols="3" style="    padding: 31px;" v-if="companyData && companyData.summary && companyData.summary.chat_response_stats">
            <p class="mb-0 heading">Total booked users</p>
            <h3 style="display:inline-block; width:200px;color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-if="companyData.company_details.user_booked">{{companyData.company_details.user_booked}}</h3>
            <h3 style="display:inline-block; width:200px;color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-else>--</h3>
            </v-col>
            <v-col cols="3" v-for="(u, i) in companyData.company_details.users_status" :key="i">
              <p class="mb-0 heading text-capitalize">{{u.status}}</p>
              <h3 style="color: rgb(77, 87, 93); font-size: 25px; margin: 5px 0px 0px; font-weight: 300;" v-if="u.count">{{u.count}}</h3>
              
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <addCompany ref="addcompany" class="" />
    <addTouchpoint ref="addtouchpoint" class="" />
    <stageDetails ref="stagedetails" class="" />
    <addAdmin ref="addadmin" class="" />
  </div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import customParseFormat from 'dayjs-ext/plugin/customParseFormat';
import addCompany from './dialogs/AddCompany';stageDetails
import addTouchpoint from './dialogs/AddTouchpoint';
import stageDetails from './dialogs/StageDetails';
import addAdmin from './dialogs/AddAdmin';
import moment from 'moment';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
  export default {
    name: 'HelloWorld',

    components: {
      axios,
      dayjs,
      // relativeTime,
      // customParseFormat,
      addCompany,
      addTouchpoint,
      stageDetails,
      addAdmin
    },

    data: () => ({
      moment: moment,
      avatarList: [],
      pagination: {
        rowsPerPage: 10,
        page: 1,
        length: 1
      },
      autoAssignItem: [{
        name: 'HR Manager',
        value: 'hr_manager'
      }, {
        name: 'HRBP',
        value: 'hrbp'
      }],
      LinkItem: [{
        name: 'Glassdoor',
        value: 'glassdoor_link'
      }, {
        name: 'JobStreet',
        value: 'jobStreet_link'
      }, {
        name: 'Linkedin',
        value: 'linkedin_link'
      }, {
        name: 'Facebook',
        value: 'facebook_link'
      }],
      tabs: null,
      editView: false,
      loading: false,
      companyData: null,
      companyTouchpoints: [],
      selectedStage: '',
      companyAdmins: [],
      companyDataOld: [],
      planOld: [],
      settingsOld: [],
      company: {},
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
  computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
    methods: {
      changeTab (url) {
      this.$router.push(`/${url}`);
    },
    formatDate1 (date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    // sendReminder () {
    //   this.$swal({
    //       title: 'Are you sure?',
    //       text: "You want to send reminder!",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, send!'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
    //         axios.get(`${process.env.VUE_APP_API_URL}reminder/trigger_reminders/${this.$route.query.cid}`, {
    //             status: 'draft'
    //         }).then((response) => {
    //           if (response && response.data) {
    //               this.$store.dispatch('updateSnackbar', {
    //                 color: 'success',
    //                 show: true,
    //                 text: 'Reminder sent successfully!'
    //               });
    //             // this.$refs.stagedetails.stageDialog = true;
    //             // this.$refs.stagedetails.stageData = response.data;
    //             // console.log(this.company);
    //           }
    //         }).catch((err) => {
    //           if (err.response.status === 429) {
    //             this.config.savingStage = false;
    //             this.$store.dispatch('updateSnackbar', {
    //               color: 'error',
    //               show: true,
    //               text: err.response.data.error
    //             });
    //           } else {
    //             this.$store.dispatch('updateSnackbar', {
    //               color: 'error',
    //               show: true,
    //               text: 'Unable to send reminder, Please try again later!'
    //             });
    //           }
    //         });
    //       }
    //     });
    // },
      deactivateStage (id1) {
        this.$swal({
          title: 'Are you sure?',
          text: "You want to deactivate this touchpoint!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, deactivate it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.selectedStage = id1;
            axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
            axios.patch(`${process.env.VUE_APP_API_URL}stage/update/${this.selectedStage}`, {
                status: 'draft'
            }).then((response) => {
              if (response && response.data) {
                  this.stageDialog = false;
                  this.getSatges(this.$route.query.cid);
                  this.$store.dispatch('updateSnackbar', {
                    color: 'success',
                    show: true,
                    text: 'Touchpoint deactivated successfully!'
                  });
                // this.$refs.stagedetails.stageDialog = true;
                // this.$refs.stagedetails.stageData = response.data;
                // console.log(this.company);
              }
            }).catch((err) => {
              if (err.response.status === 429) {
                this.config.savingStage = false;
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
        parseDate (date) {
      if (!date) return null;
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
      editDetails (companyData) {
        // this.$store.dispatch('updateCompany', companyData);
        this.$refs.addcompany.dialog = true;
        this.$refs.addcompany.companyAvatar[0].company_avatar = companyData.company_details.company_avatar;
        this.$refs.addcompany.editView = true;
        this.$refs.addcompany.company = companyData.company_details;
        const [year, month, day] = companyData.company_details.activatedAt.split('-');
        this.$refs.addcompany.company.activatedAt = `${day}-${month}-${year}`;
        // this.$refs.addcompany.company.activatedAt = companyData.company_details.activatedAt;
        this.$refs.addcompany.plan = companyData.plan_details;
        this.planOld = companyData.plan_details;
        this.$refs.addcompany.company_settings = companyData.company_settings;
        this.settingsOld = companyData.company_settings;
      },
      // downloadRating () {
      // this.$store.dispatch('updateSnackbar', {
      //   color: 'warn',
      //   show: true,
      //   text: 'Generating report, Please wait!'
      // });
      // axios.get(`${process.env.VUE_APP_API_URL}report/feedback_report/${this.$route.query.cid}`).then((response) => {
      //   if (response && response.data && response.data.success) {
      //     if (response.data && response.data.report_url) {
      //       this.$forceUpdate();
      //       setTimeout(() => {
      //         window.open(response.data.report_url);
      //       }, 100);
      //     } else {
      //       this.downloadingFlag = false;
      //       this.$store.dispatch('updateSnackbar', {
      //         color: 'error',
      //         show: true,
      //         text: 'Unable to generate report, Please try again later!'
      //       });
      //     }
      //     this.reportDialog = false;
      //   } else {
      //     this.downloadingFlag = false;
      //     this.$store.dispatch('updateSnackbar', {
      //       color: 'error',
      //       show: true,
      //       text: 'Unable to generate report, Please try again later!'
      //     });
      //     this.reportDialog = false;
      //   }
      //   this.downloadingFlag = false;
      // }).catch((err) => {
      //   if (err.response.status === 429) {
      //     this.downloadingFlag = false;
      //     this.$store.dispatch('updateSnackbar', {
      //       color: 'error',
      //       show: true,
      //       text: err.response.data.error
      //     });
      //   } else {
      //     this.downloadingFlag = false;
      //     this.$store.dispatch('updateSnackbar', {
      //       color: 'error',
      //       show: true,
      //       text: 'Unable to generate report, Please try again later!'
      //     });
      //   }
      // });
      // },
      resendEmail (id){
        this.$swal({
          title: 'Are you sure?',
          text: "You want to resend credentials email again!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, resend!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
            axios.get(`${process.env.VUE_APP_API_URL}users/generate/password/${id}`).then((response) => {
              this.loading = false;
              this.open = false;
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Email sent successfully!'
              });
              this.$parent.getAdmins(this.$route.query.cid);
              this.getAdmins(this.$route.query.cid)
            }, (response) => {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: 'Unable to upload admin, Please try again later!'
              });
              throw new Error(response);
            });
          }
        });
      
    },
      getAdmins (id) {
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.get(`${process.env.VUE_APP_API_URL}users/admins/${id}`).then((response) => {
          if (response && response.data) {
            this.companyAdmins = response.data.data;
            // console.log(this.company);
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.config.savingStage = false;
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
      getSatgeDetails (id, id1) {
        this.$refs.stagedetails.getAdmins(this.$route.query.cid);
        this.selectedStage = id1;
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        
        axios.get(`${process.env.VUE_APP_API_URL}survey/${id}/details?fields=title,type,description,company,createdAt,createdBy,lastUpdated,interactions,interactions_ms,interactions_tl`).then((response) => {
          if (response && response.data) {
            this.$refs.stagedetails.stageDialog = true;
            this.$refs.stagedetails.stageData = response.data;
            // console.log(this.company);
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.config.savingStage = false;
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
      saveDetails () {
        this.editView = false;
      },
      openAdminModal (data) {
        this.$refs.addadmin.open = true;
        if (data) {
          this.$refs.addadmin.editView = true;
          this.$refs.addadmin.candidate = data;
        }
      },
      openTouchpointModal () {
        this.$refs.addtouchpoint.dialogTouchpoint = true;
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
      openModal () {
        this.$refs.addcompany.dialog = true;
        this.$refs.addcompany.company = {};
        this.$refs.addcompany.editView = false;
        this.$refs.addcompany.company.companies_avatar = this.avatarList;
        this.$refs.addcompany.company.is_active = true;
        this.$refs.addcompany.company.chat_cobranding_enabled = false;
        this.$refs.addcompany.company.allow_stage_edit = false;
        this.$refs.addcompany.companyAvatar[0].company_avatar = this.companyData.company_details.company_avatar;
      },
      getSatges (id) {
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        const queryParams = {
        count: 'true',
        page_limit: this.pagination.rowsPerPage,
        page_offset: this.pagination.page || 1,
        stageType__in: 'lifecycle',
      };
        axios.get(`${process.env.VUE_APP_API_URL}stage/list/${id}`, {
          params: queryParams
        }).then((response) => {
          if (response && response.data) {
            this.pagination.length = Math.ceil(response.data.count / this.pagination.rowsPerPage);
            this.companyTouchpoints = response.data.data;
            // console.log(this.company);
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.config.savingStage = false;
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
      getCompanyDetails (id) {
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.get(`${process.env.VUE_APP_API_URL}company/profile/${id}?fields=company_name,brand_name,spoc_name,allow_stage_edit,spoc_email,spoc_phone,country,company_address,company_logo,createdBy,company_type,chat_cobranding_enabled,createdAt,is_active,employee_strength,chat_cobranding_enabled,tags,facebook_link,linkedin_link,glassdoor_link,jobStreet_link,activatedAt,user_booked,users_status,companies_avatar,company_avatar`).then((response) => {
          if (response && response.data) {
            this.companyData = response.data;
            if (response.data.company_details && response.data.company_details.activatedAt) {
              this.companyData.company_details.activatedAt = response.data.company_details.activatedAt.split(' ')[0];
            }
            if (this.companyData.company_details.activatedAt ) {
              const [year, month, day] = companyData.company_details.activatedAt.split('-');
              this.companyData.company_details.activatedAt = `${day}-${month}-${year}`;
            }
            if (this.$route.query.editview) {
              this.editDetails(this.companyData);
            }
            // setTimeout(() => {
            //   if (this.$route.query.editview) {
            //       this.editDetails(response.data);
            //     }
            // }, 1000);
            // console.log(this.company);
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.config.savingStage = false;
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
    },
    mounted () {
      this.getCompanyDetails(this.$route.query.cid);
      this.getAvatar();
    }
  }
</script>
<style lang="scss" >
.heading {
  font-size: 16px;
  padding-top:10px;
}
.dashboardCount {
  font-size: 70px;
  padding:10%;
}
.mainBox:hover {
  transform: scale(1.05);
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
.onlyThis .v-toolbar__content {
  display: none !important;
}
// p {
//   font-weight: bold;
// }
.app--text {
  color: #050550 !important;
}
.primary--text {
  color: #050550 !important;
}
.disabledView {
    cursor: not-allowed;
    pointer-events: none;
}
.avatarBox {
  border: 1px solid #eaeaea;
  border-radius:6px;
}
.editAvatarBox {
  pointer-events: initial;
}
.editAvatarBox:hover {
  border: 2px solid #050550;
  cursor: pointer;
}
</style>
