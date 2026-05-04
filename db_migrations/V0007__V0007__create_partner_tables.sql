
CREATE TABLE t_p60076574_landing_price_calcul.partners (
    id               SERIAL PRIMARY KEY,
    user_id          INTEGER NOT NULL REFERENCES t_p60076574_landing_price_calcul.users(id),
    status           VARCHAR(30) NOT NULL DEFAULT 'pending',
    partner_type     VARCHAR(30) NOT NULL DEFAULT 'legal',
    inn              VARCHAR(12),
    kpp              VARCHAR(9),
    ogrn             VARCHAR(15),
    full_name        TEXT,
    short_name       TEXT,
    legal_address    TEXT,
    director_name    TEXT,
    bank_name        TEXT,
    bank_bik         VARCHAR(9),
    bank_account     VARCHAR(20),
    bank_corr        VARCHAR(20),
    contact_name     TEXT,
    contact_phone    VARCHAR(30),
    contact_email    VARCHAR(150),
    ref_code         VARCHAR(20) UNIQUE,
    dadata_raw       JSONB,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p60076574_landing_price_calcul.partner_clients (
    id               SERIAL PRIMARY KEY,
    partner_id       INTEGER NOT NULL REFERENCES t_p60076574_landing_price_calcul.partners(id),
    full_name        TEXT NOT NULL,
    inn              VARCHAR(12),
    phone            VARCHAR(30),
    email            VARCHAR(150),
    contact_person   TEXT,
    deal_amount      NUMERIC(18,2),
    partner_reward   NUMERIC(18,2),
    reward_paid      BOOLEAN NOT NULL DEFAULT FALSE,
    current_status   VARCHAR(30) NOT NULL DEFAULT 'new',
    dadata_raw       JSONB,
    notes            TEXT,
    source           TEXT DEFAULT 'partner',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p60076574_landing_price_calcul.partner_client_statuses (
    id               SERIAL PRIMARY KEY,
    client_id        INTEGER NOT NULL REFERENCES t_p60076574_landing_price_calcul.partner_clients(id),
    status           VARCHAR(30) NOT NULL,
    comment          TEXT,
    changed_by       INTEGER REFERENCES t_p60076574_landing_price_calcul.users(id),
    changed_by_role  VARCHAR(20),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p60076574_landing_price_calcul.partner_client_docs (
    id               SERIAL PRIMARY KEY,
    client_id        INTEGER NOT NULL REFERENCES t_p60076574_landing_price_calcul.partner_clients(id),
    file_name        TEXT NOT NULL,
    file_url         TEXT NOT NULL,
    file_size        INTEGER,
    category         VARCHAR(50) DEFAULT 'other',
    uploaded_by      INTEGER REFERENCES t_p60076574_landing_price_calcul.users(id),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE t_p60076574_landing_price_calcul.partner_client_comments (
    id               SERIAL PRIMARY KEY,
    client_id        INTEGER NOT NULL REFERENCES t_p60076574_landing_price_calcul.partner_clients(id),
    author_id        INTEGER REFERENCES t_p60076574_landing_price_calcul.users(id),
    author_role      VARCHAR(20),
    message          TEXT NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_partners_user_id ON t_p60076574_landing_price_calcul.partners(user_id);
CREATE INDEX idx_partner_clients_partner_id ON t_p60076574_landing_price_calcul.partner_clients(partner_id);
CREATE INDEX idx_partner_client_statuses_client_id ON t_p60076574_landing_price_calcul.partner_client_statuses(client_id);
CREATE INDEX idx_partner_client_docs_client_id ON t_p60076574_landing_price_calcul.partner_client_docs(client_id);
CREATE INDEX idx_partner_client_comments_client_id ON t_p60076574_landing_price_calcul.partner_client_comments(client_id);
