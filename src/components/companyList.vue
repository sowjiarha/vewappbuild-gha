<template>
  <div class="text-center pa-4" style="background: #e8edf2 none repeat scroll 0 0; padding: 25px 50px 50px 50px !important;">
    <v-text-field
    style="width: 25%;position: fixed;top: 10px;z-index: 99999;left: 15%;"
    v-if="$route.name === 'companyList'"
    v-model="searchCompany"
    placeholder="Search company"
    outlined
    dense
    hide-details>
    </v-text-field>

    <v-btn style="
      position: fixed;
      top: 15px;
      z-index: 5;
      right: 30%;color: white;" class="text-right"
      depressed @click="openModal()"
      color="#050550"
    >
      <v-icon>mdi-plus</v-icon> Add company
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
        <v-col cols="6">
        </v-col>
        <!-- <v-col cols="1" class="text-left" style="padding-right: 0;">
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
        </v-col> -->
      </v-row>
    </div>
    <div>
      <div class="tableDash" ref="scrollToMe">
        <v-row class="w-100 ma-0">
          <v-col cols="6">
            <span style="font-size: 1.7rem;">List of companies</span>
          </v-col>
        </v-row>
        <v-list two-line v-if="dashboardData && dashboardData.companies_overview">
          <v-row class="w-100 ma-0" style="padding: 0 16px;">
            <v-col style="font-size:18px; font-weight:500;" cols="1">
                Country
              </v-col>
              <v-col style="font-size:18px; font-weight:500;" cols="3">
                Company
                <v-row>
                  <v-col cols="4">
                    <small style="font-weight:400;">Logo</small>
                  </v-col>
                  <v-col cols="8">
                    <small style="font-weight:400;">Name</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-col style="font-size:18px; font-weight:500;" cols="1">
                Status
              </v-col>
              <v-col style="font-size:18px;font-weight:500;" cols="1">
                Created
                <v-row>
                  <v-col cols="12">
                    <small style="font-weight:400;">Date</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-col style="font-size:18px; font-weight:500;" cols="1">
                Go live
                <v-row>
                  <v-col cols="12">
                    <small style="font-weight:400;">Date</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-col style="font-size:18px;font-weight:500;" cols="1" class="">
                Users
                <v-row>
                  <v-col cols="12">
                    <small style="font-weight:400;">Booked</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-col style="font-size:18px;font-weight:500;" cols="3" class="">
                Current users
                <v-row>
                  <v-col cols="3">
                    <small style="font-weight:400;">Active</small>
                  </v-col>
                  <v-col cols="3">
                    <small style="font-weight:400;">Inactive</small>
                  </v-col>
                  <v-col cols="3">
                    <small style="font-weight:400;">Duplicate</small>
                  </v-col>
                  <v-col cols="3">
                    <small style="font-weight:400;">Total</small>
                  </v-col>
                </v-row>
              </v-col>
              <v-col style="font-size:18px;font-weight:500;" cols="1">
                Actions
              </v-col>
            </v-row>
            <v-divider></v-divider>
          <v-list-item-group>
            <v-list-item v-for="(item) in dashboardData.companies_overview.companies_dict" :key="item" style="    border-bottom: 1px solid #ebebeb;">
              <v-row class="w-100 ma-0" style="align-items: center;" @click="openDetails(item)">
                <v-col cols="1">
                  {{item.country}}
                </v-col>
                <v-col cols="1" style="  text-align:center;  background: rgb(245 246 247);border-radius: 10px;">
                  <img v-if="item.company_logo" style="width:100%;"  :src="item.company_logo">
                  <span v-else>--</span>
                </v-col>
                <v-col cols="2">
                  <v-row class="w-100 ma-0">
                    <v-col cols="12" class="py-0 pl-0" >
                      {{item.company_name}} 
                      <v-tooltip bottom v-if="item.account_type === 'Paid' || item.account_type === 'paid'">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" style="font-size:16px; color:green;">
                            mdi-currency-usd
                          </v-icon>
                        </template>
                        <span>Paid</span>
                      </v-tooltip>
                      <v-tooltip bottom v-else>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on" style="font-size:16px;" >
                            mdi-currency-usd-off
                          </v-icon>
                        </template>
                        <span>Pilot</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="1">
                  <v-chip v-if="item.is_active" style="background: linear-gradient(45deg,#49914E 0%,#B2D553 100%);border-radius: 10px; padding: 16px; color: white; font-size: 16px;" :color="item.is_active ? 'green' : 'grey'">
                    <span >Active</span>
                  </v-chip>
                  <v-chip v-if="!item.is_active" style="       background: linear-gradient(45deg,#d63939 0%,#FF857B 100%);border-radius: 10px; padding: 16px;color: white; font-size: 16px;"  :color="item.is_active ? 'green' : 'grey'">
                    <span >Inactive</span>
                  </v-chip>
                </v-col>
                <v-col cols="1" style="">
                  {{ moment(item.createdAt).format('DD MMM YYYY') }}
                </v-col>
                <v-col cols="1" v-if="item.activatedAt">
                  {{ moment(item.activatedAt).format('DD MMM YYYY') }}
                </v-col>
                <v-col cols="1" v-else>
                  --
                </v-col>
                <v-col cols="1" style="">
                  <span v-if="item.user_booked">
                    {{item.user_booked}}
                  </span>
                  <span v-else>--</span>
                </v-col>
                <v-col cols="3" style="" v-if="item.users_status.length > 0">
                  <v-row class="w-100 ma-0">
                    <v-col cols="3">
                      <span style="font-weight:400;" v-if="item.users_status && item.users_status[0] && item.users_status[0].status === 'active'">{{item.users_status[0].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status && item.users_status[1] && item.users_status[1].status === 'active'">{{item.users_status[1].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status && item.users_status[2] && item.users_status[2].status === 'active'">{{item.users_status[2].count}}</span>
                      <span style="font-weight:400;" v-else>--</span>
                    </v-col>
                    <v-col cols="3">
                      <span style="font-weight:400;" v-if="item.users_status && item.users_status[0] && item.users_status[0].status === 'inactive'">{{item.users_status[0].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status && item.users_status[1] && item.users_status[1].status === 'inactive'">{{item.users_status[1].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status && item.users_status[2] && item.users_status[2].status === 'inactive'">{{item.users_status[2].count}}</span>
                      <span style="font-weight:400;" v-else>--</span>
                    </v-col>
                    <v-col cols="3">
                      <span style="font-weight:400;" v-if="item.users_status && item.users_status[0] && item.users_status[0].status === 'duplicate'">{{item.users_status[0].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status && item.users_status[1] && item.users_status[1].status === 'duplicate'">{{item.users_status[1].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status && item.users_status[2] && item.users_status[2].status === 'duplicate'">{{item.users_status[2].count}}</span>
                      <span style="font-weight:400;" v-else>--</span>
                    </v-col>
                    <v-col cols="3">
                      <span style="font-weight:400;" v-if="item.users_status.length === 1">{{item.users_status[0].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status.length === 2">{{item.users_status[0].count + item.users_status[1].count}}</span>
                      <span style="font-weight:400;" v-else-if="item.users_status.length === 3">{{item.users_status[0].count + item.users_status[1].count + item.users_status[2].count}}</span>
                      <span style="font-weight:400;" v-else>--</span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3" style="" v-else>
                  <v-row class="w-100 ma-0">
                    <v-col cols="3">
                      <span style="font-weight:400;">--</span>
                    </v-col>
                    <v-col cols="3">
                      <span style="font-weight:400;">--</span>
                    </v-col>
                    <v-col cols="3">
                      <span style="font-weight:400;">--</span>
                    </v-col>
                    <v-col cols="3">
                      <span style="font-weight:400;">--</span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="1" style="" class="companySettingsToggel">
                  <v-row class="w-100 ma-0">
                    <v-col cols="12">
                      <v-btn outlined @click.stop="editCompany(item)" style=" margin-top:-10px; min-width:40px;  width:40px; border-color:#e4e4e4;  color: rgb(5, 5, 80) !important;" color="#050550">
                    <v-icon>mdi-lead-pencil</v-icon>
                  </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-list two-line v-else>
          <v-skeleton-loader v-for="(i, j) in 10" :key="j"
            v-bind="attrs"
            type="list-item-avatar, divider"
          ></v-skeleton-loader>
        </v-list>
        <div class="d-flex">
          <v-flex xs1></v-flex>
          <v-flex class="pr-4 mb-0 ml-3" xs10 style="text-align:center">
            <v-pagination
              class="adhoc--text"
              color="primary"
              v-model="pagination.page"
              :length="pagination.length"
              :total-visible="7"
              @input="getCompanyDetails()"
              circle
            ></v-pagination>
          </v-flex>
          <v-flex xs1></v-flex>
        </div>
      </div>
    </div>
    <addCompany ref="addcompany" class="" />
  </div>
</template>

<script>
/* eslint-disable */
var count = 0;
import axios from 'axios';
import { mapState } from 'vuex';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
import addCompany from './dialogs/AddCompany';


am4core.useTheme(am4themes_animated);
export default {
  name: 'companyList',

  components: {
    axios,
    infiniteScroll,
    addCompany
  },

  data: () => ({
    moment: moment,
    data: [],
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
    lineChart () {
      am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("chartdiv1", am4charts.XYChart);

// Add data
chart.data = [{
"date": new Date(2018, 0, 1),
"value": 450,
"value2": 362,
"value3": 699
}, {
"date": new Date(2018, 0, 2),
"value": 269,
"value2": 450,
"value3": 841
}, {
"date": new Date(2018, 0, 3),
"value": 700,
"value2": 358,
"value3": 699
}, {
"date": new Date(2018, 0, 4),
"value": 490,
"value2": 367,
"value3": 500
}, {
"date": new Date(2018, 0, 5),
"value": 500,
"value2": 485,
"value3": 369
}, {
"date": new Date(2018, 0, 6),
"value": 550,
"value2": 354,
"value3": 250
}, {
"date": new Date(2018, 0, 7),
"value": 420,
"value2": 350,
"value3": 600
}];

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
function createSeries(field, name) {
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = field;
series.dataFields.dateX = "date";
series.name = name;
series.tooltipText = "{dateX}: [b]{valueY}[/]";
series.strokeWidth = 2;

var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.circle.stroke = am4core.color("#fff");
bullet.circle.strokeWidth = 2;

return series;
}

var series1 = createSeries("value", "Series #1");
var series2 = createSeries("value2", "Series #2");
var series3 = createSeries("value3", "Series #3");

chart.legend = new am4charts.Legend();
chart.cursor = new am4charts.XYCursor();
    },
    accountTypeChart (data) {
      const that = this;
      am4core.addLicense("ch-custom-attribution");
      // Create chart instance
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = [{
"country": "Paid",
"litres": data[1].count
}, {
"country": "Pilot",
"litres": data[0].count
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
    },
    getCompanyDetails () {
      axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
      const queryParams = {
      count: 'true',
      page_limit: this.pagination.rowsPerPage,
      page_offset: this.pagination.page || 1,
      raw_search_string: this.searchCompany,
      account_type: this.filter_type ? this.filter_type : undefined,
    };
      axios.get(`${process.env.VUE_APP_API_URL}company/dashboard?fields=companies_overview`, {
        params: queryParams
      }).then((response) => {
        if (response && response.data) {
          this.dashboardData = response.data;
          this.pagination.length = Math.ceil(response.data.companies_overview.companies_count / this.pagination.rowsPerPage);
          // console.log(this.company);
          if (response.data && response.data.dashboard_overview.account_type) {
            this.accountTypeChart(response.data.dashboard_overview.account_type);
            this.lineChart();
          }
          
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
    this.getCompanyDetails();
    this.loadMore();
    // this.getAvatar();
    if (!this.user.email) {
      this.$router.push(`/login`);
    }
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
// .mainBox:hover {
//   transform: scale(1.05);
// }
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
  background-color: #f6f6f6;
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
  height: 400px;
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
    
    // font-family: Montserrat;
    font-weight: 500;
    line-height: 1.1;
    font-size: 20px;
    margin: 0 0 6px;
    width: 100%;
  }
}
</style>
