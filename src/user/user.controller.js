import User from './user.model';
import addressModel from '../address/address.model';

export async function createUser(req, res) {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!address) {
      return res.status(400).json({ message: 'An address is required.' });
    }

    const newUser = new User({ name, email, password, phone });
    const savedUser = await newUser.save();

    const newAddress = new addressModel({ ...address });
    const savedAddress = await newAddress.save();

    await User.findByIdAndUpdate(
      savedUser._id,
      { $push: { addresses: savedAddress._id } },
      { new: true }
    );

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getUserByCredentials(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (deletedUser) {
      res.status(200).json({ message: 'User disabled' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
