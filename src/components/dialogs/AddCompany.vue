<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="!editView">Add new company</span>
          <span class="text-h5" v-if="editView">Update company</span>
        </v-card-title>
        <v-card-text style="max-height:450px; overflow-y:auto;">
          <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
          <v-container>
            <b >Basic details</b>
            
            <v-row class="mt-2">
              <v-col cols="6" class="px-2 text-center">
            <!-- <v-avatar style="width:150px; height:90px;"
              class="pa-2"
              :tile="true"
              color="white company-logo"
            >
              <v-img
                max-height="100"
                max-width="200"
                tile
                contain
                :src="company.company_logo"
                aspect-ratio="1"
                style="background-color:transarent;"
              >
              </v-img>
            </v-avatar> -->
            <v-avatar
              :tile="true" style="width:60%; height:130px;"
              color="grey company-logo lighten-4"
            >
              <div class="file-upload-form" style="max-width: 100%;">
              <input v-if="!imageData && !this.company.company_logo" type="file" @change="previewImage" accept="image/*">
            </div>
            <div class="image-preview df" v-if="imageData.length > 0">
                <img style="width:100%; margin-top:10px;" class="preview" :src="imageData">
            </div>
            <div class="image-preview" v-if="(!imageData || imageData.length === 0) && company.company_logo">
                <img style="width:100%; margin-top:10px;" class="preview" :src="company.company_logo">
            </div>
            </v-avatar><br>
            <p class="cursor-pointer" v-if="imageData || company.company_logo" @click="changeLogo()">Change logo</p>
          </v-col>
          <v-col cols="6">
            <v-row>
              <v-col class="py-0"
                cols="12"
              >
              <label>Company name*</label>
                <v-text-field
                  v-model="company.company_name"
                  name="company_name"
                  placeholder="Enter your company name"
                  outlined
                  :rules="nameRules"
                  required
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="py-0"
                cols="12"
              >
              <label>Brand name*</label>
                <v-text-field
                  v-model="company.brand_name"
                  placeholder="Enter brand name" outlined
                  dense
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

            </v-row>
            <v-row class="w-100 ma-0">
              
              <v-col class="py-0"
                cols="12"
                sm="6"
                md="6"
              >
              <label>Industry type*</label>
                <v-autocomplete
                  v-model="company.company_type"
                  :items="industryType"
                  placeholder="Select industry type"
                  outlined dense :rules="nameRules"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col class="py-0" cols="12"
                sm="6"
                md="6">
                <label>Go live date</label>
                <v-menu
              v-model="joinDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  outlined
                  required
                  dense
                  @input="changeFormat()"
                  name="Go live date"
                  placeholder="Go live date"
                  v-model="company.activatedAt"
                  @blur="date1 = parseDate(company.activatedAt)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="go_live_date " @input="joinDateMenu = false, changeFormat()">
              </v-date-picker>
            </v-menu>
                <!-- <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="company.activatedAt"
                  transition="scale-transition"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="company.activatedAt"
                      @blur="date1 = parseDate(company.activatedAt)"
                      readonly outlined dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="go_live_date"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(company.activatedAt)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu> -->
              </v-col>
              <v-col class="py-0" cols="12"
                sm="6"
                md="6">
                <label>Employee strength*</label>
                <v-text-field
                  v-model="company.employee_strength"
                  placeholder="Enter employee strength"
                  outlined dense
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12"
                sm="6"
                md="6">
                <label>Users booked</label>
                <v-text-field
                  v-model="company.user_booked"
                  placeholder="Enter the number of users booked"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col class="py-0"
                cols="12"
              >
              <label>Address*</label>
                <v-text-field v-model="company.company_address"
                  placeholder="Enter address" outlined
                  dense :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="py-0"
                cols="12"
              >
              <label>Country*</label>
                <v-text-field v-model="company.country"
                  placeholder="Enter country" outlined
                  dense :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <label>Account status*</label>
                <v-radio-group 
                  v-model="company.is_active"
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
              <v-col cols="6">
                <label>Account type*</label>
                <v-radio-group 
                  v-model="plan.account_type"
                  row
                >
                  <v-radio color="#050550"
                    label="Paid"
                    value="paid"
                  ></v-radio>
                  <v-radio color="#050550"
                    label="Pilot"
                    value="pilot"
                  ></v-radio>
                </v-radio-group>
                <!-- <v-autocomplete 
                  v-model="plan.type"
                  :items="['paid', 'pilot']"
                  placeholder="Select account type"
                  outlined dense
                ></v-autocomplete> -->
              </v-col>
              <!-- <v-col cols="6">
                <label>Account type</label>
                <v-autocomplete 
                  v-model="company.renewalType"
                  :items="['Monthly', 'quarterly', 'Halfyearly', 'Yearly']"
                  placeholder="Select account renewal"
                  outlined dense
                ></v-autocomplete>
              </v-col> -->
            </v-row>
          </v-container>
          </v-form>
          <hr>
          <v-form
    ref="form1"
    v-model="valid1"
    lazy-validation
  >
          <v-container>
            <b>Social links</b>
            <v-row class="mt-2">
              <v-col class="py-0"
                cols="12"
                sm="6"
                md="6"
              >
              <label>Facebook url</label>
                <v-text-field
                  v-model="company.facebook_link"
                  placeholder="Enter facebook url" 
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col  class="py-0"
                cols="12"
                sm="6"
                md="6">
              <label>Linkedin url</label>
                <v-text-field
                  v-model="company.linkedin_link"
                  placeholder="Enter linkedin url" 
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col  class="py-0"
                cols="12"
                sm="6"
                md="6">
              <label>Glassdoor url</label>
                <v-text-field
                  v-model="company.glassdoor_link"
                  placeholder="Enter glassdoor url" 
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col  class="py-0"
                cols="12"
                sm="6"
                md="6">
              <label>jobStreet url</label>
                <v-text-field
                  v-model="company.jobStreet_link"
                  placeholder="Enter jobStreet url" 
                  outlined dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
          <hr>
          <b>Avatars</b>
            <v-row class="w-100 ma-0">
              <v-col cols="12" v-if="company && company.companies_avatar">
                <v-row class="w-100 ma-0">
                  <v-col cols="3" v-for="(a, i) in company.companies_avatar" :key="i" style="cursor:pointer;" @click="changeAvatar(a.id, i)">
                    <div v-if="a.id" class="avatarBox" :style="companyAvatar[0].company_avatar == a.id ? `border-color:#050550; border-width: 2px; position:relative;` : ''" >
                      <img style="margin-top:10px; padding: 0px 30%; width:100%;" :src="a.avatar" alt="">
                      <v-icon v-if="companyAvatar[0].company_avatar == a.id" class="mb-0" style="position: absolute; top: 0; right:5px; text-align: center; font-size:20px !important; color:#050550;">mdi-check-all</v-icon>
                    </div>
                    <div v-else class="avatarBox" :style="companyAvatar[0].company_avatar == i ? `border-color:#050550; border-width: 2px; position:relative;` : ''" >
                      <img style="margin-top:10px; padding: 0px 30%; width:100%;" :src="a" alt="">
                      <v-icon v-if="companyAvatar[0].company_avatar == i" class="mb-0" style="position: absolute; top: 0; right:5px; text-align: center; font-size:20px !important; color:#050550;">mdi-check-all</v-icon>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <hr>
          <v-form
    ref="form1"
    v-model="valid1"
    lazy-validation
  >
          <v-container>
            <b>SPOC details</b>
            <v-row class="mt-2">
              <v-col class="py-0"
                cols="12"
                sm="6"
                md="6"
              >
              <label>SPOC name*</label>
                <v-text-field :rules="nameRules"
                  required
                  v-model="company.spoc_name"
                  placeholder="SPOC name" 
                  outlined dense
                ></v-text-field>
              </v-col>
              
              <v-col class="py-0"
                cols="12"
                sm="6"
                md="6"
              >
              <label>SPOC phone number*</label>
                <v-text-field :rules="nameRules"
                  required
                  v-model="company.spoc_phone"
                  placeholder="SPOC mobile number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col class="py-0"
                cols="12"
                sm="12"
                md="12"
              >
              <label>SPOC email*</label>
                <v-text-field :rules="nameRules"
                  required
                  v-model="company.spoc_email"
                  placeholder="SPOC email id"
                  outlined dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
          <hr>
