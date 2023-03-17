import React from "react";
import Axios from "axios";

// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
class Services {
    getAllCountries() {
        return this.getAuxEnd(`https://api-bdc.net/data/countries?localityLanguage=en&key=${import.meta.env.VITE_BIGDATACLOUD_apikey}`);
    }


     // Unified call below
    //----------------------------------------
    getAuxEnd(uri:string, reqData:any={}): Promise<any>  {
        const endPoint = uri;
        let axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                // 'Authorization': `Basic ${session_token}`,
            }
        };
        return Axios.get(endPoint, reqData)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                if (error.response) {
                    //response status is an error code
                    console.log(error.response.status);
                } else if (error.request) {
                    //response not received though the request was sent
                    console.log(error.request);
                } else {
                    //an error occurred when setting up the request
                    console.log(error.message);
                }
            });
    }

    postAuxEnd(uri:string, reqData:any) {
        const endPoint = uri;
        let axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                // 'Authorization': `Basic ${session_token}`,
            }
        };
        return Axios.post(endPoint, reqData)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => {
                if (error.response) {
                    //response status is an error code
                    console.log(error.response.status);
                } else if (error.request) {
                    //response not received though the request was sent
                    console.log(error.request);
                } else {
                    //an error occurred when setting up the request
                    console.log(error.message);
                }
            });
    }
}

const SiteAPI = new Services()

export default SiteAPI;