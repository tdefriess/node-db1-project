const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {    
    db.select("*")
        .from("accounts")
        .then(rows => {
            res.status(200).json({ data: rows });
        })
        .catch(err => {
            res.status(500).json({ message: "sorry, ran into an error"});
        })
})

server.get('/:id', (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if (account) {
                res.status(200).json({ data: account });
            } else {
                res.status(404).json({ message: "That account does not exist"});
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Database error"})
        })
})

server.post('/', (req, res) => {
    db("accounts")
        .insert(req.body, "id")
        .then(ids => {
            res.status(201).json({results: ids});
        })
        .catch(err => {
            res.status(500).json({message: "database error"})
        })
})

server.put('/:id', (req, res) => {
    const changes = req.body;

    db("accounts")
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: 'record updated successfully'});
            } else {
                res.status(404).json({message: 'That record does not exist'});
            }
        })
        .catch(err => {
            res.status(500).json({message: "database error"})
        })
})

module.exports = server;
