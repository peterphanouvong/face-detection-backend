const increment = (req, res, db) => {
    const  { id, count } = req.body;
    db('users').where('id', id)
    .increment('score', count)
    .returning('score')
    .then(score => {
        res.json(score[0]);
    })
    .catch(err => res.status(400).json('unable to get count'))
}

module.exports = {
    increment : increment
}