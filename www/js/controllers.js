angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, $state, $http) {
    $scope.sendStatus = function(value) {
        $http({
            method: 'POST',
            url: 'http://posttestserver.com/post.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: { "id": "1", "date": "12/02/44", "alert": "orange"}
        });
    };
    $scope.goToStatus = function(){
        $scope.sendStatus();
        $state.go('tab.status');
    };
})
.controller('StatusCtrl', function($scope, $state, $http) {
    $scope.tree = [
        { 'question': 'Allez-vous moins bien qu\'aux urgences ?', 'oui': 1, 'non': 2, 'value':undefined, 'alert':undefined, 'type':'bool' },
        { 'question': 'Quel est votre niveau de douleur de 1 à 10', 'oui': 2, 'non': 2, 'value':undefined, 'alert':undefined, 'type':'eva'},
        { 'question': 'Votre abdomen est-il gonflé ?', 'oui': 3, 'non': 3, 'value':undefined, 'alert':undefined, 'type':'bool'},
        { 'question': 'Avez-vous des vomissements ?', 'oui': 4, 'non': 6, 'value':undefined, 'alert':undefined, 'type':'bool'},
        { 'question': 'Avez-vous réussi à prendre votre traitement ?', 'oui': 6, 'non': 5, 'value':undefined, 'alert':undefined, 'type':'bool'},
        { 'question': 'Avez-vous réussi à boire ?', 'oui': 6, 'non': 6, 'value':undefined, 'alert':undefined, 'type':'bool'},
        { 'question': 'Avez-vous une fièvre supérieur à 39° ?', 'oui': 7, 'non': 7, 'value':undefined, 'alert':undefined, 'type':'bool'},
        { 'question': 'Merci, nous avons été informés.', 'oui': 0, 'non': 0, 'value':undefined, 'alert':undefined, 'type':'end'}
    ];
    $scope.treeindex = 0;

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
