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

//GET /:id - get a single item
export const getUserById = (req, res) => {
    const itemId = parseInt(req.params.id);

    connection.query('SELECT * FROM thesisdb WHERE id = ?', [itemId], (err, results) => {
        if (err) {
            console.error("Error fetching item", err);
            res.status(500).json({ error: 'Server Error' });
        }
        else if (results.length > 0) {
            res.json(results[0]);
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    });
}

// POST -> create a new user
export const createUser = (req, res) => {

    const newItem = req.body;

    connection.query('INSERT INTO thesisdb SET ?', newItem, (err, result) => {
        if (err) {
            console.error("Error creating item", err);
            res.status(500).json({ error: 'Server Error' });
        }
        else {
            newItem.id = result.insertId;
            res.status(201).json(newItem);
            console.log(`User successfully added to the database`);
        }
    });
}

//PUT -> /:id - UPDATE user
export const updateUser = (req, res) => {
    const itemId = parseInt(req.params.id);
    const updateItem = req.body;

    connection.query('UPDATE thesisdb SET ? WHERE id = ?', [updateItem, itemId], (err, result) => {
        if (err) {
            console.error("Error updating item", err);
            res.status(500).json({ error: 'Server error' });
        }
        else if (result.affectedRows > 0) {
            res.json(updateItem);
            console.log('User updated successfully.')
        }
        else {
            res.status(404).json({ error: 'Item not found' });
        }
    });
}

//DELETE -> delete item
export const deleteUser = (req, res) => {
    const itemId = parseInt(req.params.id);

    connection.query('DELETE FROM thesisdb WHERE id = ?', [itemId], (err, result) => {
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