angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    lastText: 'Pensez à passer chez votre pharmacien.',
  }, {
    id: 1,
    hours: '15h00',
    lastText: 'Comment allez-vous ?',
  }, {
    id: 2,
    hours: '18h00',
    lastText: 'Comment allez-vous ?',
    details: 'Pensez bien à prendre vos médicaments',
  }, {
    id: 3,
    hours: '19h00',
    lastText: 'Vous devez manger légèrement ce soir. Vous ne pourrez pas manger demain matin, mais vous pourrez boire.',
  }, {
    id: 4,
    hours: '20h00',
    lastText: 'Prenez bien votre douche antiseptique ce soir et demain matin.',
  }];


  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
