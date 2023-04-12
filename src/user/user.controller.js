import User from './user.model';

export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const result = await newUser.save();
    res.status(201).json(result);
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
      { isActive: false },
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
