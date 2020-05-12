(function(){
	'use strict';

	angular.module('public')
  .controller('MyinfoController', MyinfoController);
	MyinfoController.$inject = ['MenuService', 'UserInfoService', 'ApiPath'];
	function MyinfoController(MenuService, UserInfoService, ApiPath){
		var $myinfoCtrl = this;
		$myinfoCtrl.user = UserInfoService.getUser();
		if ($myinfoCtrl.user){
			console.log($myinfoCtrl.user);
			$myinfoCtrl.user.path = ApiPath;
			var promise = MenuService.getMenuItemByShortName($myinfoCtrl.user.favoritemenu);
			promise
			.then(function(result){
				$myinfoCtrl.user.favoritemenu = promise.$$state.value
			})
		};
	};
})();
