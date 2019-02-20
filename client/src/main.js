import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

import ApolloClient from 'apollo-boost';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

// setup apolloclient
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  // include auth token with request made to backend
  fetchOptions: {
    credentials: 'include',
  },

  request: (operation) => {
    // if no token with key of 'token' in local storage, add it
    if (!localStorage.token) {
      localStorage.setItem('token', '');
    }
    // operation add token to an authorization header, which is sent to the backend
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  },

  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
      }
    }
  },
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  store,
  render: (h) => h(App),
  created() {
    // execute getCurrentUser query upon created
    this.$store.dispatch('getCurrentUser');
  },
}).$mount('#app');
