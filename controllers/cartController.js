const Cart = require("../models/cart");
const Customer = require("../models/customer");
const Book = require("../models/book");

exports.addToCart = async (req, res) => {
  try {
    const { customerId, bookId, quantity } = req.body;

    
    const customer = await Customer.findOne({ where: { userId: customerId } });
    const book = await Book.findByPk(bookId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    if (!book) return res.status(404).json({ error: "Book not found" });

    
    const existingItem = await Cart.findOne({ where: { customerId, bookId } });
    if (existingItem) {
      
      await existingItem.update({ quantity: existingItem.quantity + quantity });
      return res.json(existingItem);
    }

    const cartItem = await Cart.create({ customerId, bookId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({ include: [
      { model: Customer, as: "customer" },
      { model: Book, as: "book" } 
    ]  });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerCart = async (req, res) => {
  try {
    const { customerId } = req.params;
    const cart = await Cart.findAll({
      where: { customerId },
      include: [{ model: Book, as: "book" }],
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { customerId, bookId, quantity } = req.body;

    const cartItem = await Cart.findOne({ where: { customerId, bookId } });
    if (!cartItem) return res.status(404).json({ error: "Item not found in cart" });

    await cartItem.update({ quantity });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { customerId, bookId } = req.body;

    const cartItem = await Cart.findOne({ where: { customerId, bookId } });
    if (!cartItem) return res.status(404).json({ error: "Item not found in cart" });

    await cartItem.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { customerId } = req.params;

    await Cart.destroy({ where: { customerId } });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
