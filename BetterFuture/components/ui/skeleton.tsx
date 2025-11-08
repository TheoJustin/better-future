import { cn } from '@/lib/utils'

function Skeleton({ className, style, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      style={{
        flexShrink: 0,
        // Prevent style changes during animation
        willChange: 'opacity',
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
