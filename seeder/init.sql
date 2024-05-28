--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-28 04:35:20 +03

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
ALTER TABLE IF EXISTS ONLY public."USER" DROP CONSTRAINT IF EXISTS name;
ALTER TABLE IF EXISTS ONLY public."USER" DROP CONSTRAINT IF EXISTS email;
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
-- TOC entry 215 (class 1259 OID 34167)
-- Name: CATEGORY; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CATEGORY" (
    category_id bigint NOT NULL,
    category_title character varying NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 34172)
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
-- TOC entry 217 (class 1259 OID 34173)
-- Name: FLAVOR; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."FLAVOR" (
    flavor_id bigint NOT NULL,
    note character varying NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 34178)
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
-- TOC entry 219 (class 1259 OID 34179)
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
-- TOC entry 220 (class 1259 OID 34184)
-- Name: PRODUCT_FLAVOR; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."PRODUCT_FLAVOR" (
    product_id bigint NOT NULL,
    flavor_id bigint NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 34187)
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
-- TOC entry 222 (class 1259 OID 34188)
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
-- TOC entry 223 (class 1259 OID 34193)
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
-- TOC entry 3626 (class 0 OID 34167)
-- Dependencies: 215
-- Data for Name: CATEGORY; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."CATEGORY" (category_id, category_title) OVERRIDING SYSTEM VALUE VALUES (1, 'Kahve');


--
-- TOC entry 3628 (class 0 OID 34173)
-- Dependencies: 217
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
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (22, 'Hafif Baharatlı');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (23, 'Bal');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (24, 'Kahve');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (25, 'Mango');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (26, 'Ananas');
INSERT INTO public."FLAVOR" (flavor_id, note) OVERRIDING SYSTEM VALUE VALUES (27, 'Kakos');


