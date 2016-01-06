angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
    .state('ionicCarsShop', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/ionicCarsShop.html'
    })
      
    
      
        
    .state('ionicCarsShop.search', {
      url: '/search',
      views: {
        'side-menu21': {
          templateUrl: 'templates/search.html',
          controller: 'searchCtrl'
        }
      }
    })
        
      
    
      
        
    .state('ionicCarsShop.highlights', {
      url: '/highlights',
      views: {
        'side-menu21': {
          templateUrl: 'templates/highlights.html',
          controller: 'highlightsCtrl'
        }
      }
    })
        
      
    
      
        
    .state('ionicCarsShop.bookmarks', {
      url: '/bookmarks',
      views: {
        'side-menu21': {
          templateUrl: 'templates/bookmarks.html',
          controller: 'bookmarksCtrl'
        }
      }
    })
        
      
    
      
        
    .state('ionicCarsShop.login', {
      url: '/login',
      views: {
        'side-menu21': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })
        
      
    
      
        
    .state('ionicCarsShop.signup', {
      url: '/signup',
      views: {
        'side-menu21': {
          templateUrl: 'templates/signup.html',
          controller: 'signupCtrl'
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
  $urlRouterProvider.otherwise('/menu/search');

});