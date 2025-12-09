import { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  accent: string;
}

interface HeroBannerProps {
  onButtonClick?: (link: string) => void;
}

const slides: BannerSlide[] = [
  {
    id: '1',
    title: 'تخفیف ویژه زمستانه',
    subtitle: 'تا ۵۰٪ تخفیف روی بهترین محصولات مراقبت پوست',
    badge: 'پیشنهاد ویژه',
    buttonText: 'مشاهده محصولات',
    buttonLink: '/category/skincare',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80',
    accent: '#C9A07A',
  },
  {
    id: '2',
    title: 'کالکشن جدید آرایشی',
    subtitle: 'برندهای معتبر جهانی با ضمانت اصالت کالا',
    badge: 'جدید',
    buttonText: 'کشف کنید',
    buttonLink: '/category/face-makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80',
    accent: '#7BA3A8',
  },
  {
    id: '3',
    title: 'عطرهای اصل و اورجینال',
    subtitle: 'مجموعه‌ای منحصربه‌فرد از بهترین رایحه‌های دنیا',
    badge: 'اورجینال',
    buttonText: 'خرید کنید',
    buttonLink: '/category/perfume',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80',
    accent: '#9B8AA5',
  },
];

export default function HeroBanner({ onButtonClick }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div 
      className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] overflow-hidden rounded-2xl shadow-lg"
      data-testid="hero-banner"
    >
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-transparent" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-5 md:px-8">
          <div className="max-w-lg text-white">
            {slide.badge && (
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-3 backdrop-blur-md"
                style={{ backgroundColor: `${slide.accent}40`, border: `1px solid ${slide.accent}60` }}
              >
                <Sparkles className="w-3 h-3" />
                {slide.badge}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight tracking-tight">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base opacity-90 mb-4 leading-relaxed line-clamp-2">
              {slide.subtitle}
            </p>
            <Button
              size="sm"
              onClick={() => onButtonClick?.(slide.buttonLink)}
              className="text-white border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 h-9 text-sm"
              style={{ backgroundColor: `${slide.accent}90` }}
              data-testid={`banner-btn-${slide.id}`}
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 w-8 h-8"
        data-testid="banner-prev"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20 w-8 h-8"
        data-testid="banner-next"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
      </Button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              index === currentSlide
                ? 'w-6 bg-white'
                : 'w-1.5 bg-white/40 hover:bg-white/60'
            )}
            data-testid={`banner-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
