import { useState } from 'react';
import { Search, ShoppingCart, Heart, Menu, User, Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';
import { categories } from '@/lib/data';
import CategoryIcon from './CategoryIcon';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCategorySelect?: (categoryId: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
}

const valuePropositions = [
  { icon: Truck, text: 'ارسال رایگان', color: '#7BA3A8' },
  { icon: RefreshCw, text: 'ضمانت بازگشت وجه', color: '#B8956F' },
  { icon: ShieldCheck, text: 'تضمین اصالت کالا', color: '#8AAB9B' },
  { icon: CreditCard, text: 'فروش اقساطی', color: '#C9A07A' },
];

export default function Header({ onSearch, onCategorySelect, onCartClick, onWishlistClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount, wishlist, selectedCategory, setSelectedCategory } = useStore();
  const setCurrentView = (view: string) => {
    if (view === 'search') {
      onSearch?.('');
    }
  };
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect?.(categoryId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/98 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="ghost" className="text-foreground/70" data-testid="mobile-menu-btn">
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <h3 className="font-semibold text-lg text-foreground/90">دسته‌بندی‌ها</h3>
                <div className="flex flex-col gap-1">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg hover:bg-muted/60 text-right transition-colors',
                        selectedCategory === category.id && 'bg-muted'
                      )}
                    >
                      <CategoryIcon categoryId={category.id} color={category.color} size="sm" />
                      <span className="font-medium text-foreground/85">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A07A" />
                    <stop offset="100%" stopColor="#8B7355" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="19" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none" />
                <path 
                  d="M20 8c-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5 3.5-1.5 3.5-3.5S22 8 20 8zm0 8c-4 0-12 2-12 6v2h24v-2c0-4-8-6-12-6z" 
                  fill="url(#logoGrad)"
                  opacity="0.9"
                />
                <path 
                  d="M12 28c0 2.5 3.5 4.5 8 4.5s8-2 8-4.5" 
                  stroke="url(#logoGrad)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="hidden md:flex flex-col">
              <h1 className="font-semibold text-xl leading-tight tracking-tight" style={{ color: '#5A4A3A' }}>
                درمارُخ
              </h1>
              <span className="text-[10px] text-muted-foreground/80 tracking-wide">DERMAROKH</span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" strokeWidth={1.5} />
              <Input
                type="search"
                placeholder="جستجو در محصولات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-full bg-muted/30 border-border/50 focus:bg-background placeholder:text-muted-foreground/50"
                data-testid="search-input"
              />
            </div>
          </form>

          <div className="flex items-center gap-0.5">
            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden text-foreground/70" 
              onClick={() => {
                setSearchQuery('');
                setCurrentView('search');
              }}
              data-testid="mobile-search-btn"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={onWishlistClick}
              className="relative text-foreground/70 hover:text-foreground"
              data-testid="wishlist-btn"
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -left-1 h-4.5 w-4.5 p-0 flex items-center justify-center text-[10px]" style={{ backgroundColor: '#C97B7B' }}>
                  {wishlist.length > 9 ? '۹+' : new Intl.NumberFormat('fa-IR').format(wishlist.length)}
                </Badge>
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={onCartClick}
              className="relative text-foreground/70 hover:text-foreground"
              data-testid="cart-btn"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -left-1 h-4.5 w-4.5 p-0 flex items-center justify-center text-[10px]" style={{ backgroundColor: '#C9A07A' }}>
                  {cartCount > 9 ? '۹+' : new Intl.NumberFormat('fa-IR').format(cartCount)}
                </Badge>
              )}
            </Button>

            <Button size="icon" variant="ghost" className="hidden md:flex text-foreground/70 hover:text-foreground" data-testid="user-btn">
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-2.5 scrollbar-hide">
            {valuePropositions.map((prop, index) => (
              <div key={index} className="flex items-center gap-2 whitespace-nowrap shrink-0">
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${prop.color}15` }}
                >
                  <prop.icon className="w-3.5 h-3.5" style={{ color: prop.color }} strokeWidth={1.5} />
                </div>
                <span className="text-xs font-medium text-foreground/75">{prop.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="hidden md:block border-t border-border/30 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setSelectedCategory(null);
                onCategorySelect?.('');
              }}
              className={cn(
                'whitespace-nowrap text-sm',
                selectedCategory === null && 'bg-foreground/90 hover:bg-foreground/80'
              )}
            >
              همه محصولات
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className="whitespace-nowrap gap-2 text-sm"
                style={selectedCategory === category.id ? { backgroundColor: category.color, color: '#fff' } : undefined}
              >
                <CategoryIcon categoryId={category.id} color={selectedCategory === category.id ? '#fff' : category.color} size="xs" />
                <span>{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
