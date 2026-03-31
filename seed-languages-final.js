const { MongoClient } = require('./apps/http-backend/node_modules/mongodb');

const MONGO_URI = "mongodb://jatinsdata:vaoriu22gph@ac-6w9mqxm-shard-00-00.1d2qmsg.mongodb.net:27017,ac-6w9mqxm-shard-00-01.1d2qmsg.mongodb.net:27017,ac-6w9mqxm-shard-00-02.1d2qmsg.mongodb.net:27017/cuhp-devs?ssl=true&replicaSet=atlas-agi4ys-shard-0&authSource=admin&appName=Cluster0";

const LANGUAGES = [
  {
    name: "C++",
    runtime: "cpp",
    version: "17",
    aliases: ["cpp", "c++", "gcc"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Javascript",
    runtime: "javascript",
    version: "20",
    aliases: ["js", "javascript", "node", "nodejs"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Python",
    runtime: "python",
    version: "3.10",
    aliases: ["py", "python", "python3"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Rust",
    runtime: "rust",
    version: "1.68",
    aliases: ["rs", "rust"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected successfully");

    const db = client.db("cuhp-devs");
    const languages = db.collection("languages");

    for (const lang of LANGUAGES) {
      await languages.updateOne(
        { name: lang.name },
        { $set: lang },
        { upsert: true }
      );
      console.log(`✅ Seeded: ${lang.name}`);
    }

    console.log("🎉 All languages seeded successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.close();
  }
}

seed();
