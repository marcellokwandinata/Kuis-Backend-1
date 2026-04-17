const { Gacha, Prize } = require('../../../models');

async function getPrizes() {
  return Prize.find({});
}

async function getPrizeById(prizeId) {
  return Prize.findById(prizeId);
}

async function getAvailablePrizes() {
  return Prize.find({ $expr: { $lt: ['$winners_count', '$quota'] } });
}

async function incrementPrizeWinner(prizeId) {
  return Prize.findByIdAndUpdate(
    prizeId,
    { $inc: { winners_count: 1 } },
    { new: true }
  );
}

async function countUserGachaToday(userId, dateString) {
  return Gacha.countDocuments({ user_id: userId, gacha_date: dateString });
}

async function createGachaRecord({
  userId,
  username,
  prizeId,
  prizeName,
  gachaDate,
}) {
  return Gacha.create({
    user_id: userId,
    username,
    prize_id: prizeId || null,
    prize_name: prizeName || null,
    gacha_date: gachaDate,
  });
}

async function getGachaHistoryByUser(userId) {
  return Gacha.find({ user_id: userId }).sort({ createdAt: -1 });
}

async function getWinnersByPrize() {
  return Gacha.aggregate([
    { $match: { prize_id: { $ne: null } } },
    {
      $group: {
        _id: '$prize_name',
        winners: { $push: { user_id: '$user_id', username: '$username' } },
      },
    },
    { $sort: { _id: 1 } },
  ]);
}

async function createPrize(prizeName, quantity, probability) {
  return Prize.create({
    name: prizeName,
    quota: Number(quantity),
    probability: parseFloat(probability),
  });
}

module.exports = {
  getPrizes,
  getPrizeById,
  getAvailablePrizes,
  incrementPrizeWinner,
  countUserGachaToday,
  createGachaRecord,
  getGachaHistoryByUser,
  getWinnersByPrize,
  createPrize,
};
