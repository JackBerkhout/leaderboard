import { Meteor } from 'meteor/meteor';

console.log('isServer');
Meteor.publish('thePlayers', function () {
    return PlayersList.find();
})

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'createPlayer': function (playerNameVar) {
        check(playerNameVar, String);
        console.log("createPlayer");
        var currentUserId = Meteor.userId();
        console.log(playerNameVar);
        if(currentUserId){
            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });
        } else {
            console.log('You are not logged in!');
        }
    },
    'removePlayer': function (selectedPlayer) {
        check(selectedPlayer, String);
        var currentUserId = Meteor.userId();
        if(currentUserId) {
            PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId});
        } else {
            console.log('You are not logged in!');
        }
    },
    'updateScore': function (selectedPlayer, scoreValue) {
        check(selectedPlayer, String);
        check(scoreValue, Number);
        var currentUserId = Meteor.userId();
        if(currentUserId) {
            PlayersList.update({ _id: selectedPlayer, createdBy: currentUserId}, { $inc: {score: scoreValue} });
        } else {
            console.log('You are not logged in!');
        }
    }
})
// console.log(PlayersList.find().fetch());

