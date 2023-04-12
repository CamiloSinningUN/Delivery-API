import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // campos
    name: { type: String, required: [true, 'Nombra tu producto.'] },
    category: { type: String, required: [true, 'Nombra tu categoria.'] },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
