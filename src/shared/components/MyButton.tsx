import { Button as TamaguiButton, styled } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$gray12',
  color: 'white',
  borderRadius: '$3',
  paddingHorizontal: '$3',
  height: '$4',
  fontSize: '$4',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$gray12',
        color: 'white'
      },
      secondary: {
        backgroundColor: '$gray4',
        color: '$gray12'
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
        height: '$3',
        fontSize: '$3',
        paddingHorizontal: '$2'
      },
      large: {
        height: '$5',
        fontSize: '$5',
        paddingHorizontal: '$4'
      }
    }
  },

  defaultVariants: {
    variant: 'primary'
  }
});

// Usage example:
// <Button variant="primary" icon={<Icon />}>Click me</Button>
