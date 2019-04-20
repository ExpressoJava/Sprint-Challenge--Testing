const express = require('express')
const server = express()

server.use(express.json())

let games = [
	{
		id: 1,
		title: 'Zelda',
		genre: 'Action-Adventure',
		releaseYear: 1986
	},
	{
		id: 2,
		title: 'Arena of Valor',
		genre: 'MOBA',
		releaseYear: 2017
	}
]

server.get('/games', (req, res) => {
	res.status(200).json(games)
})

server.post('/games', (req, res) => {
	const game = req.body
	if (game.title && game.genre) {
		if (games.find(existingGame => existingGame.title === game.title)) {
			res
				.status(405)
				.json({ message: 'This title exists, Please enter another title' })
		} else {
			let id = games.length + 1
			game.id = id
			games.push(games)
			res.status(201).json(games)
		}
	} else {
		res
			.status(422)
			.json({ message: 'Title and genre required, please reenter' })
	}
})

server.get('/games/:id', (req, res) => {
	const { id } = req.params
	const game = games.filter(existingGame =>
		Number(existingGame.id === Number(id))
	)

	if (game.length > 0) {
		res.status(200).json(game)
	} else {
		res.status(404).json({ message: 'This game does not exist' })
	}
})

server.delete('/games/:id', (req, res) => {
	const { id } = req.params
	initialLen = games.length
	games = games.filter(game => {
		return Number(game.id) !== Number(id)
	})
	const postLen = games.length
	const diff = initialLen - postLen
	if (diff > 0) {
		res.status(200).json({ message: 'game successfully deleted' })
	} else {
		res.status(404).json({ message: 'Game does not exist' })
	}
})

module.exports = server
