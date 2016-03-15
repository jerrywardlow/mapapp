// Dependencies
var mongoose    = require('mongoose');
var User        = require('./model.js');

//App Routes
module.exports = function(app) {

    // GET Routes
    app.get('/users', function(req, res){

        //Use Mongoose scehma to run search
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            res.json(users); // JSON response of all users
        });
    });

    // POST Routes
    app.post('/users', function(req, res){

        var newuser = new User(req.body);

        newuser.save(function(err){
            if(err)
                res.send(err);

            res.json(req.body); // JSON response of new User
        });
    });
};
