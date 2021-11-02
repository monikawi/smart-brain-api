const handleProfileGet = async (req, res, db) => {
  try {
    const { id } = req.params;
    const response = await db.select('*').from('users').where({id});
    const user = await response.json(user[0]);

    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('Not found');
    }

  } catch (e) {
    res.status(400).json('Error getting user')
  }
}

module.exports = {
  handleProfileGet
}
