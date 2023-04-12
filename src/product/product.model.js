import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // campos
    name: { type: String, required: [true, 'Name your product.'] },
    category: { type: String, required: [true, 'Name your category.'] },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
