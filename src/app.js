const express = require('express');
const expHandlebars = require('express-handlebars');
const app = express();

const { Server } = require('socket.io');

const prodRouter = require('./routes/products');
const cartRouter = require('./routes/carts');

const productsViewsRouter = require('../views/routes/products');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', expHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.use('/views', productsViewsRouter);

app.use('/api/products', prodRouter);
app.use('/api/carts', cartRouter);

const PORT = process.env.PORT || 8080
const httpServer = app.listen(PORT, () => console.log('Server running on port 8080'));

//const server = app.listen(8080, () => console.log('Server running on port 8080'));
httpServer.on('error', error => console.log(error));

let messages = []

const io = new Server(httpServer);

io.on('connection', socket =>{
    socket.emit('messages', messages);

    socket.on('newUserLoged', user =>{
        io.sockets.emit('newUser', user);
    })

    socket.on('message', data =>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})