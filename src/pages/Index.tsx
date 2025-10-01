import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBgImg from "@/assets/hero-bg.jpg";
import headphonesImg from "@/assets/headphones.jpg";
import smartwatchImg from "@/assets/smartwatch.jpg";
import laptopBagImg from "@/assets/laptop-bag.jpg";
import officeChairImg from "@/assets/office-chair.jpg";
import ssdImg from "@/assets/ssd.jpg";
import sunglassesImg from "@/assets/sunglasses.jpg";

const imageMap: Record<string, string> = {
  "Premium Wireless Headphones": headphonesImg,
  "Smart Watch Pro": smartwatchImg,
  "Leather Laptop Bag": laptopBagImg,
  "Ergonomic Office Chair": officeChairImg,
  "Portable SSD 1TB": ssdImg,
  "Designer Sunglasses": sunglassesImg,
};

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").limit(3);
      setFeaturedProducts(data || []);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: imageMap[product.name] || product.image_url,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar cartItemsCount={totalItems} />
      
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/80" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Welcome to LuxeStore
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover premium products that elevate your lifestyle
          </p>
          <Link to="/products">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg">
            Hand-picked selection of our best items
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={parseFloat(product.price)}
              imageUrl={imageMap[product.name] || product.image_url}
              category={product.category}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
        <div className="text-center">
          <Link to="/products">
            <Button size="lg" variant="outline">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
