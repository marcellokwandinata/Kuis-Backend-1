module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        quota: {
          type: Number,
          required: true,
        },
        winners_count: {
          type: Number,
          default: 0,
        },
        probability: {
          type: Number,
          required: true,
        },
      },
      { timestamps: true }
    )
  );
