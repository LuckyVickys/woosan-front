import axios from "axios";
import { API_SERVER_HOST } from "./boardApi";

// const host = `${API_SERVER_HOST}/api`;
const host = `http://localhost:80/api`;

export const loginPost = async (loginParam) => {

    const header = {headers: {"Content-Type" : "x-www-form-urlencoded"}}

    const form = new FormData();
    form.append('username', loginParam.email);
    form.append('password', loginParam.password);

    const res = await axios.post(`${host}/auth/login`, form, header);

    return res.data;
}