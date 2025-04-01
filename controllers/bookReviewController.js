const BookReview = require("../models/bookReview");
const Customer = require("../models/customer");
const Book = require("../models/book");

exports.createBookReview = async (req, res) => {
  try {
    const { customerId, bookId, rating, review } = req.body;

    
    const customer = await Customer.findOne({ where: { userId: customerId } });
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

   
    const existingReview = await BookReview.findOne({ where: { customerId, bookId } });
    if (existingReview) return res.status(400).json({ error: "Customer has already reviewed this book" });

    
    const bookReview = await BookReview.create({ customerId, bookId, rating, review });
    res.status(201).json(bookReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const bookReviews = await BookReview.findAll({ include: [
      { model: Customer, as: "customer" },
      { model: Book, as: "book" } 
    ] });
    res.json(bookReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookReview = async (req, res) => {
  try {
    const bookReview = await BookReview.findByPk(req.params.id, { include: [
      { model: Customer, as: "customer" },
      { model: Book, as: "book" } 
    ] });
    if (!bookReview) return res.status(404).json({ error: "Book review not found" });

    res.json(bookReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBookReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const bookReview = await BookReview.findByPk(req.params.id);
    if (!bookReview) return res.status(404).json({ error: "Book review not found" });

    await bookReview.update({ rating, review });
    res.json(bookReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBookReview = async (req, res) => {
  try {
    const bookReview = await BookReview.findByPk(req.params.id);
    if (!bookReview) return res.status(404).json({ error: "Book review not found" });

    await bookReview.destroy();
    res.json({ message: "Book review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
