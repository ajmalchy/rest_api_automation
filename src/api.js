const axios = require('axios');
const HOST = 'https://api.github.com';
require('dotenv').config();
class Api {
    constructor(host = HOST) {
        this.host = host;
        this.instance = axios.create({
            baseURL : this.host,
            headers : {
                'Content-Type' : 'application/json',
                'User-Agent' : 'PostmanRuntime/7.32.3'
            },
            auth : {
                username : process.env.USERNAME,
                password : process.env.PERSONAL_ACCESS_TOKEN
            },
            json : true,
        });

    }
    searchRepo(params) {
        const endpoint = `/search/repositories`;

        return this.instance.get(`${this.host}${endpoint}`, {
            params
        });
    }

    createEmptyRepo(name) {
        const endpoint = `/user/repos`;
        return this.instance.post(`${this.host}${endpoint}`, {
            name
        })
    }
}

module.exports = Api;