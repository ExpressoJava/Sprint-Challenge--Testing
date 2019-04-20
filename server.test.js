const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
	describe('GET /games', () => {
		it('return a status of 200', async () => {
			const res = await request(server).get('/games')
			expect(res.status).toBe(200)
		})

		it('should return a list of games', async () => {
			const res = await request(server).get('/games')
			const expected = [
				{ id: 1, title: 'Zelda', genre: 'Action-Adventure', releaseYear: 1986 },
				{ id: 2, title: 'Arena of Valor', genre: 'MOBA', releaseYear: 2017 }
			]
			expect(res.body).toEqual(expected)
		})

		it('should always return an array', async () => {
			const res = await request(server).get('/games')
			expect(Array.isArray(res.body)).toBeTruthy()
		})
	})
})
