import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  onAddToCart: () => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
      <Link to={`/product/${id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        {category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            {category}
          </p>
        )}
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-2xl font-bold text-primary">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onAddToCart}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