<v-form
    ref="form2"
    v-model="valid2"
    lazy-validation
  >
          <v-container>
            <b>Plan</b>
            <v-row class="mt-2">
              <v-col class="py-0"
                cols="12"
                sm="12"
                md="12"
              >
              <label>Title*</label>
                <!-- <v-text-field
                  v-model="plan.title" :rules="nameRules"
                  required
                  placeholder="Enter plan title*" 
                  outlined dense
                ></v-text-field> -->
                <v-autocomplete
                  :items="titleItem"
                  v-model="plan.title"
                  item-text="name"
                  item-value="value"
                  name='title'
                  dense
                  outlined
                ></v-autocomplete>
              </v-col>
              </v-row>
              <v-row class="mt-2">
              <v-col class="py-0  pb-2"
                cols="12"
                sm="6"
                md="6"
              >
                <label>Touchpoints</label><br>
                <v-radio-group
                  v-model="plan.milestone_active"
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
              </v-col>
              <v-col v-if="plan.milestone_active" class="py-0"
                cols="12"
                sm="6"
                md="6"
              >
                <label>Touchpoints limit</label>
                <v-text-field :rules="nameRules" required
                  v-model="plan.milestone_limit"
                  placeholder="Enter touchpoints limit"
                  outlined dense
                ></v-text-field>
              </v-col>
              </v-row>
              <v-row class="mt-2">
              <v-col class="py-0  pb-2"
                cols="12"
                sm="6"
                md="6"
              >
                <label>Ad-hoc</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="plan.adhoc_active"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group
                  v-model="plan.adhoc_active"
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
              </v-col>
              <v-col class="py-0"
                cols="12"
                sm="6"
                md="6"
              >
                <label v-if="plan.adhoc_active">Adhoc limit</label>
                <v-text-field v-if="plan.adhoc_active"
                  v-model="plan.adhoc_limit" :rules="nameRules" required
                  placeholder="Enter adhoc limit"
                  outlined dense
                ></v-text-field>
              </v-col>
              </v-row>
              <v-row class="mt-2">
              <v-col class="py-0  pb-2"
                cols="12"
                sm="12"
                md="12"
              >
                <label>Exit</label><br>
                <v-radio-group
                  v-model="plan.exit_active"
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
              </v-col>
              </v-row>
          </v-container>
        </v-form>
          <hr>
          <v-form
    ref="form3"
    v-model="valid3"
    lazy-validation
  >
          <v-container>
            <b>Company settings</b>
            <v-row class="mt-2">
              <v-col cols="6">
                <label>Co-branding</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="company.chat_cobranding_enabled"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group
                  v-model="company.chat_cobranding_enabled"
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
              </v-col>
              <v-col cols="6">
                <label>Resolution summary</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="company_settings.enable_resolution_summary"  color="white">
                <v-btn value="0">
                <span>Disabled</span>
                </v-btn>

                <v-btn value="1">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group
                  v-model="company_settings.enable_resolution_summary"
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
              </v-col>

              <v-col cols="6">
                <label>Alert word</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="company_settings.chat_alert_word_notification"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group
                  v-model="company_settings.chat_alert_word_notification"
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
              </v-col>
              <v-col cols="6">
                <label>Touchpoint edit</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" v-model="company.allow_stage_edit"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
               </v-bottom-navigation> -->
               <v-radio-group
                  v-model="company.allow_stage_edit"
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
              </v-col>
              <v-col cols="12" >
                <label v-if="company_settings.chat_alert_word_notification">Select alert words</label><br v-if="company_settings.chat_alert_word_notification">
                <v-combobox v-if="company_settings.chat_alert_word_notification"
                ref="box"
                eager :rules="nameRules"
                  required
                v-model="company_settings.chat_alert_words"
                :items="items"
                class="combo-input elevation-0 text-capitalize alert-combo"
                multiple
                chips
                attach outlined
                hide-details
              >
                <template v-slot:selection="data">
                    <v-chip
                    color="primary" :disabled="!editableView"
                    class="white--text text-capitalize"
                    :input-value="data.selected"
                    outlined
                    >
                    <strong class="text-capitalize">{{ data.item }}</strong>
                    <v-icon :disabled="!editableView"
                        small
                        class="ml-2"
                        @click="remove(data.item)"
                    >las la-times-circle</v-icon>
                    </v-chip>
                </template>
                </v-combobox>
              </v-col>
              <v-col cols="6">
                <label>Employer Branding</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="company_settings.enable_brand_promotion_feedback"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group
                  v-model="company_settings.enable_brand_promotion_feedback"
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
              </v-col>
              <v-col cols="6">
                <label  v-if="company_settings.enable_brand_promotion_feedback">Select employer branding</label>
                <v-autocomplete   v-if="company_settings.enable_brand_promotion_feedback"
                  :items="LinkItem"
                  v-model="company_settings.brand_promotion_feedback_field"
                  item-text="name"
                  placeholder="Select employer branding"
                  outlined dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <label>Auto assign</label><br>
                <!-- <v-bottom-navigation style="height:35px; width:160px; float:left;" @click.native="enableAlertWords" class="" v-model="company_settings.enable_auto_assign"  color="white">
                <v-btn :value="false">
                <span>Disabled</span>
                </v-btn>

                <v-btn :value="true">
                <span>Enabled</span>
                </v-btn>
                
            </v-bottom-navigation> -->
            <v-radio-group
                  v-model="company_settings.enable_auto_assign"
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
            
              </v-col>
              <v-col cols="6">
                <label  v-if="company_settings.enable_auto_assign">Auto assign to</label>
                <v-autocomplete  v-if="company_settings.enable_auto_assign" 
                  :items="autoAssignItem"
                  v-model="company_settings.auto_assign_reference_field"
                  item-text="name"
                  item-value="value"
                  name='auto_assign'
                  label="Auto assined to"
                  dense
                  outlined
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey"
            text
            @click="closeModal()"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!editView" :loading="loading"
            color="#050550"  style="color: white;"
            @click="validate()"
          >
            Save
          </v-btn>
          <v-btn v-if="editView" :loading="loading"
            color="#050550"  style="color: white;"
            @click="validate1()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapState } from 'vuex';
  export default {
    components: {
      axios
    },
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      loading: false,
      go_live_date: '',
      joinDateMenu: false,
      date1: '',
      titleItem: [{
        name: 'Basic',
        value: 'Basic'
      }, {
        name: 'Advance',
        value: 'Advance'
      }, {
        name: 'Premium',
        value: 'Premium'
      }, {
        name: 'Enterprise',
        value: 'Enterprise'
      }],
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
      dialog: false,
      editView: false,
      imageData: '',
      nameRules: [
        v => !!v || 'This field is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      valid: true,
      valid1: true,
      valid2: true,
      valid3: true,
      industryType: ['Information Technology and Services',
'Hospital and Health Care',
'Construction',
'Education Management',
'Retail',
'Financial Services',
'Accounting',
'Computer Software',
'Automotive',
'Higher Education',
'Marketing and Advertising',
'Government Administration',
'Banking',
'Health Welness and Fitness',
'Real Estate',
'Telecommunications',
'Oil and Energy',
'Food and Beverages',
'Hospitality',
'Mechanical or Industrial Engineering',
'Electrical and Electronic Manufacturing',
'Primary/Secondary Education',
'Insurance',
'Internet',
'Human Resources',
'Medical Practice',
'Transportation/Trucking/Railroad',
'Consumer Services',
'Management Consulting',
'Pharmaceuticals',
'Civil Engineering',
'Design',
'Research',
'Restaurants',
'Logistics and Supply Chain',
'Architecture and Planning',
'Law Practice',
'Apparel and Fashion',
'Consumer Goods',
'Facilities Services',
'Food Production',
'Non-profit Organization Management',
'Entertainment',
'Machinery',
'Chemicals',
'Arts and Crafts',
'Wholesale',
'Utilities',
'Legal Services',
'Farming',
'Mining and Metals',
'Airlines/Aviation',
'Leisure Travel and Turism',
'Sporting Goods',
'Building Materials',
'Music',
'Enviromental Services',
'Professional Training and Coaching',
'Medical Device',
'Individual and Family Services',
'Cosmetics',
'Mental Health Care',
'Aviation and Aerospace',
'Staffing and Recruiting',
'Industrial Automation',
'Graphic Design',
'Security and Investigations',
'Import and Export',
'Public Relations and Communications',
'Textiles',
'Military',
'Broadcast Media',
'Biotechnology',
'Media Production',
'Business Supplies and Equipment',
'Computer Networking',
'Writing and Editing',
'Consumer Elecronics',
'International Trade and Development',
'Events Services',
'Photography',
'Renewables and Envirnoment',
'Computer Hardware',
'Civic and Social Organization',
'Furniture',
'Defense and Space',
'Computer and Network Security',
'Printing',
'Fine Art',
'Religious Institutions',
'Investmend Management',
'Law Enforcement',
'Publishing',
'Information Services',
'Maritime',
'Outsourcing/Offshoring',
'Warehousing',
'E-learning',
'Executive Office',
'Government Relations',
'Animation',
'Semiconducs',
'Supermarkets',
'Program Development',
'Public Safety',
'Plastics',
'Alternative Medicine',
'Performing Arts',
'Online Media',
'Motion Pictures and Film',
'Commercial Real Estate',
'Judiciary',
'Packaging and Containers',
'Luxury Goods and Jewelry',
'Veterinary',
'Computer Games',
'Investment Banking',
'Market Research',
'International Affairs',
'Wine and Spirits',
'Newspapers',
'Translation and Localisation',
'Recreational Facilities and Services',
'Sporting Goods',
'Paper and Forest Products',
'Capital Markets',
'Public Policy',
'Package/Freight Delivery',
'Libraries',
'Wireless',
'Technology',
'Sales',
'Gambling and Casinos',
'Venture Capital and Private Equity',
'Glass Ceramics and Concrete',
'Philanthropy',
'Ranching',
'Dairy',
'Museums and Institutions',
'Shipbuilding',
'Think Thanks',
'Political Organization',
'Fishery',
'Fund-Raising',
'Tobacco',
'Railroad Manufacture',
'Alternative Dispute Resolution',
'Nanotechnology',
'Legislative Office'],
      items: [
        'abuse',
        'harassment',
        'threat',
        'discrimination',
        'suicide',
        'depressed',
        'lonely',
        'attack',
        'misbehave',
        'Deny',
        'refuse',
        'bias',
        'unfairness',
        'favouritism',
        'racialism',
        'racism',
        'bias',
        'prejudice',
        'bigotry',
        'sexual advances',
        'bribe',
        'blackmail',
        'indescent',
        'Dead',
        'death',
        'anger',
        'hatred',
        'murder',
        'kill',
        'harm',
        'scared',
        'victim',
        'victimised',
        'depression',
        'abusive',
        'angry',
        'helpless',
        'weak',
        'suicide',
        'suicidal',
        'die'
      ],
      company: {
        is_active: true,
        chat_cobranding_enabled: false,
        allow_stage_edit: false,
      },
      companyOld: {},
      companyAvatarOld: {},
      company_settingsOld: {},
      companyAvatar: [{
        company_avatar: '',
        company_avatar_id: '',
      }],
      company_settings:{
        enable_brand_promotion_feedback:false,
        enable_auto_assign:false,
        chat_alert_word_notification:true,
        enable_resolution_summary: '0',
        chat_alert_words: [
        'abuse',
        'harassment',
        'threat',
        'discrimination',
        'suicide',
        'depressed',
        'lonely',
        'attack',
        'misbehave',
        'Deny',
        'refuse',
        'bias',
        'unfairness',
        'favouritism',
        'racialism',
        'racism',
        'bias',
        'prejudice',
        'bigotry',
        'sexual advances',
        'bribe',
        'blackmail',
        'indescent',
        'Dead',
        'death',
        'anger',
        'hatred',
        'murder',
        'kill',
        'harm',
        'scared',
        'victim',
        'victimised',
        'depression',
        'abusive',
        'angry',
        'helpless',
        'weak',
        'suicide',
        'suicidal',
        'die']
      },
      plan:{
        title:'',
        account_type: 'paid',
        adhoc_active:false,
        exit_active: false,
        adhoc_limit:10,
        milestone_active:true,
        milestone_limit:10
    },
    }),
computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
  watch: {
    dialog() {
      if (!this.editView) {
        this.$refs.form.reset()
      }
    },
    // editView () {
    //   if (this.editView) {
    //     const [year, month, day] = this.company.activatedAt.split('-');
    //     this.company.activatedAt = `${day}-${month}-${year}`;
    //   }
    // },
    go_live_date (val) {
      const [year, month, day] = this.go_live_date.split('-');
      this.company.activatedAt = `${day}-${month}-${year}`;
    },
  },
    methods: {
      formatDate (date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    formatDate1 (date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    },
    // changeFormat () {
    //   if (this.userData.go_live_date) {
    //     const [year, month, day] = this.userData.go_live_date.split('-');
    //     this.userData.go_live_date = `${day}-${month}-${year}`;
    //   }
    // },
    parseDate (date) {
      if (!date) return null;
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
      changeAvatar (index, i) {
        if (index) {
          this.companyAvatar[0].company_avatar = index;
          this.companyAvatar[0].company_avatar_id = index;
        } else {
          this.companyAvatar[0].company_avatar = i;
          this.companyAvatar[0].company_avatar_id = i;
        }
        
      },
      changeLogo () {
        this.imageData = '';
        this.company.company_logo = '';
      },
      closeModal () {
        this.dialog = false;
        this.$refs.form.reset();
        if(this.$route.query.cid) {
          this.$parent.getCompanyDetails(this.$route.query.cid);
        }
        
      },
      validate () {
        this.loading = true;
        this.$refs.form.validate()
        this.$refs.form1.validate()
        this.$refs.form2.validate()
        this.$refs.form3.validate()
        setTimeout(() => {
          if (this.valid && this.valid1 && this.valid2 && this.valid3 ) {
            this.addCompany();
          } else {
            this.loading = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Fill all the mandatory fields!'
            });
          }
        }, 2000);
      },
      validate1 () {
        this.loading = true;
        this.$refs.form.validate()
        this.$refs.form1.validate()
        this.$refs.form2.validate()
        this.$refs.form3.validate()
        setTimeout(() => {
          if (this.valid && this.valid1 && this.valid2 && this.valid3 ) {
            this.updateCompany();
          } else {
            this.loading = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Fill all the mandatory fields!'
            });
          }
        }, 2000);
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
                this.company.company_logo = input.files[0];
              } else {
                this.$store.dispatch('updateSnackbar', {
                  color: 'error',
                  show: true,
                  text: 'Image size cannot be more then 2MB!'
                });
              }
          }
          // Start the reader job - read file as a data URL (base64 format)
          reader.readAsDataURL(input.files[0]);
      }
        setTimeout(() => {
      // console.log(input.files[0]);
      //  this.config.newPic = reader.result;
      }, 1000);
  },

  updateCompany () {
    // this.company.createdBy = 'amit.kumar@hirexp.com'
        this.company_settings.chat_alert_words = JSON.stringify(this.company_settings.chat_alert_words);
        const formData = new FormData();
        // this.$lodash.each(this.company, (val, key) => {
        //   if ((this.companyOld[key] !== val) && val && (val !== '')) {
        //     formData.append(`company__${key}`, val);
        //   }
        // });
        if (this.imageData.length > 0) {
          formData.append('company__company_logo', this.company.company_logo);
        }
        
        formData.append('company__company_name', this.company.company_name);
        formData.append('company__company_address', this.company.company_address);
        formData.append('company__brand_name', this.company.brand_name);
        if (this.company.is_active) {
          formData.append('company__is_active', "True");
        } else {
          formData.append('company__is_active', "False");
        }
        
        if (this.company.company_type) {
          formData.append('company__company_type', this.company.company_type);
        }
        if (this.companyAvatar[0].company_avatar_id) {
          formData.append('company__company_avatar_id', this.companyAvatar[0].company_avatar_id);
        }
        formData.append('company__spoc_name', this.company.spoc_name);
        if (this.company.activatedAt) {
          const [day, month, year] = this.company.activatedAt.split('-');
          this.company.activatedAtNew = `${year}-${month}-${day}`;
          formData.append('company__activatedAt', this.company.activatedAtNew+' 00:00:00+00:00');
        }
        if (this.company.user_booked) {
          formData.append('company__user_booked', this.company.user_booked);
        }
        formData.append('company__spoc_email', this.company.spoc_email);
        formData.append('company__spoc_phone', this.company.spoc_phone);
        if (this.company.facebook_link) {
          formData.append('company__facebook_link', this.company.facebook_link);
        }
        if (this.company.linkedin_link) {
          formData.append('company__linkedin_link', this.company.linkedin_link);
        }
        if (this.company.glassdoor_link) {
          formData.append('company__glassdoor_link', this.company.glassdoor_link);
        }
        if (this.company.jobStreet_link) {
          formData.append('company__jobStreet_link', this.company.jobStreet_link);
        }
        
        formData.append('company__country', this.company.country);
        if (this.company.employee_strength) {
          formData.append('company__employee_strength', this.company.employee_strength);
        }
        
        formData.append('plan__title', this.plan.title);
        if (this.company.chat_cobranding_enabled) {
          formData.append('company__chat_cobranding_enabled', "True");
        } else {
          formData.append('company__chat_cobranding_enabled', "False");
        }
        if (this.company.allow_stage_edit) {
          formData.append('company__allow_stage_edit', "True");
        } else {
          formData.append('company__allow_stage_edit', "False");
        }
        
        if (this.company_settings.chat_alert_word_notification) {
          formData.append('settings__chat_alert_word_notification', "True");
          formData.append('settings__chat_alert_words', this.company_settings.chat_alert_words);
        } else {
          formData.append('settings__chat_alert_word_notification', "False");
        }
        if (this.plan.title) {
          formData.append('plan__title', this.plan.title);
        }
        formData.append('plan__account_type', this.plan.account_type);
        if (this.plan.adhoc_active) {
          formData.append('plan__adhoc_active', "True");
        } else {
          formData.append('plan__adhoc_active', "False");
        }
        if (this.plan.adhoc_limit) {
          formData.append('plan__adhoc_limit', this.plan.adhoc_limit);
        }
        if (this.plan.exit_active) {
          formData.append('plan__exit_active', "True");
        } else {
          formData.append('plan__exit_active', "False");
        }
        if (this.plan.milestone_active) {
          formData.append('plan__milestone_active', "True");
        } else {
          formData.append('plan__milestone_active', "False");
        }
        if (this.plan.milestone_limit) {
          formData.append('plan__milestone_limit', this.plan.milestone_limit);
        }
        if (this.company_settings.enable_brand_promotion_feedback) {
          formData.append('settings__enable_brand_promotion_feedback', "True");
          formData.append('settings__brand_promotion_feedback_field', this.company_settings.brand_promotion_feedback_field);
        } else {
          formData.append('settings__enable_brand_promotion_feedback', "False");
        }
        if (this.company_settings.enable_auto_assign) {
          formData.append('settings__enable_auto_assign', "True");
          formData.append('settings__auto_assign_reference_field', this.company_settings.auto_assign_reference_field);
        } else {
          formData.append('settings__enable_auto_assign', "False");
        }
        formData.append('settings__enable_resolution_summary', this.company_settings.enable_resolution_summary);
        this.company_settings.chat_alert_words = JSON.parse(this.company_settings.chat_alert_words);
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.patch(`${process.env.VUE_APP_API_URL}company/update/${this.$route.query.cid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
          if (response && response.data) {
            this.loading = false;
            this.dialog = false;
            this.$parent.getCompanyDetails(this.$route.query.cid);
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Company updated successfully!'
            });
            this.$router.push(`/company-details?cid=${this.$route.query.cid}`);
          }
        }).catch((err) => {
          this.loading = false;
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
  getAvatar () {
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.get(`${process.env.VUE_APP_API_URL}company/avatar`).then((response) => {
          if (response && response.data) {
            this.company.companies_avatar = response.data;
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
      addCompany () {
        this.company.createdBy = this.user.email;
        this.company_settings.chat_alert_words = JSON.stringify(this.company_settings.chat_alert_words);
        const formData = new FormData();
        if (this.imageData.length > 0) {
          formData.append('company__company_logo', this.company.company_logo);
        }
        if (this.company.company_name) {
          formData.append('company__company_name', this.company.company_name);
        }
        if (this.companyAvatar[0].company_avatar_id) {
          formData.append('company__company_avatar', this.companyAvatar[0].company_avatar_id);
        }
        if (this.company.company_address) {
          formData.append('company__company_address', this.company.company_address);
        }
        if (this.company.activatedAt) {
          const [day, month, year] = this.company.activatedAt.split('-');
          this.company.activatedAtNew = `${year}-${month}-${day}`;
          formData.append('company__activatedAt', this.company.activatedAtNew+' 00:00:00+00:00');
        }
        if (this.company.user_booked) {
          formData.append('company__user_booked', this.company.user_booked);
        }
        formData.append('company__brand_name', this.company.brand_name);
        if (this.company.company_type) {
          formData.append('company__company_type', this.company.company_type);
        }
        if (this.company.facebook_link) {
          formData.append('company__facebook_link', this.company.facebook_link);
        }
        if (this.company.linkedin_link) {
          formData.append('company__linkedin_link', this.company.linkedin_link);
        }
        if (this.company.glassdoor_link) {
          formData.append('company__glassdoor_link', this.company.glassdoor_link);
        }
        if (this.company.jobStreet_link) {
          formData.append('company__jobStreet_link', this.company.jobStreet_link);
        }
        formData.append('company__spoc_name', this.company.spoc_name);
        if (this.company.chat_cobranding_enabled) {
          formData.append('company__chat_cobranding_enabled', "True");
        } else {
          formData.append('company__chat_cobranding_enabled', "False");
        }
        if (this.company.allow_stage_edit) {
          formData.append('company__allow_stage_edit', "True");
        } else {
          formData.append('company__allow_stage_edit', "False");
        }
        if (this.company.is_active) {
          formData.append('company__is_active', "True");
        } else {
          formData.append('company__is_active', "False");
        }
        formData.append('company__spoc_email', this.company.spoc_email);
        formData.append('company__spoc_phone', this.company.spoc_phone);
        formData.append('company__country', this.company.country);
        if (this.company.employee_strength) {
          formData.append('company__employee_strength', this.company.employee_strength);
        }
        formData.append('plan__title', this.plan.title);
        formData.append('plan__account_type', this.plan.account_type);
        formData.append('company__country', this.company.country);
        formData.append('company__createdBy', this.company.createdBy);
        if (this.company_settings.chat_alert_word_notification) {
          formData.append('settings__chat_alert_word_notification', "True");
          formData.append('settings__chat_alert_words', this.company_settings.chat_alert_words);
        } else {
          formData.append('settings__chat_alert_word_notification', "False");
        }
        if (this.plan.title) {
          formData.append('plan__title', this.plan.title);
        }
        if (this.plan.adhoc_active) {
          formData.append('plan__adhoc_active', "True");
        } else {
          formData.append('plan__adhoc_active', "False");
        }
        if (this.plan.adhoc_limit) {
          formData.append('plan__adhoc_limit', this.plan.adhoc_limit);
        }
        if (this.plan.exit_active) {
          formData.append('plan__exit_active', "True");
        } else {
          formData.append('plan__exit_active', "False");
        }
        if (this.plan.milestone_active) {
          formData.append('plan__milestone_active', "True");
        } else {
          formData.append('plan__milestone_active', "False");
        }
        if (this.plan.milestone_limit) {
          formData.append('plan__milestone_limit', this.plan.milestone_limit);
        }
        if (this.company_settings.enable_brand_promotion_feedback) {
          formData.append('settings__enable_brand_promotion_feedback', "True");
          formData.append('settings__brand_promotion_feedback_field', this.company_settings.brand_promotion_feedback_field);
        } else {
          formData.append('settings__enable_brand_promotion_feedback', "False");
        }
        if (this.company_settings.enable_auto_assign) {
          formData.append('settings__enable_auto_assign', "True");
          formData.append('settings__auto_assign_reference_field', this.company_settings.auto_assign_reference_field);
        } else {
          formData.append('settings__enable_auto_assign', "False");
        }
        formData.append('settings__enable_resolution_summary', this.company_settings.enable_resolution_summary);
        this.company_settings.chat_alert_words = JSON.parse(this.company_settings.chat_alert_words);
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.post(`${process.env.VUE_APP_API_URL}company/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
          if (response && response.data) {
            this.loading = false;
            this.dialog = false;
            this.$parent.getCompanyDetails(this.$route.query.cid);
            this.dashboardData = response.data;
            this.$store.dispatch('updateSnackbar', {
              color: 'success',
              show: true,
              text: 'Company added successfully!'
            });
            // console.log(this.company);

          }
        }).catch((err) => {
          this.loading = false;
          if (err.response.status === 400) {
            console.log(err.response);
            if (err.response.data.title) {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: `Company name : ${err.response.data.title[0]}`
              });
            }
            if (err.response.data.employee_strength) {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: `Employee strength : ${err.response.data.employee_strength[0]}`
              });
            }
            if (err.response.data.spoc_email) {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: `SPOC email : ${err.response.data.spoc_email[0]}`
              });
            }
            
            if (err.response.data.spoc_phone) {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: `SPOC phone : ${err.response.data.spoc_phone[0]}`
              });
            }
            if (!err.response.data.spoc_email && !err.response.data.employee_strength) {
              this.$store.dispatch('updateSnackbar', {
                color: 'error',
                show: true,
                text: err.response.data
              });
            }
            
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

    mounted: {
      opendialog () {
        this.dialog = true;
      },
      
    }
  }
</script>

<style lang="scss">
input[type=file]:before {
  content: 'Drag and drop or Click \A to update company logo.';
  white-space: pre-wrap;
  vertical-align: middle;
  text-align: center;
  font-size: 1em;
  line-height: 1.5;
  display: inline-block;
  background: #f1f1f1;
  padding: 17% 34px;
  font-family: Helvetica, Arial, sans-serif;
}

input[type=file]::-webkit-file-upload-button {
  visibility: hidden;
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