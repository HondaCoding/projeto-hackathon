const express = require('express');
const {Router} = express;
const router = Router();
const db = require('../../infraestrutura/db');

router.use(express.json());

//---------------- GET ------------------
router.get('/', (req, res) => {
    const sql = `
    SELECT 
        r.*, 
        f.tipoFuncao AS nomeFuncao,
        f.permissao
    FROM responsavel r
    JOIN funcao f ON r.idfuncao = f.idfuncao
`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar responsáveis');
        } else {
            res.json(results);
        }
    });
});


// -------- GET POR ID COM nomeFuncao ----------
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            r.*, 
            f.tipoFuncao AS nomeFuncao
        FROM responsavel r
        JOIN funcao f ON r.idfuncao = f.idfuncao
        WHERE r.idresponsavel = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar responsável');
        }
        if (results.length === 0) {
            return res.status(404).send('Responsável não encontrado');
        }
        res.json(results[0]);
    });
});

//---------------- POST ------------------
router.post('/', (req, res) => {
    const { idfuncao, nome, cracha, telefone } = req.body;
    
    const sql = 'INSERT INTO responsavel (idfuncao, nome, cracha, telefone) VALUES (?, ?, ?, ?)';
    db.query(sql, [idfuncao, nome, cracha, telefone], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao inserir responsável.');
        } else {
            res.status(201).json({
                id: results.insertId,
                nome, 
                cracha, 
                telefone
            });
        }
    });
});

//---------------- PUT ------------------
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idfuncao, nome, cracha, telefone, ativo } = req.body;

    const sql = `
        UPDATE responsavel
        SET idfuncao = ?, nome = ?, cracha = ?, telefone = ?, ativo = ?
        WHERE idresponsavel = ?
    `;

    db.query(sql, [idfuncao, nome, cracha, telefone, ativo, id], (err, results) => {
        if (err) {
            console.error(err); // Para debugging
            return res.status(500).send('Erro ao atualizar responsável.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Responsável não encontrado.');
        }

        res.send('Responsável atualizado com sucesso!');
    });
});

//---------------- DELETE ------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM responsavel WHERE idresponsavel = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err); // para debug
            return res.status(500).send('Erro ao deletar responsável.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Responsável não encontrado.');
        }

        res.send('Responsável deletado com sucesso!');
    });
});

module.exports = router;
