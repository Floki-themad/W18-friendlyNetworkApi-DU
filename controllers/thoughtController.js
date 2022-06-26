const {Thought, User} = require('../models');

module.exports ={
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req,res){
        Thought.findOne({_id: req.params.thoughtId})
        .populate({path: 'reactions', select: '-__v'})
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No thought with that ID'})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res){
        Thought.create(req.body)
        .then((thought) => {
            console.log("updating user with new thought");
            console.log(req.body);
            return User.findOneAndUpdate(
                {userName: req.body.userName},
                {$addToSet: {thoughts: thought}},
                {new: true}
            );
        })
        .then((user) => 
        !user
        ? res
            .status(400)
            .json({message: 'Thought Failed to create'})
            : res.json('created the thought')
        )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        });
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought)=> 
        !thought
        ? res.status(404).json({message: 'No thought with that ID'})
        : Thought.deleteMany({_id: {$in: thought.reactions}})
        )
        .then(() => res.json({message: 'Thought and reactions deleted'}))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

      addReaction(req, res) {
          console.log('you are adding a reaction');
          console.log(req.body);
          Thought.findOneAndUpdate(
              {_id: req.params.thoughtId},
              {$addToSet: {reactions: req.body}},
              {new: true}
          )
          .then((thought) => 
          !thought
          ? res
            .status(404)
            .json({message: 404})
            : res.json("reaction succesfully created")
          )
          .catch((err) => res.status(500).json(err));
      },
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((reaction) =>
            !reaction
              ? res
                  .status(404)
                  .json({ message: 'No reaction found with that ID :(' })
              : res.json('Reaction deleted!')
          )
          .catch((err) => res.status(500).json(err));
      },

}