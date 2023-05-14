<template>
  <v-dialog
    v-model="open"
    max-width="700"
    scrollable
  >
    <v-card>
      <v-card-title>
        Add admin
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 450px;" class="pt-4">
          <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
        <v-row no-gutters>
          <v-col cols="6" class="px-1">
            <v-text-field
              v-model="candidate.employee_id"
              label="Employee id *"
              name="employee id"
              outlined :rules="nameRules"
                  required
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="First name *"
              name="first name"
              v-model="candidate.first_name"
              outlined :rules="nameRules"
                  required
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Last name"
              name="last name"
              dense :rules="nameRules"
                  required
              v-model="candidate.last_name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Email *"
              name="email"
              v-model="candidate.email"
              outlined :rules="emailRules"
                  required
              dense
            ></v-text-field>
            <div class="phone-error" style="margin-top:-24px; margin-bottom:5px;" v-if="!isEmailValid">Employee email is invalid!</div>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-select
              :items="list.gender"
              v-model="candidate.gender"
              name="gender"
              label="Gender *"
              item-text="title"
              outlined :rules="nameRules"
                  required
              dense
            ></v-select>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-menu
              v-model="joinDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Joining date *"
                  outlined :rules="nameRules"
                  required
                  dense
                  @input="changeFormat()"
                  name="joining date"
                  v-model="candidate.joining_date "
                  @blur="date = parseDate(candidate.joining_date)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="joining_date " @input="joinDateMenu = false, changeFormat()">
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Location *"
              name="location"
              v-model="candidate.location"
              outlined :rules="nameRules"
                  required
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Department *"
              v-model="candidate.department"
              outlined
              name="department" :rules="nameRules"
                  required
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="pb-4 heading black--text">Other fields</div>
        <v-row no-gutters>
          <v-col cols="6" class="px-1">
            <v-menu
              v-model="birthDateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Birth date"
                  outlined
                  dense
                  hide-details
                  @input="changeFormatDOB()"
                  name="birth date"
                  v-model="candidate.birthDate"
                   @blur="date = parseDate(candidate.birthDate)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary"
                v-model="birth_date"
                @input="checkAge(birth_date);changeFormatDOB();birthDateMenu = false;"
              ></v-date-picker>
            </v-menu>
            <div class="mb-2">
              <!-- <div class="phone-error" v-if="phoneIsBlank">The phone number field is required</div> -->
              <div class="phone-error" v-if="!isDOBValid">Employee age should be above 18 years</div>
            </div>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Alternate email"
              outlined
              dense
              name="alternate email"
              v-validate="'email'"
              v-model="candidate.alternateEmail"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Education"
              outlined
              dense
              name="education"
              v-model="candidate.education"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Experience"
              name="experience"
              outlined
              dense
              v-model="candidate.experience"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Designation"
              v-model="candidate.designation"
              outlined
              name="designation"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Skills"
              outlined
              dense
              name="skills"
              v-model="candidate.skills"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Grade"
              outlined
              name="grade"
              dense
              v-model="candidate.grade"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Sub department"
              outlined
              name="sub department"
              dense
              v-model="candidate.sub_department"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Manager"
              outlined
              name="manager"
              dense
              v-model="candidate.manager"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Function"
              outlined
              name="function"
              dense
              v-model="candidate.function"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Business"
              outlined
              dense
              name="business"
              v-model="candidate.business"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Team"
              outlined
              name="team"
              dense
              v-model="candidate.team"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Business head"
              outlined
              name="business head"
              dense
              v-model="candidate.businessHead"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Team head"
              outlined
              name="team head"
              dense
              v-model="candidate.teamHead"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="HRBP"
              outlined
              dense
              name="hrbp"
              v-validate="'email'"
              v-model="candidate.hrbp"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="HR Manager"
              outlined
              name="hr manger"
              dense
              v-model="candidate.hr_manager"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Site"
              outlined
              name="site"
              dense
              v-model="candidate.site"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Cluster"
              outlined
              name="cluster"
              dense
              v-model="candidate.cluster"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Cost Centre"
              outlined
              name="cost centre"
              dense
              v-model="candidate.cost_centre"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-menu
              ref="shiftStartTime"
              v-model="shiftStartTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="candidate.shiftStartTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="candidate.shiftStartTime"
                  label="Shift start time"
                  prepend-inner-icon="mdi-briefcase-clock-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="shiftStartTimeMenu"
                v-model="candidate.shiftStartTime"
                full-width
                @click:minute="$refs.shiftStartTime.save(candidate.shiftStartTime);shiftStartTimeMenu = false;"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-menu
              ref="shiftEndTimeMenu"
              v-model="shiftEndTimeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="candidate.shiftEndTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="candidate.shiftEndTime"
                  label="Shift end time"
                  prepend-inner-icon="mdi-briefcase-clock-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="shiftEndTimeMenu"
                v-model="candidate.shiftEndTime"
                full-width
                @click:minute="$refs.shiftEndTimeMenu.save(candidate.shiftEndTime);shiftEndTimeMenu = false;"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-menu
              v-model="exitDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Exit date"
                  outlined
                  dense
                  v-model="candidate.exit_date"
                  @blur="date = parseDate(candidate.exit_date)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="exit_date" @input="exitDateMenu = false">
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-menu
              v-model="RegisnationDateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Resignation date"
                  outlined
                  dense
                  v-model="candidate.resignation_date"
                  @blur="date = parseDate(candidate.resignation_date)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="resignation_date" @input="RegisnationDateMenu = false">
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-select
              :items="list.hiPos"
              v-model="candidate.high_potential_emp"
              name="hipo"
              label="High potential employee"
              item-text="title"
              class="elevation-0 grey--text text--lighten-2"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Migrated Mood"
              outlined
              name="migrated mood"
              dense
              v-model="candidate.migrated_mood"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Migrated Engagement Score"
              outlined
              name="migrated engagement score"
              dense
              v-model="candidate.migrated_engagement_score"
            ></v-text-field>
          </v-col>
          <v-col cols="6" class="px-1">
            <v-text-field
              label="Migrated Last Touchpoint"
              outlined
              name="migrated last touchpoint"
              dense
              v-model="candidate.migrated_last_touchpoint"
            ></v-text-field>
          </v-col>
        </v-row>
          </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          text
          @click="open = false;"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="!editView" :loading="loading" style="color:white;"
          color="#050550"
          class="white--text"
          @click="validate()"
        >
          Upload
        </v-btn>
        <v-btn v-if="editView" style="color:white;"
          color="#050550" :loading="loading"
          class="white--text"
          @click="updateValidate()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable */
