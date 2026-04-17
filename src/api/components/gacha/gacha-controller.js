const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function doGacha(request, response, next) {
  try {
    const { userId, username } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'userId is required');
    }
    if (!username) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'username is required');
    }

    const result = await gachaService.doGacha(userId, username);

    return response.status(200).json({
      success: true,
      message: result.won
        ? `Selamat! Anda berhasil memenangkan: ${result.prize.name}`
        : 'Maaf, Anda kurang beruntung, coba lagi!',
      data: result,
    });
  } catch (error) {
    if (error.statusCode === 429) {
      return response.status(429).json({
        success: false,
        message: error.message,
      });
    }
    return next(error);
  }
}

async function getGachaHistory(request, response, next) {
  try {
    const { userId } = request.query;

    if (!userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Query parameter userId is required'
      );
    }

    const history = await gachaService.getGachaHistory(userId);

    return response.status(200).json({
      success: true,
      userId,
      totalGacha: history.length,
      totalWon: history.filter((h) => h.won).length,
      data: history,
    });
  } catch (error) {
    return next(error);
  }
}

async function getPrizes(request, response, next) {
  try {
    const prizes = await gachaService.getPrizesWithRemainingQuota();

    return response.status(200).json({
      success: true,
      data: prizes,
    });
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinnersPerPrize();

    return response.status(200).json({
      success: true,
      data: winners,
    });
  } catch (error) {
    return next(error);
  }
}

async function addPrize(request, response, next) {
  try {
    const { prizeName } = request.body;
    const { quantity } = request.body;
    const { probability } = request.body;

    if (!prizeName || !quantity || !probability) {
      throw errorResponder(errorTypes.NO_ARGUMENT_ERROR);
    }

    const prize = await gachaService.createPrize(
      prizeName,
      quantity,
      probability
    );

    return response.status(200).json(prize);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  doGacha,
  getGachaHistory,
  getPrizes,
  getWinners,
  addPrize,
};
