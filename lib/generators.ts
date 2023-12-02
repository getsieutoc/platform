import { randomBytes } from 'crypto';

const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const integers = '0123456789';
const specialCharacters = '!@#$%^&*()[]{}_-=+';

type Options = {
  hasNumber?: boolean;
  hasSpecial?: boolean;
  onlyLowerCase?: boolean;
  onlyUpperCase?: boolean;
};

export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generatePassword = (length = 32, options?: Options) => {
  let chars = lowerCase + upperCase;

  const {
    hasNumber = true,
    hasSpecial = true,
    onlyLowerCase = false,
    onlyUpperCase = false,
  } = options ?? {};

  if (onlyLowerCase) {
    chars = lowerCase;
  }

  if (onlyUpperCase) {
    chars = upperCase;
  }

  if (hasNumber) {
    chars += integers;
  }

  if (hasSpecial) {
    chars += specialCharacters;
  }

  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(randomNumber(chars.length));
  }

  return code;
};

export const generateSecret = (l = 32) => randomBytes(l).toString('base64');
