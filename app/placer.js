// Dependencies
var mongoose        = require('mongoose');
var user            = require('./models/model.js');

exports.place = function(userData) {
  console.log(userData);
  user.findOneAndUpdate(
    {'email': userData.email},
    {'location': userData.location},
    function(err){
      if(err)
        console.log('error: ', err);
      // If no errors are found, it responds with a JSON of the new user
      console.log('ok?');
    }
  );
};
