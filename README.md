# dok-socket
Uses [socket.io](https://socket.io/) to handle data sharing easily via sockets.

This is the **server** component.

________

- Server package:

  - NPM: https://www.npmjs.com/package/dok-socket

  - Github: https://github.com/jacklehamster/dok-socket

    

- Client package:
  - NPM: https://www.npmjs.com/package/dok-socket-client
  - Github: 

_______

Setup server on Node.js:

```javascript
const { serveSocket } = require('dok-socket');

const app = express();
const { io, server } = serveSocket(app);
const httpServer = server.listen(port, () =>
   console.log(`Listening on port ${port}!`.bgGreen));

```

This opens the socket on the local server.

Then import the client (use browserify to get the Nodejs module working in browser).

Create main.js

```javascript
const { SocketClient } = require("dok-socket-client");

module.exports = {
		SocketClient,
};
```

Browserify:

```bash
browserify main.js --standalone dok-lib > json-compact.js
```

Use:

```javascript
const { 
	SocketClient,
} = dokLib;

const socket = new SocketClient(backupServer);
```

Now you can use `socket` to share data or call functions in real time.

## Join / leave a room

```javascript
//	To join a room:
socket.join("room");

//	To leave a room:
socket.leave("room");
```

As soon as you join a room, data gets shared across.

## Sharing data

Once you joined a room, a simple way to handle real-time communication is to have all clients share a piece in a big pool of data.

```javascript
//	To share data with other clients in the room
socket.update(data);
```

Data can be any serializable object. Then you can access all data shared within the room:

```javascript
//	This is the number of data available
const count = socket.dataCount();

//	Then iterate through all the data:
for (let i = 0; i < count; i++) {
		const data = socket.getSharedDataAt(i);
  	//	if you need, you can use the client's id:
  	const id = socket.getIdAt(i);
  	const dataById = socket.getSharedData(id);

  	//	...
}
```

Note data `socket.getSharedData(0)` is your own data. If you haven't set it, it will be empty (`{}`);

You can just read data in a loop repeatedly, or listen to data change:

```javascript
socket.addEventListener("update", (id, data) => {
	//	do something with id and data
});
```

Traditionally, we have each client share a model that describe a character in a game. Each client continously update their own client, and processes data for all clients including self, to display the various characters in a game.

## Call methods accross clients in real-time

Another way to handle real-time communication is to call methods across several clients. Calling a method on one client would call the exact same method on all clients automatically.

```javascript
obj.method = socket.wrap("name", obj.method);
```

Now, when you call `obj.method`, it will execute whatever `obj.method` was doing, but it will also call `obj.method` on all other clients (assuming all clients also ran the same code that wraps their own `obj.method` under `name`).

For instance:

```javascript
console.log = socket.wrap("log", console.log);

console.log("Hello everybody!");	//	This logs the messsage "Hello everybody!" on everyone's console, including your own.
```

This is an easy way to use socket.io. If you have your own use case, I would suggest you code your own implementation using socket.io. The package is available here: https://socket.io/


# Demo

The doc is not super accurate. The best to do is check the source code of the demo:

Try the [demo here](https://jacklehamster.github.io/dok-socket/)
