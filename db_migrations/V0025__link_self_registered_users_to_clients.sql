-- Создаём системного партнёра (от имени admin, id=3) для клиентов без партнёра
INSERT INTO t_p60076574_landing_price_calcul.partners (user_id, ref_code, status)
SELECT 3, 'SYSTEM', 'active'
WHERE NOT EXISTS (
  SELECT 1 FROM t_p60076574_landing_price_calcul.partners WHERE ref_code = 'SYSTEM'
);

-- Связываем VK-пользователя Андрея Тихомирова с его записью в partner_clients
UPDATE t_p60076574_landing_price_calcul.partner_clients
SET user_id = 5
WHERE id = 4 AND user_id IS NULL;

-- Добавляем всех клиентов, которых ещё нет в partner_clients
INSERT INTO t_p60076574_landing_price_calcul.partner_clients (partner_id, full_name, source, user_id)
SELECT
  (SELECT id FROM t_p60076574_landing_price_calcul.partners WHERE ref_code = 'SYSTEM'),
  COALESCE(u.name, u.login),
  'self',
  u.id
FROM t_p60076574_landing_price_calcul.users u
WHERE u.role = 'client'
  AND u.id NOT IN (
    SELECT user_id FROM t_p60076574_landing_price_calcul.partner_clients WHERE user_id IS NOT NULL
  );
