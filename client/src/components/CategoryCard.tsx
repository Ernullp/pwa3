import { cn } from '@/lib/utils';
import type { Category } from '@/lib/data';
import CategoryIcon from './CategoryIcon';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  compact?: boolean;
}

// Category images mapping
const categoryImages: Record<string, string> = {
  'skincare': 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
  'makeup': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'haircare': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop',
  'fragrance': 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
  'bodycare': 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400&h=400&fit=crop',
  'nails': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
  'hygiene': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
  'lips': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
  'eyes': 'https://images.unsplash.com/photo-1583241800698-c5503bc8b33b?w=400&h=400&fit=crop',
};

export default function CategoryCard({ category, onClick, compact = false }: CategoryCardProps) {
  const categoryImage = categoryImages[category.id];

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden rounded-2xl transition-all duration-300',
        'bg-card hover:shadow-xl active:scale-[0.97]',
        'border border-border/40 hover:border-border/60',
        compact ? 'p-0' : 'p-0'
      )}
      style={{
        boxShadow: `0 2px 12px ${category.color}10, 0 1px 4px ${category.color}08`,
      }}
      data-testid={`category-card-${category.id}`}
    >
      {/* Image Background */}
      {categoryImage ? (
        <div className="relative w-full aspect-square overflow-hidden">
          <img 
            src={categoryImage} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          />
        </div>
      ) : (
        <div 
          className={cn(
            'w-full aspect-square flex items-center justify-center',
            compact ? '' : ''
          )}
          style={{ 
            background: `linear-gradient(145deg, ${category.color}15, ${category.color}25)`,
          }}
        >
          <CategoryIcon 
            categoryId={category.id} 
            color={category.color} 
            size={compact ? 'md' : 'lg'}
          />
        </div>
      )}

      {/* Content Overlay */}
      <div className={cn(
        'absolute inset-x-0 bottom-0 p-3 text-center',
        categoryImage ? 'text-white' : ''
      )}>
        <h3 className={cn(
          'font-semibold drop-shadow-lg transition-all duration-300 group-hover:scale-105',
          compact ? 'text-xs' : 'text-sm',
          categoryImage ? 'text-white' : 'text-foreground/85'
        )}>
          {category.name}
        </h3>
        {!compact && (
          <p className={cn(
            'text-[10px] mt-0.5 drop-shadow',
            categoryImage ? 'text-white/90' : 'text-muted-foreground/70'
          )}>
            {new Intl.NumberFormat('fa-IR').format(category.productCount)} محصول
          </p>
        )}
      </div>

      {/* Hover Effect Border */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: category.color }}
      />
    </button>
  );
}
