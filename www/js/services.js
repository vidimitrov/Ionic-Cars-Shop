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
}])

.factory('OffersResource', ['$q', function ($q) {
	
	function query () {
		
	}
	
	function create (offerData) {
		console.log('Creating offer: ', offerData);
		
		var deferred = $q.defer();
		
		var Offer = Parse.Object.extend('Offer');
		var offer = new Offer();
		
		offer.set('title', offerData.title);
		offer.set('description', offerData.description);
		offer.set('make', offerData.make);
		offer.set('model', offerData.model);
		offer.set('year', offerData.year);
		offer.set('price', offerData.price);
		offer.set('mileage', offerData.mileage);
		offer.set('fuel', offerData.fuel);
		offer.set('country', offerData.country);
		
		offer.save(null, {
			success: function (savedOffer) {
				deferred.resolve(savedOffer);
			},
			error: function (offer, error) {
				deferred.reject(error);
			}
		});
		
		return deferred.promise;
	}
	
	return {
		query: query,
		create: create
	};
	
}]);

