export type TPlaceholder = Record<string, number | string>;

export const getTextWithVariables = (text: string, variables?: object) => {
  if (!variables) return text;

  return [...Object.entries(variables)].reduce(
    (replacedText, [variable, curText]) => replacedText?.replace(`{{${variable}}}`, `${curText}`),
    text
  );
};
