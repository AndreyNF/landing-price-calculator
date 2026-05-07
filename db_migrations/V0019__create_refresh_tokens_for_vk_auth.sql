CREATE TABLE IF NOT EXISTS t_p60076574_landing_price_calcul.refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES t_p60076574_landing_price_calcul.users(id),
    token_hash VARCHAR(64) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON t_p60076574_landing_price_calcul.refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON t_p60076574_landing_price_calcul.refresh_tokens(token_hash);
