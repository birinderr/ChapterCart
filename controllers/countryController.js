const Country = require("../models/country");
const Publisher = require("../models/publisher"); 
const Customer = require("../models/customer");

exports.createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const country = await Country.create({ name });
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll(
    //   {
    //   include: [
    //     { model: Publisher, as: "publishers" },
    //     { model: Customer, as: "customers" } 
    //   ],
    // }
  );
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id, 
      // {
      // include: [
      //   { model: Publisher, as: "publishers" },
      //   { model: Customer, as: "customers" }   
      // ],}
    );
    if (!country) return res.status(404).json({ error: "Country not found" });
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) return res.status(404).json({ error: "Country not found" });

    await country.update(req.body);
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) return res.status(404).json({ error: "Country not found" });

    await country.destroy();
    res.json({ message: "Country deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
