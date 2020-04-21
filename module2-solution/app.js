(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
 .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


	// To Buy Controller
  ToBuyController.inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyController = this;
    buyController.items = ShoppingListCheckOffService.getItems();

    buyController.buyItem = function (itemIndex) {
      console.log('Item Index', itemIndex);
      ShoppingListCheckOffService.buyItem(itemIndex);
    };

  }


	// Bought Controller
  AlreadyBoughtController.inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtController = this;
    boughtController.items = ShoppingListCheckOffService.getBoughtItems();
  }



  function ShoppingListCheckOffService() {
    var service = this;

    service.toBuyList = [];
    service.boughtList = [];

    service.initialList = [
		{
			name: 'Biscuit',
			quantity: '5 packets'},
		{
			name: 'Milk',
			quantity: '4 bottles'},
		{
			name: 'Chips',
			quantity: '3 bags'},
		{
			name: 'Burgers',
			quantity: '2'},
		{
			name: 'Salt',
			quantity: '2 packet'}
		];


    service.getItems = function (){
      service.toBuyList = service.initialList;
      return service.toBuyList;
    };

    service.getBoughtItems = function (){
      return service.boughtList;
    };

    service.buyItem = function (itemIndex){
      var item = service.toBuyList.splice(itemIndex, 1);
      service.boughtList.push(item[0]);
    };
  }

})();
