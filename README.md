# Doctor Website

## Qisqacha
Shifokor uchun ko‘p tilli (uz/ru/en) Vite + React asosidagi to‘liq veb‑sayt. Sayt moslashuvchan (responsive), asosiy yo‘nalishlar, operatsiyalar, klinik holatlar, aloqa va sharhlar bo‘limlarini o‘z ichiga oladi.

## Saytda Qilingan Ishlar (To‘liq Ro‘yxat)
- Loyihaning umumiy arxitekturasi: Vite + React + TypeScript.
- Routing va sahifalar:
  - Bosh sahifa (Hero, yo‘nalishlar, shifokor haqida, rasmlar, sharhlar).
  - About (tajriba, a’zoliklar, stajirovkalar, stats).
  - Operations: genital/urology/plastic bo‘limlari.
  - Cases (klinikal misollar galereyasi/karusel).
  - Contact (aloqa, mapa, QR, forma).
  - News sahifasi (skeleton/placeholder).
- I18n: uz/ru/en tarjimalar va til almashtirish.
- Sharhlar bo‘limi:
  - Karusel UI.
  - “Fikr bildirish” modal formasi.
  - Supabase orqali sharhlarni saqlash va o‘qish.
- Contact form: Telegram bot orqali murojaat yuborish.
- SEO: Breadcrumb JSON‑LD.
- UI/UX:
  - Header scroll animatsiyasi (silliq chiqish/tushish).
  - Mobile menu va responsive navigatsiya.
  - Tailwind asosidagi dizayn va komponentlar.

## Supabase Sozlash (Sharhlar)
### Environment Variables
Vercel va lokalda quyidagilar bo‘lishi kerak:
```
VITE_SUPABASE_URL=https://crdwxieahtoiwisvvfqs.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### Jadval (SQL)
```sql
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Public read reviews"
  on public.reviews
  for select
  using (true);

create policy "Public insert reviews"
  on public.reviews
  for insert
  with check (char_length(full_name) >= 2 and char_length(message) >= 5);

create index reviews_created_at_idx on public.reviews (created_at desc);
```

## Narx Taklifi (To‘liq Sayt)
Quyidagi diapazonlar O‘zbekiston bozorida bajarilgan ishlar uchun tavsiya etiladi:
- Umumiy frontend (UI, responsive, sahifalar, routing): 12–20 mln so‘m
- I18n (3 til), content integratsiya: 3–6 mln so‘m
- Sharhlar moduli + Supabase integratsiya: 3–6 mln so‘m
- Contact form + Telegram integratsiya: 2–4 mln so‘m
- SEO (Breadcrumb JSON‑LD), yakuniy polishing: 1–2 mln so‘m

Umumiy: 21–38 mln so‘m

Eslatma: Yakuniy narx muddat, qo‘shimcha talablar, kontent tayyorligi va deploy shartlariga qarab kelishiladi.

## Ishga Tushirish
```
npm install
npm run dev
```

## Build
```
npm run build
```
