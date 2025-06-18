const express = require('express');
const {Router} = express;
const router = Router();
const db = require('../../infraestrutura/db');


router.use(express.json());

//---------------- GET ------------------
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tiporecurso';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar recursos');
        } else {
            res.json(results);
        }
    });
});

//---------------- POST ------------------
router.post('/', (req, res) => {
    const { tiporecurso, descricao } = req.body;
    
    const sql = 'INSERT INTO tiporecurso (tiporecurso, descricao) VALUES (?, ?)';
    db.query(sql, [tiporecurso, descricao], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir recurso.');
        } else {
            res.status(201).json({
                id: results.insertId,
                tiporecurso,
                descricao
            });
        }
    });
});

//---------------- PUT ------------------
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tiporecurso, descricao } = req.body;

    const sql = 'UPDATE tiporecurso SET tiporecurso = ?, descricao = ? WHERE idtiporecurso = ?';
    db.query(sql, [tiporecurso, descricao, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar recurso');
        }
        res.send('Recurso atualizado com sucesso!');
    });
});


//---------------- DELETE ------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM tiporecurso WHERE idtiporecurso = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar recurso');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Recurso não encontrado');
        }

        res.send('Recurso deletado com sucesso!');
    });
});



module.exports = router;