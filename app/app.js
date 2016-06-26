angular.module('MyApp', [])
.controller('myctrl',['myFactory', function(myFactory){
    var vm = this;
    vm.mode = 'fun'; 
    vm.setDescription = function(age){
        if(age <= 10){
            vm.description = 'child';
        } else if(age > 10 && age < 18){
            vm.description = 'teen';
        } else if(age >= 18){
             vm.description = 'adult';
        }
    }
    vm.add = function(a,b){
        if(typeof a !== 'number' || typeof b !== 'number'){
            return 'invalid args';
        }
        return a+b;
    }
    myFactory.fetchServerData().then(function(response){
        vm.hasError = false
        vm.message = response;
    }, function(response){
        vm.hasError = true;
        vm.message = response;
    });
}])
.factory('myFactory',['$q', function($q){
    return {
        fetchServerData : function(error){ 
            /** error is passed just as an example 
            real case scenairio wolud be different and usually depend 
            on the response from the web-service */
            var d = $.q.defer();
            if(error){
                d.reject('Some error occured');
            } else {
                d.resolve('Success');
            }
            return d.promise;
        }
    }
}]);