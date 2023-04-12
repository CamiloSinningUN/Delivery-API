import Restaurant from './restaurant.model';

export async function createRestaurant(req, res) {
  try {
    const { name, category } = req.body;
    const newRestaurant = new Restaurant({ name, category });
    const result = await newRestaurant.save();
    res.status(201).json(result);
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

    const restaurants = await Restaurant.find(query);
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
