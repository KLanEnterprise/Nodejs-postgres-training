const Pool = require("pg").Pool;
const pool = new Pool({
  user: "noe",
  host: "localhost",
  database: "afib_dm",
  password: "noe",
  port: 5432,
});

const getAccounts = (request, response) => {
  pool.query("SELECT * FROM compte", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserByRacine = (request, response) => {
  const racine = parseInt(request.params.racine_compte);

  pool.query(
    "SELECT * FROM compte WHERE racine_compte = $1",
    [racine],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { id_compte, nom_compte, prenom_compte, racine_compte, statut, type_compte } =
    request.body;

  pool.query(
    "INSERT INTO compte (id_compte,nom_compte, prenom_compte, racine_compte, statut,type_compte ) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
    [id_compte, nom_compte, prenom_compte, racine_compte, statut, type_compte],
    (error, results) => {
      if (error) {
        console.log("error: ", error);
        // return error;
        response.status(404).send(JSON.stringify(error))
        throw error;
      }
      response.status(201).send(results.rows);
    }
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send([`User modified with ID: ${id}`]);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getAccounts,
  getUserByRacine,
  createUser,
  updateUser,
  deleteUser,
};
