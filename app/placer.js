// Dependencies
var mongoose        = require('mongoose');
var user            = require('./models/model.js');

exports.place = function(userData, err_f, ok_f) {
  console.log(userData);
  user.findOneAndUpdate(
    {'email': userData.email},
    {'location': userData.location},
    function(err){
      if(err)
        console.log('error: ', err);

      // Uses Mongoose schema to run the search (empty conditions)
      var query = user.find({});
      query.exec(function(err, users){
        if(err)
          err_f(err);
        else
          ok_f(users);
      });
    }
  );
};
