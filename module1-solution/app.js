(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunchItems = '';

    $scope.onButtonClick = function () {
      // Validation for empty list
      if($scope.lunchItems == ''){
          $scope.color = 'red';
          $scope.message = 'Please enter data first';
          return;
      }

      $scope.words = $scope.lunchItems.split(',');
      var count = $scope.words.length;

      // message based on count
      if(count <= 3){
        $scope.message = 'Enjoy!';
      } else if(count => 4){
        $scope.message = 'Too much!';
      }
      $scope.color = 'green';
    };
  }
})();
