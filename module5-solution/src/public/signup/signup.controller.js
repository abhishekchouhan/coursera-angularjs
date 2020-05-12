(function () {
  "use strict";

  angular.module('public')
  .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', '$scope', 'UserInfoService'];
  function SignupController(MenuService, $scope, UserInfoService){
    var $signupCtrl = this;
    $signupCtrl.user = {};
    $signupCtrl.isSaved = false;
    $signupCtrl.ItemNotFound = false;

    $signupCtrl.submitUserInfo = function(){
      if($signupCtrl.user.favoritemenu){
				$signupCtrl.user.favoritemenu = $signupCtrl.user.favoritemenu.toUpperCase();
			};
      MenuService.getMenuItemByShortName($signupCtrl.user.favoritemenu)
					   .then(function(response){
                  // console.log('1',response);

                 if(response === undefined){
                    $signupCtrl.itemNotFound = true;
                    $signupCtrl.isSaved = false;
                    // console.log('++',$signupCtrl.itemNotFound);
                  } else {
                    $signupCtrl.user.favoritemenu = response.data;
   					   			$signupCtrl.isSaved = true;
   					   			$signupCtrl.itemNotFound = false;
                     // console.log('-',$signupCtrl.itemNotFound);
                  }
					   		},function(error){
    							$signupCtrl.itemNotFound = true;
                  $signupCtrl.isSaved = false;
                  // console.log('+',$signupCtrl.itemNotFound);
  							}
  						);
			UserInfoService.setUser($signupCtrl.user);
		};
  }
})();
