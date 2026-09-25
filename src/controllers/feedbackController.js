const feedbackService = require('../services/feedbackService');

const create = async (req, res, next) => {
  try {
    const result = await feedbackService.createFeedback(req.params.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
