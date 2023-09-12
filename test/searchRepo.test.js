const Api = require('../src/api');
const { expect } = require('chai');
let api;

describe('Github search repos test cases (Release 1.0)', async () => {
    before(async() => {
        // actions to perform before each tests
        console.log('before block');
        api = new Api();
    });
    after(async() => {
        // actions to perform after each tests
        console.log('after block');
    })

    it('Verify user is not able to make successful request without q query parameter', async() => {
       
        try {
            const response = await api.searchRepo({});
        } catch (error) {
            // console.log(error.response.data);
            expect(error.response.status).to.equal(422);
            expect(error.response.data.message).to.equal('Validation Failed')
            expect(error.response.data.errors).to.be.an('array');
            expect(error.response.data.errors[0].resource).to.equal('Search');
            expect(error.response.data.errors[0].field).to.equal('q');
            expect(error.response.data.errors[0].code).to.equal('missing');
        }


    });
    it('Verify user is not able to make successful request with optional parameters (order, per_page)', async() => {
        try {
            const response = await api.searchRepo({order : 'asc', per_page : '1'});
        } catch (error) {
            // console.log(error.response.data);
            expect(error.response.status).to.equal(422);
            expect(error.response.data.message).to.equal('Validation Failed')
            expect(error.response.data.errors).to.be.an('array');
            expect(error.response.data.errors[0].resource).to.equal('Search');
            expect(error.response.data.errors[0].field).to.equal('q');
            expect(error.response.data.errors[0].code).to.equal('missing');
        }
    });
    it('Verify user is not able to make successful request with only q query parameter key (without value)', async() => {
        try {
            const response = await api.searchRepo({q : ''});
        } catch (error) {
            // console.log(error.response.data);
            expect(error.response.status).to.equal(422);
            expect(error.response.data.message).to.equal('Validation Failed')
            expect(error.response.data.errors).to.be.an('array');
            expect(error.response.data.errors[0].resource).to.equal('Search');
            expect(error.response.data.errors[0].field).to.equal('q');
            expect(error.response.data.errors[0].code).to.equal('missing');
        }
    });
    it('Verify user is able to make successful request with only q parameter and associated value attached to it', async() => {
        const response = await api.searchRepo({q : 'postman'});
        expect(response.status).to.equal(200);
        expect(response.data.total_count).to.equal(41229);
        expect(response.data.incomplete_results).to.be.false;
        expect(response.data.items).to.have.length(30);

        console.log(response);
    });
    it('Verify user is able to make successful request with both required and optional parameters (q, order, per_page)', async() => {
        const response = await api.searchRepo({q : 'postman', order : 'asc', per_page : '1'});
        expect(response.status).to.equal(200);
        expect(response.data.total_count).to.equal(41229);
        expect(response.data.incomplete_results).to.be.false;
        expect(response.data.items).to.have.length(1);

        console.log(response);
    });
});