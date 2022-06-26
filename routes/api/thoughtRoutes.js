const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
  } = require('../../controllers/thoughtController.js');

  router.route('/').get(getThoughts).post(createThought);

  router.route('/:thoughtId/reactions').post(addReaction);

  router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

  router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  module.exports = router;