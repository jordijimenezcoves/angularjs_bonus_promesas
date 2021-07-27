var app = angular.module('promesaApp.servicios', []);

app.factory('Personas', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){

    var self = {
        "cargando": false,
        "mensaje": "",
        "data": []
    };

    self.cargarData = function(){

        self.cargando = true;

        var q = $q.defer();

        $http.jsonp('https://www.json-generator.com/api/json/get/cfOEETKtAi?callback=JSON_CALLBACK')
            .then(function success( response ){

                setTimeout(function(){
                    q.resolve( response.data );
                }, 1500);

            },
            function error( response ){
                
                console.log(":(");
                q.reject('Error al cargar', response);

            });

        return q.promise;
    };

    $rootScope.promise = self.cargarData();
    $rootScope.promise.then( 
        function(data){
            self.cargando = false;
            self.mensaje = "Información cargada correctamente";
            self.data = data;
        },
        function(error){
            self.cargando = false;
            self.mensaje = "Error al cargar data";
            console.error(error);
        }
    );

    return self;

}]);