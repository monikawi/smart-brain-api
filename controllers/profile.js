const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
      .then(user => {
        if (user.length) {
          res.json(user[0])
        } else {
          res.status(400).json('Not found')
        }
      })
      .catch(err => res.status(400).json('Error getting user'))
  }
  
  module.exports = {
    handleProfileGet
  }

//OLD
// app.get('/profile/:id', (req, res) => {
//   const { id } = req.params;

//   knex.select('*')
//   .from('users')
//   .where({id})
//   .then(user => {
//     if (user.length) {
//       res.json(user[0])
//     } else {
//       res.status(404).json('User does not exist')
//     }
//   })
//   .catch(err => res.status(400).json('Could not get user'))
// })
