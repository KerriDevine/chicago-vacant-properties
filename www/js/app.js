// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('city', ['ionic', 'uiGmapgoogle-maps'])
angular.module('city', ['ionic', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MapCtrl'
  })
  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html'
        }
      }
    })
    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })
    .state('app.list', {
      url: '/list',
      params: {properties: null},
      views: {
        'menuContent': {
          templateUrl: 'templates/listview.html',
          controller: 'ListCtrl'
        }
      }
    })
    .state('app.filter', {
      url: '/filter',
      views: {
        'menuContent': {
          templateUrl: 'templates/filter.html',
          controller: 'MapCtrl'
        }
      }
    })

  .state('app.property', {
    url: '/property',
    params: { property : null },
    views: {
      'menuContent': {
        templateUrl: 'templates/property.html',
        controller: 'PropertyCtrl as vm'
      }
    }
  })

  .state('app.county', {
      url: '/county',
      params: { pin : null},
      views: {
          'menuContent' : {
              templateUrl: 'templates/county.html',
              controller: 'CountyCtrl as vm'
          }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});


