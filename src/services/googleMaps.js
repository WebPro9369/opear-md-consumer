import Axios from "axios";

const GOOGLE_API = "https://maps.google.com/maps/api";
const axios = Axios.create({
  baseURL: GOOGLE_API,
  headers: {
    post: {
      "Content-Type": "application/json"
    }
  }
});

const getGeo = (address, successHandler, errorHandler) => {
  axios
    .get("/geocode/json", {
      params: {
        address,
        key: "AIzaSyBk3GGZzP0i457Ae2rP4aiZ5aGBkAxbuwY"
      }
    })
    .then(res => {
      console.tron.log("Get google geo done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get google geo error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export default { getGeo };
