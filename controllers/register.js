const { promisify } = require("../utils/functions.js");

const handleRegister = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission');
  }

  const hash = bcrypt.hashSync(password, 10);

  const trx = await promisify(db.transaction.bind(db));
  
  try {
    const response = await trx.insert({
      hash: hash,
      email: email
    }).into('login').returning('email');
    
    try {
      const user = await trx('users')
      .returning('*')
      .insert({
        email: response[0],
        name: name,
        joined: new Date()
      });
  
      res.json(user[0]);
      await trx.commit();
    } catch (e) {
      await trx.rollback();
    }
  } catch (e) {
    res.status(400).json('Unable to register')
  }
}

module.exports = {
  handleRegister
};