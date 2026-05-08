ALTER TABLE t_p60076574_landing_price_calcul.partners
  ADD COLUMN IF NOT EXISTS individual_full_name text NULL,
  ADD COLUMN IF NOT EXISTS individual_birth_date character varying(20) NULL,
  ADD COLUMN IF NOT EXISTS individual_passport_series character varying(10) NULL,
  ADD COLUMN IF NOT EXISTS individual_passport_number character varying(10) NULL,
  ADD COLUMN IF NOT EXISTS individual_passport_issued_by text NULL,
  ADD COLUMN IF NOT EXISTS individual_passport_issued_date character varying(20) NULL,
  ADD COLUMN IF NOT EXISTS individual_registration_address text NULL,
  ADD COLUMN IF NOT EXISTS individual_snils character varying(20) NULL;
