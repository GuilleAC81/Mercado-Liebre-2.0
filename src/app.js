//************ Require *************
const express = require('express');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const cookieParser = require('cookie-parser');
const session = require('express-session');
const loggedMDW = require('./middlewares/loggedMDW');

//************ Express *************
const app = express();

//***** Definición del puerto ******
const puerto = process.env.PORT || 3000;

//******** Template Engine  ********
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// ********* Middlewares  **********
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({
secret: 'you know nothing',
resave: false,
saveUninitialized: false,
}));
app.use(cookieParser());
app.use(loggedMDW)


// ***** Sistema de ruteo **********
const mainRouter = require('./routes/mainRouter'); // Rutas main
const productsRouter = require('./routes/productsRouter'); // Rutas /products
const usersRouter = require('./routes/usersRouter')

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);


// // ************ DON'T TOUCH FROM HERE ************
// // ************ catch 404 and forward to error handler ************
// app.use((req, res, next) => next(createError(404)));

// // ************ error handler ************
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.path = req.path;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//***** Levantando el Servidor *****
app.listen(puerto, ()=>{
  console.log(`Server corriendo en puerto ${puerto}\nhttp://localhost:${puerto}`);
})
