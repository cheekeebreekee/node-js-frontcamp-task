let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };

        db.collection('notes').insert(note, (err, result) => {
            err ? res.send({ 'error': 'An error has occurred' }) : res.send(result.ops[0]);
        });
    });

    app.get('/notes', (req, res) => {
        const id = req.params.id;

        db.collection('notes').find({}).toArray((err, items) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(items);
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').findOne(details, (err, item) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(item);
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };

        db.collection('notes').update(details, note, (err, result) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(note);
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').remove(details, (err, item) => {
            err ? res.send({'error':'An error has occurred'}) : res.send('Note ' + id + ' deleted!');
        });
    });

};