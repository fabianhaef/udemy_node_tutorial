const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fabian:fabian@cluster0.0ffes.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
async function run() {
    try {
      await client.connect();
      const database = client.db('sample_mflix');
      const collection = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
      const query = { title: 'Back to the Future' };
      const movie = await collection.findOne(query);
      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }