const request = require('supertest');
const express = require('express');
const router = require('./router'); 

const app = express();
app.use(express.json());
app.use('/', router);

describe('Test the superheroes path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('It should respond to the GET method with an id', async () => {
        const response = await request(app).get('/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('power');
    });

    test('It should respond to the POST method', async () => {
        const newSuperhero = {
            name: 'Superman',
            power: 'Super Strength',
        };
        const response = await request(app).post('/').send(newSuperhero);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual(newSuperhero.name);
        expect(response.body.power).toEqual(newSuperhero.power);
    });

    test('It should respond to the DELETE method', async () => {
        const response = await request(app).delete('/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({});
    });

    test('It should respond to the PUT method', async () => {
        const updatedSuperhero = {
            name: 'Batman',
            power: 'Intelligence',
        };
        const response = await request(app).put('/1').send(updatedSuperhero);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toEqual(updatedSuperhero.name);
        expect(response.body.power).toEqual(updatedSuperhero.power);
    });
});