angular.module('app.controllers', [])
   
.controller('sidebarCtrl', ['$state', 'Auth', function($state, Auth) {
	this.isLogged = Auth.isLogged;
	this.currentUser = Auth.getCurrentUser();
	
	this.logout = function() {
		Auth.logout();
	};
}])
  
.controller('searchCtrl', function() {

})
   
.controller('resultsCtrl', function() {

})

.controller('offersCtrl', function() {

})
   
.controller('bookmarksCtrl', function() {

})
   
.controller('loginCtrl', ['$state', 'Auth', function($state, Auth) {
	this.userData = {
		username: '',
		password: ''
	};
	
	this.login = function () {
		Auth.login(this.userData)
			.then(function (user) {
				console.log('Successfully logged in: ', user);
				$state.go('app.search');
			});
	};
}])
   
.controller('signupCtrl', ['$state', 'Auth', function($state, Auth) {
	this.userData = {
		username: '',
		password: '',
		name: '',
		email: ''
	};
	
	this.signup = function () {
		Auth.signup(this.userData)
			.then(function (user) {
				console.log('Successfully signed up: ', user);
				$state.go('app.search');
			});
	};
}])
   
.controller('detailsCtrl', function() {

})

.controller('profileCtrl', function() {

});
 