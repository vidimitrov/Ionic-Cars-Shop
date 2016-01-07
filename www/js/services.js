angular.module('app.services', [])

.service('Auth', ['$q', '$state', '$ionicLoading', '$ionicPopup', function($q, $state, $ionicLoading, $ionicPopup){
	function signup(userData) {
		var deferred = $q.defer();
		
		var user = new Parse.User();
		user.set("name", userData.name);
		user.set("username", userData.username);
		user.set("password", userData.password);
		user.set("email", userData.email);

		user.signUp(null, {
			success: function(user) {
				deferred.resolve(user);
			},
			error: function(user, error) {
				$ionicPopup.alert({
					title: 'Sorry',
					template: error.message,
					okType: 'button-balanced'
				});
				
				deferred.reject(error);
			}
		});
		
		return deferred.promise;
	};

	function login(userData) {
		var deferred = $q.defer();
		
		$ionicLoading.show({template:'<ion-spinner></ion-spinner>'});
		
		Parse.User.logIn(userData.username, userData.password, {
			success: function(user) {
				$ionicLoading.hide();
				
				deferred.resolve(user);
			},
			error: function(user, error) {
				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Sorry',
					template: error.message,
					okType: 'button-balanced'
				});
				
				deferred.reject(error);
			}
		});
		
		return deferred.promise;
	};
	
	function logout() {
		var deferred = $q.defer();
		
		Parse.User.logOut({
			success: function() {
				console.log('Successfully logged out!', arguments);
				deferred.resolve();
			},
			error: function() {
				console.error('Error on logout: ', arguments);
				deferred.reject();
			}
		});
		
		return deferred.promise;
	}
	
	function isLogged() {
		return getCurrentUser() !== null;
	}
	
	function getCurrentUser() {
		return Parse.User.current();
	}
	
	return {
		signup: signup,
		login: login,
		logout: logout,
		isLogged: isLogged,
		getCurrentUser: getCurrentUser
	};
}]);

