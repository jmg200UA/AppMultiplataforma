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

//insertamos lo respectivo a JSON
var js = require("jsdom");
const { JSDOM } = js;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

	
app.get('/introducirdatos', function(req, resp) {
	
	//MUNICIPIOS
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsMun = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/maestro/municipios?api_key=" + key,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
	}
	$.ajax(settingsMun).done(function (response) {
        datos = JSON.parse(response);
        datos.forEach(function (entry) {
        	const insertar= "INSERT INTO municipios(latitud_dec,altitud,longitud_dec) values ('" + entry.latitud_dec + "','" + entry.altitud + "','" + entry.longitud_dec + "')";
        	connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/municipios');
					//resp.status(200);
					//resp.send(rows);
				}
			});
        });
        
    });

	//ESTACIONES
	var datos;
	    var datosfiltrados = [];
	    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	    var settingsest = {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=" + key,
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }


	    $.ajax(settingsest).done(function (response) {
	        console.log(response);
	        var settingsest = {
	            "async": true,
	            "crossDomain": true,
	            "url": "https://opendata.aemet.es/opendata/sh/7f1b8458",
	            "method": "GET",
	            "headers": {
	                "cache-control": "no-cache"
	            }
	        }
	        $.ajax(settingsest).done(function (response) {
	            var j = 0;
	            //Parseo a objeto para filtrar y meter en datatable
	            datos = JSON.parse(response);
	            datos.forEach(function (entry) {
	            	const insertar= "INSERT INTO estaciones(nombre) values ('" + entry.nombre + "')";
	                connection.query(insertar, function(err) {
						if (err) {
							console.log('Error en /introducirdatos '+err);
							//resp.status(500);
							//resp.send({message: "Error al introducirdatos"});
						}
						else {
							console.log('/estaciones');
							//resp.status(200);
							//resp.send(rows);
						}
					});
	            });
	        }); 
	    });
	});

	//PREDICCIONES
	/*ALCOY*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsalcoy = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03009?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingsalcoy).done(function (response) {
	    var settingsalcoy = {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/543bb099",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingsalcoy).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*ALICANTE*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsalicante= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03014?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingsalicante).done(function (response) {
	    var settingsalicante= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/a379e3de",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingsalicante).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*VALENCIA*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsvalencia= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/46250?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingsvalencia).done(function (response) {
	    var settingsvalencia= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/0b9237ce",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingsvalencia).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*CASTELLÓN*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingscastellon= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/12040?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingscastellon).done(function (response) {
	    var settingscastellon= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/7e5aee06",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingscastellon).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*SAN VICENTE DEL RASPEIG*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingssanvi= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03122?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingssanvi).done(function (response) {
	    var settingssanvi= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/8a4c500d",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingssanvi).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*VILLENA*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsvillena= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03140?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingsvillena).done(function (response) {
	    var settingsvillena= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/c24f709a",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingsvillena).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*DENIA*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsvillena= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03063?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingsvillena).done(function (response) {
	    var settingsvillena= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/05521ecd",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingsvillena).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

	/*ORIHUELA*/
	var datos;
	var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
	var settingsvillena= {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03099?api_key=" + key,
	    "method": "GET",
	    "headers": {
	        "cache-control": "no-cache"
	    }
	}

	$.ajax(settingsvillena).done(function (response) {
	    var settingsvillena= {
	        "async": true,
	        "crossDomain": true,
	        "url": "https://opendata.aemet.es/opendata/sh/e2490373",
	        "method": "GET",
	        "headers": {
	            "cache-control": "no-cache"
	        }
	    }
	    $.ajax(settingsvillena).done(function (response) {
	        datos = JSON.parse(response);
	        const insertar= "INSERT INTO predicciones(nombre,prediccion,humedad_relativa_maxima) values ('" + datos[0].nombre + "','" + datos[0].prediccion.dia[0].estadoCielo[2].descripcion + "','" + datos[0].prediccion.dia[0].humedadRelativa.maxima + "')";
	        connection.query(insertar, function(err) {
				if (err) {
					console.log('Error en /introducirdatos '+err);
					//resp.status(500);
					//resp.send({message: "Error al introducirdatos"});
				}
				else {
					console.log('/predicciones');
					//resp.status(200);
					//resp.send(rows);
				}
			});  
	    });
	});

var server = app.listen(8080, function () {
 console.log('Servidor iniciado en puerto 8080...');
});
        
	

    