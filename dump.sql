--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clientes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clientes (
    id integer NOT NULL,
    cnpj text NOT NULL
);


--
-- Name: clientes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;


--
-- Name: contas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contas (
    id integer NOT NULL,
    cnpj_cliente text NOT NULL,
    valor_esperado numeric NOT NULL,
    valor_pago numeric NOT NULL,
    data_pagamento date,
    data_vencimento date NOT NULL
);


--
-- Name: contas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contas_id_seq OWNED BY public.contas.id;


--
-- Name: clientes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);


--
-- Name: contas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contas ALTER COLUMN id SET DEFAULT nextval('public.contas_id_seq'::regclass);


--
-- Data for Name: clientes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.clientes VALUES (2, '11203274000102');
INSERT INTO public.clientes VALUES (3, '04210657000134');


--
-- Data for Name: contas; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.contas VALUES (1, '11203274000102', 1000, 950, '2023-06-10', '2023-06-05');
INSERT INTO public.contas VALUES (2, '11203274000102', 2000, 1800, '2023-06-15', '2023-06-10');
INSERT INTO public.contas VALUES (3, '11203274000102', 3000, 2700, '2023-06-20', '2023-06-15');
INSERT INTO public.contas VALUES (4, '04210657000134', 1500, 1400, '2023-06-10', '2023-06-05');
INSERT INTO public.contas VALUES (5, '04210657000134', 2500, 2200, '2023-06-15', '2023-06-10');
INSERT INTO public.contas VALUES (6, '04210657000134', 3500, 3300, '2023-06-20', '2023-06-15');
INSERT INTO public.contas VALUES (7, '11203274000102', 500, 0, NULL, '2023-06-05');
INSERT INTO public.contas VALUES (8, '04210657000134', 800, 0, NULL, '2023-06-08');
INSERT INTO public.contas VALUES (9, '11203274000102', 700, 0, NULL, '2023-06-25');
INSERT INTO public.contas VALUES (10, '11203274000102', 900, 0, NULL, '2023-06-30');
INSERT INTO public.contas VALUES (11, '04210657000134', 1200, 0, NULL, '2023-06-28');
INSERT INTO public.contas VALUES (12, '04210657000134', 1800, 0, NULL, '2023-06-30');


--
-- Name: clientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clientes_id_seq', 3, true);


--
-- Name: contas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contas_id_seq', 12, true);


--
-- Name: clientes clientes_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_cnpj_key UNIQUE (cnpj);


--
-- Name: clientes clientes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);


--
-- Name: contas contas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_pkey PRIMARY KEY (id);


--
-- Name: contas contas_cnpj_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contas
    ADD CONSTRAINT contas_cnpj_cliente_fkey FOREIGN KEY (cnpj_cliente) REFERENCES public.clientes(cnpj);


--
-- PostgreSQL database dump complete
--

