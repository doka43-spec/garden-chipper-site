ALTER TABLE t_p11111449_garden_chipper_site.reviews ADD COLUMN IF NOT EXISTS hidden BOOLEAN DEFAULT FALSE;

UPDATE t_p11111449_garden_chipper_site.reviews SET hidden = TRUE WHERE author = 'Тест';