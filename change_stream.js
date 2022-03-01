require('dotenv').config()

const { MongoClient } = require('mongodb');

async function main() {
  
  const uri = process.env.SAMPLE_MFLIX_URI
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const db = client.db("sample_mflix")
    const collection = db.collection("movies")

    console.log(`Waiting for changes...`);
    const changeStream = collection.watch()
    changeStream.on("change", showChanges)

  } finally {
    // Close the connection to the MongoDB cluster
    //await client.close();
  }
}

main().catch(console.error);

/**
 * Show changes in console
 */
async function showChanges(change) {
  // process any change event
  console.log("Received a change to the collection: \t", change);
  console.log(`Waiting for more changes...`);
}