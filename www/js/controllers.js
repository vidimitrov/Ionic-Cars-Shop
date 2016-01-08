angular.module('app.controllers', [])
   
.controller('sidebarCtrl', ['$state', 'Auth', function($state, Auth) {
	this.isLogged = Auth.isLogged;
	this.currentUser = Auth.getCurrentUser();
	
	this.logout = function() {
		Auth.logout();
		$state.go('app.search');
	};
}])
  
.controller('searchCtrl', ['$state', 'OffersResource', function($state, OffersResource) {
	var self = this;
	this.params = {
		make: '',
		model: '',
		firstRegistration: 0,
		priceUpTo: 0,
		mileageUpTo: 0,
		fuelType: '',
		country: ''
	};
	
	this.makes = ['Audi', 'BMW', 'Citroen', 'Peugeot'];
	this.models = [{
		make: 'Audi',
		models: ['A3', 'A4', 'A6', 'TT']
	}, {
		make: 'BMW',
		models: ['120', '120d', '320', '520']
	}];
	this.years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	this.fuelTypes = ['Diesel', 'Petrol', 'Electric', 'Hybrid'];
	this.countries = ['Germany', 'Holand', 'Bulgaria', 'England', 'Finland'];
	
	this.search = function () {
		OffersResource.setParams(self.params);
		$state.go('app.results');
	};
}])
   
.controller('resultsCtrl', ['$state', '$scope', 'OffersResource', function($state, $scope, OffersResource) {
	var self = this;
	
	this.refresh = function () {
		OffersResource.query()
			.then(function (offers) {
				self.offers = offers.map(function (offer) {
					return offer._serverData;
				});
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
	
	this.refresh();
}])

.controller('offersCtrl', ['$scope', 'OffersResource', 'Auth', function($scope, OffersResource, Auth) {
	var self = this;
	
	this.refresh = function () {
		var params = { owner: Auth.getCurrentUser() };
		
		OffersResource.query(params)
		.then(function (offers) {
			self.offers = offers.map(function (offer) {
				return offer._serverData;
			});
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	
	this.refresh();
}])

.controller('createOfferCtrl', ['$state', 'OffersResource', 'Auth', function($state, OffersResource, Auth) {
	this.offer = {
		title: '',
		description: '',
		make: '',
		model: '',
		year: 0,
		price: 0,
		mileage: 0,
		fuel: '',
		country: '',
		owner: Auth.getCurrentUser()
	};
	
	this.makes = ['Audi', 'BMW', 'Citroen', 'Peugeot'];
	this.models = [{
		make: 'Audi',
		models: ['A3', 'A4', 'A6', 'TT']
	}, {
		make: 'BMW',
		models: ['120', '120d', '320', '520']
	}];
	this.years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	this.fuelTypes = ['Diesel', 'Petrol', 'Electric', 'Hybrid'];
	this.countries = ['Germany', 'Holand', 'Bulgaria', 'England', 'Finland'];
	
	this.createOffer = function (){
		OffersResource.create(this.offer)
			.then(function (offer) {
				$state.go('app.offers');
			});
	};
}])
   
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
 