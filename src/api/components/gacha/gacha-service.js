const gachaRepository = require('./gacha-repository');

const MAX_GACHA_PER_DAY = 5;

function getTodayWIB() {
  const now = new Date();
  // Offset WIB = UTC+7
  const wibOffset = 7 * 60 * 60 * 1000;
  const wibDate = new Date(now.getTime() + wibOffset);
  return wibDate.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function maskName(name) {
  return name
    .split(' ')
    .map((word) => {
      if (word.length <= 2) return word;
      return word
        .split('')
        .map((char, idx) => {
          if (idx === 0 || idx === word.length - 1) return char;
          return idx % 2 === 0 ? '*' : char;
        })
        .join('');
    })
    .join(' ');
}

async function doGacha(userId, username) {
  const today = getTodayWIB();

  const countToday = await gachaRepository.countUserGachaToday(userId, today);
  if (countToday >= MAX_GACHA_PER_DAY) {
    const error = new Error(
      `Anda sudah melakukan gacha ${MAX_GACHA_PER_DAY} kali hari ini. Coba lagi besok.`
    );
    error.statusCode = 429;
    throw error;
  }

  const availablePrizes = await gachaRepository.getAvailablePrizes();

  let wonPrize = null;

  if (availablePrizes.length > 0) {
    const roll = Math.random();
    let cumulative = 0;

    for (const prize of availablePrizes) {
      cumulative += prize.probability;
      if (roll <= cumulative) {
        wonPrize = prize;
        break;
      }
    }
  }

  await gachaRepository.createGachaRecord({
    userId,
    username,
    prizeId: wonPrize ? wonPrize._id : null,
    prizeName: wonPrize ? wonPrize.name : null,
    gachaDate: today,
  });

  if (wonPrize) {
    await gachaRepository.incrementPrizeWinner(wonPrize._id);
  }

  return {
    won: !!wonPrize,
    prize: wonPrize
      ? {
          id: wonPrize._id,
          name: wonPrize.name,
        }
      : null,
    gacha_count_today: countToday + 1,
    remaining_gacha_today: MAX_GACHA_PER_DAY - (countToday + 1),
  };
}

async function getGachaHistory(userId) {
  const records = await gachaRepository.getGachaHistoryByUser(userId);
  return records.map((r) => ({
    id: r._id,
    gacha_date: r.gacha_date,
    won: !!r.prize_id,
    prize: r.prize_name || null,
    created_at: r.createdAt,
  }));
}

async function getPrizesWithRemainingQuota() {
  const prizes = await gachaRepository.getPrizes();
  return prizes.map((p) => ({
    id: p._id,
    name: p.name,
    total_quota: p.quota,
    winners_count: p.winners_count,
    remaining_quota: p.quota - p.winners_count,
  }));
}

async function getWinnersPerPrize() {
  const grouped = await gachaRepository.getWinnersByPrize();
  return grouped.map((group) => ({
    prize_name: group._id,
    winners: group.winners.map((w) => ({
      user_id: w.user_id,
      masked_name: maskName(w.username),
    })),
  }));
}

async function createPrize(prizeName, quantity, probability) {
  return gachaRepository.createPrize(prizeName, quantity, probability);
}

module.exports = {
  doGacha,
  getGachaHistory,
  getPrizesWithRemainingQuota,
  getWinnersPerPrize,
  createPrize,
};
