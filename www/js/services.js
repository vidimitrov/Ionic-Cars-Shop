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
	var self = this;
	this.params = {};
	
	function query (params) {
		params = params || self.params;
		self.params = params;
		
		var deferred = $q.defer();
		var Offer = Parse.Object.extend('Offer');
		var query = new Parse.Query(Offer);
		
		self.params = params;
		
		if (params.owner) {
			query.equalTo("owner", params.owner);
		}
		
		if (params.make) {
			query.equalTo("make", params.make);
		}
		
		if (params.model) {
			query.equalTo("model", params.model);
		}
		
		if (params.firstRegistration) {
			query.greaterThanOrEqualTo("year", params.firstRegistration);
		}
		
		if (params.priceUpTo) {
			query.greaterThanOrEqualTo("price", params.priceUpTo);
		}
		
		if (params.mileageUpTo) {
			query.greaterThanOrEqualTo("mileage", params.mileageUpTo);
		}
		
		if (params.fuel) {
			query.equalTo("fuel", params.fuel);
		}
		
		if (params.country) {
			query.equalTo("country", params.country);
		}
		
		query.find({
			success: function(results) {
				deferred.resolve(results);
			},
			error: function(error) {
				deferred.reject(error);				
			}
		});
		
		return deferred.promise;
	}
	
	function getById (offerId) {
		var deferred = $q.defer();
		var Offer = Parse.Object.extend('Offer');
		var query = new Parse.Query(Offer);
		
		query.get(offerId, {
			success: function (offer) {
				deferred.resolve(offer);
			},
			error: function (object, error) {
				deferred.reject(error);
			}
		});
		
		return deferred.promise;
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
		offer.set('owner', offerData.owner);
		
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
	
	function setParams (params) {
		self.params = params;
	}
	
	return {
		query: query,
		create: create,
		getById: getById,
		setParams: setParams
	};
	
}]);

