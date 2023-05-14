/* eslint-disable */
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from './store';
// import Shell from './components/Shell';

// import Adhoc from './views/Adhoc.vue';
// import Exit from './views/exitChat.vue';
// import MentalWellbeing from './views/MentalWellbeing.vue';
// import urlShortener from './views/urlShortener.vue';
// import IdentityRequest from './views/IdentityRequest.vue';
// import Unsubscribe from './views/Unsubscribe.vue';
// import UnsubscribeExit from './views/UnsubscribeExit.vue';

Vue.use(VueRouter);

const routes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "Login" */ './components/Login.vue')
    }, {
        path: '/',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "Login" */ './components/Dashboard.vue')
    }, {
        path: '/company-list',
        name: 'companyList',
        component: () => import(/* webpackChunkName: "Login" */ './components/companyList.vue')
    }, {
        path: '/company-details',
        name: 'companylist',
        component: () => import(/* webpackChunkName: "Login" */ './components/companyDetails.vue')
    },
    {
      path: '/',
      meta: {
        requiresAuth: true
      },
    //   children: [
    //     {
    //         path: '/dashboard',
    //         name: 'dashboard',
    //         component: () => import(/* webpackChunkName: "Login" */ './components/Dashboard.vue')
    //     }, {
    //         path: '/company-details',
    //         name: 'companylist',
    //         component: () => import(/* webpackChunkName: "Login" */ './components/companyDetails.vue')
    //     }
    //   ]
    },
  ];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  });

router.beforeEach((to, from, next) => {
    // console.log(store.state.isDashboardPermission);
    // console.log('before to, from, next', to);
    // store.state.appLoading = true;
    if (to.name === 'Adhoc' || to.name === 'NewAdhoc' || to.name === 'ViewAdhoc') {
      store.state.isAdhocView = true;
      store.state.hideAdhoc = false;
    } else if (to.name === 'EditAdhoc') {
      store.state.hideAdhoc = true;
    } else {
      store.state.hideAdhoc = false;
      store.state.isAdhocView = false;
    }
    next();
  });
  
  router.beforeEach((to, from, next) => {
    // console.log('store.state.user', store.state.user);
    // for main app navigation start
    const routePath = to.path.split('/');
    const currentPath = routePath[1];
    store.state.activeNavigation = currentPath;
    // for main app navigation end
    let authInterceptor;
    if (to.matched.some(record => record.meta.requiresAuth) && store.state.user) {
      if (store.state.user && store.state.user.access_token) {
        store.dispatch('inspectToken');
      }
      authInterceptor = axios.interceptors.request.use((config) => {
        const configTemp = config;
        // const configTemp = Object.assign({}, config);
        // delete configTemp.headers.Authorization;
        // console.log('configTemp.headers before', configTemp.headers.Authorization);
        configTemp.headers.Authorization = `JWT ${store.state.user.access_token}`;
        configTemp.headers['X-CSRFToken'] = store.state.user.csrf_token;
        configTemp.headers['dashboard-version'] = 'v1';
        return configTemp;
      }, error => Promise.reject(error));
      // next();
    } else if (to.matched.some(record => record.meta.requiresAuth) && !store.state.user) {
      axios.interceptors.request.eject(authInterceptor);
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      axios.interceptors.request.eject(authInterceptor);
      next();
    }
  
    if (!store.state.user) {
      axios.interceptors.request.use((config) => {
        const configTemp = Object.assign({}, config);
        delete configTemp.headers.Authorization;
        if (store && store.state && store.state.user && store.state.user.access_token) {
          configTemp.headers.Authorization = `JWT ${store.state.user.access_token}`;
        }
        return configTemp;
      }, error => Promise.reject(error));
    }
    // 401 interceptor
    axios.interceptors.response.use(response => response, (error) => {
      let rtn = false;
      // if (error.response && error.response.status === 401 &&
      //   error.response.data && error.response.data.detail === 'Signature has expired.') {
      if (error.response && error.response.status === 401 && error.response.data && (error.response.data.detail === 'Signature has expired.' || error.response.data.detail === 'Error decoding signature.')) {
        if (error.response.status !== 409) {
          store.dispatch('autoLogout');
        }
        store.dispatch('sessionSync');
        // setTimeout(() => {
        //   localStorage.removeItem('CHATBOT_USER');
        //   store.dispatch('deleteSession');
        // }, 3000);
        store.dispatch('updateSnackbar', {
          color: 'info',
          show: true,
          text: 'Session expired, Please log-in again!'
        });
      } else {
        rtn = Promise.reject(error);
        // throw new Error(error);
      }
      return rtn;
    });
  });
  
  
  router.afterEach((to, from) => {
    setTimeout(() => {
      store.state.appLoading = false;
    }, 1500);
  });
  
  export default router;
  