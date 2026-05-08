ALTER TABLE t_p60076574_landing_price_calcul.users ADD COLUMN IF NOT EXISTS deactivated BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE t_p60076574_landing_price_calcul.partners ADD COLUMN IF NOT EXISTS deactivated BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE t_p60076574_landing_price_calcul.users SET email = '89126596756@mail.ru', name = 'Тататв' WHERE id = 2;
UPDATE t_p60076574_landing_price_calcul.users SET deactivated = TRUE WHERE id = 6;
UPDATE t_p60076574_landing_price_calcul.partners SET deactivated = TRUE WHERE id = 1 AND ref_code != 'SYSTEM';
