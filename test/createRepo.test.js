const Api = require('../src/api');
const { expect } = require('chai');
let api;

describe('Github create repo test cases (Release 1.0)', async () => {
    before(async () => {
        // actions to perform each tests
        console.log('before block');
        api = new Api();
    });
    after(async () => {
        // actions to perform after each tests
        console.log('after block');   
    })

    it.only('User should be able to make successful request using valid authentication and valid body parameters', async () => {
    const response = await api.createEmptyRepo('made_repo_from_automation');
    console.log(response);
    })
})