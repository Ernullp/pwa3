import { cn } from '@/lib/utils';
import type { Category } from '@/lib/data';
import CategoryIcon from './CategoryIcon';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
  compact?: boolean;
}

export default function CategoryCard({ category, onClick, compact = false }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-visible rounded-xl transition-all duration-300',
        'bg-card hover:shadow-lg active:scale-[0.98]',
        'border border-border/40 hover:border-border/60',
        compact ? 'p-3' : 'p-5'
      )}
      style={{
        boxShadow: `0 2px 8px ${category.color}08, 0 1px 3px ${category.color}05`,
      }}
      data-testid={`category-card-${category.id}`}
    >
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div 
          className={cn(
            'rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105',
            compact ? 'w-11 h-11' : 'w-16 h-16'
          )}
          style={{ 
            background: `linear-gradient(145deg, ${category.color}12, ${category.color}20)`,
            border: `1px solid ${category.color}25`,
          }}
        >
          <CategoryIcon 
            categoryId={category.id} 
            color={category.color} 
            size={compact ? 'sm' : 'md'}
          />
        </div>
        <div>
          <h3 className={cn(
            'font-medium text-foreground/85 transition-colors group-hover:text-foreground',
            compact ? 'text-[11px]' : 'text-sm'
          )}>
            {category.name}
          </h3>
          {!compact && (
            <p className="text-xs text-muted-foreground/70 mt-1">
              {new Intl.NumberFormat('fa-IR').format(category.productCount)} محصول
            </p>
          )}
        </div>
      </div>
      <div
        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: category.color }}
      />
    </button>
  );
}
