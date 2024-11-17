import { createSystem, defaultConfig } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

// export const toastOptions: { defaultOptions?: UseToastOptions } = {
//   defaultOptions: {
//     position: 'top-right',
//     duration: 3000,
//     status: 'success',
//     isClosable: true,
//   },
// };

const getColorMode = () => {
  if (typeof window !== 'undefined') {
    return window?.localStorage.getItem('chakra-ui-color-mode') ?? 'system';
  }

  return 'system';
};

// const config = {
//   initialColorMode: 'system',
//   useSystemColorMode: getColorMode() === 'system',
// };

const colors = {
  brand: {
    50: '#fff7db',
    100: '#ffeaae',
    200: '#fde17e',
    300: '#fdda4d',
    400: '#fcd81d',
    500: '#e2af03',
    600: '#b07d00',
    700: '#7e5100',
    800: '#4b2b00',
    900: '#1b0c00',
  },
  yellowAlpha: {
    50: 'rgba(236, 201, 75, 0.04)',
    100: 'rgba(236, 201, 75, 0.06)',
    200: 'rgba(236, 201, 75, 0.08)',
    300: 'rgba(236, 201, 75, 0.16)',
    400: 'rgba(236, 201, 75, 0.24)',
    500: 'rgba(236, 201, 75, 0.36)',
    600: 'rgba(236, 201, 75, 0.48)',
    700: 'rgba(236, 201, 75, 0.64)',
    800: 'rgba(236, 201, 75, 0.80)',
    900: 'rgba(236, 201, 75, 0.92)',
  },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    '.text-editor-inner > div': {
      height: '100%',
    },

    '.text-editor': {
      height: '100%',
      width: '100%',
      paddingY: 2,
      paddingX: 4,
      borderWidth: '1px',
      borderRadius: 'md',
      borderColor: 'inherit',
      fontSize: 'md',
    },

    '.raf-activity': {
      paddingY: 2,

      'div:first-of-type': {
        padding: '0 !important',
      },

      '.raf-user-bar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '.raf-user-bar__username': {
          fontWeight: 'bold',
        },
        '.raf-user-bar__extra': {
          fontSize: 'unset',
        },
      },
    },
    body: {
      bg: mode('gray.100', 'gray.800')(props),
    },
    '.some-global-class': {
      paddingY: 2,
    },

    a: {
      // Fix issue links wrap outside of button have ugly sharp corners
      borderRadius: 'md',
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'none',
      },
    },
  }),
};

const components = {
  Button: {
    variants: {
      link: {
        _hover: {
          color: 'brand.500',
          textDecoration: 'none',
        },
      },
    },
  },
  Input: {
    variants: {
      expanding: () => ({
        field: {
          // Merge default styles
          // ...mode('light')(props).field,
          // ...mode('dark')(props).field,
          background: 'transperant',
          width: '50%',
          transition: 'width 0.3s',
          _focus: {
            width: '100%',
          },
        },
      }),
    },
  },
};

export const system = createSystem(defaultConfig, {
  theme: {
    // colors,
    // components,
    // styles,
  },
});
