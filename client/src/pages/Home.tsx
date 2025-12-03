import { useState } from 'react';
import { Truck, ShieldCheck, CreditCard, RefreshCw, User } from 'lucide-react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';
import ProductDetail from '@/components/ProductDetail';
import Cart from '@/components/Cart';
import Wishlist from '@/components/Wishlist';
import BottomNav from '@/components/BottomNav';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { categories, products, getBestSellers, getNewArrivals, type Product } from '@/lib/data';
import { useStore } from '@/lib/store';

type View = 'home' | 'products' | 'product-detail' | 'cart' | 'wishlist' | 'categories' | 'search' | 'profile';

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const { setSelectedCategory, setSearchQuery } = useStore();

  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('products');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('products');
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'home':
        setCurrentView('home');
        setSelectedCategory(null);
        break;
      case 'categories':
        setCurrentView('categories');
        break;
      case 'search':
        setCurrentView('search');
        break;
      case 'cart':
        setCartOpen(true);
        break;
      case 'profile':
        setCurrentView('profile');
        break;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'product-detail':
        if (!selectedProduct) return null;
        return (
          <div className="container mx-auto px-4 py-6">
            <ProductDetail
              product={selectedProduct}
              onBack={() => setCurrentView('home')}
            />
          </div>
        );

      case 'products':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              <FilterSidebar />
              <div className="flex-1">
                <ProductGrid products={products} onProductClick={handleProductClick} />
              </div>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-2 text-foreground/90">دسته‌بندی محصولات</h2>
            <p className="text-sm text-muted-foreground/70 mb-6">انتخاب از میان بهترین برندهای آرایشی و بهداشتی</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category.id)}
                />
              ))}
            </div>
          </div>
        );

      case 'search':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              <FilterSidebar />
              <div className="flex-1">
                <ProductGrid products={products} onProductClick={handleProductClick} />
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">حساب کاربری</h2>
            <p className="text-muted-foreground">
              برای مشاهده سفارشات و اطلاعات حساب وارد شوید
            </p>
          </div>
        );

      default:
        return (
          <div className="container mx-auto px-4 py-6 space-y-8">
            {/* Hero Banner */}
            <HeroBanner onButtonClick={(link) => console.log('Banner:', link)} />

            {/* Best Sellers */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">پرفروش‌ترین‌ها</h2>
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => setCurrentView('products')}
                  data-testid="view-all-bestsellers"
                >
                  مشاهده همه
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {bestSellers.slice(0, 5).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </section>

            {/* New Arrivals */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">تازه‌ها</h2>
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => setCurrentView('products')}
                  data-testid="view-all-new"
                >
                  مشاهده همه
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {newArrivals.slice(0, 5).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </section>

            {/* All Products Preview */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">همه محصولات</h2>
                <button
                  className="text-sm text-primary hover:underline"
                  onClick={() => setCurrentView('products')}
                  data-testid="view-all-products"
                >
                  مشاهده همه
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.slice(0, 10).map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              {[
                { icon: Truck, title: 'ارسال سریع', desc: 'ارسال به سراسر کشور', color: '#7BA3A8' },
                { icon: ShieldCheck, title: 'ضمانت اصالت', desc: 'محصولات اورجینال', color: '#8AAB9B' },
                { icon: CreditCard, title: 'پرداخت امن', desc: 'درگاه پرداخت معتبر', color: '#C9A07A' },
                { icon: RefreshCw, title: 'بازگشت آسان', desc: '۷ روز ضمانت بازگشت', color: '#B8956F' },
              ].map((feature, i) => (
                <div key={i} className="text-center p-5 bg-card rounded-xl border border-border/40 shadow-sm">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}25` }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-medium text-sm text-foreground/90">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground/70 mt-1">{feature.desc}</p>
                </div>
              ))}
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0" dir="rtl">
      <Header
        onSearch={handleSearch}
        onCategorySelect={handleCategoryClick}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
      />

      <main>{renderContent()}</main>

      <BottomNav
        activeTab={currentView === 'home' ? 'home' : currentView}
        onTabChange={handleTabChange}
      />

      {/* Cart Sheet */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="left" className="w-full sm:w-[480px] overflow-y-auto">
          <div className="mt-6">
            <Cart
              onCheckout={() => {
                console.log('Checkout');
                setCartOpen(false);
              }}
              onContinueShopping={() => setCartOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Wishlist Sheet */}
      <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
        <SheetContent side="left" className="w-full sm:w-[480px] overflow-y-auto">
          <div className="mt-6">
            <Wishlist onContinueShopping={() => setWishlistOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
