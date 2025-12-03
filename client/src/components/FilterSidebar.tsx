import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { brands, categories, formatPrice } from '@/lib/data';
import { useStore } from '@/lib/store';
import StarRating from './StarRating';
import CategoryIcon from './CategoryIcon';

interface FilterSidebarProps {
  onFilterChange?: () => void;
}

function FilterContent({ onFilterChange }: FilterSidebarProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedBrands,
    setSelectedBrands,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    resetFilters,
  } = useStore();

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brandId: string) => {
    const newBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId];
    setSelectedBrands(newBrands);
    onFilterChange?.();
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    onFilterChange?.();
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating === minRating ? 0 : rating);
    onFilterChange?.();
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className="text-sm font-medium mb-2.5 block text-foreground/80">مرتب‌سازی</label>
        <Select value={sortBy} onValueChange={(v) => { setSortBy(v as typeof sortBy); onFilterChange?.(); }}>
          <SelectTrigger data-testid="sort-select" className="bg-muted/30 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="cheapest">ارزان‌ترین</SelectItem>
            <SelectItem value="expensive">گران‌ترین</SelectItem>
            <SelectItem value="rating">بالاترین امتیاز</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-sm font-medium mb-3 text-foreground/80"
        >
          <span>دسته‌بندی</span>
          {expandedSections.category ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSections.category && (
          <div className="flex flex-col gap-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => { setSelectedCategory(category.id === selectedCategory ? null : category.id); onFilterChange?.(); }}
                className={cn(
                  'flex items-center gap-2.5 p-2.5 rounded-lg text-sm text-right transition-colors',
                  selectedCategory === category.id 
                    ? 'bg-muted' 
                    : 'hover:bg-muted/50'
                )}
                data-testid={`filter-category-${category.id}`}
              >
                <CategoryIcon categoryId={category.id} color={category.color} size="xs" />
                <span className="flex-1 text-foreground/80">{category.name}</span>
                <span className="text-xs text-muted-foreground/70">
                  {new Intl.NumberFormat('fa-IR').format(category.productCount)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-sm font-medium mb-3 text-foreground/80"
        >
          <span>محدوده قیمت</span>
          {expandedSections.price ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSections.price && (
          <div className="px-1">
            <Slider
              value={priceRange}
              min={0}
              max={2000000}
              step={50000}
              onValueChange={handlePriceChange}
              className="mt-4"
              data-testid="price-slider"
            />
            <div className="flex justify-between mt-3 text-xs text-muted-foreground/70">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full text-sm font-medium mb-3 text-foreground/80"
        >
          <span>برند</span>
          {expandedSections.brand ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSections.brand && (
          <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto">
            {brands.map(brand => (
              <label
                key={brand.id}
                className="flex items-center gap-2.5 text-sm cursor-pointer text-foreground/80"
              >
                <Checkbox
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() => handleBrandToggle(brand.id)}
                  data-testid={`filter-brand-${brand.id}`}
                />
                <span>{brand.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-sm font-medium mb-3 text-foreground/80"
        >
          <span>حداقل امتیاز</span>
          {expandedSections.rating ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </button>
        {expandedSections.rating && (
          <div className="flex flex-col gap-1.5">
            {[4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={cn(
                  'flex items-center gap-2.5 p-2.5 rounded-lg transition-colors',
                  minRating === rating ? 'bg-muted' : 'hover:bg-muted/50'
                )}
                data-testid={`filter-rating-${rating}`}
              >
                <StarRating rating={rating} size="sm" />
                <span className="text-xs text-muted-foreground/70">و بالاتر</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => { resetFilters(); onFilterChange?.(); }}
        className="w-full border-border/50 hover:bg-muted/50"
        data-testid="reset-filters"
      >
        <X className="w-4 h-4 ml-2" strokeWidth={1.5} />
        پاک کردن فیلترها
      </Button>
    </div>
  );
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-32 bg-card rounded-xl border border-border/40 p-5 shadow-sm">
          <h2 className="font-semibold text-base mb-5 flex items-center gap-2.5 text-foreground/90">
            <SlidersHorizontal className="w-5 h-5" strokeWidth={1.5} />
            فیلترها
          </h2>
          <FilterContent onFilterChange={onFilterChange} />
        </div>
      </aside>

      <Drawer>
        <DrawerTrigger asChild>
          <Button 
            variant="outline" 
            className="lg:hidden fixed bottom-24 left-4 z-40 shadow-lg bg-card border-border/50 hover:bg-muted/50" 
            data-testid="mobile-filter-btn"
          >
            <SlidersHorizontal className="w-4 h-4 ml-2" strokeWidth={1.5} />
            فیلترها
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[65vh]">
          <DrawerHeader className="border-b border-border/30 pb-4">
            <DrawerTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 text-foreground/90">
                <SlidersHorizontal className="w-5 h-5" strokeWidth={1.5} />
                فیلترها
              </span>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </Button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-5 overflow-y-auto">
            <FilterContent onFilterChange={onFilterChange} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
