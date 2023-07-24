import mysql from 'mysql2';

//database connection config
const connection = mysql.createConnection({
    host: '192.168.31.30',
    port: '3306',
    user: 'Kris-Desktop',
    password: 'admin',
    database: 'sampledata'
});

// connection to the database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database", err);
    }
    console.log("Connectend to the database");
});

// GET -> get all users from the database
export const getUsers = (req, res) => {

    connection.query('SELECT * FROM thesisdb', (err, results) => {
        if (err) {
            console.error("Error fetching items", err);
            res.status(500).json({ error: 'Server error' });
        }
        else {
            res.json(results);
        }
    });
}

//GET /:id - get a single user
export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);

    connection.query('SELECT * FROM thesisdb WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error("Error fetching user", err);
            res.status(500).json({ error: 'Server Error' });
        }
        else if (results.length > 0) {
            res.json(results[0]);
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    });
}

// POST -> create a new user
export const createUser = (req, res) => {

    const newUser = req.body;

    connection.query('INSERT INTO thesisdb SET ?', newUser, (err, result) => {
        if (err) {
            console.error("Error creating item", err);
            res.status(500).json({ error: 'Server Error' });
        }
        else {
            newUser.id = result.insertId;
            res.status(201).json(newUser);
            console.log(`User successfully added to the database`);
        }
    });
}

//PUT -> /:id - UPDATE user
export const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;

    connection.query('UPDATE thesisdb SET ? WHERE id = ?', [updateUser, userId], (err, result) => {
        if (err) {
            console.error("Error updating user", err);
            res.status(500).json({ error: 'Server error' });
        }
        else if (result.affectedRows > 0) {
            res.json(updateUser);
            console.log('User updated successfully.')
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    });
}

//DELETE -> delete user
export const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);

    connection.query('DELETE FROM thesisdb WHERE id = ?', [userId], (err, result) => {
        if (err) {
            console.error('Error deleting item', err);
            res.status(500).json({ error: 'Server error' });
        }
        else if (result.affectedRows > 0) {
            res.json({ message: 'User deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    });
}