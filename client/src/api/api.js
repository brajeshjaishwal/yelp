import axios from 'axios'

export const proxy = () => {

    let token = ''

    const headerOptions = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return {
        get: (url) =>  {
            return axios.get(url)
        },
        getWithOptions: (url, options = {}) => axios.get(url, { ...headerOptions, ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...options }),
    };
};


export const handleError = error => {
    let errorMessage = ''
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data.message;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the 
        // browser and an instance of
        // http.ClientRequest in node.js
        errorMessage = 'Network error'
    } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
    }
    return errorMessage;
}