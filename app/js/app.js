angular.module('bnhpApp', ['infinite-scroll'])
    .controller('main', ['$scope', '$timeout', function($scope, $timeout){
        //mocks
        var names = ['Ronen Cohen', 'Dana Shavit', 'Miri Kaplan', 'Menagem Avnon', 'Boaz Shitrit'];
        //------------------------
        var MAX_ITERATIONS = 5;
        var currentIteration = 0;

        var items = [];

        var getItems = function(){
            $scope.loading = true;
            $scope.infiniteScrollDisabled = true;

            var newItems = [];
            for (var i=0; i<5; i++){
                var item = {
                    id : Math.floor(Math.random() * 10000),
                    name : names[Math.floor(Math.random() * names.length)],
                    createdAt : Date.now()
                };

                newItems.push(item);
            }

            $timeout(function(){
                $scope.loading = false;

                currentIteration++;

                $scope.items = $scope.items.concat(newItems);

                console.log('addItems');

                if (MAX_ITERATIONS > currentIteration) $scope.infiniteScrollDisabled = false;
            }, 1000);
        };
        getItems();

        $scope.items = items;
        $scope.getItems = getItems;
        $scope.infiniteScrollDisabled = true;
    }]);