--
-- TOC entry 3630 (class 0 OID 34179)
-- Dependencies: 219
-- Data for Name: PRODUCT; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (2, 'Yoğun Lezzet', 'Güçlü ve yoğun aromalar.', 29.99, 30, 'Etiyopya', 'Hafif', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (3, 'Hafif Sipariş', 'Hafif ve ferahlatıcı bir deneyim.', 19.99, 40, 'Etiyopya', 'Hafif', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (4, 'Espresso Gücü', 'Espresso severler için güçlü bir tercih.', 29.99, 25, 'İtalya', 'Orta-Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (5, 'Özel Karışım', 'Uzmanlar tarafından özel olarak hazırlanan karışım.', 34.99, 20, 'Karışık', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (6, 'Doğal Yollarla Yetiştirilmiş', 'Kimyasal gübre veya ilaç içermez.', 39.99, 15, 'Peru', 'Hafif', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (7, 'Geleneksel Türk Kahvesi', 'Türk kahvesi keyfi evinizde!', 22.99, 35, 'Türkiye', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (8, 'Vanilla Dream', 'Vanilya sevenler için rüya gibi bir kahve.', 31.99, 28, 'Madagaskar', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (9, 'Organik Karadeniz', 'Doğal ve organik, Karadeniz''in en iyisi.', 26.99, 22, 'Türkiye', 'Orta-Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (10, 'Özel Filtrasyon', 'Özel filtre yöntemiyle hazırlanmış.', 29.99, 18, 'Kenya', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (11, 'Iced Coffee', 'Soğuk kahve keyfi!', 17.99, 45, 'Kolombiya', 'Hafif', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (12, 'Kahve Çikolata Karışımı', 'İki lezzet bir arada.', 32.99, 23, 'Karışık', 'Orta-Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (13, 'Bergamot Burst', 'Bergamot aromasıyla canlanın!', 28.99, 27, 'Kosta Rika', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (14, 'Dark Delight', 'Koyu kavrulmuş bir zevk.', 36.99, 16, 'Brexit Coffee Co.', 'Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (15, 'Sürpriz Karışım', 'Her fincanda farklı bir lezzet sürprizi!', 38.99, 14, 'Dünya Geneli', 'Orta-Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (16, 'Şeker Kamışı Rüyası', 'Doğal şeker kamışı notalarıyla tatlı bir deneyim.', 30.99, 31, 'Brasil', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (17, 'Honey Hike', 'Ballı bir yolculuk!', 25.99, 29, 'Etiyopya', 'Hafif', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (18, 'Mocha Magic', 'Mocha severler için sihirli bir lezzet.', 33.99, 21, 'Gana', 'Orta-Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (19, 'Exotic Espresso', 'Espresso sevenler için egzotik bir seçenek.', 35.99, 19, 'Endonezya', 'Koyu', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (20, 'Tropikal Rüya', 'Tropikal meyve notalarıyla dolu bir rüya.', 37.99, 17, 'Kosta Rika', 'Orta', 1);
INSERT INTO public."PRODUCT" (product_id, product_title, product_description, product_price, product_stock_quantity, product_origin, product_roast_level, category_id) OVERRIDING SYSTEM VALUE VALUES (1, 'Harika Kahve', 'Özel karışım, harika lezzet!', 24.99, 50, 'Brezilya', 'Orta', 1);


--
-- TOC entry 3631 (class 0 OID 34184)
-- Dependencies: 220
-- Data for Name: PRODUCT_FLAVOR; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (1, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (1, 2);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (1, 3);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (2, 4);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (2, 5);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (2, 6);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (3, 7);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (3, 8);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (3, 9);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (4, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (4, 2);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (4, 12);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (5, 13);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (6, 7);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (6, 8);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (6, 14);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (8, 3);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (8, 4);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (8, 22);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (9, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (9, 2);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (9, 22);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (10, 7);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (10, 8);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (10, 15);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (11, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (11, 5);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (11, 17);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (12, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (12, 3);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (12, 2);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (13, 8);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (13, 18);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (13, 7);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (14, 19);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (14, 2);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (14, 12);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (15, 13);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (16, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (16, 3);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (16, 15);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (17, 7);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (17, 23);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (17, 8);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (18, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (18, 24);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (18, 4);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (19, 1);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (19, 3);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (19, 6);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (20, 25);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (20, 26);
INSERT INTO public."PRODUCT_FLAVOR" (product_id, flavor_id) VALUES (20, 27);


--
-- TOC entry 3633 (class 0 OID 34188)
-- Dependencies: 222
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."USER" (user_id, user_email, user_name, user_surname, user_password) OVERRIDING SYSTEM VALUE VALUES (1, 'user@gmail.com', 'user', NULL, '$2b$10$vytSRjO4XxbKq4Q3beGDjeQLwC8.os3waLqp5/UIDxhr/AEBPTaD.');


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 216
-- Name: CATEGORY_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CATEGORY_category_id_seq"', 1, true);


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 218
-- Name: FLAVOR_NOTE_flavor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."FLAVOR_NOTE_flavor_id_seq"', 27, true);


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 221
-- Name: PRODUCT_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PRODUCT_product_id_seq"', 20, true);


--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 223
-- Name: USER_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."USER_user_id_seq"', 2, true);


--
-- TOC entry 3463 (class 2606 OID 34195)
-- Name: CATEGORY CATEGORY_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CATEGORY"
    ADD CONSTRAINT "CATEGORY_pkey" PRIMARY KEY (category_id);


--
-- TOC entry 3465 (class 2606 OID 34197)
-- Name: FLAVOR FLAVOR_NOTE_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FLAVOR"
    ADD CONSTRAINT "FLAVOR_NOTE_pkey" PRIMARY KEY (flavor_id);


--
-- TOC entry 3473 (class 2606 OID 34199)
-- Name: PRODUCT_FLAVOR PRODUCT_FLAVOR_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT_FLAVOR"
    ADD CONSTRAINT "PRODUCT_FLAVOR_pkey" PRIMARY KEY (product_id, flavor_id);


--
-- TOC entry 3469 (class 2606 OID 34201)
-- Name: PRODUCT PRODUCT_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT "PRODUCT_pkey" PRIMARY KEY (product_id);


--
-- TOC entry 3475 (class 2606 OID 34203)
-- Name: USER USER_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 3477 (class 2606 OID 34205)
-- Name: USER email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT email UNIQUE (user_email);


--
-- TOC entry 3479 (class 2606 OID 34207)
-- Name: USER name; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT name UNIQUE (user_name);


--
-- TOC entry 3467 (class 2606 OID 34209)
-- Name: FLAVOR note; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FLAVOR"
    ADD CONSTRAINT note UNIQUE (note);


--
-- TOC entry 3471 (class 2606 OID 34211)
-- Name: PRODUCT title; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT title UNIQUE (product_title);


--
-- TOC entry 3480 (class 2606 OID 34212)
-- Name: PRODUCT category_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public."CATEGORY"(category_id) NOT VALID;


--
-- TOC entry 3481 (class 2606 OID 34217)
-- Name: PRODUCT_FLAVOR flavor_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT_FLAVOR"
    ADD CONSTRAINT flavor_id FOREIGN KEY (flavor_id) REFERENCES public."FLAVOR"(flavor_id) NOT VALID;


--
-- TOC entry 3482 (class 2606 OID 34222)
-- Name: PRODUCT_FLAVOR product_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PRODUCT_FLAVOR"
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public."PRODUCT"(product_id) NOT VALID;


-- Completed on 2024-05-28 04:35:20 +03

--
-- PostgreSQL database dump complete
--

