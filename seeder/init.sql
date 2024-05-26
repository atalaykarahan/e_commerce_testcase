--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-25 00:53:30 +03

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

ALTER TABLE IF EXISTS ONLY public."PRODUCT_FLAVOR" DROP CONSTRAINT IF EXISTS product_id;
ALTER TABLE IF EXISTS ONLY public."PRODUCT_FLAVOR" DROP CONSTRAINT IF EXISTS flavor_id;
ALTER TABLE IF EXISTS ONLY public."PRODUCT" DROP CONSTRAINT IF EXISTS category_id;
ALTER TABLE IF EXISTS ONLY public."PRODUCT" DROP CONSTRAINT IF EXISTS title;
ALTER TABLE IF EXISTS ONLY public."FLAVOR" DROP CONSTRAINT IF EXISTS note;
ALTER TABLE IF EXISTS ONLY public."USER" DROP CONSTRAINT IF EXISTS "USER_pkey";
ALTER TABLE IF EXISTS ONLY public."PRODUCT" DROP CONSTRAINT IF EXISTS "PRODUCT_pkey";
ALTER TABLE IF EXISTS ONLY public."PRODUCT_FLAVOR" DROP CONSTRAINT IF EXISTS "PRODUCT_FLAVOR_pkey";
ALTER TABLE IF EXISTS ONLY public."FLAVOR" DROP CONSTRAINT IF EXISTS "FLAVOR_NOTE_pkey";
ALTER TABLE IF EXISTS ONLY public."CATEGORY" DROP CONSTRAINT IF EXISTS "CATEGORY_pkey";
DROP TABLE IF EXISTS public."USER";
DROP TABLE IF EXISTS public."PRODUCT_FLAVOR";
DROP TABLE IF EXISTS public."PRODUCT";
DROP TABLE IF EXISTS public."FLAVOR";
DROP TABLE IF EXISTS public."CATEGORY";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 34111)
-- Name: CATEGORY; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CATEGORY" (
    category_id bigint NOT NULL,
    category_title character varying NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 34110)
-- Name: CATEGORY_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."CATEGORY" ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CATEGORY_category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 34119)
-- Name: FLAVOR; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FLAVOR" (
    flavor_id bigint NOT NULL,
    note character varying NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 34118)
-- Name: FLAVOR_NOTE_flavor_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."FLAVOR" ALTER COLUMN flavor_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."FLAVOR_NOTE_flavor_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 34103)
-- Name: PRODUCT; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PRODUCT" (
    product_id bigint NOT NULL,
    product_title character varying NOT NULL,
    product_description text,
    product_price numeric,
    product_stock_quantity integer,
    product_origin character varying,
    product_roast_level character varying(50),
    category_id bigint
);


--
-- TOC entry 221 (class 1259 OID 34126)
-- Name: PRODUCT_FLAVOR; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PRODUCT_FLAVOR" (
    product_id bigint NOT NULL,
    flavor_id bigint NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 34102)
-- Name: PRODUCT_product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."PRODUCT" ALTER COLUMN product_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PRODUCT_product_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 223 (class 1259 OID 34149)
-- Name: USER; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."USER" (
    user_id bigint NOT NULL,
    user_email character varying NOT NULL,
    user_name character varying NOT NULL,
    user_surname character varying,
    user_password character varying NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 34148)
-- Name: USER_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public."USER" ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."USER_user_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3625 (class 0 OID 34111)
-- Dependencies: 218
-- Data for Name: CATEGORY; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."CATEGORY" (category_id, category_title) OVERRIDING SYSTEM VALUE VALUES (1, 'Kahve');


--
-- TOC entry 3627 (class 0 OID 34119)
-- Dependencies: 220
-- Data for Name: FLAVOR; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (1, 'Çikolata');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (2, 'Fındık');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (3, 'Vanilya');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (4, 'Karamel');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (5, 'Kara Kiraz');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (6, 'Baharatlı');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (7, 'Meyve');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (8, 'Çiçek');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (9, 'Nane');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (12, 'Kavrulmuş Ekmek');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (13, 'Karışık Notlar');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (14, 'Ahududu');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (15, 'Şeker Kamışı');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (17, 'Buzlu');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (18, 'Bergamot');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (19, 'Koyu Çikolata');


--
-- TOC entry 3623 (class 0 OID 34103)
-- Dependencies: 216
-- Data for Name: PRODUCT; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (1, 'Harika Kahve', 'Özel karışım, harika lezzet!', 24.99, 50, 'Brezilya', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (2, 'Yoğun Lezzet', 'Güçlü ve yoğun aromalar.', 29.99, 30, 'Etiyopya', 'Hafif', 1);


--
-- TOC entry 3628 (class 0 OID 34126)
-- Dependencies: 221
-- Data for Name: PRODUCT_FLAVOR; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3630 (class 0 OID 34149)
-- Dependencies: 223
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 217
-- Name: CATEGORY_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CATEGORY_category_id_seq"', 1, true);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 219
-- Name: FLAVOR_NOTE_flavor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."FLAVOR_NOTE_flavor_id_seq"', 19, true);


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 215
-- Name: PRODUCT_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PRODUCT_product_id_seq"', 2, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 222
-- Name: USER_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."USER_user_id_seq"', 1, false);


--
-- TOC entry 3467 (class 2606 OID 34117)
-- Name: CATEGORY CATEGORY_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CATEGORY"
    ADD CONSTRAINT "CATEGORY_pkey" PRIMARY KEY (category_id);


--
-- TOC entry 3469 (class 2606 OID 34125)
-- Name: FLAVOR FLAVOR_NOTE_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FLAVOR"
    ADD CONSTRAINT "FLAVOR_NOTE_pkey" PRIMARY KEY (flavor_id);


--
-- TOC entry 3473 (class 2606 OID 34130)
-- Name: PRODUCT_FLAVOR PRODUCT_FLAVOR_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT_FLAVOR"
    ADD CONSTRAINT "PRODUCT_FLAVOR_pkey" PRIMARY KEY (product_id, flavor_id);


--
-- TOC entry 3463 (class 2606 OID 34107)
-- Name: PRODUCT PRODUCT_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT "PRODUCT_pkey" PRIMARY KEY (product_id);


--
-- TOC entry 3475 (class 2606 OID 34155)
-- Name: USER USER_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 3471 (class 2606 OID 34147)
-- Name: FLAVOR note; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FLAVOR"
    ADD CONSTRAINT note UNIQUE (note);


--
-- TOC entry 3465 (class 2606 OID 34157)
-- Name: PRODUCT title; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT title UNIQUE (product_title);


--
-- TOC entry 3476 (class 2606 OID 34141)
-- Name: PRODUCT category_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public."CATEGORY"(category_id) NOT VALID;


--
-- TOC entry 3477 (class 2606 OID 34136)
-- Name: PRODUCT_FLAVOR flavor_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT_FLAVOR"
    ADD CONSTRAINT flavor_id FOREIGN KEY (flavor_id) REFERENCES public."FLAVOR"(flavor_id) NOT VALID;


--
-- TOC entry 3478 (class 2606 OID 34131)
-- Name: PRODUCT_FLAVOR product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT_FLAVOR"
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public."PRODUCT"(product_id) NOT VALID;


-- Completed on 2024-05-25 00:53:30 +03

--
-- PostgreSQL database dump complete
--

