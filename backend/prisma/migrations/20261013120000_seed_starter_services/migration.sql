INSERT INTO "Service" ("id", "name", "durationMin", "isActive")
VALUES
  ('00000000-0000-4000-8000-000000000101', 'Initial consultation', 30, true),
  ('00000000-0000-4000-8000-000000000102', 'Follow-up consultation', 30, true),
  ('00000000-0000-4000-8000-000000000103', 'Standard appointment', 45, true),
  ('00000000-0000-4000-8000-000000000104', 'Extended appointment', 90, true),
  ('00000000-0000-4000-8000-000000000105', 'Express appointment', 15, true),
  ('00000000-0000-4000-8000-000000000106', 'Wellness session', 60, true),
  ('00000000-0000-4000-8000-000000000107', 'Planning session', 60, true),
  ('00000000-0000-4000-8000-000000000108', 'Review appointment', 30, true),
  ('00000000-0000-4000-8000-000000000109', 'Support session', 45, true),
  ('00000000-0000-4000-8000-000000000110', 'Comprehensive consultation', 90, true)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "BusinessHour" ("id", "serviceId", "weekday", "openMin", "closeMin")
SELECT
  service."id" || '-weekday-' || weekday,
  service."id",
  weekday,
  540,
  1020
FROM "Service" AS service
CROSS JOIN generate_series(0, 6) AS weekdays(weekday)
WHERE service."id" IN (
  '00000000-0000-4000-8000-000000000101',
  '00000000-0000-4000-8000-000000000102',
  '00000000-0000-4000-8000-000000000103',
  '00000000-0000-4000-8000-000000000104',
  '00000000-0000-4000-8000-000000000105',
  '00000000-0000-4000-8000-000000000106',
  '00000000-0000-4000-8000-000000000107',
  '00000000-0000-4000-8000-000000000108',
  '00000000-0000-4000-8000-000000000109',
  '00000000-0000-4000-8000-000000000110'
)
ON CONFLICT ("serviceId", "weekday") DO NOTHING;
