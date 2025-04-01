const Wishlist = require("../models/wishlist");
const Customer = require("../models/customer");
const Book = require("../models/book");

exports.addToWishlist = async (req, res) => {
  try {
    const { customerId, bookId } = req.body;


    const customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });


    const existingItem = await Wishlist.findOne({ where: { customerId, bookId } });
    if (existingItem) return res.status(400).json({ error: "Book is already in the wishlist" });


    const wishlistItem = await Wishlist.create({ customerId, bookId });
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.findAll({
      include: [
        {
          model: Customer,
          as: 'customer',
        },
        {
          model: Book,
          as: 'book',
        },
      ],
    });
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerWishlist = async (req, res) => {
  try {
    const { customerId } = req.params;


    const customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });


    const wishlist = await Wishlist.findAll({
      where: { customerId },
      include: [
        {
          model: Book,
          as: 'book',
        },
      ],
    });

    if (wishlist.length === 0) return res.status(404).json({ error: "Wishlist is empty" });

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { customerId, bookId } = req.body;


    const wishlistItem = await Wishlist.findOne({ where: { customerId, bookId } });
    if (!wishlistItem) return res.status(404).json({ error: "Item not found in wishlist" });


    await wishlistItem.destroy();
    res.json({ message: "Item removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
