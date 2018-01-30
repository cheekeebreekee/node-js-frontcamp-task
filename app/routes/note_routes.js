let ObjectID = require('mongodb').ObjectID;

module.exports = function(app, database) {
    let notesDB = database.db('notes');
    let notesCollection = notesDB.collection('notes');

    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };

        notesCollection.insert(note, (err, result) => {
            err ? res.send({ 'error': 'An error has occurred' }) : res.send(result.ops[0]);
        });
    });

    app.get('/notes', (req, res) => {
        const id = req.params.id;

        notesCollection.find({}).toArray((err, items) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(items);
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        notesCollection.findOne(details, (err, item) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(item);
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };

        notesCollection.update(details, note, (err, result) => {
            err ? res.send({'error':'An error has occurred'}) : res.send(note);
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        notesCollection.remove(details, (err, item) => {
            err ? res.send({'error':'An error has occurred'}) : res.send('Note ' + id + ' deleted!');
        });
    });
};