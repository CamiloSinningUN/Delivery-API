import Order from './order.model';
import haversine from 'haversine';

export async function createOrder(req, res) {
  try {
    const { user, restaurant, products } = req.body;
    const newOrder = new Order({ user, restaurant, products });
    const result = await newOrder.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getOrders(req, res) {
  try {
    const { user, restaurant, fromDate, toDate, status } = req.query;
    const query = {};

    if (user) query.user = user;
    if (restaurant) query.restaurant = restaurant;
    if (status) query.status = status;
    if (fromDate && toDate) {
      query.createdAt = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

function calculateDistance(point1, point2) {
  return haversine(point1, point2);
}

export async function getOrdersSent(req, res) {
  try {
    const userLocation = {
      lat: parseFloat(req.query.userLat) || null,
      lng: parseFloat(req.query.userLng) || null,
    };
    const sortBy = req.query.sortBy || '';

    const orders = await Order.find({ status: 'sent' }).populate('user').populate('restaurant');

    if (userLocation.lat && userLocation.lng) {
      orders.forEach((order) => {
        const userToRestaurantDistance = calculateDistance(userLocation, {
          lat: order.restaurant.address.lat,
          lng: order.restaurant.address.lng,
        });
        const restaurantToClientDistance = calculateDistance(
          {
            lat: order.restaurant.address.lat,
            lng: order.restaurant.address.lng,
          },
          {
            lat: order.user.address.lat,
            lng: order.user.address.lng,
          }
        );

        order._doc.userToRestaurantDistance = userToRestaurantDistance;
        order._doc.restaurantToClientDistance = restaurantToClientDistance;
      });
    }

    switch (sortBy) {
      case 'userToRestaurant':
        orders.sort((a, b) => a._doc.userToRestaurantDistance - b._doc.userToRestaurantDistance);
        break;
      case 'restaurantToClient':
        orders.sort(
          (a, b) => a._doc.restaurantToClientDistance - b._doc.restaurantToClientDistance
        );
        break;
      case 'age':
        orders.sort((a, b) => a.createdAt - b.createdAt);
        break;
      default:
        break;
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    if (order.status === 'created') {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedOrder);
    } else {
      res.status(403).json({ message: 'Order cannot be modified once it has been sent' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteOrder(req, res) {
  try {
    const deletedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (deletedOrder) {
      res.status(200).json({ message: 'Order disabled' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
