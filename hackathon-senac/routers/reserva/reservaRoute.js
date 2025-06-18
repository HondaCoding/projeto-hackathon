const express = require('express');
const {Router} = express;
const router = Router();
const db = require('../../infraestrutura/db');


router.use(express.json());

//---------------- GET ------------------
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM recurso';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar reservas');
        } else {
            res.json(results);
        }
    });
});

//---------------- POST ------------------
router.post('/', (req, res) => {
    const {
        idresponsavel,
        idtiporecurso,
        descricao,
        quantidade,
        dataLocacao,
        horarioLocacao,
        dataDevolucao,
        horarioDevolucao
    } = req.body;

    const sql = `
        INSERT INTO recurso 
        (idresponsavel, idtiporecurso, descricao, quantidade, dataLocacao, horarioLocacao, dataDevolucao, horarioDevolucao) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        idresponsavel,
        idtiporecurso,
        descricao,
        quantidade,
        dataLocacao,
        horarioLocacao,
        dataDevolucao,
        horarioDevolucao
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao inserir recurso.');
        }

        res.status(201).json({
            id: results.insertId,
            idresponsavel,
            idtiporecurso,
            descricao,
            quantidade,
            dataLocacao,
            horarioLocacao,
            dataDevolucao,
            horarioDevolucao
        });
    });
});

//---------------- PUT ------------------
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {
        idresponsavel,
        idtiporecurso,
        descricao,
        quantidade,
        dataLocacao,
        horarioLocacao,
        dataDevolucao,
        horarioDevolucao,
        ativo
    } = req.body;

    const sql = `
        UPDATE recurso 
        SET idresponsavel = ?, idtiporecurso = ?, descricao = ?, quantidade = ?, 
            dataLocacao = ?, horarioLocacao = ?, dataDevolucao = ?, horarioDevolucao = ?, ativo = ?
        WHERE idrecurso = ?`;

    const values = [
        idresponsavel,
        idtiporecurso,
        descricao,
        quantidade,
        dataLocacao,
        horarioLocacao,
        dataDevolucao,
        horarioDevolucao,
        ativo,
        id
    ];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar recurso.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Recurso não encontrado.');
        }

        res.send('Recurso atualizado com sucesso!');
    });
});


//---------------- DELETE ------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM recurso WHERE idrecurso = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao deletar recurso.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Recurso não encontrado.');
        }

        res.send('Recurso deletado com sucesso!');
    });
});



module.exports = router;