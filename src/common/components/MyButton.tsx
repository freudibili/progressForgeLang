import { Button as TamaguiButton, styled, GetProps } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: 'black',
  color: 'white',
  fontWeight: '600',
  fontSize: '$4',
  height: '$4',
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
        borderRadius: '$2',
        paddingHorizontal: '$2',
        height: '$3',
        fontSize: '$3'
      },
      medium: {
        borderRadius: '$3',
        paddingHorizontal: '$3',
        height: '$4',
        fontSize: '$4'
      },
      large: {
        borderRadius: '$4',
        paddingHorizontal: '$4',
        height: '$5',
        fontSize: '$5'
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
