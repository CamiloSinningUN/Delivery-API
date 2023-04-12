const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    // campos
    name: { type: String, required: [true, 'Nombra tu usuario.'] },
    email: { type: String, required: [true, 'Nombra tu email.'] },
    password: { type: String, required: [true, 'Nombra tu contraseña.'] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('user', userSchema);
