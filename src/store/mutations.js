/* eslint-disable no-param-reassign */
export default {
  UPDATE_FILTERS (state, dashboardFilters) {
    state.dashboardFilters = dashboardFilters;
  },
  UPDATE_STAGE (state, stagedata) {
    state.stage = stagedata;
  },
  UPDATE_COMPANY (state, activeCompany) {
    state.activeCompany = activeCompany;
  },
  UPDATE_SETTINGS_TAB (state, activeTab) {
    state.selectedSettingsTab = activeTab;
  },
  UPDATE_COMPANY_ADMINS (state, usersData) {
    state.companyAdminsList = usersData;
  },
  UPDATE_COMPANY_USERS (state, usersData) {
    state.companyUsersList = usersData;
  },
  UPDATE_STAGES (state, stagesData) {
    state.stages = stagesData;
  },
  UPDATE_SNACKBAR (state, snackbarData) {
    state.snackbar = snackbarData;
  },
  CREATE_TEMP_SESSION (state, userData) {
    state.tempUser = userData;
  },
  CREATE_SESSION (state, userData) {
    state.user = userData;
  },
  UPDATE_PERMISSION (state, permission) {
    state.user.permissions = permission;
  },
  COMPANY_SETTINGS (state, settings) {
    state.csettings = settings;
  },
  UPDATE_SORT_BY (state, settings) {
    state.sort_by = settings;
  },
  // CREATE_SETTINGS (state, settings) {
  //   state.companySettings = settings;
  // },
  CREATE_CONSOLE_SETTINGS (state, consoleSettings) {
    state.companyConsoleSettings = consoleSettings;
  },
  UPDATE_SESSION_KEY (state, keyData) {
    state.user.access_token = keyData;
  },
  DELETE_SESSION (state) {
    state.user = null;
    window.location.reload();
    window.open('/login', '_self');
  },
  TOGGLE_SIDEBAR (state) {
    state.sidebarOpen = !state.sidebarOpen;
  },
  TEAM_LIST (state, teamData) {
    state.teamData = teamData;
  },
  UPDATE_TEAM (state, empData) {
    const idx = state.teamData.findIndex(team => team.id === empData.id);
    state.teamData[idx] = empData;
  },

  // email templates
  TEMPLATE_LIST (state, list) {
    state.templatesList = list;
  },
  EMAIL_TEMPLATE (state, template) {
    state.EmailTemplate = template;
    // console.log(state.EmailTemplate);
  },
  TEMPLATE_CATEGORY_OPTIONS (state, options) {
    state.templateCategoryOptions = options;
  },

  ACTIVE_TEMPLATE (state, template) {
    state.activeTemplate = template;
  },

  UPDATE_ACTIVE_TEMPLATE (state, data) {
    state.activeTemplate.default_email_template[data.type] = data.value;
  },

  UPDATE_ACTIVE_TEMPLATE_SUBJECT (state, data) {
    state.activeTemplate.default_email_template.subject = data;
  },

  UPDATE_ACTIVE_TEMPLATE_BODY (state, data) {
    state.activeTemplate.default_email_template.body[data.type] = data.value;
  },

  UPDATE_ACTIVE_TEMPLATE_ACTION_BUTTON (state, data) {
    state.activeTemplate.default_email_template.actionButton = data;
  },
  UPDATE_EMPLOYEE_FILTERS (state, data) {
    state.updateEmployeeFilters = data;
  },
  SINGLE_EMP_VIEW (state, data) {
    state.singleEmpView = data;
  },
  ACTIVE_EMPLOYEE (state, data) {
    state.activeEmployee = data;
  },
  EMPLOYEES_LIST (state, data) {
    state.employeesList = data;
  },
  LOADING_EMPLOYEES_LIST (state, data) {
    state.loadingEmployeesList = data;
  },
  UPDATE_DASHBOARD_FILTERS (state, data) {
    state.updateDashboardFilters = data;
  },
  UPDATE_REPORT_FILTERS (state, data) {
    state.updateReportFilters = data;
  },
  UPDATE_REPORT_DATA (state, data) {
    state.updateReportData = data;
  },
  UPDATE_QUESTION_FILTER (state, data) {
    state.questionScoreFilter = data;
  },
  UPDATE_DRIVERS_FILTERS (state, data) {
    state.updateDriversFilters = data;
  },
  USER_WIDTH (state, data) {
    state.userWidth = data;
  },
  UPDATE_BULK_ACTIONS (state, data) {
    state.bulkStatus = data;
  },
  SESSION_EMPLOYEES_COUNT (state, data) {
    state.sessionEmployeesCount = data;
  },
  SELECTED_EMPLOYEES_COUNT (state, data) {
    state.selectedEmployeesCount = data;
  },
  SESSION_EMPLOYEES (state, data) {
    state.sessionEmployees = data;
  },
  SESSION_EMPLOYEES_SELECTED (state, data) {
    state.sessionEmployeesSelected = data;
  },
  NON_SESSION_EMPLOYEES_SELECTED (state, data) {
    state.nonSessionEmployeesSelected = data;
  },
  IS_DASHBOARD_PERMMISSION (state, data) {
    state.isDashboardPermission = data;
  },
  SELECTED_EMPLOYEES (state, data) {
    state.selectedEmployees = data;
  },
  UPDATE_PAGE_OFFSET (state, data) {
    state.page_offset = data;
  },
  UPDATE_SEARCH_STRING (state, data) {
    state.searchString = data;
  },
  DRIVER_DATA (state, data) {
    state.driverData = data;
  },
  DRIVER_RESPONSES (state, data) {
    state.driversResponses = data;
  },
  DRIVERS_HEATMAP (state, data) {
    state.driversHeatmap = data;
  },
  DRIVERS_DEMOGRAPHIC (state, data) {
    state.driversDemographic = data;
  },
  HEATMAP_LOADING (state, data) {
    state.heatmapLoading = data;
  },
  ADHOC_DATA (state, data) {
    state.adhocData = data;
  },
  INTERACTION_DRIVER (state, data) {
    state.interactionDrivers = data;
  },
  UPDATE_STATUS_SSO_USER (state, data) {
    state.updateStatusSsoUser = data;
  },
  DELETE_SESSION_SSO_REDIRECT (state) {
    if (state.user.userType === 'sso') {
      window.location.assign(state.user.logout_redirect_url);
    }
  },
  SET_LOGOUT_TRUE (state) {
    state.userLogoutSucces = 'logoutSuccessFully';
    // window.location.reload();
  }
};
/* eslint-enable no-param-reassign */
