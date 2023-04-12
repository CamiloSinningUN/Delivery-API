const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    // campos
    name: { type: String, required: [true, 'Name your user.'] },
    email: { type: String, required: [true, 'Put an email.'] },
    password: { type: String, required: [true, 'Put a password.'] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('user', userSchema);
