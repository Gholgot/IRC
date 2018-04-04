// _________________ Require ___________

var mongoose = require('mongoose');

//__________________ User Class ________

var RoomSchema = mongoose.Schema({
   name: {
       type: String,
       required: true,
       unique: true
   },
   password: {
        type: String,
        required: false
   },
   description: {
       
   },
   admin: {
       type:Array,
       required: false,
   }

})

var room = mongoose.model('Room', RoomSchema);

module.exports = room;