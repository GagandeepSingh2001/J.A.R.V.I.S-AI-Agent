import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WelcomeProps {
  disabled: boolean;
  startButtonText: string;
  onStartCall: () => void;
}

export const Welcome = ({
  disabled,
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeProps) => {
  return (
    <section
      ref={ref}
      inert={disabled}
      style={{
        backgroundImage: `url('/bg_gif.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className={cn(
        `fixed inset-0 mx-auto flex h-svh flex-col items-center justify-center text-center`,
        disabled ? 'z-10' : 'z-20'
      )}
    >
      <span className="absolute bottom-10">
        <Button
          variant="primary"
          size="lg"
          onClick={onStartCall}
          className="mt-6 w-64 font-mono text-white"
        >
          {startButtonText}
        </Button>
      </span>
    </section>
  );
};
