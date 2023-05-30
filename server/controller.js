const pool = require('./db');
const queries = require('./queries');

const getSuperheroes = (req, res) => {
    pool.query(queries.getSuperheroes, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getSuperheroesById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getSuperheroesById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addSuperheroes = (req, res) => {
    const {nickname, real_name, origin_description, superpowers, catch_phrase, images} = req.body;

    pool.query(queries.addSuperheroes, 
        [nickname, real_name, origin_description, superpowers, catch_phrase, images],
        (error, results) => {
        if (error) throw error;
        res.status(201).send("Superhero created successfully");
    });
}

const deleteSuperhero = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteSuperhero, [id], (error, results) => {
        const noSuperheroFound = !results.rows.length;
        if (noSuperheroFound) {
            res.send("Superhero does not exist in the database");
        }

        pool.query(queries.deleteSuperhero, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Superhero remove seccessfully");
        })
    })
}

const updateSuperhero = (req, res) => {
    const id = parseInt(req.params.id);
    const { nickname } = req.body;
    pool.query(queries.getSuperheroesById, [id], (error, results) => {
        const noSuperheroFound = !results.rows.length;
        if (noSuperheroFound) {
            res.send("Superhero does not exist in the database");
        }

        pool.query(queries.updateSuperhero, [nickname, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Superhero update successfully");
        })
    })
}

module.exports = {
    getSuperheroes,
    getSuperheroesById,
    addSuperheroes, 
    deleteSuperhero, 
    updateSuperhero,
};