const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
  {
    street: { type: String, required: [true, 'Insert a street.'] },
    number: { type: String, required: [true, 'Insert a number.'] },
    complement: { type: String },
    neighborhood: { type: String },
    city: { type: String, required: [true, 'Insert a city.'] },
    state: { type: String, required: [true, 'Insert a state.'] },
    zipCode: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('address', addressSchema);
