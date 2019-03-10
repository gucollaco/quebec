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
	pendente BOOLEAN,
	foto TEXT,
	locais TEXT [],
	data_hora TIMESTAMP
);

CREATE TABLE imovel (
	id_imovel VARCHAR (10) PRIMARY KEY,
	tipo VARCHAR (50),
	preco NUMERIC,
	localizacao JSONB,
	data_hora TIMESTAMP,
	tags TEXT [],
	banheiros INTEGER,
	quartos INTEGER,
	suites INTEGER,
	area INTEGER,
	titulo TEXT,
	descricao TEXT,
	estacionamento INTEGER,
	links TEXT[],
	coords POINT;
);

CREATE TABLE tag(
	id_tag VARCHAR (10) PRIMARY KEY,
	descricao TEXT
);

-- criterios {{id, nota[], observacao}, {id, nota[], observacao}, ... }
-- historico {{estado, id_usuario,data_hora}, {estado, id_usuario,data_hora}, ...}
CREATE TABLE avaliacao (
	id_avaliacao VARCHAR (10) PRIMARY KEY,
	data_hora TIMESTAMP,
	criterios JSONB,
	historico JSONB,
	id_imovel VARCHAR (10),
	id_usuario VARCHAR (10)
);

-- notas 
CREATE TABLE criterio (
	id_criterio VARCHAR (10) PRIMARY KEY,
	nome VARCHAR (200),
	descricao TEXT,
	notas JSONB,
	data_hora TIMESTAMP
);
