import addressModel from '../address/address.model';
import Restaurant from './restaurant.model';
import orderModel from '../order/order.model';

export async function createRestaurant(req, res) {
  try {
    const { name, category, address } = req.body;

    if (!address) {
      res.status(400).json({ message: 'Address is required' });
    }

    const newRestaurant = new Restaurant({ name, category });
    const savedRestaurant = await newRestaurant.save();

    const newAddress = new addressModel({ ...address });
    const savedAddress = await newAddress.save();

    await Restaurant.findByIdAndUpdate(
      savedRestaurant._id,
      { $set: { address: savedAddress._id } },
      { new: true }
    );

    res.status(201).json(savedRestaurant);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getRestaurantById(req, res) {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getRestaurants(req, res) {
  try {
    const { category, name } = req.query;
    const query = {};

    if (category) query.category = category;
    if (name) query.name = { $regex: new RegExp(name, 'i') };

    // TODO - Fix this, popularity is based on orders
    const restaurants = await Restaurant.find(query).sort({ popularity: -1 });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateRestaurant(req, res) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedRestaurant) {
      res.status(200).json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (deletedRestaurant) {
      res.status(200).json({ message: 'Restaurant disabled' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
