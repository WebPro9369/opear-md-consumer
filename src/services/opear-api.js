import Axios from "axios";

export const API_SETTINGS = {
  apiKey: null,
  endpoint: "http://ec2-18-191-228-16.us-east-2.compute.amazonaws.com" //'http://localhost:3000/' // 'http://ec2-18-191-228-16.us-east-2.compute.amazonaws.com',
};

const axios = Axios.create({
  baseURL: API_SETTINGS.endpoint,
  headers: {
    Authorization: {
      toString() {
        if (!API_SETTINGS.apiKey) return "";
        return `Token ${API_SETTINGS.apiKey}`;
      }
    },
    post: {
      "Content-Type": "application/json"
    }
  }
});

export const registerParent = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/parents", data)
    .then(res => {
      console.tron.log("Opear registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Opear registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getParent = (userID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/parents/${userID}`)
    .then(res => {
      console.tron.log("Get care provider done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get care provider error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateParent = (
  userID,
  data,
  { successHandler, errorHandler } = {}
) => {
  axios
    .patch(`/v1/parents/${userID}`, data)
    .then(res => {
      console.tron.log("Care provider update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Care provider update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const createPaymentAccount = (
  userID,
  data,
  { successHandler, errorHandler } = {}
) => {
  const url = `/v1/parents/${userID}/payment_account`;
  axios
    .post(url, data)
    .then(res => {
      console.tron.log("Opear createCustomer done: ", res);
      if (successHandler) {
        successHandler(res);
      }
    })
    .catch(err => {
      console.tron.log("Opear createCustomer error: ", err);
      if (errorHandler) {
        errorHandler(err);
      }
    });
};

export const getApiToken = (
  email,
  password,
  { successHandler, errorHandler } = {}
) => {
  const url = `/v1/authentications`;

  axios
    .post(url, { email, password })
    .then(res => {
      console.tron.log("Authentication done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Authentication error: ", err);
      if (errorHandler) errorHandler(err);
    });
};
