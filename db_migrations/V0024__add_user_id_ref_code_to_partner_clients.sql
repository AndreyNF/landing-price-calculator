ALTER TABLE t_p60076574_landing_price_calcul.partner_clients
  ADD COLUMN IF NOT EXISTS user_id INTEGER NULL REFERENCES t_p60076574_landing_price_calcul.users(id),
  ADD COLUMN IF NOT EXISTS ref_code VARCHAR(20) NULL;

COMMENT ON COLUMN t_p60076574_landing_price_calcul.partner_clients.user_id IS 'ID пользователя, если клиент зарегистрировался самостоятельно';
COMMENT ON COLUMN t_p60076574_landing_price_calcul.partner_clients.ref_code IS 'Реферальный код, по которому пришёл клиент';
COMMENT ON COLUMN t_p60076574_landing_price_calcul.partner_clients.source IS 'Источник: partner=добавлен партнёром, referral=по реферальной ссылке, self=самостоятельная регистрация';
