//Mongoose
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//User Schema
var UserSchema = new Schema({
    username:       {type: String, required: true},
    gender:         {type: String, required: true},
    age:            {type: Number, required: true},
    favlang:        {type: String, required: true},
    location:       {type: [Number], required: true}, //[Longitude, Latitude]
    htmlverified:   String,
    created_at:     {type: Date, default: Date.now},
    updated_at:     {type: Date, default: Date.now}
});

// Sets created_at parameter to current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

//Index schema in 2dsphere format
UserSchema.index({location: '2dsphere'});

//Export UserSchema for use elsewhere. Sets MongoDB collection to "scotch-user"
module.exports = mongoose.model('scotch-user', UserSchema)
