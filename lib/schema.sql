-- ═══════════════════════════════════════════════════════════════════
-- THE SCULPTURE STORE — SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ═══════════════════════════════════════════════════════════════════

-- ── Enable UUID extension ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. CATEGORIES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id           TEXT PRIMARY KEY,          -- e.g. 'divine-idols'
  label        TEXT NOT NULL,
  description  TEXT,
  icon         TEXT,                      -- emoji or icon name
  image_url    TEXT,
  product_count INT DEFAULT 0,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (id, label, description, icon, sort_order) VALUES
  ('divine-idols',      'Divine Idols',          'Sacred sculptures of deities',        '🙏', 1),
  ('monuments',         'Monuments',              'Leaders, legends & iconic monuments', '🏛️', 2),
  ('car-dashboard',     'Car Dashboard Dolls',    'Divine companions for your drives',   '🚗', 3),
  ('custom-sculptures', 'Custom Sculptures',      'Your photo, your story — in 3D',      '✨', 4),
  ('temple-decor',      'Temple Architecture',    'Gopurams, pillars & shrines',         '⛩️', 5),
  ('home-decor',        'Home & Office Décor',    'Contemporary spiritual pieces',       '🏠', 6)
ON CONFLICT (id) DO NOTHING;

-- ── 2. PRODUCTS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW(),
  name           TEXT NOT NULL,
  slug           TEXT UNIQUE NOT NULL,
  description    TEXT,
  price          INT NOT NULL,            -- in paise (₹1 = 100)
  original_price INT NOT NULL,
  discount       INT DEFAULT 0,          -- percentage
  rating         NUMERIC(3,1) DEFAULT 0,
  reviews_count  INT DEFAULT 0,
  image_url      TEXT,
  image_urls     TEXT[] DEFAULT '{}',
  category       TEXT REFERENCES categories(id) ON DELETE SET NULL,
  material       TEXT,
  sizes          TEXT[] DEFAULT '{}',
  badge          TEXT,
  in_stock       BOOLEAN DEFAULT TRUE,
  featured       BOOLEAN DEFAULT FALSE,
  meta_title     TEXT,
  meta_description TEXT
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug     ON products(slug);

-- ── 3. PROFILES (extends auth.users) ──────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  full_name   TEXT,
  email       TEXT UNIQUE,
  phone       TEXT,
  avatar_url  TEXT,
  is_admin    BOOLEAN DEFAULT FALSE
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── 4. ORDERS ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW(),
  user_id               UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status                TEXT DEFAULT 'pending'
                        CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  total                 INT NOT NULL,     -- paise
  subtotal              INT NOT NULL,
  shipping              INT DEFAULT 0,
  discount              INT DEFAULT 0,
  coupon_code           TEXT,
  payment_method        TEXT,             -- 'razorpay' | 'stripe' | 'cod'
  payment_status        TEXT DEFAULT 'pending'
                        CHECK (payment_status IN ('pending','paid','failed','refunded')),
  razorpay_order_id     TEXT,
  razorpay_payment_id   TEXT,
  stripe_payment_intent TEXT,
  shipping_address      JSONB,            -- {name, phone, address, city, state, pincode}
  items                 JSONB,            -- [{product_id, name, price, qty, size, image}]
  tracking_id           TEXT,
  delivery_partner      TEXT,            -- 'shiprocket' | 'delhivery'
  notes                 TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status  ON orders(status);

-- ── 5. REVIEWS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  product_id        UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id           UUID REFERENCES profiles(id) ON DELETE SET NULL,
  rating            INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review            TEXT,
  verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count     INT DEFAULT 0,
  images            TEXT[] DEFAULT '{}',
  UNIQUE (product_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

-- ── 6. WISHLIST ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishlist (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

-- ── 7. COUPONS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code          TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount      INT NOT NULL,           -- % or paise
  min_order     INT DEFAULT 0,          -- minimum order in paise
  max_uses      INT,
  used_count    INT DEFAULT 0,
  active        BOOLEAN DEFAULT TRUE,
  expires_at    TIMESTAMPTZ
);

INSERT INTO coupons (code, discount_type, discount, min_order, active) VALUES
  ('DIVINE10', 'percentage', 10, 50000, TRUE),
  ('TSS20',    'percentage', 20, 150000, TRUE),
  ('WELCOME',  'fixed',      20000, 0, TRUE)  -- ₹200 off
ON CONFLICT (code) DO NOTHING;

-- ── 8. ROW LEVEL SECURITY (RLS) ────────────────────────────────────
ALTER TABLE products  ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders    ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews   ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist  ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Orders: users see their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create orders"   ON orders FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage orders"  ON orders
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Profiles: users manage their own
CREATE POLICY "Users can view own profile"   ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());

-- Reviews: public read, auth write
CREATE POLICY "Reviews are publicly readable" ON reviews FOR SELECT USING (TRUE);
CREATE POLICY "Users can write reviews"       ON reviews FOR INSERT WITH CHECK (user_id = auth.uid());

-- Wishlist: users manage their own
CREATE POLICY "Users manage own wishlist" ON wishlist FOR ALL USING (user_id = auth.uid());

-- ── 9. FUNCTION: Update product rating on new review ──────────────
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE products
  SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id = NEW.product_id),
      reviews_count = (SELECT COUNT(*) FROM reviews WHERE product_id = NEW.product_id)
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER after_review_insert
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();
