angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, $state, $http, $ionicModal) {

    // OLD
    $scope.goToStatus = function(){
        $state.go('tab.status');
    };

    // MODAL
    $ionicModal.fromTemplateUrl('templates/modal-status.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    // CONTENT
    $scope.tree = [
        {
            'question': 'Allez-vous moins bien qu\'aux urgences ?',
            'oui': 1,
            'non': 2,
            'value':undefined,
            'alertOrange':undefined,
            'alertRed':undefined,
            'type':'bool'
        },
        {
            'question': 'Quel est votre niveau de douleur de 0 à 10',
            'oui': 2,
            'non': 2,
            'value':0,
            'alertOrange':5,
            'alertRed':9,
            'type':'eva'
        },
        {
            'question': 'Votre abdomen est-il gonflé ?',
            'oui': 3,
            'non': 3,
            'value':undefined,
            'alertOrange':'oui',
            'alertRed':undefined,
            'type':'bool'
        },
        {
            'question': 'Avez-vous des vomissements ?',
            'oui': 4,
            'non': 6,
            'value': undefined,
            'alertOrange': 'oui',
            'alertRed': undefined,
            'type':'bool'
        },
        {
            'question': 'Avez-vous réussi à prendre votre traitement ?',
            'oui': 6,
            'non': 5,
            'value':undefined,
            'alertOrange':'non',
            'alertRed':undefined,
            'type':'bool'
        },
        {
            'question': 'Avez-vous réussi à boire ?',
            'oui': 6,
            'non': 6,
            'value':undefined,
            'alertOrange':undefined,
            'alertRed':'non',
            'type':'bool'
        },
        {
            'question': 'Avez-vous une fièvre supérieur à 39° ?',
            'oui': 7,
            'non': 7,
            'value':undefined,
            'alertOrange':undefined,
            'alertRed':'oui',
            'type':'bool'
         },
        {
            'question': 'Merci pour votre retour, nous avons été informés.',
            'oui': 0,
            'non': 0,
            'value':undefined,
            'alertOrange':undefined,
            'alertRed':undefined,
            'type':'end'
        },
        {
            'question': 'Merci pour votre retour, un profesionnel de santé va vous recontacter dans les 5 minutes par précaution.',
            'oui': 0,
            'non': 0,
            'value':undefined,
            'alertOrange':undefined,
            'alertRed':undefined,
            'type':'end'
        }
    ];
    $scope.treeindex = 0;
    $scope.finalstatus = "vert";
    $scope.clickedOK = function() {
        console.log($scope.treeindex, $scope.finalstatus);
        if($scope.tree[$scope.treeindex].alertOrange == 'oui' && $scope.finalstatus != 'rouge') {
            $scope.finalstatus = "orange";
        }
        if($scope.tree[$scope.treeindex].alertRed == 'oui') {
            $scope.finalstatus = "rouge";
        }
        $scope.nextOne($scope.treeindex = $scope.tree[$scope.treeindex].oui);
    }
    $scope.clickedKO = function() {
        console.log($scope.treeindex, $scope.finalstatus);
        if($scope.tree[$scope.treeindex].alertOrange == 'non' && $scope.finalstatus != 'rouge') {
            $scope.finalstatus = "orange";
        }
        if($scope.tree[$scope.treeindex].alertRed == 'non') {
            $scope.finalstatus = "rouge";
        }
        $scope.nextOne($scope.treeindex = $scope.tree[$scope.treeindex].non);
    }
    $scope.confirmedETA = function(value) {
        if($scope.tree[$scope.treeindex].alertOrange <= value) {
            $scope.finalstatus = "orange";
        }
        if($scope.tree[$scope.treeindex].alertRed <= value) {
            $scope.finalstatus = "rouge";
        }
        $scope.nextOne($scope.tree[$scope.treeindex].non);
    }
    $scope.nextOne = function(value) {
        if($scope.tree[value].type == 'end' && $scope.finalstatus != "vert") {
            $scope.treeindex = value + 1;
        } else {
            $scope.treeindex = value;
        }
    }

    $scope.goToHome = function(){

        // on envoie les infos
        $http({
            method: 'POST',
            url: 'http://posttestserver.com/post.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: { "id": "1", "date": "12/02/44", "alert": "orange"}
        });

        // on reinit et fermer la modal
        $scope.treeindex = 0;
        $scope.finalstatus = "vert";
        $scope.closeModal();

    };
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
