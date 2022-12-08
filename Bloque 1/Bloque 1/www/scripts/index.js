
/*FUNCION PARA OBTENER LOS MAPAS*/
function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AqxsUyYoGE4onbXK24RbWz6GLQbktZCqY9IjyORIC_5lP8d84ACd4cKydOk4AxWf'
    });

    var datos;
    var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://opendata.aemet.es/opendata/api/maestro/municipios?api_key=" + key,
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var j = 0;
        datos = JSON.parse(response);
        datos.forEach(function (entry) {
            if (entry.altitud<200) {
                var loc = new Microsoft.Maps.Location(
                    entry.latitud_dec,
                    entry.longitud_dec);
                
                //Añado marcador en la posición obtenido del usuario.
                var pin = new Microsoft.Maps.Pushpin(loc);
                map.entities.push(pin);
                j = j + 1;
            }
        });
        
    });
}/*FUNCION PARA OBTENER LOS MAPAS DESDE API REST LOCAL*/
function GetMapp() {
    var map = new Microsoft.Maps.Map('#myMapp', {
        credentials: 'AqxsUyYoGE4onbXK24RbWz6GLQbktZCqY9IjyORIC_5lP8d84ACd4cKydOk4AxWf'
    });

    var datos;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/municipios",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done(function (response) {
        var j = 0;
        //datos = JSON.parse(response);
        response.forEach(function (entry) {
            if (entry.altitud < 200) {
                var loc = new Microsoft.Maps.Location(
                    entry.latitud_dec,
                    entry.longitud_dec);

                //Añado marcador en la posición obtenido del usuario.
                var pin = new Microsoft.Maps.Pushpin(loc);
                map.entities.push(pin);
                j = j + 1;
            }
        });

    });
}/*INVOCAMOS A LA FUNCION DE LAS ESTACIONES*/
$(document).on("pagecreate", "#three", function (event) {
    InicializarGrid();
});
   
    /*FUNCION PARA OBTENER LAS ESTACIONES Y METER LA INFO EN TABLAS*/
    function InicializarGrid() {
        var datos;
        var datosfiltrados = [];
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }
    

        $.ajax(settings).done(function (response) {
            console.log(response);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/7f1b8458",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                var j = 0;
                //Parseo a objeto para filtrar y meter en datatable
                datos = JSON.parse(response);
                datos.forEach(function (entry) {
                    if (entry) {
                        datosfiltrados[j] = entry;
                        j = j + 1;
                    }
                });
                tabla = $('#dataGrid').DataTable({
                    "data": datosfiltrados,
                    "columns": [
                        {
                            "data": "nombre"
                        }
                    ]
                });
            });
            
            
        });
        
    }/*AHORA LO MISMO PERO PARA LA API REST LOCAL*//*INVOCAMOS A LA FUNCION DE LAS ESTACIONES*/
