\c postgres
DROP DATABASE quebec;
CREATE DATABASE quebec;
\c quebec;

-- {"usuario": "Andre", "senha": "oi"}
 
CREATE TABLE usuario (
	id_usuario VARCHAR (10) PRIMARY KEY,
	perfil TEXT [],
	credenciais JSONB,
	nome VARCHAR (200),
	foto TEXT,
	locais TEXT [],
	data_hora TIMESTAMP
);

CREATE TABLE imovel (
	id_imovel VARCHAR (10) PRIMARY KEY,
	tipo VARCHAR (50),
	preco NUMERIC,
	localizacao JSONB,
	data_hora TIMESTAMP
);
-- criterios {{id, nota[], observacao}, {id, nota[], observacao}, ... }
-- historico {{estado, id_usuario,data_hora}, {estado, id_usuario,data_hora}, ...}
CREATE TABLE avaliacao (
	id_avaliacao VARCHAR (10) PRIMARY KEY,
	data_hora TIMESTAMP,
	criterios JSONB,
	historico JSONB,
	
	id_usuario VARCHAR (10) REFERENCES usuario(id_usuario)
);

-- notas 
CREATE TABLE criterio (
	id_criterio VARCHAR (10) PRIMARY KEY,
	nome VARCHAR (200),
	descricao TEXT,
	notas JSONB,
	data_hora TIMESTAMP
);
