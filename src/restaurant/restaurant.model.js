import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    //campos
    name: { type: String, required: [true, 'Nombra tu restaurante.'] },
    category: { type: String, required: [true, 'Nombra tu categoria.'] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
