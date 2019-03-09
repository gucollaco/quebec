
CREATE DATABASE quebec;
\q quebec;

CREATE TABLE usuario (
	id_usuario VARCHAR (10) PRIMARY KEY,
	perfil TEXT [],
	credenciais TEXT [],
	nome VARCHAR (200),
	foto TEXT,
	locais TEXT [],
	data_hora TIMESTAMP
);

CREATE TABLE imovel (
	id_imovel VARCHAR (10) PRIMARY KEY,
	tipo VARCHAR (50),
	preco NUMERIC,
	localizacao TEXT,
	data_hora TIMESTAMP
);

CREATE TABLE avaliacao (
	id_avaliacao VARCHAR (10) PRIMARY KEY,
	data_hora TIMESTAMP,
	criterios JSONB,
	historico JSONB,
	
	id_usuario VARCHAR (10) REFERENCES usuario(id_usuario)
);

CREATE TABLE criterio (
	id_criterio VARCHAR (10) PRIMARY KEY,
	nome VARCHAR (200),
	descricao TEXT,
	notas JSONB,
	data_hora TIMESTAMP
);
