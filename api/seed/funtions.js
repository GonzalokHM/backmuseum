import User from '../models/User.js'
import seed from './data.js'

const cleanCollections = async () => {
  await User.collection.drop()
  console.log('>>> Colecciones limpias')
}
const saveDocuments = async () => {
  await User.insertMany(seed.users)
  console.log('Usuarios insertados correctamente.')
}

export { cleanCollections, saveDocuments }
