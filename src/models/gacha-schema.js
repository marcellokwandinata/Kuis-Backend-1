module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema(
      {
        userId: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        prizeId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Prize',
          required: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );
