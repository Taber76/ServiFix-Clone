--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: servifix_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO servifix_user;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: servifix_user
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'CUSTUMER',
    'SUPPLIER'
);


ALTER TYPE public."Role" OWNER TO servifix_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: servifix_user
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


ALTER TABLE public._prisma_migrations OWNER TO servifix_user;

--
-- Name: chats; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.chats (
    id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    user1_id integer NOT NULL,
    user2_id integer NOT NULL,
    user1_photo text,
    user2_photo text,
    user1_username text,
    user2_username text,
    service_image text,
    service_title text,
    last_message text,
    service_id integer DEFAULT 0
);


ALTER TABLE public.chats OWNER TO servifix_user;

--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chats_id_seq OWNER TO servifix_user;

--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: cities; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    name text NOT NULL,
    country_id integer NOT NULL
);


ALTER TABLE public.cities OWNER TO servifix_user;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cities_id_seq OWNER TO servifix_user;

--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.countries OWNER TO servifix_user;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.countries_id_seq OWNER TO servifix_user;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sender_id integer NOT NULL,
    chat_id integer NOT NULL
);


ALTER TABLE public.messages OWNER TO servifix_user;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.messages_id_seq OWNER TO servifix_user;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: onlines; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.onlines (
    id integer NOT NULL,
    socket_id text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.onlines OWNER TO servifix_user;

--
-- Name: onlines_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.onlines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.onlines_id_seq OWNER TO servifix_user;

--
-- Name: onlines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.onlines_id_seq OWNED BY public.onlines.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    rating double precision NOT NULL,
    comment text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    user_id integer NOT NULL,
    service_id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    by text,
    title text
);


