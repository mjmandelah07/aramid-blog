const mongoose = require('mongoose');

const adminProfileSchema = new mongoose.Schema({
  image: String,
  name: String,
  bio: String,
}, { collection: 'adminProfile' });



const AdminProfile = mongoose.model('AdminProfile', adminProfileSchema);
module.exports = AdminProfile;