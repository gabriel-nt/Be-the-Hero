const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {

    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    })

    it('should be able to crate a new ONG', async() => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'APATA',
                email: 'apata@contato.com',
                whatsapp: '51999999099',
                city: 'Taquara',
                uf: 'RS'
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})