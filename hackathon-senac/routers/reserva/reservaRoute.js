const express = require('express');
const { Router } = express;
const router = Router();
const db = require('../../infraestrutura/db');

router.use(express.json());

//---------------- GET ------------------
router.get('/', (req, res) => {
    const sql = `
        SELECT 
            r.*, 
            res.nome AS nomeResponsavel, 
            tr.tiporecurso AS nomeTipoRecurso
        FROM recurso r
        JOIN responsavel res ON r.idresponsavel = res.idresponsavel
        JOIN tiporecurso tr ON r.idtiporecurso = tr.idtiporecurso
        WHERE r.ativo = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar reservas');
        }
        res.json(results);
    });
});

// -------- GET POR ID ----------
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            r.*, 
            res.nome AS nomeResponsavel, 
            tr.tiporecurso AS nomeTipoRecurso
        FROM recurso r
        JOIN responsavel res ON r.idresponsavel = res.idresponsavel
        JOIN tiporecurso tr ON r.idtiporecurso = tr.idtiporecurso
        WHERE r.idrecurso = ? AND r.ativo = 1
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar reserva');
        }
        if (results.length === 0) {
            return res.status(404).send('Reserva não encontrada');
        }
        res.json(results[0]);
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

//---------------- PUT PARCIAL ------------------
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const campos = req.body;

    if (!campos || Object.keys(campos).length === 0) {
        return res.status(400).send('Nenhum dado enviado para atualização.');
    }

    const colunas = Object.keys(campos).map(campo => `${campo} = ?`).join(', ');
    const valores = Object.values(campos);

    const sql = `UPDATE recurso SET ${colunas} WHERE idrecurso = ?`;

    db.query(sql, [...valores, id], (err, results) => {
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
