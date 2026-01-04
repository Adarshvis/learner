const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://adarshsharma1552004_db_user:Adarsh%402004@cluster1.5u4qjdu.mongodb.net/?appName=Cluster1"

async function fixFooterText() {
  const client = new MongoClient(uri)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('test')
    const result = await db.collection('globals').updateOne(
      { globalType: 'settings' },
      {
        $set: {
          footerText: 'Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.'
        }
      }
    )
    
    console.log('✅ Updated:', result.modifiedCount, 'document(s)')
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

fixFooterText()
