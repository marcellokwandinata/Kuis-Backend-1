module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      prizeName: String,
      initialStock: String,
      stockLeft: String,
    })
  )