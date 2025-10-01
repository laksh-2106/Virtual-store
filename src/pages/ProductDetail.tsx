import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, totalItems } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load product",
          variant: "destructive",
        });
        navigate("/products");
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const handleAddToCart = () => {
    if (!product) return;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navbar cartItemsCount={totalItems} />
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar cartItemsCount={totalItems} />
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img
              src={imageMap[product.name] || product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            {product.category && (
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
            )}
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg mb-6">
              {product.description}
            </p>
            <p className="text-4xl font-bold text-primary mb-8">
              ${parseFloat(product.price).toFixed(2)}
            </p>
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-primary to-primary-glow"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <p className="text-sm text-muted-foreground">
                In stock: {product.stock} units available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
