const handleSignin = async (req, res, db, bcrypt) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json('Incorrect form submission');
    }

    try {
      const [response] = await db.select('email', 'hash').from('login').where('email', '=', email);
      const isValid = bcrypt.compareSync(password, response.hash);
      
      if (isValid) {
        try {
          const [user] = await db.select('*').from('users').where('email', '=', email);
          res.json(user);
        } catch (e) {
          res.status(400).json('Unable to get user');
        }
      } else {
        throw new Error();
      }
    } catch (e) {
      res.status(400).json('Wrong credentials');
    }
  }
  
module.exports = {
  handleSignin
}