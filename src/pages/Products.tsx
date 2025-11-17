import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
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

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase.from("products").select("*");
    if (fetchError) {
      console.error("Error fetching products:", fetchError);
      setError("Unable to connect to the backend. It may still be waking up.");
      toast({
        title: "Connection Error",
        description: "Backend is initializing. Please wait a moment and try again.",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
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
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          All Products
        </h1>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <p className="text-destructive text-center">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
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
        )}
      </div>
    </div>
  );
};

export default Products;
