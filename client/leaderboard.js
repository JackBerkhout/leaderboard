console.log('isClient');

Meteor.subscribe('thePlayers');

// console.log(PlayersList.find().fetch());

// if(Meteor.isClient){
    Template.leaderboard.helpers({
        'player': function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({createdBy: currentUserId}, { sort: {score: -1, name: 1} });
        },
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if(playerId == selectedPlayer){
                return "selected"
            }
        },
        'selectedPlayer': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne({ _id: selectedPlayer });
        }
    });
    Template.leaderboard.events({
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            // PlayersList.update({ _id: selectedPlayer }, { $inc: {score: 5} });
            Meteor.call('updateScore', selectedPlayer, 5);
        },
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            // PlayersList.update({ _id: selectedPlayer }, {$inc: {score: -5} });
            Meteor.call('updateScore', selectedPlayer, -5);
        },
        'click .remove': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            // PlayersList.remove({ _id: selectedPlayer });
            Meteor.call('removePlayer', selectedPlayer);
        }
    });
    Template.addPlayerForm.events({
        'submit form': function(){
            event.preventDefault();
            var playerNameVar = event.target.playerName.value;
            Meteor.call('createPlayer', playerNameVar);
            event.target.playerName.value = "";
        }
    });
// }

