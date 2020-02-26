const  mongoose = require('mongoose');
var book = new mongoose.Schema({
title:{type:String},
author:{type:String},
description:{type:String},
email:{type:String}
});
mongoose.model('Book',book
);
