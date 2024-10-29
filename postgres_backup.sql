--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.13 (Ubuntu 14.13-0ubuntu0.22.04.1)

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

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: slanconcept
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'INPROGRESS',
    'SHIPPED',
    'DELIVERED',
    'CANCELED'
);


ALTER TYPE public."OrderStatus" OWNER TO slanconcept;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: slanconcept
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);


ALTER TYPE public."PaymentStatus" OWNER TO slanconcept;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    approved boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Admin" OWNER TO slanconcept;

--
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: slanconcept
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Admin_id_seq" OWNER TO slanconcept;

--
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slanconcept
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- Name: BillingDetails; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."BillingDetails" (
    id text NOT NULL,
    fullname text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."BillingDetails" OWNER TO slanconcept;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "userId" integer NOT NULL,
    "billingDetailsId" text NOT NULL,
    "totalAmount" double precision NOT NULL,
    "deliveryFee" double precision NOT NULL,
    vat double precision NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO slanconcept;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    "productId" text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    price double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO slanconcept;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "orderId" text NOT NULL,
    amount double precision NOT NULL,
    "transactionRef" text NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Payment" OWNER TO slanconcept;

--
-- Name: Promotion; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."Promotion" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status text NOT NULL
);


ALTER TABLE public."Promotion" OWNER TO slanconcept;

--
-- Name: User; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "phoneNumber" text,
    "verificationToken" text,
    location text,
    "resetToken" text,
    "resetTokenExpiry" timestamp(3) without time zone
);


