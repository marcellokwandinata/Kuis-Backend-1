module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema(
      {
        user_id: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        prize_id: {
          type: db.Schema.Types.ObjectId,
          ref: 'Prize',
          default: null,
        },
        prize_name: {
          type: String,
          default: null,
        },
        gacha_date: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );