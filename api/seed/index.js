import connectDB from '../../config/db.js'
import { cleanCollections, saveDocuments } from './funtions.js'
import dotenv from 'dotenv'
dotenv.config()

const main = async () => {
  try {
    await connectDB()
    await cleanCollections()
    await saveDocuments()
    console.log('Script Terminado')
  } catch (err) {
    console.error('Error lanzando script:', err)
    process.exit(1)
  }
}

main().then(() => process.exit())
