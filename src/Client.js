import axios from "axios";

const client = axios.create({baseURL : "http://52.201.207.3:8090"});

export default client;