const mongoose = require('mongoose');
const validator = require('validator');

const hallSchema = new mongoose.Schema(
    {
        numberOfSeats : {type:String, required : true},
        amenities :{type:Array,required: true},
        price : {type:String, required : true},
        ifBooked :{type:String, default:false},
        customerName :{type:String},
        date : {type:String, default:"00-00-0000"},
        startTime:{type:String, default:"00-00-0000"},
        endTime :{type:String, default:"00-00-0000"},
        roomNo:{type:String, required : true},
        roomName :{type:String, required : true}
    }
)

const hallData = mongoose.model('hall',hallSchema);

module.exports = {hallData}