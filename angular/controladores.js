var app = angular.module('promesaApp.controladores', []);

app.controller('mainCtrl', ['$scope', '$q', function($scope, $q){

    $scope.miVar = 0;

    $scope.sumar = function(num){
        
        var q = $q.defer();
        var valido = false;

        num++;

        setTimeout(function(){
            if(valido){
                q.resolve(num)
            }else{
                q.reject('No se sumar');
            }
        }, 2000);

        return q.promise;
    }

    $scope.promise = $scope.sumar(1);
    
    $scope.promise.then(
        function(valor){
            console.log("Promesa cumplida");
            $scope.miVar = valor;
        },
        function(error){
            console.error(error);
            $scope.miVar = "Error";
        }
    );

}]);