import { Button as TamaguiButton, styled, GetProps } from 'tamagui';

export const Button = styled(TamaguiButton, {
  backgroundColor: 'black',
  color: 'white',
  fontWeight: '600',

  variants: {
    variant: {
      primary: {
        backgroundColor: 'black',
        color: 'white'
      },
      secondary: {
        backgroundColor: '$gray4',
        color: '$gray12',
        fontWeight: '400'
      },
      danger: {
        backgroundColor: '$red10',
        color: 'white'
      },
      success: {
        backgroundColor: '$green10',
        color: 'white'
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$gray8',
        color: '$gray12'
      }
    },
    size: {
      small: {
        borderRadius: '$2'
      },
      medium: {
        borderRadius: '$3'
      },
      large: {
        borderRadius: '$4'
      }
    }
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'medium'
  }
});

export type ButtonProps = GetProps<typeof Button>;

// Usage example:
// <Button variant="primary" icon={<Icon />}>Click me</Button>
