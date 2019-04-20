const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
	it('return a status of 200', () => {
		const res = request(server).get('/games')
		expect(res.status).toBe(200)
	})
})
