import { Heart, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { cn } from '@/lib/utils';
import { formatPrice, getCategoryColor, type Product } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, cart } = useStore();
  const { toast } = useToast();
  const categoryColor = getCategoryColor(product.categoryId);
  const inWishlist = isInWishlist(product.id);
  const inCart = cart.some(item => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({
      title: 'به سبد خرید اضافه شد',
      description: product.name,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'از لیست علاقه‌مندی‌ها حذف شد',
        description: product.name,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'به لیست علاقه‌مندی‌ها اضافه شد',
        description: product.name,
      });
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'group bg-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300',
        'border border-border/40 hover:border-border/60',
        'hover:shadow-lg hover:-translate-y-0.5'
      )}
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)'
      }}
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'absolute top-2.5 left-2.5 w-8 h-8 bg-white/90 backdrop-blur-sm shadow-sm',
            'hover:bg-white transition-colors',
            inWishlist && 'text-red-400'
          )}
          onClick={handleToggleWishlist}
          data-testid={`wishlist-btn-${product.id}`}
        >
          <Heart className={cn('w-4 h-4', inWishlist && 'fill-current')} strokeWidth={1.5} />
        </Button>

        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge className="bg-emerald-500/90 text-white text-[10px] px-2 py-0.5 font-medium shadow-sm">جدید</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="text-white text-[10px] px-2 py-0.5 font-medium shadow-sm" style={{ backgroundColor: '#B8956F' }}>پرفروش</Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-red-400/90 text-white text-[10px] px-2 py-0.5 font-medium shadow-sm">
              {Math.round((1 - product.price / product.originalPrice) * 100)}٪
            </Badge>
          )}
        </div>
      </div>

      <div className="p-3.5">
        <p className="text-[11px] text-muted-foreground/70 mb-1 font-medium">{product.brand}</p>
        <h3 className="font-medium text-sm text-foreground/90 line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {product.name}
        </h3>
        
        <div className="mt-2">
          <StarRating rating={product.rating} size="sm" reviewCount={product.reviewCount} />
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-foreground/90">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-muted-foreground/60 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={cn(
              'transition-all duration-200 shadow-sm h-8 px-3',
              inCart ? 'bg-emerald-500 hover:bg-emerald-600' : ''
            )}
            style={!inCart ? { backgroundColor: categoryColor } : undefined}
            data-testid={`add-to-cart-${product.id}`}
          >
            {inCart ? (
              <Check className="w-4 h-4" strokeWidth={2} />
            ) : (
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
