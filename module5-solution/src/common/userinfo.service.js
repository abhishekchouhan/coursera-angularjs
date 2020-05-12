(function(){
	'use strict';

	angular.module('common')
		.service('UserInfoService', UserInfoService);

	UserInfoService.$inject = ['$window'];
	function UserInfoService($window){
		var service = this;
		service.user = null;

		service.setUser = function(user){
			service.user = user;
			$window.localStorage.setItem('default', JSON.stringify(service.user));
		};

		service.getUser = function(){
			service.user = JSON.parse($window.localStorage.getItem('default'));
			return service.user
		};
	}
})();
