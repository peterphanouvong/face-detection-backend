const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    db('login').insert({
        hash: hash,
        email: email
    })
    .catch(err => res.status(400).json('fkd up login'));

    db('users').insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('messed up user'))
  }
  
  module.exports = {
    handleRegister: handleRegister
  };