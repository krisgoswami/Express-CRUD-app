import mysql from 'mysql2';

//database connection config
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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

// GET -> get all items from the database
app.get('/', (req, res) => {
    connection.query('SELECT * FROM mock_data', (err, results) => {
        if (err) {
            console.error("Error fetching items", err);
            res.status(500).json({ error: 'Server error' });
        }
        else {
            res.json(results);
        }
    });
});

//GET /:id - get a single item
app.get('/:id', (req, res) => {
    const itemId = parseInt(req.params.id);

    connection.query('SELECT * FROM mock_data WHERE id = ?',[itemId], (err, results) => {
        if(err){
            console.error("Error fetching item", err);
            res.status(500).json({error: 'Server Error'});
        }
        else if (results.length > 0){
            res.json(results[0]);
        }
        else{
            res.status(404).json({error: 'Item not found'});
        }
    })
})

// POST -> create a new item
app.post('/', (req, res) => {
    const newItem = req.body;

    connection.query('INSERT INTO mock_data SET ?', newItem, (err, result) => {
        if (err) {
            console.error("Error creating item", err);
            res.status(500).json({error: 'Server Error'});
        }
        else {
            newItem.id = result.insertId;
            res.status(201).json(newItem);
            console.log(`User successfully added to the database`);
        }
    })
})

//PUT -> /:id - UPDATE user
app.put('/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updateItem = req.body;

    connection.query('UPDATE mock_data SET ? WHERE id = ?', [updateItem, itemId], (err, result) => {
        if (err){
            console.error("Error updateing item", err);
            res.status(500).json({error: 'Server error'});
        }
        else if (result.affectedRows > 0) {
            res.json(updateItem);
            console.log('Item updated successfully.')
        }
        else {
            res.status(404).json({error: 'Item not found'});
        }
    });
});

//DELETE -> delete item
app.delete('/:id', (req,res) => {
    const itemId = parseInt(req.params.id);

    connection.query('DELETE FROM mock_data WHERE id = ?', [itemId], (err,result)=>{
        if (err){
            console.error('Error deleting item', err);
            res.status(500).json({error: 'Server error'});
        }
        else if (result.affectedRows > 0){
            res.json({message: 'Item deleted successfully'});   
        }
        else {
            res.status(404).json({error: 'Item not found'});
        }
    });
});