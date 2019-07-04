const axios = require("axios");
import { BASE_URL, DEFAULT_EMAIL, DEFAULT_TOKEN } from "./config";
import store from "./src/redux";

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json"
  }
});

// instance.get("/rest-auth/logout/");

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Convert data to snake case before request is sent
    /* if( config.data ){
      config.data = decamelize(config.data, {deep: true});;  
    } */

    // Add authorization headers
    // config.headers.common['X-User-Email'] = store.getState().currentUser.email;

    console.log(store.getState());

    if (store.getState().currentUser.token != "")
      config.headers.common["Authorization"] =
        "Token " + store.getState().currentUser.token;

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
/* instance.interceptors.response.use(function (response) {
    // Do something with response data
    if( response.data ){
      response.data = camelize(response.data, {deep: true});
    }
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
 
*/
export const removeAuthTokens = () => {
  instance.defaults.headers.common["Authorization"] = "";
};

export default instance;
