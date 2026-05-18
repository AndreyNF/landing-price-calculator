UPDATE t_p60076574_landing_price_calcul.services
SET base_price = 25000, price_note = '25 000 ₽'
WHERE category = 'Для юристов' AND name = 'Анализ дела';

UPDATE t_p60076574_landing_price_calcul.services
SET base_price = 30000, price_note = '30 000 ₽'
WHERE category = 'Для юристов' AND name = 'Отзыв / процессуальный документ';

UPDATE t_p60076574_landing_price_calcul.services
SET base_price = 45000, price_note = '45 000 ₽'
WHERE category = 'Для юристов' AND name = 'Иск по налоговому спору';
