ALTER TABLE t_p60076574_landing_price_calcul.users ADD COLUMN IF NOT EXISTS vk_id VARCHAR(50);
ALTER TABLE t_p60076574_landing_price_calcul.users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
CREATE INDEX IF NOT EXISTS idx_users_vk_id ON t_p60076574_landing_price_calcul.users(vk_id);