$(document).on("pagecreate", "#six", function (event) {
    InicializarGrid2();
});
   
    /*FUNCION PARA OBTENER LAS ESTACIONES Y METER LA INFO EN TABLAS*/
    function InicializarGrid2() {
        var datos;
        var datosfiltrados = [];
    

        
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:8080/estaciones",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                var j = 0;
                //Parseo a objeto para filtrar y meter en datatable
                //datos = JSON.parse(response);
                response.forEach(function (entry) {
                    if (entry) {
                        datosfiltrados[j] = entry;
                        j = j + 1;
                    }
                });
                tabla = $('#dataGrid2').DataTable({
                    "data": datosfiltrados,
                    "columns": [
                        {
                            "data": "nombre"
                        }
                    ]
                });
            });
        
    }    /*FUNCION PARA OBTENER INFO METEOROLOGICA C.VALENCIANA*/
    function meteoCV() {
        var map = new Microsoft.Maps.Map('#myMap2', {
            credentials: 'AqxsUyYoGE4onbXK24RbWz6GLQbktZCqY9IjyORIC_5lP8d84ACd4cKydOk4AxWf'
        });


        /*ALCOY*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03009?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/543bb099",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                console.log(settings);
                datos = JSON.parse(response);
                console.log(datos);
                

                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
            });
        });

        /*ALICANTE*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03014?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/a379e3de",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);

                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
               
            });
        });

        /*VALENCIA*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/46250?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/0b9237ce",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);
                

                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                

            });
        });

        /*CASTELLÓN*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/12040?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/7e5aee06",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);


                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }


            });
        });

        /*SAN VICENTE DEL RASPEIG*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03122?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/8a4c500d",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);


                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }


            });
        });

        /*VILLENA*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03140?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/c24f709a",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);


                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }


            });
        });

        /*DENIA*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03063?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/05521ecd",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);


                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }


            });
        });

        /*ORIHUELA*/
        var datos;
        var key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqYW1hZ28wMEBnbWFpbC5jb20iLCJqdGkiOiI5Y2FhZjM4YS1jMWE1LTQxNTAtYWMyZS04MGIwODE4NzkwZmQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTYwNDAwMzU1NiwidXNlcklkIjoiOWNhYWYzOGEtYzFhNS00MTUwLWFjMmUtODBiMDgxODc5MGZkIiwicm9sZSI6IiJ9.BMb44AfBrBzXePGL-oLyYplGHEsjp963OaV68Off6Jk';
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/03099?api_key=" + key,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(settings);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://opendata.aemet.es/opendata/sh/e2490373",
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache"
                }
            }
            $.ajax(settings).done(function (response) {
                datos = JSON.parse(response);
                console.log(datos);


                if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Despejado") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Poco nuboso") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Cubierto") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Muy nuboso con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }
                else if (datos[0].prediccion.dia[0].estadoCielo[2].descripcion == "Intervalos nubosos con lluvia") {
                    let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
                    let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
                    map.entities.push(pin);
                    Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                        var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + datos[0].prediccion.dia[0].humedadRelativa.maxima });
                        infobox.setMap(map);
                    });
                }


            });
        });

        
    }
    /*FUNCION PARA OBTENER INFO METEOROLOGICA C.VALENCIANA DESDE API REST LOCAL*/
    function meteoCV2() {
        var map = new Microsoft.Maps.Map('#myMap3', {
            credentials: 'AqxsUyYoGE4onbXK24RbWz6GLQbktZCqY9IjyORIC_5lP8d84ACd4cKydOk4AxWf'
        });


    /*ALCOY*/
    var datos;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        console.log(settings);
        console.log(response);

        //Ejemplo
        if (response[0].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[0].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(38.70545, -0.47432);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alcoy", description: "Humedad relativa maxima\n" + response[0].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
    });

    /*ALICANTE*/
    var datos;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {

        if (response[1].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[1].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(38.34517, -0.48149);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Alicante", description: "Humedad relativa maxima\n" + response[1].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }

    });

    /*CASTELLÓN*/
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        if (response[2].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[2].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(39.98567, -0.04935);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Castellón", description: "Humedad relativa maxima\n" + response[2].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }


    });

    /*DENIA*/
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        if (response[3].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[3].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(38.84078, 0.10574);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Denia", description: "Humedad relativa maxima\n" + response[3].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }


    });

    /*ORIHUELA*/
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        if (response[4].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[4].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(38.08483, -0.94401);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Orihuela", description: "Humedad relativa maxima\n" + response[4].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }


    });

    /*SAN VICENTE*/
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        if (response[5].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[5].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(38.3964, -0.5255);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "San Vicente del Raspeig", description: "Humedad relativa maxima\n" + response[5].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }


    });

    /*VALENCIA*/
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        if (response[6].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[6].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(39.46975, -0.37739);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Valencia", description: "Humedad relativa maxima\n" + response[6].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }


    });



    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/predicciones",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache"
        }
    }
    $.ajax(settings).done(function (response) {
        if (response[7].prediccion == "Despejado") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/11.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Poco nuboso") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/12.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Intervalos nubosos") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/13.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Nuboso") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/14.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Cubierto") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/16.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/24.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Muy nuboso con lluvia") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/25.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
        else if (response[7].prediccion == "Intervalos nubosos con lluvia") {
            let loc = new Microsoft.Maps.Location(38.6373, -0.86568);
            let pin = new Microsoft.Maps.Pushpin(loc, { icon: "http://www.aemet.es/imagenes_gcd/_iconos_municipios/23.png" });
            map.entities.push(pin);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                var infobox = new Microsoft.Maps.Infobox(loc, { title: "Villena", description: "Humedad relativa maxima\n" + response[7].humedad_relativa_maxima });
                infobox.setMap(map);
            });
        }
    });

        


}   
       
