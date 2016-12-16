// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  //    固定脚
    .state('tab', { //当前tab页的状态
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'  //页面模板路径   也称作为ID
  })

  // Each tab has its own nav history stack:
       //home主页
  .state('tab.home', {
    url: '/home',
    cache:"false",
    views: {  //views 当前视图展现
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'  //当前页的控制器
      }
    }
  })
      //课程页面
  .state('tab.courseList', {
      url: '/courseList',
      cache:"false",
      views: {
        'tab-courseList': {
          templateUrl: 'templates/tab-courseList.html',
          controller: 'CourseCtrl'
        }
      }
    })
      //未添加
  .state('tab.mycourseCtrl', {
        url: '/mycourseCtrl',
        cache:"false",
        views: {
          'tab-mycourseCtrl': {
            templateUrl: 'templates/tab-mycourseCtrl.html',
            controller: 'mycourseCtrl'
          }
        }
      })
      //登陆页面
  .state('tab.personal', {
    url: '/personal',
    cache:"false",
    views: {
      'tab-personal': {
        templateUrl: 'templates/tab-personal.html',
        controller: 'Personal'
      }
    }
  })
      //注册页面
  .state("tab.res",{
        url:"/res",
          cache:"false",
        views:{
          "tab-personal":{
            templateUrl:"templates/tab-res.html",
            controller:"Res"
          }
        }
      })
      //个人中心
  .state('tab.information',{
        url:'/information',
        cache:"false",
        views:{
          'tab-personal':{
            templateUrl:"templates/tab-information.html",
            controller:"information"
          }
        }
      })
      //home课程详情
  .state('tab.homeStudy',{
        url:'/homeStudy/:myId',
        cache:"false",
        views:{
          'tab-home':{
            templateUrl:"templates/tab-studyCtrl.html",
            controller:"StudyCtrl"
          }
        }
      })
      //课程列表详情
      .state('tab.curseStudy',{
          url:'/curseStudy/:myId',
          cache:"false",
          views:{
              'tab-courseList':{
                  templateUrl:"templates/tab-studyCtrl.html",
                  controller:"StudyCtrl"
              }
          }
      })
     // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');  //没有其他页面加载时，就默认加载dash页

})

