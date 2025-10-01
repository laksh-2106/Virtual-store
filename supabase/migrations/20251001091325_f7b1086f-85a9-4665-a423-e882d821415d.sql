-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Public can read products
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

-- Admin can manage products (we'll add admin auth later)
CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (true);

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (true);

-- Public can read orders (for now, will restrict later)
CREATE POLICY "Orders are viewable by everyone"
  ON public.orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- Order items policies
CREATE POLICY "Order items are viewable by everyone"
  ON public.order_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create order items"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

-- Insert some sample products
INSERT INTO public.products (name, description, price, category, stock, image_url) VALUES
  ('Premium Wireless Headphones', 'High-quality noise-canceling headphones with superior sound', 299.99, 'Electronics', 50, '/placeholder.svg'),
  ('Smart Watch Pro', 'Advanced fitness tracking and notifications', 399.99, 'Electronics', 30, '/placeholder.svg'),
  ('Leather Laptop Bag', 'Elegant genuine leather bag for professionals', 149.99, 'Accessories', 25, '/placeholder.svg'),
  ('Ergonomic Office Chair', 'Comfortable chair with lumbar support', 449.99, 'Furniture', 15, '/placeholder.svg'),
  ('Portable SSD 1TB', 'Fast and reliable external storage', 179.99, 'Electronics', 40, '/placeholder.svg'),
  ('Designer Sunglasses', 'Stylish UV protection eyewear', 199.99, 'Accessories', 60, '/placeholder.svg');