(function () {
'use strict';

angular.module('data')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items'];
function ItemsController(items) {
  var mainItems = this;

  mainItems.items = items;
}

})();
