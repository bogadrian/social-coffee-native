export enum ITextPassword {
  SWITH_TEXT = 'SWITH_TEXT'
}

export const switchText = () => {
  return { type: ITextPassword.SWITH_TEXT };
};
