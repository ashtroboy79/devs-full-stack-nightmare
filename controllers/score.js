const Score = require('../model/score');

const ScoreController = {
  async New(req, res) {
    try {
      const score = new Score();
      const playerUsername = req.body.username;
      const playerScore = req.body.score;
      await score.addScore(playerUsername, playerScore);
    } catch (error) {
      console.log(error.message);
    }
  },
  async Index(req, res) {
    try {
      const score = new Score();
      const scores = await score.getScores();
      console.log(scores);
      res.render('scores/index', { scores });
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = ScoreController;
