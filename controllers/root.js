
const getUsers = (req, res) => {
    db.select('*').from('users').returning('*')
    .then(users => {
        res.json(users);
    })
    .catch(err => res.json('Could not get users.'));
}

module.exports = {
    getUsers : getUsers
}