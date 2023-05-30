const getSuperheroes = "SELECT * FROM superhero";
const getSuperheroesById = "SELECT * FROM superhero WHERE id = $1";
const addSuperheroes = 
    "INSERT INTO superhero (nickname, real_name, origin_description, superpowers, catch_phrase, images) VALUES ($1, $2, $3, $4, $5, $6)";
const deleteSuperhero = "DELETE FROM superhero WHERE id = $1";
const updateSuperhero = "UPDATE superhero SET nickname = $1 WHERE id = $2";
  
module.exports = {
    getSuperheroes,
    getSuperheroesById,
    addSuperheroes, 
    deleteSuperhero,
    updateSuperhero,
}