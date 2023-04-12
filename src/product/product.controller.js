import Product from './product.model';

export async function createProduct(req, res) {
  try {
    const { name, category, restaurant } = req.body;
    const newProduct = new Product({ name, category, restaurant });
    const result = await newProduct.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getProducts(req, res) {
  try {
    const { category, restaurant } = req.query;
    const query = {};

    if (category) query.category = category;
    if (restaurant) query.restaurant = restaurant;

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (deletedProduct) {
      res.status(200).json({ message: 'Product disabled' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
