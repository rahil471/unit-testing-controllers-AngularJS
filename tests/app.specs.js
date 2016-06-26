describe('Controllers', function(){ //describe your object type
    beforeEach(module('MyApp')); //load module    
    describe('myctrl',function(){ //describe your app name
        var d;
        var myFactory;
        beforeEach(inject(function($q, _myFactory_){ //Mock our factory and spy on methods
            d = $q.defer();
            myFactory = _myFactory_;
            spyOn(myFactory, 'fetchServerData').and.returnValue(d.promise);
        }));  
        var myctrl;
        var scope;
        beforeEach(inject(function($controller, $rootScope){ //instantiate controller using $controller service
            scope = $rootScope.$new();
            myctrl = $controller('myctrl', {
                myFactory : myFactory,
                scope : scope
            });
        }));        
        it('Mode should be fun', function(){  //write tests
            expect(myctrl.mode).toBe('fun'); //pass
        });
        /** Specs to test vm.description */
        it('Should set desciption according to age', function(){
            myctrl.setDescription(4); //calling the method with age=4
            expect(myctrl.description).toBe('child'); //testing the property
            
            myctrl.setDescription(15); //calling the method with age=15
            expect(myctrl.description).toBe('teen');
            
            myctrl.setDescription(54); //calling the method with age=54
            expect(myctrl.description).toBe('adult');
        });
         /** Specs to test vm.add() */
        it('Should add two numbers', function(){
            expect(myctrl.add(4,2)).toBe(6); //4+2 = 6
            
            expect(myctrl.add('abcd',2)).toBe('invalid args'); // wrong arg type
        });
        
        describe('Asynchronous calls', function() {
            it('should call fetchServerData on myFactory', function() {
                expect(myFactory.fetchServerData).toHaveBeenCalled();
                expect(myFactory.fetchServerData.calls.count()).toBe(1);
            });
            
            it('should do something on success', function() {
                d.resolve('Success'); // Resolve the promise.
                scope.$digest();
                // Check for state on success.
                expect(myctrl.hasError).toBe(false);
                expect(myctrl.message).toBe('Success');
            });

            it('should do something on error', function() {
                d.reject('Some error occured'); // Reject the promise.
                scope.$digest();
                // Check for state on error.
                expect(myctrl.hasError).toBe(true);
                expect(myctrl.message).toBe('Some error occured');
            });
        });
    });    
});

