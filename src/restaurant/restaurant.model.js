import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    //campos
    name: { type: String, required: [true, 'Name your restaurant.'] },
    category: { type: String, required: [true, 'Name your category.'] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
