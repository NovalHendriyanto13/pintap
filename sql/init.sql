CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	username varchar NOT NULL,
	name varchar NOT NULL,
	"password" varchar NOT NULL,
	createdat timestamp NULL,
	updatedat timestamp NULL,
	deletedat timestamp NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

INSERT INTO public.users (username, name, "password") VALUES 
('noval', 'Noval', 'cGFzc3dvcmQ='),
('rahardi331', 'Rahardi', 'cmFoYXJkaQ=='),
('susanti123', 'Susanti', 'c3VzYW50aQ==');
