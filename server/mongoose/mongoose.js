const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Todo', () => {
  console.log("mongoose connected to Todo Database");
});

module.exports = {
  mongoose
}
