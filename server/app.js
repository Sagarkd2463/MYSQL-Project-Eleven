const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'r$$100200',
    database:'students_db',
});

db.connect((err) => {
    if(err){
        console.log(err.message);
    } else {
        console.log("DB Connected Succesfully");
    }
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";

    db.query(sql, (err, result) => {
        if(err) return res.json(err.message);
        return res.json(result);
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student WHERE id = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json(err.message);
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`name`, `email`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err.message);
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET name = ?, email = ? WHERE id = ?";

    const id = req.params.id;

    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, [values, id], (err, result) => {
        if(err) return res.json(err.message)
        return res.json(result);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json(err.message)
        return res.json(result);
    });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});