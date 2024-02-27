import {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type TFieldValidationRule = {
  validateInput: (input: string) => boolean;
  validationMessage: string;
};

export type TFieldValidation = {
  handleBlur: FocusEventHandler<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isValid: boolean;
  validationMessage: string | null;
};

export const useFieldValidation = (
  rules: TFieldValidationRule[],
): TFieldValidation => {
  const [isValid, setIsValid] = useState(true);

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.target;

      setIsValid(true);
      setValidationMessage(null);

      for (const {
        validateInput,
        validationMessage: singleValidationMessage,
      } of rules) {
        const isSingleRuleValid = validateInput(value);

        if (!isSingleRuleValid) {
          setIsValid(false);
          setValidationMessage(singleValidationMessage);
          break;
        }
      }
    },
    [rules],
  );

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.target;

      setIsValid(true);

      for (const { validateInput } of rules) {
        const isSingleRuleValid = validateInput(value);

        if (!isSingleRuleValid) {
          setIsValid(false);
          break;
        }
      }
    },
    [rules],
  );

  return useMemo(
    () => ({
      handleBlur,
      handleChange,
      isValid,
      validationMessage,
    }),
    [handleBlur, handleChange, isValid, validationMessage],
  );
};