ALTER TABLE public.reviews OWNER TO servifix_user;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO servifix_user;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: service_types; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.service_types (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    url_image text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.service_types OWNER TO servifix_user;

--
-- Name: service_types_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.service_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_types_id_seq OWNER TO servifix_user;

--
-- Name: service_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.service_types_id_seq OWNED BY public.service_types.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.services (
    id integer NOT NULL,
    description text NOT NULL,
    hourly_price double precision,
    rating double precision DEFAULT 0 NOT NULL,
    times_hired double precision DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    user_id integer NOT NULL,
    service_type_id integer NOT NULL,
    active boolean DEFAULT true NOT NULL,
    shown boolean DEFAULT true NOT NULL,
    city_id integer DEFAULT 1 NOT NULL,
    country_id integer DEFAULT 1 NOT NULL,
    num_reviews double precision DEFAULT 0 NOT NULL,
    url_image text,
    currency text DEFAULT 'USD'::text NOT NULL,
    title text NOT NULL,
    username text NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.services OWNER TO servifix_user;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.services_id_seq OWNER TO servifix_user;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: servifix_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    email text NOT NULL,
    role public."Role" DEFAULT 'SUPPLIER'::public."Role" NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    description text,
    personal_id text,
    phone text,
    photo text,
    rating double precision,
    key text NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    password_reset_key text
);


ALTER TABLE public.users OWNER TO servifix_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: servifix_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO servifix_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: servifix_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: onlines id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.onlines ALTER COLUMN id SET DEFAULT nextval('public.onlines_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: service_types id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.service_types ALTER COLUMN id SET DEFAULT nextval('public.service_types_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ee25d8ab-1054-4a69-8e2c-5f0e13536863	9e79b48884f380c4e0ab2f032aa6f04df1905b5ce822422a45a232d4d93b1184	2024-05-31 12:39:07.574725+00	20240531123905_add_chat_tables	\N	\N	2024-05-31 12:39:06.591035+00	1
8f3430ec-305a-4f0e-af83-99cb06f137ef	b5dcbc7312fed5d89e26a200589a6a887075a409887ec9875009e78d87022cde	2024-05-21 13:40:29.513032+00	20240521134027_add_user_table	\N	\N	2024-05-21 13:40:28.565866+00	1
dd0091db-114d-430e-8c5b-18cd3320c312	b7224d5b4b323d8baf42114e4ac88ec8547f07c572958394ce1a3bf5c67dd11a	2024-05-21 15:50:28.884947+00	20240521155026_rename_user_table_to_users	\N	\N	2024-05-21 15:50:27.951518+00	1
fc6b7c25-60b7-48c2-97aa-b81ec083b89c	6ecf4b5d2c14316d499669288a4a43e69c374b6ed773982d07b2fa0b95424185	2024-06-03 11:29:05.040052+00	20240603112903_add_relation_services_with_countries_and_cities	\N	\N	2024-06-03 11:29:04.133101+00	1
d3a2b247-9ec7-492e-973f-6a47681e6c5d	a9749f6bedf6991db88445fba657bfc63a152d58e5d4616b6155a320964c8d5e	2024-05-22 13:29:59.673465+00	20240522132957_add_fields_to_users_table	\N	\N	2024-05-22 13:29:58.74453+00	1
b8bb218c-cb8b-41fd-9f71-837e26c0c8c8	40ae59c1df8d31174ee8a64dce817fcfb8230d694ae96c5523cc9064a7497742	\N	20240531124815_add_username_ci_index	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20240531124815_add_username_ci_index\n\nDatabase error code: 23505\n\nDatabase error:\nERROR: could not create unique index "users_username_ci_unique_idx"\nDETAIL: Key (lower(username))=(gabriel) is duplicated.\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E23505), message: "could not create unique index \\"users_username_ci_unique_idx\\"", detail: Some("Key (lower(username))=(gabriel) is duplicated."), hint: None, position: None, where_: None, schema: Some("public"), table: Some("users"), column: None, datatype: None, constraint: Some("users_username_ci_unique_idx"), file: Some("tuplesortvariants.c"), line: Some(1361), routine: Some("comparetup_index_btree") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20240531124815_add_username_ci_index"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20240531124815_add_username_ci_index"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:202	2024-05-31 13:10:56.68862+00	2024-05-31 12:53:39.531632+00	0
2e547e6a-bf75-4012-9cbd-ae57e90405fc	6d473e3c8b966bb9cac039e1054a95e59d609e145c79d58522361e310149c688	2024-05-22 14:28:33.802893+00	20240522142831_default_role_changed_to_custumer	\N	\N	2024-05-22 14:28:32.893583+00	1
85558e5b-caf8-4173-9b8b-c3d1f79a7ffe	40ae59c1df8d31174ee8a64dce817fcfb8230d694ae96c5523cc9064a7497742	2024-05-31 13:10:57.053979+00	20240531124815_add_username_ci_index		\N	2024-05-31 13:10:57.053979+00	0
49e74d16-187e-49e3-bc05-521585c01fe3	eee54d04359cdb05d7309928ea13263d78b207ae846cb8c86c9cc631c2bb3ee8	2024-05-22 15:40:05.778008+00	20240522154003_add_key_field_to_users_table	\N	\N	2024-05-22 15:40:04.846273+00	1
5e38477c-4315-485e-8c61-5b5580a3c4e3	24b8c2833cba2010342eda422db6671b92ab2271857b8a0b350d792a22d0c949	2024-05-24 12:00:44.023901+00	20240524120042_add_services_table	\N	\N	2024-05-24 12:00:43.095813+00	1
5b4e1efb-7105-4a50-8e85-bff91c2dd7d3	cac1ec38cafb5453aa8c6f171719f67fcdb48e036efd056469f77d7de351b185	2024-05-24 12:17:30.973651+00	20240524121729_make_not_required_somes_fields_on_service_table	\N	\N	2024-05-24 12:17:30.066743+00	1
b9738379-3b30-4ae5-81e5-d530f25c7edc	c0d4ef61d51ed1e2032fad545a2b73b7d97136593d8e8116dcf28a35f5d94e82	2024-05-31 16:01:55.79362+00	20240531160153_add_forgot_password_key_to_user	\N	\N	2024-05-31 16:01:54.885398+00	1
1b001865-92fe-4927-9165-4c0d02ea451f	00f68760c2e96be64a4c7b1a96ea316c19fd8687593286c34b088b4316301f02	2024-05-24 12:26:51.150226+00	20240524122649_add_fields_shown_and_active_to_services	\N	\N	2024-05-24 12:26:50.237816+00	1
2cce70ba-1c60-4b97-9eb6-ae3f256a2b00	7ad58c6a04923486c2b2a5baed89a580264e29464ec42d0f7ae5d48e98e84749	2024-05-27 14:45:58.851041+00	20240527144556_username_unique	\N	\N	2024-05-27 14:45:57.906662+00	1
ae778547-5acd-4582-a2f2-87b5fa7b5d21	a2cbbac994a76a630d198899650e89c2b11d60cc894b5314f28088f55f24f930	2024-06-03 11:33:23.404299+00	20240603113321_add_online_users_table	\N	\N	2024-06-03 11:33:22.458693+00	1
446a51a6-2e4f-4cf2-a6ee-5acdc87e9960	02fbb7057001a3bcceadc120f59ec6eca769fa5910c121baf79a2a3be8695a9f	2024-06-03 11:19:07.679502+00	20240603111905_add_city_and_country_tables	\N	\N	2024-06-03 11:19:06.714553+00	1
d14c4544-6322-47a5-9fdb-9a27c81ad00a	30e44fe75cea35b32161c575bcf8ad3d3c80f2b6faa9e600dd7297032f1932af	2024-06-12 15:23:19.589304+00	20240612152317_add_service_id_to_chat_table	\N	\N	2024-06-12 15:23:18.673967+00	1
9e08ec9c-b6a3-42fd-a09e-ecf728a851ed	69367fc91b1325c71e1ca7c3aed18be317851e9a01eb772ed9d07f922149dec8	2024-06-07 15:58:00.925495+00	20240607155759_add_is_verified_filed_to_service	\N	\N	2024-06-07 15:58:00.024763+00	1
2c928545-02d8-41d1-81f1-40ac61ce44c3	065ad2b807fbd1a9ab6ddfd0dd0ab2c8ceb7ac2a4b659b2924a69d01d1465f7a	2024-06-04 15:57:26.87766+00	20240604155725_add_review_table	\N	\N	2024-06-04 15:57:25.972385+00	1
be2aeb5a-5c62-4339-bb60-522e07b7697b	e4f559f0cbfea441ea40301458dfbf432d97464c22ffc6978fd6c9cea0f64b82	2024-06-04 16:17:25.699636+00	20240604161723_add_url_image_to_service	\N	\N	2024-06-04 16:17:24.793938+00	1
455e09d2-ee79-46aa-9236-bd5e057c7f41	ae244d9a25024e161f61b017839f42fc21526c4abf5d535b67a69ab38469a58b	2024-06-12 13:44:03.163861+00	20240612134401_add_username_to_chat	\N	\N	2024-06-12 13:44:02.260338+00	1
1889704c-9b51-4331-91ab-0d11d66e3848	a32f6df855011ee49e679e29a34d1f7be83b335ee437d1ee47488b31b16972ce	2024-06-05 15:01:52.234088+00	20240605150150_	\N	\N	2024-06-05 15:01:51.304272+00	1
ef21247e-6b6d-4411-a552-e7badbf1d240	8d0fe4169ec70346ea5e42539399f2c4ce39f1df3cb858cd66228949169c4ce3	2024-06-07 17:43:40.471427+00	20240607174338_add_field_to_review	\N	\N	2024-06-07 17:43:39.55185+00	1
6eb07195-8f3d-4cf8-9b48-2ae1752243f2	d4227c666655814a39ebb26a3493d86e34f8f0c89892c1dcb464afb8d63ffb8e	2024-06-07 15:53:02.348261+00	20240607155300_add_fileds_to_service	\N	\N	2024-06-07 15:53:01.416398+00	1
d3b32ac8-4216-4f2b-8965-db96585ecbf6	0eb44223e9b920b6c2a6e9984f9b04e7fa3b1693a9421765f1ab448eb9e70ef2	2024-06-10 23:25:51.694752+00	20240610232549_add_user_photo_to_chat_table	\N	\N	2024-06-10 23:25:50.815708+00	1
0e671b60-93a4-4e34-b2c1-2d1bb4a3e619	da257733c1f9b434a38536598cff299b28f0bd3ad4e4c395d75438a8eb8d7818	2024-06-12 14:41:40.9866+00	20240612144139_add_last_message_to_chat	\N	\N	2024-06-12 14:41:40.001283+00	1
5e015885-bf27-4964-8794-2f1f06ea0cd6	d52ec71ce9cf3179dc56e30ecf1f32b35d54958e318cf4eed9ce0ef2964208d8	2024-06-12 14:26:56.14729+00	20240612142654_add_service_data_to_chat_table	\N	\N	2024-06-12 14:26:55.234604+00	1
4d72ffe8-00cc-4272-af9a-420c883413d6	0a694ff634f8cd3dd94a75251e605584d083eb0aea9789544dfde68e7563653e	2024-06-13 11:59:08.556995+00	20240613115906_service_defult_values	\N	\N	2024-06-13 11:59:07.615593+00	1
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.chats (id, "createdAt", "updatedAt", user1_id, user2_id, user1_photo, user2_photo, user1_username, user2_username, service_image, service_title, last_message, service_id) FROM stdin;
28	2024-06-12 17:06:25.12	2024-06-12 17:06:33.91	82	88	https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg	https://images.squarespace-cdn.com/content/v1/624a1c23d68c8a3f214fbe39/60e4886e-faed-4b4c-bec8-e758dc068526/isaac-olander-peter-parker-tobey-maguire-isaac-olander+%281%29.jpg	admin	Peter Parker	https://www.desatascoshenares.com/wp-content/uploads/2022/04/fontanero-urgente-madrid.jpg	Fontanero super	Cuando puedes venir?	6
26	2024-06-12 17:05:16.416	2024-06-12 21:04:30.546	82	83	https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg	https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/93aa6adc-c0db-431f-b22a-b730436f393e/dgnum2c-d24688ab-c73c-4987-b05f-72ca92971f7a.jpg/v1/fill/w_894,h_894,q_70,strp/super_strong_garbage_woman_by_cleantrash_dgnum2c-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzkzYWE2YWRjLWMwZGItNDMxZi1iMjJhLWI3MzA0MzZmMzkzZVwvZGdudW0yYy1kMjQ2ODhhYi1jNzNjLTQ5ODctYjA1Zi03MmNhOTI5NzFmN2EuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zOSQ4UUY5QKrmSqkVsNDQfs86hMd0IrK2deSv7MXPXI	admin	Elba Surero	https://s3.envato.com/files/279212760/DSC_1093.jpg	Pintura de calidad	Hola	15
27	2024-06-12 17:05:49.172	2024-06-12 17:06:03.308	82	85	https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg	https://img.lavdg.com/sc/D49K4l632FUL9zwu4jBDfRJ8d9A=/1280x/2022/09/25/00121664135762187564762/Foto/H05A8004.jpg	admin	Aitor Tilla	https://urgencia24horas.com/wp-content/uploads/2023/06/fontaneros-Barcelona.jpg	Notable con el agua	Estoy perdiendo agua por todos lados!!	3
29	2024-06-12 17:45:15.914	2024-06-12 21:05:43.053	82	92	https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg	https://www.elconfidencialdigital.com/media/elconfidencialdigital/images/2023/03/22/2023032210434678181.jpg	admin	Chucky	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEIT4TFLaapMLi9p674SSxzwl4ap8z95fYVuCYpk7XZrJ6ukBe-WbmAP2mCSYDLbr_30o&usqp=CAU	Cuidado de niños y mascotas	Gracias por todo	23
32	2024-06-14 14:35:28.154	2024-06-14 14:35:34.734	82	10	https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg	https://s.yimg.com/ny/api/res/1.2/jP6PJQaPZhpczL1F8dLHKQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk2MQ--/https://s.yimg.com/os/es-us/blogs/adicto-telenovelas/GreciaColmenaresMUEVETE01.jpg	admin	Grecia Colmenares	https://procenter.habitissimo.es/wp-content/uploads/2020/07/mudanzas.jpg	Mudanzas seguras	Hola, quiero mudarme	11
\.


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.cities (id, name, country_id) FROM stdin;
1	Not selected	1
2	La Plata	5
3	Buenos Aires	5
4	Rosario	5
5	Venado Tuerto	5
6	Campana	5
7	Lujan	5
10	Maracaibo	2
11	Barinas	2
12	Villarrica	3
13	Curuguaty	3
8	Florida	4
9	Durazno	4
14	Formosa	5
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.countries (id, name) FROM stdin;
1	Not selected
2	Venezuela
3	Paraguay
4	Uruguay
5	Argentina
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.messages (id, message, "timestamp", sender_id, chat_id) FROM stdin;
124	Elba, cuando puedes venir?	2024-06-12 17:05:26.853	82	26
125	Estoy perdiendo agua por todos lados!!	2024-06-12 17:06:02.937	82	27
126	Cuando puedes venir?	2024-06-12 17:06:33.729	82	28
127	Esta dificil por ahora	2024-06-12 17:18:28.588	83	26
128	manana esta bien?	2024-06-12 17:24:45.273	83	26
129	si, manana voy	2024-06-12 17:25:04.008	82	26
130	hasta manana	2024-06-12 17:31:22.904	82	26
131	Manana no puedo	2024-06-12 17:55:07.561	82	26
132	Entonces como hacemos?	2024-06-12 17:55:18.895	83	26
133	Hola	2024-06-12 21:04:30.114	82	26
134	Gracias por todo	2024-06-12 21:05:42.867	82	29
136	Hola, quiero mudarme	2024-06-14 14:35:34.375	82	32
\.


--
-- Data for Name: onlines; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.onlines (id, socket_id, user_id) FROM stdin;
10	bJ769NtUa697T-bBAAAt	81
8	uHAqclVbYFBoqnoLAADD	85
6	EI-fovPvzw2gdC2QAAAB	83
5	OSlukQHEzsGmnYMUAAAB	82
7	uxgcAyiJB3A6GMKCAAB4	83
9	Uy5xL_56vTDVMp8SAACN	85
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.reviews (id, rating, comment, active, user_id, service_id, "createdAt", "updatedAt", by, title) FROM stdin;
53	5	Muy buen gusto	t	88	15	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
1	3	Vino rapido, el trabajo aceptable. Pero medio caro.	t	82	18	2024-06-04 16:52:08.006	2024-06-12 21:06:32.633	Admin	Relativamente mal
4	3.5	No me gusto	t	26	1	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
5	3.5	No me gusto	t	26	1	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
6	3.5	No me gusto	t	26	2	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
7	3.5	No me gusto	t	26	3	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
8	3.5	No me gusto	t	26	4	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
9	3.5	No me gusto	t	26	5	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
10	3.5	No me gusto	t	26	6	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
11	3.5	No me gusto	t	26	7	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
12	3.5	No me gusto	t	26	11	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
13	3.5	No me gusto	t	26	12	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
14	3.5	No me gusto	t	26	13	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
15	3.5	No me gusto	t	26	14	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
16	3.5	No me gusto	t	26	15	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
17	3.5	No me gusto	t	26	16	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
18	3.5	No me gusto	t	26	17	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
19	3.5	No me gusto	t	26	18	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
20	3.5	No me gusto	t	26	19	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
21	3.5	No me gusto	t	26	20	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
22	3.5	No me gusto	t	26	21	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
23	3.5	No me gusto	t	26	22	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Gustavo	\N
65	5	Muy buen gusto	t	7	1	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Francisco II	\N
66	5	Muy buen gusto	t	7	2	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Francisco II	\N
52	5	Muy buen gusto	t	88	16	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
54	5	Muy buen gusto	t	88	14	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
55	5	Muy buen gusto	t	88	13	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
56	5	Muy buen gusto	t	88	12	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
57	5	Muy buen gusto	t	88	11	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
58	5	Muy buen gusto	t	88	7	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
59	5	Muy buen gusto	t	88	6	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
60	5	Muy buen gusto	t	88	5	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
61	5	Muy buen gusto	t	88	4	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
62	5	Muy buen gusto	t	88	3	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
63	5	Muy buen gusto	t	88	2	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
64	5	Muy buen gusto	t	88	1	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Peter	\N
41	4.5	Atencion de primera	t	8	1	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
42	4.5	Atencion de primera	t	8	2	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
43	4.5	Atencion de primera	t	8	3	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
44	4.5	Atencion de primera	t	8	4	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
45	4.5	Atencion de primera	t	8	22	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
46	4.5	Atencion de primera	t	8	21	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
47	4.5	Atencion de primera	t	8	20	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
48	4.5	Atencion de primera	t	8	19	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
49	4.5	Atencion de primera	t	8	18	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
50	4.5	Atencion de primera	t	8	17	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
51	4.5	Atencion de primera	t	8	16	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Sammy Decker	\N
25	2.8	Dejo morir a mi pez	t	90	1	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
26	2.8	Dejo morir a mi pez	t	90	2	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
27	2.8	Dejo morir a mi pez	t	90	3	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
28	2.8	Dejo morir a mi pez	t	90	4	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
29	2.8	Dejo morir a mi pez	t	90	5	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
30	2.8	Dejo morir a mi pez	t	90	6	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
31	2.8	Dejo morir a mi pez	t	90	7	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
32	2.8	Dejo morir a mi pez	t	90	11	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
33	2.8	Dejo morir a mi pez	t	90	12	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
34	2.8	Dejo morir a mi pez	t	90	13	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
35	2.8	Dejo morir a mi pez	t	90	14	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
36	2.8	Dejo morir a mi pez	t	90	15	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
37	2.8	Dejo morir a mi pez	t	90	16	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
38	2.8	Dejo morir a mi pez	t	90	17	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
39	2.8	Dejo morir a mi pez	t	90	18	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
40	2.8	Dejo morir a mi pez	t	90	19	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Scobbby John	\N
67	1.2	Vino sin ducharse, mal olor.	t	83	2	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
68	1.2	Vino sin ducharse, mal olor.	t	83	3	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
69	1.2	Vino sin ducharse, mal olor.	t	83	5	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
70	1.2	Vino sin ducharse, mal olor.	t	83	7	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
71	1.2	Vino sin ducharse, mal olor.	t	83	11	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
72	1.2	Vino sin ducharse, mal olor.	t	83	13	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
3	4	No se volvio a romper el auto, recomendable.	t	82	5	2024-06-05 17:48:34.051	2024-06-05 17:48:34.051	Admin	Volvere
73	1.2	Vino sin ducharse, mal olor.	t	83	15	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
74	1.2	Vino sin ducharse, mal olor.	t	83	17	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
75	1.2	Vino sin ducharse, mal olor.	t	83	19	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
76	1.2	Vino sin ducharse, mal olor.	t	83	21	2024-06-05 17:49:34.291	2024-06-05 17:49:34.291	Cristiano	\N
2	1	Despues que vino se me seco el pasto. Y nunca mas volvio a crecer!!	t	82	22	2024-06-05 17:48:16.388	2024-06-12 16:20:19.402	Admin	Lamentable
77	1	Nunca vino ni se comunico	t	82	6	2024-06-12 17:07:24.314	2024-06-12 17:07:24.314	Anonymous	Desastre
79	3	es una gran ersona	t	82	11	2024-06-14 14:36:24.524	2024-06-14 14:36:24.524	Anonymous	Muy bien
\.


--
-- Data for Name: service_types; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.service_types (id, name, description, url_image, "createdAt", "updatedAt") FROM stdin;
1	Electrician	Electrical installation and repair services.	https://i.imgur.com/DOBR5JJ.png	2024-05-24 13:38:32.234	2024-05-24 13:38:32.234
2	Plumber	Plumbing services and pipe repair.	https://i.imgur.com/YSrURLz.png	2024-05-24 13:40:29.692	2024-05-24 13:40:29.692
3	Moving	Transportation and moving services.	https://i.imgur.com/3OvShwu.png	2024-05-24 13:41:06.42	2024-05-24 13:41:06.42
4	Gardening	Garden maintenance and design.	https://i.imgur.com/EbThbZM.png	2024-05-24 13:41:45.062	2024-05-24 13:41:45.062
5	House Cleaning	Cleaning services for homes and offices.	https://i.imgur.com/054xUyX.png	2024-05-24 13:42:18.918	2024-05-24 13:42:18.918
6	Painter	Interior and exterior painting and decoration services.	https://i.imgur.com/66DcZ14.png	2024-05-24 13:42:54.997	2024-05-24 13:42:54.997
7	Carpenter	Furniture and wooden structure fabrication and repair services.	https://i.imgur.com/8xkVOZI.png	2024-05-24 13:44:15.137	2024-05-24 13:44:15.137
8	Locksmith	Lock opening and changing services.	https://i.imgur.com/L2Q6UXQ.png	2024-05-24 13:45:17.99	2024-05-24 13:45:17.99
9	Mechanic	Vehicle repair and maintenance services.	https://i.imgur.com/w3xagPw.png	2024-05-24 13:45:58.842	2024-05-24 13:45:58.842
10	Pet Care	Pet walking, feeding, and care services.	https://i.imgur.com/RePh2J7.png	2024-05-24 13:46:49.202	2024-05-24 13:46:49.202
11	Veterinarian	Veterinary services for animal health and care.	https://i.imgur.com/DMSWrq4.png	2024-05-24 13:47:46.623	2024-05-24 13:47:46.623
12	Nanny	Childcare and babysitting services.	https://i.imgur.com/nkMi3mO.png	2024-05-24 13:54:56.104	2024-05-24 13:54:56.104
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.services (id, description, hourly_price, rating, times_hired, "createdAt", "updatedAt", user_id, service_type_id, active, shown, city_id, country_id, num_reviews, url_image, currency, title, username, "isVerified") FROM stdin;
4	Electricista con experiencia en instalaciones residenciales y comerciales.	5	3.95	0	2024-05-24 14:42:13.202	2024-06-13 12:05:05.867	9	1	t	t	13	3	4	https://www.cefcolorado.org/wp-content/uploads/2021/08/electrician-800x533.jpg	USD	Electricista experta	Lucía González	t
11	Servicio de mudanza profesional y seguro.	5000	3.125	0	2024-05-24 14:44:47.609	2024-06-13 12:05:06.79	10	3	t	t	8	4	4	https://procenter.habitissimo.es/wp-content/uploads/2020/07/mudanzas.jpg	ARS	Mudanzas seguras	Grecia Colmenares	f
14	Carpinteria profesional para reparaciones y mantenimiento de sistemas de construcción.	4	3.766666666666667	0	2024-05-24 14:45:06.206	2024-06-13 12:05:06.719	7	7	t	t	14	5	3	https://irp.cdn-website.com/9c03a74a/dms3rep/multi/carpintero.jpg	USD	Servicio de carpintería	Francisco II	t
23	Cuidador profesional.	4	0	0	2024-05-24 14:45:22.396	2024-06-13 11:51:45.155	92	12	t	t	2	5	0	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEIT4TFLaapMLi9p674SSxzwl4ap8z95fYVuCYpk7XZrJ6ukBe-WbmAP2mCSYDLbr_30o&usqp=CAU	USD	Cuidado de niños y mascotas	Chucky	t
22	Diseño y mantenimiento de jardines.	54841	3	0	2024-06-04 16:43:42.186	2024-06-13 12:05:06.722	91	4	t	t	10	5	3	https://i.pinimg.com/564x/67/27/47/672747f9e3e155296961b3a9ad394b57.jpg	ARS	Jardinería profesional	Ruddy Gulit	f
19	Veterinario profesional para el mundo.	44	3	0	2024-05-24 14:45:34.62	2024-06-13 12:05:06.538	84	11	t	t	3	5	4	https://assets.petco.com/petco/image/upload/f_auto,q_auto:best/vet-services-vetco-total-care-lifestyle-img-800x577	USD	Tu mascota a mejor vida	Lionel Messi	t
18	Ninguna cerradura se nos resiste.	1500	3.45	0	2024-05-24 14:45:29.957	2024-06-13 12:05:06.723	80	8	t	t	4	5	4	https://www.checkatrade.com/blog/wp-content/uploads/2021/08/locksmith-prices-for-repair-locking-door-handles.jpeg	ARS	Servicio de cerrajeria	Cristiano Ronaldo	f
20	El mejor de la ciudad. Vamos en el dia.	25	4	0	2024-05-27 14:22:58.687	2024-06-13 12:05:06.449	11	1	t	t	6	5	2	https://agenciasanluis.com/wp-content/uploads/2023/03/DG5_8340.jpg	USD	Electricista para tu casa	Helen Chufe	f
2	Fontanero disponible para reparaciones y nuevas instalaciones.	9	3.666666666666667	0	2024-05-24 14:41:52.687	2024-06-13 12:05:06.538	9	2	t	t	10	2	6	https://prowess.org.uk/wp-content/uploads/2013/01/Depositphotos_60839993_s-2019.jpg	USD	Fontanera experta	Lucía González	t
5	El mejor reparador de carros en el mundo.	4	3.3	0	2024-05-24 14:42:36.408	2024-06-13 12:05:06.817	89	9	t	t	12	3	5	https://miro.medium.com/v2/resize:fit:4320/1*JktzC9GrA_l4yz0cCy8a5Q.jpeg	USD	Servicio de Mecanico	Esteban Quito	f
21	El mejor hechizaro de mascotas en el mundo. Grandes somos.	1500	3.066666666666666	0	2024-05-27 15:02:12.273	2024-06-13 12:05:06.269	82	10	t	t	5	1	3	https://transportedemascotas.net/wp-content/uploads/2019/08/Paseador-de-perros.jpg	ARG	Servicio de Cuidado de Mascotas	Administrador	t
15	Pintura de interiores y exteriores, calidad garantizada.	54	3.125	0	2024-05-24 14:45:11.753	2024-06-13 12:05:06.555	83	6	t	t	9	4	4	https://s3.envato.com/files/279212760/DSC_1093.jpg	USD	Pintura de calidad	Elba Surero	t
16	El mejor reparador de carros en el mundo.	22000	3.95	0	2024-05-24 14:45:18.003	2024-06-13 12:05:06.577	8	9	t	t	14	5	4	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoUqsWlqk6W5nCuymp7r1aSiraNp-S3WpHA&s	ARS	Servicio de la ostia	Sammy Decker	t
12	Especialista en sistemas eléctricos industriales.	10	3.766666666666667	0	2024-05-24 14:44:52.157	2024-06-13 12:05:06.74	8	1	t	t	5	5	3	https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjp6k7vheDWvbCApDWHmeTzSo6SFiu6YGAKQWrqzHQ1ByiQXAxQ5QvD55raqsb61hWVxhzaRmHT-0wK32jCmiSZqjm2PLzd_QD7gXN4FyyqrRfAX8uMwJOd9Xxys23e9Wbz4-3Oai0X5Hs/s1600/DSC00468.JPG	USD	Reparaciones eléctricas	Sergio Valdés	t
13	Limpieza profunda de casas y oficinas.	5	3.125	0	2024-05-24 14:44:59.863	2024-06-13 12:05:05.327	90	5	t	t	9	4	4	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6gGzAXopodkuNLmoCkgIOlL8OKbTK6LbAmvti5qHYKSwkVlpVkezg0jHzMyWF-lG9Mc&usqp=CAU	USD	Limpieza profesional	Scobby John	t
3	Experta en reparaciones de tuberías y desagües.	45000	3.4	0	2024-05-24 14:42:07.46	2024-06-13 12:05:05.503	85	2	t	t	11	2	5	https://urgencia24horas.com/wp-content/uploads/2023/06/fontaneros-Barcelona.jpg	ARS	Notable con el agua	Aitor Tilla	t
6	Experta en reparaciones de tuberías y desagües.	1	3.075	0	2024-05-24 14:42:46.852	2024-06-13 12:05:06.068	88	2	t	t	8	4	4	https://www.desatascoshenares.com/wp-content/uploads/2022/04/fontanero-urgente-madrid.jpg	USD	Fontanero super	Peter Parker	t
1	Reparaciones de plomería, mantenimiento y emergencias.	12	4.05	0	2024-05-24 14:28:17.518	2024-06-13 12:05:05.684	87	2	t	t	14	5	6	https://www.1sthomeandcommercialservices.com/images/blog/Plumber-Under-Sink.jpg	USD	Fontanero para tu hogar	Arnaldo Andre	t
7	Electricista para reparaciones y mantenimiento de sistemas eléctricos.	11	3.125	0	2024-05-24 14:42:52.311	2024-06-13 12:05:06.631	87	1	t	t	12	3	4	https://academia3e.com/wp-content/uploads/2021/08/herramientas-para-electricistas-scaled.jpg	USD	Electricista industrial	Arnaldo Andre	t
17	Cuidadora de bebes profesional.	4	3	0	2024-05-24 14:45:22.396	2024-06-13 12:05:06.649	26	12	t	t	2	5	4	https://media.vanityfair.com/photos/587ad80e2a677fe11973b503/master/pass/giancarlo-espositoo.jpg	USD	Servicio de Cuidado de Bebés	Gustavo Fring	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: servifix_user
--

COPY public.users (id, username, password, name, surname, email, role, active, "createdAt", "updatedAt", description, personal_id, phone, photo, rating, key, verified, password_reset_key) FROM stdin;
9	Lucía González	$2b$10$Kx0.789id5YHucARStzre.lf8cPL20WZdjRyVl.23L2VEInKuR35u	Lucía	González	elga@fring.com	SUPPLIER	t	2024-05-24 14:37:26.902	2024-06-13 12:05:07.639	\N	\N	\N	https://statics.bigbangnews.com/2024/01/crop/659586b34d04a__400x300.webp	3.808333333333334	wdj6dt7MRUeUmMR	t	\N
91	Ruddy Gulit	$2b$08$g3CPc1Ftx5kswjBgy7fg1.C5KjE/blXQAX8Mf1h4IeivFtraddyTC	Ruddy	Gulit	aitor1fd31@tilla.com	CUSTUMER	t	2024-06-08 13:23:12.393	2024-06-13 12:05:07.75	\N	\N	\N	https://media.vogue.mx/photos/5c071b302473e3edf264d850/master/w_320%2Cc_limit/tendencias_de_pelo_rastas_dreadlocks_para_mujer_611320884.jpg	3	675709	f	\N
88	Peter Parker	$2b$08$ZUPR6v5uSUyL/CV0O/fVLuWhY766VL0oyQXUMnCqRW5LP.ECMdREq	Peter	Parker	aitor11@tilla.com	CUSTUMER	t	2024-06-08 13:21:19.891	2024-06-13 12:05:07.755	\N	\N	\N	https://images.squarespace-cdn.com/content/v1/624a1c23d68c8a3f214fbe39/60e4886e-faed-4b4c-bec8-e758dc068526/isaac-olander-peter-parker-tobey-maguire-isaac-olander+%281%29.jpg	3.075	524996	t	\N
85	Aitor Tilla	$2b$08$Hcsl3AH8Itz0U5QUnuPliuidXCOKK3F5TJ52c0luZ/UqHTASkFD2a	Aitor	Tilla	hghd@gjfghflsjs.com	CUSTUMER	t	2024-06-05 17:21:51.877	2024-06-13 12:05:07.764	\N	\N	\N	https://img.lavdg.com/sc/D49K4l632FUL9zwu4jBDfRJ8d9A=/1280x/2022/09/25/00121664135762187564762/Foto/H05A8004.jpg	3.4	193207	t	\N
7	Francisco II	$2b$10$j7JfJIXirnJpo.ze84mN6ueLqvD4zP3SYuyIO5OiM8jzwUuH4F0D.	Papa	Fransisco	tabarebermudez@gmail.com	SUPPLIER	t	2024-05-22 15:40:28.045	2024-06-13 12:05:07.812	El mejor de la ciudad. Vamos en el dia.	\N	4567987654	https://s.france24.com/media/display/5c2380f0-f246-11e8-8405-005056bff430/w:1280/p:4x3/papa-francisco.jpg	3.766666666666667	KFvFslGDBsuDZDe	t	\N
11	Helen Chufe	$2b$10$nfWXzmd5E7tsA89vhvy1UOSCHTTkdG9p/mVtNIKbZSK.5YK7ZEwDy	Helen	Chufe	quita@fring.com	SUPPLIER	t	2024-05-24 14:38:20.491	2024-06-13 12:05:07.821	\N	\N	\N	https://www.unwomen.org/sites/default/files/Communications/Headquarters/Images/02_WhatWeDo_LeadershipAndPoliticalParticipation_675x350.jpg?la=en	4	Kjq24qfNwrHoUA0	f	\N
90	Scobbby John	$2b$08$smj/WSYpzw1jt3F0Y5YU/esrJq5PlHICaLdIzvDDEhtdcXqx4sT/q	Scooby	Jhon	aitor1f31@tilla.com	CUSTUMER	t	2024-06-08 13:22:38.48	2024-06-13 12:05:07.823	\N	\N	\N	https://pm1.aminoapps.com/6502/cef9767b577d423951ca9dcf7aa2f623d6068513_hq.jpg	3.125	012910	t	\N
8	Sammy Decker	$2b$10$MCKKWpqj5In3JS.n3P/gguklAUOoCBmLLwQ47HdpNQQYp2GrNfq2u	Sammy	Decker	gus@fring.com	SUPPLIER	t	2024-05-24 14:36:23.204	2024-06-13 12:05:07.837	\N	\N	\N	https://media.revistagq.com/photos/6008111d0c66a2a0f048c638/16:9/w_2560%2Cc_limit/chris-hemsworth.jpg	3.858333333333333	2wWi7JgEDtvd6MT	t	\N
83	Elba Surero	$2b$08$SSTnbxQ8UdsnJx33Flxd9.w4CKm1r5.e3JPW13kOZBWom2NJbrrAe	Elba	Surero	admin2@admin.com	SUPPLIER	t	2024-06-03 13:40:11.901	2024-06-13 12:05:07.912	\N	\N	\N	https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/93aa6adc-c0db-431f-b22a-b730436f393e/dgnum2c-d24688ab-c73c-4987-b05f-72ca92971f7a.jpg/v1/fill/w_894,h_894,q_70,strp/super_strong_garbage_woman_by_cleantrash_dgnum2c-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzkzYWE2YWRjLWMwZGItNDMxZi1iMjJhLWI3MzA0MzZmMzkzZVwvZGdudW0yYy1kMjQ2ODhhYi1jNzNjLTQ5ODctYjA1Zi03MmNhOTI5NzFmN2EuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zOSQ4UUY5QKrmSqkVsNDQfs86hMd0IrK2deSv7MXPXI	3.125	385576	t	\N
93	jose	$2b$08$J8o61x93ftQqKEES9OnSQe/90gdJW2Hpy54Pb49Rc5JFiXWinaQVe	Jose	jose	so@fs.com	CUSTUMER	t	2024-06-13 00:08:44.048	2024-06-13 12:05:07.941	\N	\N	\N	\N	\N	105446	f	\N
86	gabrielcastro	$2b$08$ljhWzUyEcmYkf7g85RGBUu1qk7o7R.5DBNN1zDgczs.aGuC430XBi	gabriel	castro	gabrielenriquecas@gmail.com	CUSTUMER	t	2024-06-06 15:42:29.377	2024-06-13 12:05:07.935	\N	\N	\N	https://es.coachesvoice.com/wp-content/uploads/2022/07/GJMobile.jpg	\N	996165	f	\N
92	Chucky	$2b$08$pVw.zlRjCryNuYKr0OqnTuUlSb6CigqavLP3ZM8Bu6iGH9vFYxuH2	Chucky	Chan	aitor1fdd31@tilla.com	CUSTUMER	t	2024-06-08 14:07:52.97	2024-06-13 12:05:07.952	\N	\N	\N	https://www.elconfidencialdigital.com/media/elconfidencialdigital/images/2023/03/22/2023032210434678181.jpg	0	377369	t	\N
82	admin	$2b$08$Q0f3HYWmFGFDYlvebqXru.kBP08xIRM926MnYcrH.nczaWWBOOV5q	Administrador	Super	admin@admin.com	SUPPLIER	t	2024-06-03 13:24:25.648	2024-06-13 12:05:07.993	\N	\N	\N	https://vidaenusa.org/wp-content/uploads/2023/12/cuanto-gana-administrador-empresas-usa.jpg	3.066666666666666	873854	t	\N
26	Gustavo Fring	$2b$08$oMc5/3fafUfYfBGfMmlO4.TyHcl2JMs7ZnXEL7MFek.MEZD6g32ve	Gustavo	Fring	escobi@yon.com	SUPPLIER	t	2024-05-27 15:32:12.407	2024-06-13 12:05:08.004	\N	\N	\N	https://boo-prod.b-cdn.net/database/profiles/1688874231263e8e11c8b4e9b3691a6daa16ce7024212.jpg?class=sm	3	OekAJdFAMlGaKsb	f	\N
80	Cristiano Ronaldo	$2b$08$7OiECV5T38E71T0N3nE7fujST5BawxF1FyDm5KoxfbgMhXdMWdA4W	Cristiano	Ronaldo	aitor@tilla2.com	CUSTUMER	t	2024-05-31 17:20:04.324	2024-06-13 12:05:07.631	\N	\N	\N	https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118	3.45	Nf7Fu97WzyhsHUV	f	\N
10	Grecia Colmenares	$2b$10$lWofJWqnJCNQt9lxn4blnOVoRBFeBI5HQiCZ64z8cFsMyCnYjZA46	Grecia	Colmenares	cufa@fring.com	SUPPLIER	t	2024-05-24 14:37:56.308	2024-06-13 12:05:07.904	\N	\N	\N	https://s.yimg.com/ny/api/res/1.2/jP6PJQaPZhpczL1F8dLHKQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk2MQ--/https://s.yimg.com/os/es-us/blogs/adicto-telenovelas/GreciaColmenaresMUEVETE01.jpg	3.125	qJitsqvPgjswqV3	f	\N
84	Lionel Messi	$2b$08$EUvZty/oAP7OL0baBntPLO9VAe9spmEGJGAY2U1.RrOnXU3X/4NRa	Lionel	Messi	asd@asd.asd	CUSTUMER	t	2024-06-04 22:02:36.675	2024-06-13 12:05:07.641	\N	\N	\N	https://img.a.transfermarkt.technology/portrait/big/28003-1710080339.jpg?lm=1	3	741411	t	272419
81	gabriel	$2b$10$qZqIx5uIvjutsveiV62UIuoTb1ITW.uClPJge8uoeX9eLJap7bTze	Gabriel	Castro	gaburieruspotify@gmail.com	CUSTUMER	t	2024-05-31 17:22:09.625	2024-06-13 12:05:07.722	\N	\N	\N	https://elasticbeanstalk-us-east-1-911267631614.s3.amazonaws.com/imagenes/jugadores/BAEZ-GABRIEL.jpg	\N	5hcEWQSNLoHu8dD	f	498154
87	Arnaldo Andre	$2b$08$MfuJE3I5BN5266DubTEC6OgcEZNby1DYp3xZLzgXJCvSic/97TLUy	Arnaldo	Andre	aitor1@tilla.com	CUSTUMER	t	2024-06-08 13:20:51.851	2024-06-13 12:05:07.729	\N	\N	\N	https://aquirevista.com.ar/wp-content/uploads/2023/02/ARNALDO-ANDRE-FOTO1-707x1024.jpg	3.5875	837648	t	\N
89	Esteban Quito	$2b$08$KVYSayknL.nnBEofMS02PuEJ8gw5EsD9UvGf4dlvFLKBozKLeK7P6	Esteban	Quito	aitor131@tilla.com	CUSTUMER	t	2024-06-08 13:21:58.71	2024-06-13 12:05:07.653	\N	\N	\N	https://pbs.twimg.com/profile_images/1341758698146967555/VGwesDJr_400x400.jpg	3.3	125654	f	\N
\.


--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.chats_id_seq', 32, true);


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.cities_id_seq', 14, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.countries_id_seq', 5, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.messages_id_seq', 136, true);


--
-- Name: onlines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.onlines_id_seq', 10, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.reviews_id_seq', 79, true);


--
-- Name: service_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.service_types_id_seq', 12, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.services_id_seq', 23, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: servifix_user
--

SELECT pg_catalog.setval('public.users_id_seq', 93, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: onlines onlines_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.onlines
    ADD CONSTRAINT onlines_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: service_types service_types_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.service_types
    ADD CONSTRAINT service_types_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: servifix_user
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_ci_unique_idx; Type: INDEX; Schema: public; Owner: servifix_user
--

CREATE UNIQUE INDEX users_username_ci_unique_idx ON public.users USING btree (lower(username));


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: servifix_user
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: chats chats_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chats chats_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cities cities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: messages messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reviews reviews_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: services services_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: services services_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: services services_service_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_service_type_id_fkey FOREIGN KEY (service_type_id) REFERENCES public.service_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: services services_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: servifix_user
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO servifix_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO servifix_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO servifix_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO servifix_user;


--
-- PostgreSQL database dump complete
--

