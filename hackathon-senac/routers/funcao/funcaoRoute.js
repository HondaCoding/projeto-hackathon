const express = require('express');
const {Router} = express;
const router = Router();
const db = require('../../infraestrutura/db');

router.use(express.json());

//---------------- GET ------------------
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM funcao';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar função.');
        } else {
            res.json(results);
        }
    });
});

//---------------- GET por ID ------------------
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM funcao WHERE idfuncao = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar função.');
        } else if (results.length === 0) {
            res.status(404).send('Função não encontrada.');
        } else {
            res.json(results[0]); // retorna o objeto da função específica
        }
    });
});

//---------------- POST ------------------
router.post('/', (req, res) => {
    const { tipoFuncao, permissao, ativo } = req.body;

    const sql = 'INSERT INTO funcao (tipoFuncao, permissao, ativo) VALUES (?, ?, ?)';
    db.query(sql,[tipoFuncao, permissao, ativo] , (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir função.');
        } else {
            res.status(201).json({
                id: results.insertId,
                tipoFuncao,
                permissao,
                ativo
            });
        }
    });
});


//---------------- PUT ------------------
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tipoFuncao, permissao, ativo } = req.body;

    const sql = 'UPDATE funcao SET tipoFuncao = ?, permissao = ?, ativo = ? WHERE idfuncao = ?';
    db.query(sql, [tipoFuncao, permissao, ativo, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar função.');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Função não encontrada.');
        }
        res.send('Função atualizada com sucesso!');
    });
});

//---------------- DELETE ------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM funcao WHERE idfuncao = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar função.');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Função não encontrada.');
        }
        res.send('Função deletada com sucesso!');
    });
});


module.exports = router;