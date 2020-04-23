const MongoClient = require("mongodb").MongoClient
const DB_URL = "mongodb://localhost:27017"


module.exports = MongoClient.connect(DB_URL, {useUnifiedTopology: true})
.then(client => {
  return client.db('classroom')
})
    .catch(error => {
      console.log("DATABASE", error)
})
