const Region = require("../models/region");
const Country = require("../models/country");

exports.createRegion = async (req, res) => {
  try {
    const { name, countryId } = req.body;

    const country = await Country.findByPk(countryId);
    if (!country) return res.status(404).json({ error: "Country not found" });

    const region = await Region.create({ name, countryId });
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegions = async (req, res) => {
  try {
    const regions = await Region.findAll({
      include: [
        {
          model: Country,  
          as: "country"    
        }
      ]
    });
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRegion = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id, {
      include: [
        {
          model: Country, 
          as: "country"   
        }
      ]
    });
    if (!region) return res.status(404).json({ error: "Region not found" });

    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const { name, countryId } = req.body;
    const region = await Region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ error: "Region not found" });

    if (countryId) {
      const country = await Country.findByPk(countryId);
      if (!country) return res.status(404).json({ error: "Country not found" });
    }

    await region.update({ name, countryId });
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id);
    if (!region) return res.status(404).json({ error: "Region not found" });

    await region.destroy();
    res.json({ message: "Region deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
