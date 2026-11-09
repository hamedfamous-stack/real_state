import { useFavorites } from '@/context/FavoritesContext'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

interface FavoriteButtonProps {
  slug: string
  name: string
  className?: string
  tone?: 'light' | 'dark'
}

export function FavoriteButton({ slug, name, className, tone = 'light' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(slug)

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved properties` : `Save ${name} to your list`}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(slug)
      }}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ease-premium',
        tone === 'light'
          ? saved
            ? 'bg-champagne text-navy-950'
            : 'bg-white/90 text-navy hover:bg-white'
          : saved
            ? 'bg-champagne text-navy-950'
            : 'bg-navy-950/50 text-white hover:bg-navy-950/70',
        className,
      )}
    >
      <Icon name="heart" size={17} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
