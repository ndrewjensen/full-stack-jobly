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

  /** Get all companies
 * returns an array of company objects
 */

  static async getAllCompanies() {
    let res = await this.request(`companies/`);
    return res;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get companies by searchTerm
   * returns an array of company objects
   */

  static async searchCompanies(searchTerm) {
    let res = await this.request("companies", { name: searchTerm });
    return res;
  }

  /** Get all jobs
   * returns an array of job objects
   */

  static async getAllJobs() {
    let res = await this.request(`jobs/`);
    return res;
  }

  /** Get jobs by searchTerm
   * returns an array of job objects
  */

  static async searchJobs(searchTerm) {
    let res = await this.request("jobs", { title: searchTerm });
    return res;
  }

    /** Get user information
   * returns user information
   */

     static async getUser(username) {
      let res = await this.request(`users/${username}`);
      return res;
    }

  /** Post request to login user
   * returns user token
   */

  static async loginUser(data) {
    let res = await this.request("auth/token", data, "post");
    return res;
  }

  /** Post request to register user
   * returns user information and user token
   */

  static async registerUser(data) {
    let res = await this.request("auth/register", data, "post");
    return res;
  }

  /** Update user information
   * returns user information
   */

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res;
  }


}

export default JoblyApi;