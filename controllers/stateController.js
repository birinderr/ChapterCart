const State = require("../models/state");
const Region = require("../models/region");

exports.createState = async (req, res) => {
  try {
    const { name, regionId } = req.body;


    const region = await Region.findByPk(regionId);
    if (!region) {
      return res.status(404).json({ error: "Region not found" });
    }


    const existingState = await State.findOne({ where: { name, regionId } });
    if (existingState) {
      return res.status(400).json({ error: "State already exists in this region" });
    }


    const state = await State.create({ name, regionId });
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStates = async (req, res) => {
  try {

    const states = await State.findAll({
      include: {
        model: Region,
        as: 'region'  
      }
    });
    res.json(states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id, {
      include: {
        model: Region,
        as: 'region'  
      }
    });


    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    res.json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateState = async (req, res) => {
  try {
    const { name, regionId } = req.body;


    const state = await State.findByPk(req.params.id);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }


    if (regionId) {
      const region = await Region.findByPk(regionId);
      if (!region) {
        return res.status(404).json({ error: "Region not found" });
      }
    }

    await state.update(req.body);
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    await state.destroy();
    res.json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
