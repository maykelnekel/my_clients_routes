CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(120),
	email varchar(120) UNIQUE,
	phone_number varchar(15),
	latitude float,
	longitude float
);