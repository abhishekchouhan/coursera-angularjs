(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function FoundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&',
        empty: '@empty'
      }
    };
    return ddo;
  }

  // Controller definition
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menuCtrl = this;
    menuCtrl.searchTerm = '';
    menuCtrl.empty = MenuSearchService.isEmpty();

    menuCtrl.searchItem = function () {
  		if (menuCtrl.searchTerm !== '') {
  			var promise = MenuSearchService.getMatchedMenuItems(menuCtrl.searchTerm);
  			promise.then(function(result) {
  				menuCtrl.found = result;
  				menuCtrl.empty = MenuSearchService.isEmpty();
  			})
  			.catch(function(error) {
  			     console.log(error);
  			});
  		}
  		else {
  			menuCtrl.empty = MenuSearchService.isEmpty();
  		};
  	};


  	menuCtrl.remove = function (itemIndex) {
  		return MenuSearchService.removeItem(itemIndex);
  	}
  }

  // MenuSearchService
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var foundItems = [];
	  var emptyMessage = 'Nothing Found';

    service.getMatchedMenuItems = function (searchTerm) {

      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function(response) {
          foundItems = [];
          searchTerm = searchTerm.toLowerCase();
          for(var i=0; i<response.data.menu_items.length; i++) {
            if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
                foundItems.push(response.data.menu_items[i]);
            }
          }// for
          if(foundItems.length > 0){
            emptyMessage = '';
          } else {
            emptyMessage = 'Nothing Found';
          }
          return foundItems;
        }).catch(function(error) {
            console.error('ERROR:', error);
        });
    };

    service.removeItem = function (itemIndex) {
      foundItems.splice(itemIndex, 1);
      return foundItems;
    };

    service.isEmpty = function () {
      return emptyMessage;
	  };

  }//MenuSearchService

})();
