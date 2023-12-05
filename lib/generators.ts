import { randomBytes } from 'crypto';

const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const integers = '0123456789';
const specials = '!@#$%^&*()[]{}_-=+';

type Options = {
  length?: number;
  hasNumber?: boolean;
  hasSpecial?: boolean;
  exclude?: 'lower' | 'upper';
};

export const generatePassword = (options?: Options) => {
  let chars = lowerCase + upperCase;

  const { length = 48, hasNumber = true, hasSpecial = true, exclude } = options ?? {};

  const bytes = randomBytes(length);

  if (exclude === 'lower') {
    chars = lowerCase;
  }

  if (exclude === 'upper') {
    chars = upperCase;
  }

  if (hasNumber) {
    chars += integers;
  }

  if (hasSpecial) {
    chars += specials;
  }

  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(bytes.readUInt8(i) % chars.length);
  }

  return result;
};

export const randomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};
