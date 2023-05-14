<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogTouchpoint"
      persistent
      max-width="800px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5" v-if="!editView">Add touchpoint</span>
        </v-card-title>
        <v-card-text style="max-height:450px; overflow-y:auto;">
          <v-container class="touchpointAdd">
            <v-row class="mt-2">
              <v-col cols="12" class="px-2 text-center">
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
            <!-- <v-avatar
              :tile="true" style="width:100%; height:130px;"
              color="grey company-logo lighten-4"
            >
              <div class="file-upload-form" style="width: 100%;">
              <input v-if="!imageData" type="file" @change="previewImage" accept="xls/*">
            </div>
            <div class="image-preview" v-if="imageData.length > 0">
                <img style="width:100%; margin-top:10px;" class="preview" :src="imageData">
            </div>
            </v-avatar><br>
            <p class="cursor-pointer" v-if="imageData" @click="changeLogo()">Change logo</p> -->
            <input v-if="!imageData"
                id="upload"
                class="file-upload__input"
                type="file" accept=".xlsx, .xls, .csv" name="file-upload"
                @input="previewImage"
            >
            <p v-if="imageData" class="fileName">{{company.name}} <v-icon @click="changeLogo()">mdi-window-close</v-icon></p>
            
          </v-col>
          <v-col cols="12" v-if="errorList.length > 0">
              <p>
                  {{errorList}}
              </p>
          </v-col>
          
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey"
            text
            @click="dialogTouchpoint = false;changeLogo() "
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :loading="loading"
            color="#050550"  style="color: white;"
            @click="addTouchpoints()"
          >
        Upload
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
      dialog: false,
      loading: false,
      dialogTouchpoint: false,
      editView: false,
      imageData: '',
      errorList: '',
      company: {},
    }),
computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
    methods: {
      changeLogo () {
        this.imageData = '';
        this.errorList = '';
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
                this.company.name = input.files[0].name;
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
      addTouchpoints () {
        this.loading = true;
        const formData = new FormData();
        formData.append('milestone_config', this.company.company_logo);
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.post(`${process.env.VUE_APP_API_URL_FB}company/create_milestone/${this.$route.query.cid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        }).then((response) => {
          this.loading = false;
          if (response && response.data) {
              if (response.data.error && response.data.error.length > 0) {
                  this.errorList = response.data.error;
              }
              if (response.data.milestones) {
                  this.dialogTouchpoint = false;
                  this.$parent.companyTouchpoints = response.data.milestones;
                  this.$parent.getSatges(this.$route.query.cid);
                  this.$store.dispatch('updateSnackbar', {
                    color: 'success',
                    show: true,
                    text: 'Touchpoints added successfully!'
                  });
              }
          }
        }).catch((err) => {
          this.loading = false;
            if (err.response && err.response.data) {
                this.errorList = err.response.data.error;
            }
          if (err.response.status && err.response.status === 429 && err.response.data) {
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

    mounted: {
      opendialog () {
        this.dialog = true;
      }
    }
  }
</script>

<style lang="scss">
.fileName {
    white-space: pre-wrap;
    vertical-align: middle;
    text-align: center;
    font-size: 1em;
    line-height: 1.5;
    display: inline-block;
    background: #f1f1f1;
    width:100%;
    padding: 45px 34px;
    font-family: Helvetica, Arial, sans-serif;
}
.touchpointAdd {
    input[type=file] {
        width:100%;
    }
    input[type=file]:before {
    content: 'Drag and drop or Click \A to add touchpoints.';
    white-space: pre-wrap;
    vertical-align: middle;
    text-align: center;
    font-size: 1em;
    line-height: 1.5;
    display: inline-block;
    background: #f1f1f1;
    width:100%;
    padding: 45px 34px;
    font-family: Helvetica, Arial, sans-serif;
    }

    input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
    }
}

</style>