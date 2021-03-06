

var webmailApp = angular.module("webmailApp", ['ui.router', 'restangular'] );

webmailApp.config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider',
  function($urlRouterProvider, $stateProvider, RestangularProvider){

     RestangularProvider.setBaseUrl('/api/v1');
     RestangularProvider.setRequestSuffix('.json');
     RestangularProvider.setDefaultHttpFields({
         "content-type": "application/json"
     });


   $stateProvider
      .state('messages', {
        url: '/messages',
        templateUrl: '/templates/indexLayout.html',
        controller: 'messageCtrl',
        resolve: {
          // currentUser: ['Auth', function(Auth) {
          // return Auth.currentUser();
          // }],
          allMessages: ['messageService', function(messageService){
            return messageService.buildIndex();
          }]
        }
      })

    $urlRouterProvider.otherwise('/messages');

}]);

webmailApp.run(function($rootScope, $location){
 $rootScope.$on("$stateChangeError", console.log.bind(console));
});
