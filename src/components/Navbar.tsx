import { ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  cartItemsCount?: number;
}

export const Navbar = ({ cartItemsCount = 0 }: NavbarProps) => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Store className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            LuxeStore
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/products">
            <Button variant="ghost">Products</Button>
          </Link>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Admin
          </Link>
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
