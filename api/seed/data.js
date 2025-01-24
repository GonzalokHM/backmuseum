import bcrypt from 'bcryptjs'

const seed = {
  users: [
    {
      username: 'AItoy',
      password: bcrypt.hashSync('123456', 10),
      scores: {
        puzzle: '2:28',
        racer: 950,
        shooter: 60
      }
    },
    {
      username: 'Ava',
      password: bcrypt.hashSync('1234567', 10),
      scores: {
        puzzle: '4:08',
        racer: 500,
        shooter: 28
      }
    },
    {
      username: 'Liam',
      password: bcrypt.hashSync('0123456', 10),
      scores: {
        puzzle: '10:20',
        racer: 20,
        shooter: 6
      }
    }
  ]
}

export default seed
