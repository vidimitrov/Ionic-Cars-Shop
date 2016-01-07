angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])
.run(function($ionicPlatform) {
  Parse.initialize('123og81W0lyOezHymA7F22vS1mEMAov2HVyggOfX', '9NRdTzuDvooarl3shyBNUv9Kwwrpm3VQ60gWMCSA');
  
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})