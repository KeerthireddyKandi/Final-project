const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Budget = new Schema({
   name: {
      type: String
   },
   value: {
      type: Number
   },
   month: {
      type: String
   },
   expense: {
      type: Number
   }
}, {
   collection: 'budget'
})

module.exports = mongoose.model('Budget', Budget)