// import { ContentLoader } from 'vue-content-loader';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'UploadSingleEmployee',
  // components: {
  //   ContentLoader
  // },
  data () {
    return {
      isEmailValid: true,
      loading: false,
      whitelistError: '',
      joinDateMenu: false,
      open: false,
      editView: false,
      dateFormatted: '',
      joining_date: '',
      birth_date: '',
      exit_date: '',
      resignation_date: '',
      date: '',
      phone: null,
      countryCode: null,
      phoneIsValid: true,
      // phoneIsBlank: false,
      nameRules: [
        v => !!v || 'This field is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      list: {
        gender: [{
          title: 'Male',
          value: 'male'
        }, {
          title: 'Female',
          value: 'female'
        }, {
          title: 'Other',
          value: 'other'
        }, {
          title: 'Not Disclosed',
          value: 'notDisclosed'
        }],
        types: [{
          title: 'Manager',
          value: 'manager'
        }, {
          title: 'Team Employee',
          value: 'staff'
        }],
        hiPos: [
          {
            title: 'True',
            value: 1
          },
          {
            title: 'False',
            value: 0
          }
        ]
      },
      candidate: {
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
        type: 'staff',
        sub_type: 'staff',
        gender: ''
      },
      isDOBValid: true,
      shiftStartTimeMenu: false,
      shiftEndTimeMenu: false,
      exitDateMenu: false,
      RegisnationDateMenu: false,
      birthDateMenu: false,
      valid: true,
    };
  },
  computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
  methods: {
    validate () {
    this.loading = true;
    this.$refs.form.validate()
    setTimeout(() => {
        if (this.valid) {
            this.save();
        } else {
          this.loading = false;
        }
        
    }, 1000);
    },
    updateValidate () {
      this.loading = true;
      this.$refs.form.validate()
      setTimeout(() => {
          if (this.valid) {
              this.updateAdmin();
          } else {
            this.loading = false;
          }
          
      }, 1000);
    },
    checkAge (date) {
      const fData = dayjs(date).format('DD/MM/YYYY');
      this.isDOBValid = false;
      var parts = fData.split('/');
      var dtDOB = new Date(parts[1] + '/' + parts[0] + '/' + parts[2]);
      var dtCurrent = new Date();
      if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 17) {
        this.isDOBValid = false;
      }
      if (dtCurrent.getFullYear() - dtDOB.getFullYear() === 17) {
        if (dtCurrent.getMonth() < dtDOB.getMonth()) {
          this.isDOBValid = false;
        }
        if (dtCurrent.getMonth() === dtDOB.getMonth()) {
          if (dtCurrent.getDate() < dtDOB.getDate()) {
            this.isDOBValid = false;
          }
        }
      }
      if (dtCurrent.getFullYear() - dtDOB.getFullYear() > 17) {
        this.isDOBValid = true;
      }
    },
    countrySelected (val) {
      this.countryCode = val.dialCode;
    },
    onInput (number, isValid) {
      if (isValid.isValid) {
        this.phoneIsValid = true;
        // this.phoneIsBlank = false;
        this.candidate.phoneNumber = isValid.number.e164;
      } else {
        this.phoneIsValid = false;
      }
    },
    
    validateAll () {
      if (!this.candidate.phoneNumber) {
        // this.phoneIsBlank = true;
      }
      this.$validator.validateAll().then((res) => {
        if (res) {
          if (!this.phoneIsValid) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Fields necessary, Please resolve all the errors!'
            });
            return;
          }
          if (this.isDOBValid) {
            this.save();
          }
          if (!this.isDOBValid) {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Eligibility 18 years old only!'
            });
          }
        } else {
          if (!this.contactSales.contact_phone || this.contactSales.contact_phone === '') {
            this.phoneIsValid = false;
          }
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Fields necessary, Please resolve all the errors!'
          });
        }
      });
    },
    updateAdmin () {
      this.candidate.type = 'SuperAdmin';
        this.candidate.sub_type = 'SuperAdmin';
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
      axios.patch(`${process.env.VUE_APP_API_URL}users/update/${this.candidate.id}`, {
        'email': this.candidate.email,
        'employee_id': this.candidate.employee_id,
        'first_name': this.candidate.first_name,
        'last_name': this.candidate.last_name,
        'gender': this.candidate.gender,
        'joining_date': this.candidate.joining_date,
        'location': this.candidate.location,
        'department': this.candidate.department
      }).then((response) => {
        this.loading = false;
        this.open = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'success',
          show: true,
          text: 'Admin added successfully!'
        });
        this.$parent.getAdmins(this.$route.query.cid);
        this.getAdmins(this.$route.query.cid)
        if (response && response.data && response.data.status === 200 &&
        (!response.data.Failed_list || response.data.Failed_list.length === 0)) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee uploaded!'
          });
          // if (this.candidate.joining_date) {
          //   const [day, month, year] = this.candidate.joining_date.split('-');
          //   this.candidate.joining_date = `${year}-${month}-${day}`;
          // }
          this.open = false;
          this.closeDialog();
        } else if (response.data.Failed_list && response.data.Failed_list.length > 0) {
          this.loading = false;
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: response.data.Failed_list[0].validation_error
          });
          this.loading = false;
          if (response.data.Failed_list[0].validation_error.split('[')[1] === '"Employee email invalid: ') {
            this.loading = false;
            this.isEmailValid = false;
            this.whitelistError = response.data.Failed_list[0].validation_error;
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to upload admin, Please try again later!'
          });
          this.loading = false;
        }
      }, (response) => {
        this.loading = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to upload admin, Please try again later!'
        });
        throw new Error(response);
      });
    },
    save () {
        this.candidate.type = 'SuperAdmin';
        this.candidate.sub_type = 'SuperAdmin';
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
      axios.post(`${process.env.VUE_APP_API_URL_FB}users/bulk_add?response_type=sync&upload_type=single_upload`, {
        user_data: [this.candidate],
        company_id: this.$route.query.cid,
      }).then((response) => {
        this.loading = false;
        this.open = false;
        this.$store.dispatch('updateSnackbar', {
          color: 'success',
          show: true,
          text: 'Admin added successfully!'
        });
        this.$parent.getAdmins(this.$route.query.cid);
        this.getAdmins(this.$route.query.cid)
        if (response && response.data && response.data.status === 200 &&
        (!response.data.Failed_list || response.data.Failed_list.length === 0)) {
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'Employee uploaded!'
          });
          // if (this.candidate.joining_date) {
          //   const [day, month, year] = this.candidate.joining_date.split('-');
          //   this.candidate.joining_date = `${year}-${month}-${day}`;
          // }
          this.open = false;
          this.closeDialog();
        } else if (response.data.Failed_list && response.data.Failed_list.length > 0) {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: response.data.Failed_list[0].validation_error
          });
          this.loading = false;
          if (response.data.Failed_list[0].validation_error.split('[')[1] === '"Employee email invalid: ') {
            this.isEmailValid = false;
            this.whitelistError = response.data.Failed_list[0].validation_error;
          }
        } else {
          this.$store.dispatch('updateSnackbar', {
            color: 'error',
            show: true,
            text: 'Unable to upload admin, Please try again later!'
          });
          this.loading = false;
        }
      }, (response) => {
        this.$store.dispatch('updateSnackbar', {
          color: 'error',
          show: true,
          text: 'Unable to upload admin, Please try again later!'
        });
        throw new Error(response);
      });
    },
    formatDate (date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    // changeFormat () {
    //   if (this.candidate.joining_date) {
    //     const [year, month, day] = this.candidate.joining_date.split('-');
    //     this.candidate.joining_date = `${day}-${month}-${year}`;
    //   }
    // },
    parseDate (date) {
      if (!date) return null;
      const [day, month, year] = date.split('-');
      return `${year}-${month}-${day}`;
    },
    // changeFormatDOB () {
    //   if (this.candidate.birthDate) {
    //     const [year, month, day] = this.candidate.birthDate.split('-');
    //     this.candidate.birthDate = `${day}/${month}/${year}`;
    //   }
    // },
    closeDialog () {
      this.candidate = {
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
        type: 'staff',
        sub_type: 'staff',
        gender: ''
      };
      this.errors.clear();
      this.open = false;
    }
  },
  watch: {
    joining_date (val) {
      const [year, month, day] = this.joining_date.split('-');
      this.candidate.joining_date = `${day}-${month}-${year}`;
    },
    birth_date (val) {
      const [year, month, day] = this.birth_date.split('-');
      this.candidate.birthDate = `${day}-${month}-${year}`;
    },
    resignation_date (val) {
      const [year, month, day] = this.resignation_date.split('-');
      this.candidate.resignation_date = `${day}-${month}-${year}`;
    },
    exit_date (val) {
      const [year, month, day] = this.exit_date.split('-');
      this.candidate.exit_date = `${day}-${month}-${year}`;
    }
    // candidate () {
    //   if (this.candidate.joining_date) {
    //     this.candidate.joining_date = this.formatDate(this.candidate.joining_date);
    //     console.log(this.candidate.joining_date);
    //   }
    // }
  },
  beforeMount () {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.emp-phone-field {
  border-radius: 8px !important;
  &.ph-error {
    border: 2px solid red;
    ::-webkit-input-placeholder {
      color: red !important;
    }
  }
}
.phone-error {
  font-size: 12px;
  color: red;
}
</style>
