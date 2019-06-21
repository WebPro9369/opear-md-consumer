import Axios from "axios";

export const API_SETTINGS = {
  apiKey: 'heefKNdwQtX0OjxjXQyQKwtt',
  endpoint: 'https://api.opear.com' //'http://localhost:3000/' //'http://ec2-18-191-228-16.us-east-2.compute.amazonaws.com/' //'http://api.opear.com/'
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

/* Visit Requests */

export const getVisitRequest = (visitID, visitRequestID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/visits/${visitID}/visit_requests/${visitRequestID}`)
    .then(res => {
      console.tron.log("Get visit request done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get visit request error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getVisitRequests = (visitID, { past, successHandler, errorHandler } = {}) => {
  const url = `/v1/visits/${visitID}/visit_requests` + (past ? '?past=true' : '');

  axios
    .get(url)
    .then(res => {
      console.tron.log("Get visit requests done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get visit requests error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateVisitRequests = (visitID, visitRequestID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/visits/${visitID}/visit_requests/${userID}`, data)
    .then(res => {
      console.tron.log("Visit requests update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Visit requests update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Parents */

export const registerParent = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/parents", data)
    .then(res => {
      console.tron.log("Parent registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Parent registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getParent = (parentID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/parents/${parentID}`)
    .then(res => {
      console.tron.log("Get parent done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get parent error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateParent = (parentID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/parents/${parentID}`, data)
    .then(res => {
      console.tron.log("Parent update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Parent update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Children */

export const registerChild = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/children", data)
    .then(res => {
      console.tron.log("Child registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Child registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getChild = (childID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/children/${childID}`)
    .then(res => {
      console.tron.log("Get child done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get child error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getChildren = ({ successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/children`)
    .then(res => {
      console.tron.log("Get children done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get children error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateChild = (childID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/children/${childID}`, data)
    .then(res => {
      console.tron.log("Child update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Child update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Addresses */

export const registerAddress = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/addresses", data)
    .then(res => {
      console.tron.log("Address registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Address registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getAddress = (addressID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/addresses/${addressID}`)
    .then(res => {
      console.tron.log("Get address done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get address error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getAddresses = ({ successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/addresses`)
    .then(res => {
      console.tron.log("Get addresses done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get addresses error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateAddress = (addressID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/addresses/${addressID}`, data)
    .then(res => {
      console.tron.log("Address update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Address update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Reviews */

export const registerReview = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/reviews", data)
    .then(res => {
      console.tron.log("Review registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Review registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getReview = (reviewID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/reviews/${reviewID}`)
    .then(res => {
      console.tron.log("Get review done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get review error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getReviews = ({ successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/reviews`)
    .then(res => {
      console.tron.log("Get reviews done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get reviews error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateReview = (reviewID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/reviews/${reviewID}`, data)
    .then(res => {
      console.tron.log("Review update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Review update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Care Providers */

export const registerCareProvider = (data, { successHandler, errorHandler } = {}) => {
  axios
    .post("/v1/care_providers", data)
    .then(res => {
      console.tron.log("Opear registration done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Opear registration error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getCareProvider = (userID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/care_providers/${userID}`)
    .then(res => {
      console.tron.log("Get care provider done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get care provider error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateCareProvider = (userID, data, { successHandler, errorHandler } = {}) => {
  axios
    .patch(`/v1/care_providers/${userID}`, data)
    .then(res => {
      console.tron.log("Care provider update done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Care provider update error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Visits */

export const getVisits = (userID, { past, successHandler, errorHandler } = {}) => {
  const url = `/v1/visits` + (past ? '?past=true' : '');

  axios
    .get(url)
    .then(res => {
      console.tron.log("Get visits done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get visits error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const getVisit = (userID, visitID, { successHandler, errorHandler } = {}) => {
  axios
    .get(`/v1/visits/${visitID}`)
    .then(res => {
      console.tron.log("Get visit done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get visit error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Availabilities */

export const getAvailabilities = (userID, { successHandler, errorHandler } = {}) => {
  const url = `/v1/care_providers/${userID}/availability`;

  axios
    .get(url)
    .then(res => {
      console.tron.log("Get availabilities done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get availabilities error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

export const updateAvailabilities = (userID, data, { successHandler, errorHandler } = {}) => {
  const url = `/v1/care_providers/${userID}/availability`;

  axios
    .patch(url, data)
    .then(res => {
      console.tron.log("Update availabilities done: ", res);
      if (successHandler) successHandler(res);
    })
    .catch(err => {
      console.tron.log("Get availabilities error: ", err);
      if (errorHandler) errorHandler(err);
    });
};

/* Payout Account */

export const createBankAccountProvider = (userID, data, successHandler, errorHandler) => {
  const url = `/v1/care_providers/${userID}/payout_account`;
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

/* API Token */

export const getApiToken = (email, password, { successHandler, errorHandler } = {}) => {
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
