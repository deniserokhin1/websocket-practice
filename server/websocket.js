const ws = require('ws')

const wss = new ws.Server(
	{
		port: 5001,
	},
	() => console.log(`Server started on 5001`)
)

wss.on('connection', (ws) => {
	ws.id = Date.now()

	ws.on('message', (message) => {
		message = JSON.parse(message)
        
		switch (message.event) {
			case 'message':
				broadcastMessage(message, ws.id)
				break
			case 'connection':
				broadcastMessage(message, ws.id)
				break
		}
	})
})

function broadcastMessage(message, id) {
	console.log('id:', id)

	wss.clients.forEach((client) => {
		console.log('client.id:', client.id)
		client.send(JSON.stringify(message))
	})
}
