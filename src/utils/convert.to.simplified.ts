import * as OpenCC from 'opencc-js';

export const convertToSimplified = (str: string) => {
  const converter = OpenCC.Converter({ from: 'hk', to: 'cn' });
  return converter(str);
};
