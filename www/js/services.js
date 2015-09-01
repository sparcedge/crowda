/// <reference path="../../typings/angularjs/angular.d.ts"/>
angular.module('starter.services', ['firebase'])

.factory('firebaseRef', ['$firebaseAuth', function($firebaseAuth){
    return new Firebase("https://crowda.firebaseio.com/");
  }
])

.factory('firebaseAuth', function($firebaseAuth, firebaseRef){
  var firebaseAuth = $firebaseAuth(firebaseRef);
  var userData = {};
  
  //$onAuth listens for changes in authentication state
  firebaseAuth.$onAuth(function(authData){
    if(authData){
      userData = authData//setup user data here. May make super factory ie firebase endpoint service
      console.log("logged in as: " + userData.uid);
    }
    else{
      console.log("logged out");
    }
  });
  return{
    getAuth: function(){
      return firebaseAuth;
    },
    getUser: function(){
      return userData;
    },
    unauth: function(){
      firebaseAuth.$unauth();
    }
  }
})

.factory('Events', function($firebaseArray, firebaseRef){
  /*
  Schema for Event:
  {
    name: String,
    location: {
      long: num,
      lat: num
    },
    date: date,
    goal: currency,
    current: currency,
    attendees:[users], //will have to implement synchronized array methods here
    url: String
  }
  */
 })

.factory('Chats', function() {
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
    city: 'Charleston'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460',
    city: 'Los Angeles'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg',
    city: 'New York'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png',
    city: 'blah'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png',
    city:'Virginia'
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
