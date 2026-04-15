module.exports = (db) =>
  db.model(
    'User',
    db.Schema({
      username: String,
    })
  );
