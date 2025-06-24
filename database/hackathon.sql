CREATE DATABASE reservarecursos;
USE reservarecursos;

CREATE TABLE funcao (
    idfuncao INT AUTO_INCREMENT PRIMARY KEY,
    tipoFuncao VARCHAR(45) NOT NULL,
    permissao ENUM('TEPT/GERENCIA',
    'COORDENADOR/PROFESSOR/INSTRUTUTOR', 'EXTERNO', 
    'ADMINISTRATIVO') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE responsavel (
    idresponsavel INT AUTO_INCREMENT PRIMARY KEY,
    idfuncao INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cracha VARCHAR(10),
    telefone VARCHAR(15),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_responsavel_funcao FOREIGN KEY (idfuncao) REFERENCES funcao(idfuncao)
);

CREATE TABLE tiporecurso (
    idtiporecurso INT AUTO_INCREMENT PRIMARY KEY,
    tiporecurso VARCHAR(45) NOT NULL,
    descricao LONGTEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE recurso (
    idrecurso INT AUTO_INCREMENT PRIMARY KEY,
    idresponsavel INT NOT NULL,
    idtiporecurso INT NOT NULL,
    descricao LONGTEXT,
    quantidade TINYINT NOT NULL,
    dataLocacao DATE,
    horarioLocacao TIME,
    dataDevolucao DATE,
    horarioDevolucao TIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_recurso_responsavel FOREIGN KEY (idresponsavel) REFERENCES responsavel(idresponsavel),
    CONSTRAINT fk_recurso_tiporecurso FOREIGN KEY (idtiporecurso) REFERENCES tiporecurso(idtiporecurso)
);


-- Inserir funções
INSERT INTO funcao (tipoFuncao, permissao) VALUES
('Coordenador Pedagógico', 'COORDENADOR'),
('Instrutor Técnico', 'PROFESSOR/INSTRUTUTOR'),
('Gerente Administrativo', 'TEPT/GERENCIA'),
('Colaborador Externo', 'EXTERNO'),
('Analista Administrativo', 'ADMINISTRATIVO');

-- Inserir responsáveis
INSERT INTO responsavel (idfuncao, nome, cracha, telefone) VALUES
(1, 'Ana Paula Gomes', 'C001', '(44) 99888-0001'),
(2, 'Bruno Silva', 'C002', '(44) 99888-0002'),
(3, 'Carlos Eduardo', 'C003', '(44) 99888-0003'),
(4, 'Daniela Souza', 'C004', '(44) 99888-0004'),
(5, 'Elaine Martins', 'C005', '(44) 99888-0005');

-- Inserir tipos de recurso
INSERT INTO tiporecurso (tiporecurso, descricao) VALUES
('Sala', 'Sala de aula equipada com projetor e quadro branco'),
('Carro', 'Veículo da instituição para uso administrativo e pedagógico'),
('Datashow', 'Projetor multimídia para apresentações'),
('Notebook', 'Notebook para uso em atividades acadêmicas');

truncate table recurso;

-- Inserir recursos (sem dataDevolucao e horarioDevolucao)
INSERT INTO recurso (
    idresponsavel, idtiporecurso, descricao, quantidade, dataLocacao, horarioLocacao, dataDevolucao, horarioDevolucao
) VALUES
(1, 1, 'Sala 201 - Bloco A      ', 1, '2025-06-13', '08:00:00', "2025-06-13", '08:00:00'),
(2, 2, 'Fiat Uno - Placa ABC1D23', 1, '2025-06-14', '13:00:00',  "2025-06-13", '08:00:00'),
(3, 3, 'Datashow Epson X123     ', 1, '2025-06-15', '09:00:00', "2025-06-13", '08:00:00'),
(4, 4, 'Notebook Dell i5 8GB RAM', 2, '2025-06-16', '10:00:00', "2025-06-13", '08:00:00');

select * from recurso;

update recurso set dataDevolucao = "2025-06-13", horarioDevolucao = "12:00:00", descricao = "Tudo certo, sem anomalias" where idrecurso = 1;