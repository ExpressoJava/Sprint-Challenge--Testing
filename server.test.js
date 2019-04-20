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

	describe('POST /games', () => {
		it('return list of games if added successfully', async () => {
			const res = await request(server)
				.post('/games')
				.send({ title: 'Dragon Nest', genre: 'MMORPG', releaseYear: 2010 })
			const expected = [
				{ id: 1, title: 'Zelda', genre: 'Action-Adventure', releaseYear: 1986 },
				{ id: 2, title: 'Arena of Valor', genre: 'MOBA', releaseYear: 2017 },
				{ id: 3, title: 'Dragon Nest', genre: 'MMORPG', releaseYear: 2010 }
			]
			expect(res.body).toEqual(expected)
		})

		it('should return a status code of 422 if not enough information', async () => {
			const res = await request(server)
				.post('/games')
				.send({
					title: 'xyz'
				})
			expect(res.status).toBe(422)
		})
		it('return a status code of 405 if title already exists', async () => {
			const res = await request(server)
				.post('/games')
				.send({
					title: 'Zelda',
					genre: 'Action-Adventure'
				})
			expect(res.status).toBe(405)
		})
	})
})
