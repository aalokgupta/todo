const mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
              desc: {
                  type: String,
                  required: true,
                  trim: true,
                },
                title: {
                  type: String,
                  required: true,
                  trim: true,
                },
                category: {
                  type: String,
                  required: true,
                },
                year: {type: Number,
                      required: true
                    },

                month: {type: Number,
                        required: true
                      },

                day: {type: Number,
                    required: true
                  },
                tokens: [{
                    access: {type: String, required: true},
                    token: {type: String, required: true}
                }]
});



var Todo = mongoose.model('Todo', TodoSchema);
module.exports = {
  Todo
}
