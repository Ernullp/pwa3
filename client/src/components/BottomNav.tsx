import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

interface NavItem {
  id: string;
  label: string;
  icon: JSX.Element;
  badge?: number;
}

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavIcon = ({ id, isActive }: { id: string; isActive: boolean }) => {
  const color = isActive ? '#C9A07A' : 'currentColor';
  const strokeWidth = 1.5;
  
  const icons: Record<string, JSX.Element> = {
    home: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path 
          d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill={isActive ? `${color}15` : 'none'}
        />
      </svg>
    ),
    categories: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} fill={isActive ? `${color}15` : 'none'} />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} fill={isActive ? `${color}15` : 'none'} />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} fill={isActive ? `${color}15` : 'none'} />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth={strokeWidth} fill={isActive ? `${color}15` : 'none'} />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <circle cx="11" cy="11" r="7" stroke={color} strokeWidth={strokeWidth} />
        <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path 
          d="M6 6h15l-1.5 9h-12L6 6z" 
          stroke={color} 
          strokeWidth={strokeWidth} 
          strokeLinejoin="round"
          fill={isActive ? `${color}15` : 'none'}
        />
        <path d="M6 6L5 3H2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.5" fill={color} />
        <circle cx="18" cy="20" r="1.5" fill={color} />
      </svg>
    ),
    profile: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={strokeWidth} fill={isActive ? `${color}15` : 'none'} />
        <path d="M4 21c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    ),
  };
  
  return icons[id] || icons.home;
};

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { getCartCount } = useStore();
  const cartCount = getCartCount();

  const navItems: { id: string; label: string; badge?: number }[] = [
    { id: 'home', label: 'خانه' },
    { id: 'categories', label: 'دسته‌ها' },
    { id: 'search', label: 'جستجو' },
    { id: 'cart', label: 'سبد', badge: cartCount },
    { id: 'profile', label: 'حساب' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-md border-t border-border/30 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground/70'
              )}
              data-testid={`nav-${item.id}`}
            >
              <div className="relative">
                <NavIcon id={item.id} isActive={isActive} />
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge 
                    className="absolute -top-1.5 -left-1.5 h-4 w-4 p-0 flex items-center justify-center text-[9px] text-white"
                    style={{ backgroundColor: '#C9A07A' }}
                  >
                    {item.badge > 9 ? '۹+' : new Intl.NumberFormat('fa-IR').format(item.badge)}
                  </Badge>
                )}
              </div>
              <span className={cn(
                'text-[10px] font-medium transition-colors',
                isActive ? 'text-foreground/90' : 'text-muted-foreground/70'
              )}>
                {item.label}
              </span>
              {isActive && (
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-b-full"
                  style={{ backgroundColor: '#C9A07A' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
