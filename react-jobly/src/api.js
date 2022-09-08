import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "";

  /** get anything available from backend API
   * args:
   * -endpoint: url excluding baseurl as string
   * -data: obj of json data to include with request, default {}
   * -method: api req method as string defaults to "get"
   *
   * returns api response
   */

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  //TODO: make smaller API methods like getCompany

  /** post or patch anything available from backend API
   * args:
   * -endpoint: url excluding baseurl as string
   * -data: obj of json data to include with request, default {}
   * -params: url parameter, default {}
   * -method: api req method as string defaults to "post"
   *
   * returns api response
   */

  static async postOrPatch(endpoint, data = {}, params = {}, method = "post") {
    console.debug("API POST or Patch Call:", endpoint, data, params, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
}

export default JoblyApi;