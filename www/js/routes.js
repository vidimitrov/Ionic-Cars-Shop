angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('app', {
      url: '/app',
      abstract:true,
      templateUrl: 'templates/side-menu.html'
    })
      
    .state('app.search', {
      url: '/search',
      views: {
        'app': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })
          
    .state('app.results', {
      url: '/results',
      views: {
        'app': {
          templateUrl: 'templates/results.html',
          controller: 'resultsCtrl'
        }
      }
    })
    
    .state('app.offers', {
      url: '/offers',
      views: {
        'app': {
          templateUrl: 'templates/offers.html',
          controller: 'offersCtrl'
        }
      }
    })
         
    .state('app.bookmarks', {
      url: '/bookmarks',
      views: {
        'app': {
          templateUrl: 'templates/bookmarks.html',
          controller: 'bookmarksCtrl'
        }
      }
    })
         
    .state('app.login', {
      url: '/login',
      views: {
        'app': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })
          
    .state('app.signup', {
      url: '/signup',
      views: {
        'app': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
        }
      }
    })
    
    .state('app.profile', {
      url: '/profile',
      views: {
        'app': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })
         
    .state('details', {
      url: '/details',
      templateUrl: 'templates/details.html',
      controller: 'detailsCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');

});