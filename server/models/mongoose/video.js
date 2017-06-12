'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
var Promise    = require('bluebird'); 
Promise.promisifyAll(mongoose); 

const Schema = mongoose.Schema;

var options = {
          timestamps: { 
               createdAt: 'created_at',
               updatedAt: 'updated_at' 
          },   

          { _id: false }
     };

/**
 * Video Schema
 */

var VideoSchema = mongoose.Schema({
     _id   : String,
     title : String,
     url   : String,
     desc  : String,
     start : Number, //@todo if empty - set 0
     end   : Number, //@todo if empty - set duration end
     step  : Number, //@todo if empty - set 1
     slug  : String,
         
  }, options );



var Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