ALTER TABLE public."User" OWNER TO slanconcept;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: slanconcept
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO slanconcept;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slanconcept
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO slanconcept;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public.cart_items (
    id text NOT NULL,
    "productId" text NOT NULL,
    "cartId" text NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cart_items OWNER TO slanconcept;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public.carts (
    id text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.carts OWNER TO slanconcept;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO slanconcept;

--
-- Name: products; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public.products (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "mainImage" text NOT NULL,
    "galleryImages" text[],
    "regularPrice" double precision NOT NULL,
    "salePrice" double precision,
    status text NOT NULL,
    category_id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.products OWNER TO slanconcept;

--
-- Name: wishlist_products; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public.wishlist_products (
    id text NOT NULL,
    "wishlistId" text NOT NULL,
    "productId" text NOT NULL
);


ALTER TABLE public.wishlist_products OWNER TO slanconcept;

--
-- Name: wishlists; Type: TABLE; Schema: public; Owner: slanconcept
--

CREATE TABLE public.wishlists (
    id text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.wishlists OWNER TO slanconcept;

--
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."Admin" (id, email, password, "createdAt", "updatedAt", approved) FROM stdin;
6	slanconcept@gmail.com	$2a$10$tiP31pHPRHIr.zZFc6no6uY5g2MO0ymFrcAL4PoD68uRBq/soJMv2	2024-10-22 22:06:24.69	2024-10-23 10:50:57.98	t
\.


--
-- Data for Name: BillingDetails; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."BillingDetails" (id, fullname, email, phone, address, city, state, "createdAt", "userId") FROM stdin;
1a892ee3-4ea2-414a-b915-8a7c3f08e9c3	James Fallow	chimakingsley216@gmail.com	+2349036381640	10 Udensi	Afikpo	Ebonyi	2024-10-27 03:38:59.761	3
499d486c-6f07-47df-a385-b59fe4997907	James Fallow	chimakingsley216@gmail.com	+2349036381640	10 Udensi	Afikpo	Ebonyi	2024-10-27 04:27:36.868	3
798a5ec0-8951-4ff8-b257-8ed543f845b7	James Fallow	chiemelafavour9@gmail.com	+2349036381640	10 Udensi	Onueke	Ebonyi	2024-10-27 04:59:03.652	3
969f8dcc-40d3-49da-a436-6a3d05e3b430	James Fallow	slanconcept@gmail.com	+2349036381640	10 Udensi			2024-10-27 05:10:19.128	3
15d7b5da-55ad-4c37-b0b9-a8776865de85	James Fallow	slanconcept@gmail.com	+2349036381640	10 Udensi	Ohaozara	Ebonyi	2024-10-27 05:13:25.936	3
8f79101e-2e51-4463-b77c-db23096aab0b	James Fallow	slanconcept@gmail.com	+2349036381640	10 Udensi	Nkalagu	Ebonyi	2024-10-27 05:36:34.278	3
cd749218-7cc9-45b4-9277-f680c83e84bf	James Fallow	spiffyzainab@gmail.com	+2349036381640	10 Udensi	Uburu	Ebonyi	2024-10-27 18:00:31.686	3
623de16f-0ebf-49a8-8fb0-9f41f4503888	James Fallow	slanconcept@gmail.com	+2349036381640	10 Udensi	Afikpo	Ebonyi	2024-10-27 18:48:52.25	3
476cda80-47c2-4f1b-8272-82b46acbed7d	James Fallow	chiemelafavour09@gmail.com	+2349036381640	10 Udensi	Onueke	Ebonyi	2024-10-27 19:29:13.508	3
bf72bbcc-28e1-4793-b7cd-5930bc7b181f	James Fallow	slanconcept@gmail.com	+2349036381640	10 Udensi	Afikpo	Ebonyi	2024-10-27 20:55:22.478	3
adfbbdf4-9bb0-41fe-b4f9-3cfbaedffccb	James Fallow	slanconcept@gmail.com	+2349036381640	10 Udensi	Onueke	Ebonyi	2024-10-28 09:07:15.533	3
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."Order" (id, "userId", "billingDetailsId", "totalAmount", "deliveryFee", vat, status, "createdAt", "updatedAt") FROM stdin;
b948c7cc-91cc-461b-98a7-2b2881d6a6d6	3	1a892ee3-4ea2-414a-b915-8a7c3f08e9c3	18217.75	700	367.75	PENDING	2024-10-27 03:38:59.783	2024-10-27 03:38:59.783
dc36f763-0b89-4df9-9b62-124282042b6b	3	499d486c-6f07-47df-a385-b59fe4997907	2385.25	700	35.25	PENDING	2024-10-27 04:27:36.89	2024-10-27 04:27:36.89
bc3434dc-79ed-4ca7-b779-fae83d34d807	3	798a5ec0-8951-4ff8-b257-8ed543f845b7	6849.75	650	199.75	PENDING	2024-10-27 04:59:03.666	2024-10-27 04:59:03.666
bf62af6e-58ec-4cf3-99af-56e3baa0e324	3	969f8dcc-40d3-49da-a436-6a3d05e3b430	6190	0	190	PENDING	2024-10-27 05:10:19.147	2024-10-27 05:10:19.147
857375e3-c6d9-42ee-9b46-a83fa62a79f1	3	15d7b5da-55ad-4c37-b0b9-a8776865de85	3339.35	640	49.35	PENDING	2024-10-27 05:13:25.947	2024-10-27 05:13:25.947
3d9efcb2-33b6-44ff-a7f4-401289b677da	3	8f79101e-2e51-4463-b77c-db23096aab0b	3176.95	480	46.95	PENDING	2024-10-27 05:36:34.295	2024-10-27 05:36:34.295
ce2d4117-4617-4df1-b735-2b994b3da6ee	3	cd749218-7cc9-45b4-9277-f680c83e84bf	1999.55	720	29.55	PENDING	2024-10-27 18:00:31.704	2024-10-27 18:00:31.704
5dd4a5ae-dcfd-45a8-9a51-4e70f872db26	3	623de16f-0ebf-49a8-8fb0-9f41f4503888	2283.75	700	33.75	PENDING	2024-10-27 18:48:52.264	2024-10-27 18:48:52.264
c4629f18-2e39-4741-b9bb-62480b8a29f3	3	476cda80-47c2-4f1b-8272-82b46acbed7d	6058.05	650	188.05	PAID	2024-10-27 19:29:13.53	2024-10-27 19:34:47.966
5a8596a5-b54d-4a31-bdf2-3011c8219fcf	3	bf72bbcc-28e1-4793-b7cd-5930bc7b181f	153568	700	2368	PAID	2024-10-27 20:55:22.502	2024-10-27 21:46:30.783
ffe6c639-2175-4655-93f6-c6caed8462ab	3	adfbbdf4-9bb0-41fe-b4f9-3cfbaedffccb	6140.75	3500	90.75	PAID	2024-10-28 09:07:15.545	2024-10-28 09:08:06.929
fac985d6-cb62-490a-af72-7c5710f5cdef	3	adfbbdf4-9bb0-41fe-b4f9-3cfbaedffccb	11417.25	3500	267.25	PAID	2024-10-28 14:20:50.059	2024-10-28 16:40:18.131
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, price, "createdAt") FROM stdin;
4392c90e-bd3c-4c97-9aa5-cb59ecc09bfc	b948c7cc-91cc-461b-98a7-2b2881d6a6d6	e87284b1-84d0-4de2-96a9-2a2bf5a67105	1	1650	2024-10-27 03:38:59.783
f2043ecd-99d4-424d-87b6-300b8f5df9d1	b948c7cc-91cc-461b-98a7-2b2881d6a6d6	ce292b64-05ea-4373-95f9-b9e981aaa043	1	8500	2024-10-27 03:38:59.783
988e47b7-351d-48aa-b61e-22ff32228c9f	b948c7cc-91cc-461b-98a7-2b2881d6a6d6	9fcb21eb-6a79-4855-8d24-716429bbfc88	1	6000	2024-10-27 03:38:59.783
c1218d01-154d-43bb-be84-292211dcf800	dc36f763-0b89-4df9-9b62-124282042b6b	fa8f384f-fe09-490b-aa96-67afe89149b8	1	650	2024-10-27 04:27:36.89
6204008c-394b-44ba-a3f2-402903a17530	bc3434dc-79ed-4ca7-b779-fae83d34d807	f88dee16-d719-443c-8f5f-9111f16dd16d	1	5000	2024-10-27 04:59:03.666
8645d14f-ece0-44fd-b56f-eee617555293	bf62af6e-58ec-4cf3-99af-56e3baa0e324	f88dee16-d719-443c-8f5f-9111f16dd16d	1	5000	2024-10-27 05:10:19.147
cffc3bd9-6af1-42da-986a-8bcc5120433f	857375e3-c6d9-42ee-9b46-a83fa62a79f1	e87284b1-84d0-4de2-96a9-2a2bf5a67105	1	1650	2024-10-27 05:13:25.947
df7088a7-fe1a-4678-a3ee-c422bba9dcb4	3d9efcb2-33b6-44ff-a7f4-401289b677da	e87284b1-84d0-4de2-96a9-2a2bf5a67105	1	1650	2024-10-27 05:36:34.295
304f1dfb-972f-4305-a69c-c51e27426430	ce2d4117-4617-4df1-b735-2b994b3da6ee	be0da2e0-d4d2-4955-b90f-078ba252630b	1	250	2024-10-27 18:00:31.704
8db1f529-b742-4a39-8bd7-e83a28694b76	5dd4a5ae-dcfd-45a8-9a51-4e70f872db26	c9103d48-909a-4296-91a2-3212d56057a5	1	550	2024-10-27 18:48:52.264
2ba3326d-097e-4bdf-b272-e07946a1a20e	c4629f18-2e39-4741-b9bb-62480b8a29f3	9f5787af-07f9-41cd-9cf1-24c1c3a270e3	1	1100	2024-10-27 19:29:13.53
95d03984-7945-4cd0-a496-678d3f20c6ba	c4629f18-2e39-4741-b9bb-62480b8a29f3	4569252d-a5e1-4137-ae42-749c3b67255c	1	1200	2024-10-27 19:29:13.53
6f7a5aee-06c0-49b8-8c16-588c59f3bf0c	c4629f18-2e39-4741-b9bb-62480b8a29f3	baa8d36e-cb7a-4bce-87e6-1c7074947902	1	1920	2024-10-27 19:29:13.53
a9ef9b29-bf05-4de2-91af-067e38ee3ee4	5a8596a5-b54d-4a31-bdf2-3011c8219fcf	625d0382-2d8b-444e-8d3a-2ef1f62b8e32	1	149500	2024-10-27 20:55:22.502
67ee7216-315f-4c44-95ea-e0c9712c2e47	ffe6c639-2175-4655-93f6-c6caed8462ab	27198416-c682-405e-907d-fb60e78e2c2c	1	1550	2024-10-28 09:07:15.545
3a6bc29b-4ef5-43ac-8e86-2582e49b8764	fac985d6-cb62-490a-af72-7c5710f5cdef	e87284b1-84d0-4de2-96a9-2a2bf5a67105	1	1650	2024-10-28 14:20:50.059
644930f5-3a1e-4f34-85a7-ca0a1c0aaac1	fac985d6-cb62-490a-af72-7c5710f5cdef	f88dee16-d719-443c-8f5f-9111f16dd16d	1	5000	2024-10-28 14:20:50.059
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."Payment" (id, "orderId", amount, "transactionRef", status, "createdAt") FROM stdin;
\.


--
-- Data for Name: Promotion; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."Promotion" (id, title, description, "startDate", "endDate", "imageUrl", "createdAt", "updatedAt", status) FROM stdin;
264ed6a2-9fee-4153-9755-a2918999f29c	Fresh Fruits & Vegetables	Get only the best from us at a good price	2024-10-09 00:00:00	2024-10-13 00:00:00	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728508756/promotions/di6ku2ynfib5s4oanh1m.png	2024-10-09 21:19:17.051	2024-10-09 21:19:17.051	active
4f20e839-98db-4ba7-b6bc-a7885da3c229	Bulk Purchase	Make order for bulk items at your convenience	2024-10-09 00:00:00	2024-10-18 00:00:00	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728508842/promotions/zvuyskzprlrk3iqbdced.png	2024-10-09 21:20:43.96	2024-10-09 21:20:43.96	active
1497158c-2fe5-45fd-bdd8-21eab3ef445b	Footwears	All Kinds of foot wears	2024-10-09 00:00:00	2024-10-18 00:00:00	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728508906/promotions/bzepynhfl6jlbifyottr.png	2024-10-09 21:21:46.905	2024-10-09 21:21:46.905	active
f580ff04-19b4-4f0d-ad30-8ce08f7d4915	Enhance Your Home & Lifestyle	Description for Enhance Your Home & Lifestyle	2024-10-10 00:00:00	2024-10-31 00:00:00	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728508681/promotions/ygzwuqo0s9x2ndlvwagy.png	2024-10-09 21:18:02.006	2024-10-18 17:57:25.214	inactive
6d4b13b0-9a12-40a9-b229-42fd028402df	food stuffs	rfjsdhnviosdjhn	2024-10-09 00:00:00	2024-10-25 00:00:00	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509000/promotions/li95uo6o6yzqt4haq3ev.png	2024-10-09 21:23:22.468	2024-10-23 14:20:55.037	active
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public."User" (id, "firstName", "lastName", email, password, "createdAt", "updatedAt", "emailVerified", "phoneNumber", "verificationToken", location, "resetToken", "resetTokenExpiry") FROM stdin;
2	Nnenna	Immaculate	immaonale@gmail.com	$2a$10$EGx7EAMy287Y.N0/amUBAebhsL0drSoOpdc6QClrwuzQNcxqSe4JO	2024-10-10 13:56:44.924	2024-10-10 14:22:09.119	t	+2348032674106	\N	\N	\N	\N
3	James	Robin	slanconcept@gmail.com	$2a$10$ncv/zNdku7WNgLI6waCjjuLwC1Ba3oNH1/Eg2xsSNlWzKYJDbU2Ga	2024-10-10 18:08:08.602	2024-10-10 18:13:01.492	t	+2349036381640	\N	11, Alan Avenue, Ikeja Lagos	\N	\N
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c795d5c6-d17a-4bf5-8fe2-6bd9f333a519	b65cefb16edbbae8c7685b93bcaea6864800e7383eecd3cbb407aea477f39159	2024-10-18 23:27:35.613389+01	20241018222735_update_cart_model	\N	\N	2024-10-18 23:27:35.495686+01	1
c26ef5b0-aac2-4e9b-953c-a3014ae63361	0c8cff1ee99b2478488abeb1fdceae251d6caa3c20a1eab54bd2aeefbf5eaeed	2024-10-08 15:16:44.743309+01	20240924233622_update_product_category	\N	\N	2024-10-08 15:16:44.625377+01	1
3fdb8e76-6e0b-4173-8066-42c1590ae1fc	df8d72532f23234d0ce9dc34a1e3eb3d9049fa0afe322622432761548e59f849	2024-10-08 15:16:44.827543+01	20240927064621_promotion	\N	\N	2024-10-08 15:16:44.75336+01	1
37303587-44d0-4c48-8e1b-26c26ef82cf9	431b4814223cd0446073e46238e3602c2a9df2c467f52aa51c1e7e329f9607d4	2024-10-08 15:16:44.9878+01	20241006230350_user	\N	\N	2024-10-08 15:16:44.832312+01	1
edc1f83e-bebc-4952-8859-b6d5acaa602f	1829038c7f1bf3df133393d9944fb2ec679f7569cbbdac3ef8064bc363206ce5	2024-10-21 13:45:31.430299+01	20241021124531_update_admin_model	\N	\N	2024-10-21 13:45:31.383965+01	1
574b4dab-6b3e-49f8-84a4-a57bc8f97dbd	c51cc539f977f13fbce4aa3ece31e5934d1f40e7c61fd641322edb1005eb2389	2024-10-08 15:16:45.025713+01	20241006231800_add_user_verification	\N	\N	2024-10-08 15:16:44.997805+01	1
a7978449-f455-4d21-bef7-58d4822d0d75	a3ee11e77736da0ae3caedde4ac3189ff88c3850440c99a859c2cc888cbd4f41	2024-10-08 15:16:45.097532+01	20241007115957_promotion	\N	\N	2024-10-08 15:16:45.035944+01	1
b96c4398-5479-4759-88b4-f5f598e9a934	b4b55fab5cc71075b7f32d79556f3da9639a47155dd264643949c7e8860511b2	2024-10-08 15:16:45.124978+01	20241007123422_promotion	\N	\N	2024-10-08 15:16:45.106166+01	1
8211861c-8ca1-47f8-ae01-4c09b30eb8ee	8f7994107d32555b0a5fa39060c092fae498db2c7624848cb3d91584a1b756a6	2024-10-26 09:31:02.226985+01	20241026083101_add_order_and_payment_models	\N	\N	2024-10-26 09:31:01.978714+01	1
ef13d0ce-6cd5-4a90-9192-845d44a54613	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2024-10-08 15:16:45.14731+01	20241007123541_new_promotion	\N	\N	2024-10-08 15:16:45.133486+01	1
5f3ce21a-aeea-4d78-adc6-f97950a0ef15	2b133c8add50fd235bbe0352e065356d55fa2f32ee81d60d6e2bf23f9fa9ab3d	2024-10-08 15:16:45.178976+01	20241008141559_categories	\N	\N	2024-10-08 15:16:45.156043+01	1
a3192adc-1b5d-451f-a0a2-a08276f30ed9	122d743a0403e77ad7e0ed9447f5b8826f2fbdbc55612d936eff004dd13c2eec	2024-10-08 15:17:23.896221+01	20241008141707_category	\N	\N	2024-10-08 15:17:23.873672+01	1
800fa944-a7b4-49f0-9254-aafed1b70c47	94e465d33db2b8d743fd4fc6990ff39a27dc61f70b0a08b4cbfb638e71196789	2024-10-27 04:33:45.297176+01	20241027033345_add_user_id_to_billing_details	\N	\N	2024-10-27 04:33:45.226229+01	1
dfcb6771-4fb6-46f1-993c-d5cbddf148b4	a7a4cd41fd861d0aa0c8606e434ece55c0335e3aa025bf05ee4143d9390345da	2024-10-08 23:47:06.487218+01	20241008224706_add_location_to_user	\N	\N	2024-10-08 23:47:06.449873+01	1
f722e6a1-c2aa-43f1-be2b-db1567e2803a	d41c5c63d1d905bf2ac2374b1ad2624b92da72176d304db5ce3731601e7b84b7	2024-10-09 10:04:53.593985+01	20241009090453_add_reset_token_fields	\N	\N	2024-10-09 10:04:53.543848+01	1
f75d4437-4fbb-4aed-9740-7c945e7bead2	cdf6ac0cc0c8e91607e642c002bc1aea9065477ade1c928536886f4c0628b185	2024-10-17 18:44:38.683554+01	20241017174438_add_wishlist	\N	\N	2024-10-17 18:44:38.47796+01	1
b507de79-cad7-4059-87d1-a1827debee13	a0ff67ad236058da8f5fbe3ba27c74461ae8f18e9bb6dca5ff1fe4641a6e1870	2024-10-18 22:16:35.030619+01	20241018211634_create_cart_model	\N	\N	2024-10-18 22:16:34.785393+01	1
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public.cart_items (id, "productId", "cartId", quantity, "createdAt") FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public.carts (id, "userId", "createdAt", "updatedAt") FROM stdin;
650054a7-af42-4975-9428-896739c320b8	3	2024-10-21 11:52:05.726	2024-10-21 11:52:05.726
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
39b92319-e6f6-43a8-8733-472016fc8136	Drinks	2024-10-08 19:56:29.576	2024-10-08 19:56:29.576
fec1fcf7-4c9c-4a6c-837b-fb9e96488474	Fresh Food	2024-10-08 19:56:34.034	2024-10-08 19:57:28.567
551e1cd3-1535-4e7b-8ebd-aebfedc2dae2	Food	2024-10-09 14:32:06.976	2024-10-09 14:32:06.976
218b94ed-18cb-4e1a-b078-ac2df132c020	Daily Needs	2024-10-09 14:44:56.908	2024-10-09 14:44:56.908
1ce12287-b61c-4c7c-bb8c-868c91547aca	Local Food	2024-10-09 14:53:58.462	2024-10-09 14:53:58.462
1fc2fa40-0d03-45d0-be15-5854cbc95c54	Beverages	2024-10-09 15:05:19.114	2024-10-09 15:05:19.114
0b81939f-7dd2-4246-84ae-772a4d8ded34	HouseHold & Toiletries	2024-10-09 15:13:37.989	2024-10-09 15:13:37.989
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public.products (id, title, description, "mainImage", "galleryImages", "regularPrice", "salePrice", status, category_id, "createdAt", "updatedAt") FROM stdin;
625d0382-2d8b-444e-8d3a-2ef1f62b8e32	RIce	A bag of Rice...	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728484339/products/main_images/th72tvhvityi469v6rkv.png	{}	150000	149500	on_sale	551e1cd3-1535-4e7b-8ebd-aebfedc2dae2	2024-10-09 14:32:21.56	2024-10-09 14:32:21.56
27198416-c682-405e-907d-fb60e78e2c2c	Tomatoes 1 kg	Description for Tomatoes 1 kg	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728484778/products/main_images/kkk90jqm8kz9ofzzcmxz.png	{}	1600	1550	on_sale	fec1fcf7-4c9c-4a6c-837b-fb9e96488474	2024-10-09 14:39:39.528	2024-10-09 14:39:39.528
761018f5-7e45-4d7b-a2e4-fb68bc7a56cb	Fresh Ugu / Pumpkin Leaves -  1 Bunch	Description for Fresh Ugu / Pumpkin Leaves -  1 Bunch (Local Market)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728484862/products/main_images/dy4rkfaupsdb3rlz7gp0.png	{}	300	250	on_sale	fec1fcf7-4c9c-4a6c-837b-fb9e96488474	2024-10-09 14:41:03.305	2024-10-09 14:41:03.305
e87284b1-84d0-4de2-96a9-2a2bf5a67105	Fresh Okra	Description for Fresh Okra- Half Paint, About 1.28kg (Local market)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728485009/products/main_images/a9btho4m5nxd9cvg4eto.png	{}	1700	1650	on_sale	fec1fcf7-4c9c-4a6c-837b-fb9e96488474	2024-10-09 14:43:30.999	2024-10-09 14:43:30.999
3372068e-5756-4b92-b524-62ebd6a802d9	Kellogg's Coco Pops 400 g 	Description for Kellogg's Coco Pops 400 g (NG)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728485102/products/main_images/yn8jaegov2o9zshlcw4q.png	{}	2400	2340	on_sale	218b94ed-18cb-4e1a-b078-ac2df132c020	2024-10-09 14:45:03.974	2024-10-09 14:45:03.974
b457e17f-97bd-4332-9208-e390d8f6ced4	Air Wick Air Freshener 300 ml	Description for Air Wick Air Freshener 300 ml	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728485381/products/main_images/vs2acixe7wfhcocfqquh.png	{}	960	0	on_sale	218b94ed-18cb-4e1a-b078-ac2df132c020	2024-10-09 14:49:41.56	2024-10-09 14:49:41.56
fa8f384f-fe09-490b-aa96-67afe89149b8	Oral B Toothpaste 130g	Description for Oral B Toothpaste 130g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728485477/products/main_images/igyn2ofki6fcmsxcjy1c.png	{}	700	650	on_sale	218b94ed-18cb-4e1a-b078-ac2df132c020	2024-10-09 14:51:18.501	2024-10-09 14:51:18.501
5f588f94-3a24-4258-8757-f1e159100d49	Dettol Anti-Bacterial Soap  Original 60 g	Description for Dettol Anti-Bacterial Soap \r\nOriginal 60 g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728485551/products/main_images/hbddzc7a8qm7vwp7k993.png	{}	400	360	on_sale	218b94ed-18cb-4e1a-b078-ac2df132c020	2024-10-09 14:52:31.993	2024-10-09 14:52:31.993
558a8eb9-eec6-4ec2-9981-c3960c553dd6	Egusi Peeled - Blended 170 g	Description for Egusi Peeled - Blended 170 g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728485642/products/main_images/g5xbbovflr7nagoab3bp.png	{}	400	380	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 14:54:03.31	2024-10-09 14:54:03.31
be0da2e0-d4d2-4955-b90f-078ba252630b	Fresh Bitter Leaf - Cut Up & Washed	Description for Bitter Leaf - Cut Up & Washed	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486002/products/main_images/e8bdx659umnpesqazcao.png	{}	300	250	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 15:00:03.565	2024-10-09 15:00:03.565
1444e45d-0ad8-45f5-bafa-1209b81f4185	Crayfish - 170 g	Description for Crayfish - Whole 170 g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486088/products/main_images/umckj3ml4kvddrgbe2xc.png	{}	1250	1220	sold_out	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 15:01:29.767	2024-10-09 15:01:29.767
c3089199-32da-4a70-923e-1d407fb585a0	Garri White (1 paint)	Description for Garri White (1 paint)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486146/products/main_images/hgx2jmkilybugpbws85h.png	{}	1250	1200	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 15:02:27.58	2024-10-09 15:02:27.58
4d8ab4e8-5166-4b5d-965b-c193febab975	Malta Guinness Can 33 cl	Description for Malta Guinness Can 33 cl x24	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486224/products/main_images/cs4omgc7vccf00vhg77a.png	{}	700	0	on_sale	39b92319-e6f6-43a8-8733-472016fc8136	2024-10-09 15:03:45.041	2024-10-09 15:03:45.041
2469c4f0-7b96-4cf5-b4bc-fc0a14fde507	Peak Instant Full Cream Milk Powder Sachet 850 g	Description for Peak Instant Full Cream Milk\r\nPowder Sachet 850 g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486327/products/main_images/mdo6w8svovy3bcvrfwtj.png	{}	1750	1700	sold_out	1fc2fa40-0d03-45d0-be15-5854cbc95c54	2024-10-09 15:05:29.539	2024-10-09 15:05:29.539
cc6c19ee-ddae-4942-9766-c7866764e1e5	Topcafe 3 in 1 Creamy White Coffee Mix 30g	Descripton for Topcafe 3 in 1 Creamy White Coffee Mix 30 g 	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486455/products/main_images/woy1mrqxgu839zmawmy5.png	{}	250	200	on_sale	1fc2fa40-0d03-45d0-be15-5854cbc95c54	2024-10-09 15:07:36.153	2024-10-09 15:07:36.153
8c3aa6bf-955c-4ebb-a70b-74cabd49f45a	Monster Energy Can Drink 40 cl	Description for Monster Energy Can Drink 40 cl	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486518/products/main_images/niczkn0lierrqolmr8aj.png	{}	900	850	sold_out	39b92319-e6f6-43a8-8733-472016fc8136	2024-10-09 15:08:39.259	2024-10-09 15:08:39.259
722d43bf-0cfe-41f6-bb50-0b054bcd8eba	Nivea Anti-Perspirant Deodorant Roll On Dry Comfort 50 ml	Description on Nivea Anti-Perspirant Deodorant\r\nRoll On Dry Comfort 50 ml	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728486823/products/main_images/kcumrgswkevgp2ehbc7q.png	{}	1650	1600	on_sale	0b81939f-7dd2-4246-84ae-772a4d8ded34	2024-10-09 15:13:44.831	2024-10-09 15:13:44.831
ce292b64-05ea-4373-95f9-b9e981aaa043	Frozen Chicken Laps Carton	Description for Frozen Chicken Laps Carton (Local Market)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488122/products/main_images/akrvs7qakcvwermevdhm.png	{}	9000	8500	on_sale	fec1fcf7-4c9c-4a6c-837b-fb9e96488474	2024-10-09 15:35:23.962	2024-10-09 15:35:23.962
d2e30ec4-7b3f-4c0e-b982-b709771903fd	Honey Beans - 3.1kg (1 paint)	Description for Honey Beans - 3.1kg (1 paint)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488225/products/main_images/rasyfpbsq5m4svblhdbe.png	{}	8000	7800	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 15:37:06.704	2024-10-09 15:37:06.704
dd666c7c-3ca4-49af-b10b-985b90917a5d	Fresh Tomatoes - Full basket	Description for Fresh Tomatoes - Full basket (Local Market)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488287/products/main_images/eevgpnhrhylcweo1ppmg.png	{}	90000	88500	on_sale	fec1fcf7-4c9c-4a6c-837b-fb9e96488474	2024-10-09 15:38:08.24	2024-10-09 15:38:08.24
8aeb4417-386a-4ab5-a59b-7617701436e5	Ponmo - Fresh	Description for Ponmo - Smoked (Thick) x1	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488383/products/main_images/pkywhesshxcvh9wjryxy.png	{}	500	448	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 15:39:44.181	2024-10-09 15:39:44.181
4d85a510-ee20-468d-b7b4-a6e76423872f	Vaseline Blue Seal Pure Petroleum Jelly Original 225 ml	Description for Vaseline Blue Seal Pure Petroleum Jelly Original 225 ml (NG)	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488459/products/main_images/tdck2fekp65az3x2w1jp.png	{}	1200	1150	on_sale	0b81939f-7dd2-4246-84ae-772a4d8ded34	2024-10-09 15:41:00.305	2024-10-09 15:41:00.305
f88dee16-d719-443c-8f5f-9111f16dd16d	Nivea Lotion Nourishing Cocoa 400 ml	Description for Nivea Lotion Nourishing Cocoa 400 ml	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488515/products/main_images/knqxatizczl5tax5hyzq.png	{}	5200	5000	on_sale	0b81939f-7dd2-4246-84ae-772a4d8ded34	2024-10-09 15:41:56.558	2024-10-09 15:41:56.558
9f5787af-07f9-41cd-9cf1-24c1c3a270e3	Crown Premium Spaghetti	Description for Crown Premium Spaghetti	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488591/products/main_images/lqchhyqvcz7f8f5rfmbe.png	{}	1200	1100	on_sale	551e1cd3-1535-4e7b-8ebd-aebfedc2dae2	2024-10-09 15:43:12.752	2024-10-09 15:43:12.752
a4f86de6-3cbc-4382-87d9-9f11c051217f	Potato - Sweet	Description for Potato - Sweet	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488649/products/main_images/nkoctiasmc2b5jujopau.png	{}	1000	900	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 15:44:10.748	2024-10-09 15:44:10.748
5dea2b44-992a-4b5b-99b0-e45e51fe9283	Irish Spring Soap Icy Blast 100 g	Description for Irish Spring Soap Icy Blast 100 g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488710/products/main_images/d5c3zro6wkpsa3lguhan.png	{}	700	650	on_sale	0b81939f-7dd2-4246-84ae-772a4d8ded34	2024-10-09 15:45:10.589	2024-10-09 15:45:10.589
4569252d-a5e1-4137-ae42-749c3b67255c	Titus Sardines	Descriptoin for Titus Sardines 125 g	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728488837/products/main_images/h7pndllrprehy8gg921x.png	{}	1250	1200	on_sale	551e1cd3-1535-4e7b-8ebd-aebfedc2dae2	2024-10-09 15:47:19.065	2024-10-09 15:47:19.065
c9103d48-909a-4296-91a2-3212d56057a5	Panla Fish - Smoked	Description for Panla Fish - Smoked	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509113/products/main_images/ykrqyeh7g75nzfmqhhms.png	{}	600	550	on_sale	1ce12287-b61c-4c7c-bb8c-868c91547aca	2024-10-09 21:25:14.099	2024-10-09 21:25:14.099
3d27f27a-7965-4944-a721-3f8f47bb5e87	Butter Bread	Description for Butter Bread	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509167/products/main_images/ikwnpu7umlznuqlokybc.png	{}	1950	1850	on_sale	551e1cd3-1535-4e7b-8ebd-aebfedc2dae2	2024-10-09 21:26:08.791	2024-10-09 21:26:08.791
9fcb21eb-6a79-4855-8d24-716429bbfc88	Eggs - Crate	Description for Eggs x30	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509249/products/main_images/vq3qgazwzrz9lhdjuimo.png	{}	6100	6000	sold_out	551e1cd3-1535-4e7b-8ebd-aebfedc2dae2	2024-10-09 21:27:30.013	2024-10-09 21:27:30.013
baa8d36e-cb7a-4bce-87e6-1c7074947902	Chivita active drink - 1 litre	Peep the Chivita Active juice which comes in blends of vegetable and fruits and contains Vitamin C, an essential Vitamin to body growth.	https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509340/products/main_images/aoc4idsuuihdrlvkaekq.png	{https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509343/products/gallery_images/pcjmrqrgdztqtnog1owo.png,https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509343/products/gallery_images/jl64yindnlyrlgzh1ymm.png,https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509344/products/gallery_images/e6vewvzcckgtnc97xkqq.png,https://res.cloudinary.com/dngy8q2fj/image/upload/v1728509343/products/gallery_images/wz691mnj8xwpbldhp1i8.png}	2000	1920	on_sale	39b92319-e6f6-43a8-8733-472016fc8136	2024-10-09 21:29:04.932	2024-10-09 21:29:04.932
a89fe38a-205b-4f9e-b168-b08879f85e51	Test product	This is just a test description	https://res.cloudinary.com/dngy8q2fj/image/upload/v1730109518/products/main_images/boudpoyoml6zwmx4fych.png	{}	1750	1700	on_sale	fec1fcf7-4c9c-4a6c-837b-fb9e96488474	2024-10-28 09:58:39.144	2024-10-28 09:58:39.144
\.


--
-- Data for Name: wishlist_products; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public.wishlist_products (id, "wishlistId", "productId") FROM stdin;
\.


--
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: slanconcept
--

COPY public.wishlists (id, "userId", "createdAt", "updatedAt") FROM stdin;
e6da57eb-e867-4cfa-8645-41e3f11d6bf5	3	2024-10-18 00:10:14.752	2024-10-18 00:10:14.752
\.


--
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slanconcept
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 6, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slanconcept
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: BillingDetails BillingDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."BillingDetails"
    ADD CONSTRAINT "BillingDetails_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: Promotion Promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Promotion"
    ADD CONSTRAINT "Promotion_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: wishlist_products wishlist_products_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.wishlist_products
    ADD CONSTRAINT wishlist_products_pkey PRIMARY KEY (id);


--
-- Name: wishlists wishlists_pkey; Type: CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT wishlists_pkey PRIMARY KEY (id);


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: Payment_orderId_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "Payment_orderId_key" ON public."Payment" USING btree ("orderId");


--
-- Name: Payment_transactionRef_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "Payment_transactionRef_key" ON public."Payment" USING btree ("transactionRef");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: cart_items_cartId_productId_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "cart_items_cartId_productId_key" ON public.cart_items USING btree ("cartId", "productId");


--
-- Name: carts_userId_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "carts_userId_key" ON public.carts USING btree ("userId");


--
-- Name: categories_name_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);


--
-- Name: wishlist_products_wishlistId_productId_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "wishlist_products_wishlistId_productId_key" ON public.wishlist_products USING btree ("wishlistId", "productId");


--
-- Name: wishlists_userId_key; Type: INDEX; Schema: public; Owner: slanconcept
--

CREATE UNIQUE INDEX "wishlists_userId_key" ON public.wishlists USING btree ("userId");


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_billingDetailsId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_billingDetailsId_fkey" FOREIGN KEY ("billingDetailsId") REFERENCES public."BillingDetails"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cart_items cart_items_cartId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cart_items cart_items_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: carts carts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: wishlist_products wishlist_products_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.wishlist_products
    ADD CONSTRAINT "wishlist_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: wishlist_products wishlist_products_wishlistId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.wishlist_products
    ADD CONSTRAINT "wishlist_products_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES public.wishlists(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: wishlists wishlists_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slanconcept
--

ALTER TABLE ONLY public.wishlists
    ADD CONSTRAINT "wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

