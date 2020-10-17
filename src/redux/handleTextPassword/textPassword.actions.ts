export enum ITextPassword {
  SWITH_TEXT = 'SWITH_TEXT'
}

export const switchText = () => {
  console.log('callled');
  return { type: ITextPassword.SWITH_TEXT };
};
