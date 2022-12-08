/*// Cargar modulos y crear nueva aplicacion
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

//Establecemos la conexión con la base de datos
var connection = mysql.createConnection({
 host : 'localhost',
 user : 'usuario',
 password : 'clave',
 database : 'dism'
});


//dependencias JSON
var js = require("jsdom");
const { JSDOM } = js;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);*/

var express = require("express");
var mysql = require('mysql');
var app = express();
var bp = require('body-parser');
const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bp.json());
var connection = mysql.createConnection({
 host : 'localhost',
 user : 'root',
 password : '',
 database : 'dism'
});

//Ejemplo: GET http://localhost:8080/items

//Conexion base de datos municipios
app.get('/municipios', function(req, resp) {
	connection.query('select * from municipios', function(err, rows) {
		if (err) {
			console.log('Error en /municipios '+err);
			resp.status(500);
			resp.send({message: "Error al obtener municipios"});
		}
		else {
			console.log('/municipios');
			resp.status(200);
			resp.send(rows);
		}
	});
});

//Conexion base de datos estaciones
app.get('/estaciones', function(req, resp) {
	connection.query('select * from estaciones', function(err, rows) {
		if (err) {
			console.log('Error en /estaciones '+err);
			resp.status(500);
			resp.send({message: "Error al obtener estaciones"});
		}
		else {
			console.log('/estaciones');
			resp.status(200);
			resp.send(rows);
		}
	});
});

//Conexion base de datos predicciones
app.get('/predicciones', function(req, resp) {
	connection.query('select * from predicciones', function(err, rows) {
		if (err) {
			console.log('Error en /predicciones '+err);
			resp.status(500);
			resp.send({message: "Error al obtener predicciones"});
		}
		else {
			console.log('/predicciones');
			resp.status(200);
			resp.send(rows);
		}
	});
});



var server = app.listen(8080, function () {
 console.log('Servidor iniciado en puerto 8080...');
});
