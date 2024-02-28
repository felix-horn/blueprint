import {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type TFieldValidationRule = {
  checkIsInputValid: (input: string) => boolean;
  validationMessage: string;
};

export type TFieldValidationHook = {
  handleBlur: FocusEventHandler<HTMLInputElement>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isValid: boolean;
  validationMessage: string | null;
};

export const useFieldValidation = (
  rules: TFieldValidationRule[],
): TFieldValidationHook => {
  const [isValid, setIsValid] = useState(true);

  // On entering a field the first time, an error message only appears
  // when leaving the field with an unvalid input.
  // However, after re-entering an input field,
  // the error massage stays visible until the input is valid.
  const [wasNotValid, setWasNotValid] = useState(false);

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.target;

      setIsValid(true);
      setValidationMessage(null);

      for (const {
        checkIsInputValid,
        validationMessage: _validationMessage,
      } of rules) {
        const isSingleRuleValid = checkIsInputValid(value);

        if (!isSingleRuleValid) {
          setIsValid(false);
          setValidationMessage(_validationMessage);
          setWasNotValid(true);
          break;
        }
      }
    },
    [rules],
  );

  //
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const { value } = event.target;

      for (const {
        checkIsInputValid,
        validationMessage: iteratedValidationMessage,
      } of rules) {
        const isIteratedRuleValid = checkIsInputValid(value);

        if (isIteratedRuleValid) {
          setIsValid(true);
          setValidationMessage(null);
        }

        if (!isIteratedRuleValid && wasNotValid) {
          setIsValid(false);
          setValidationMessage(iteratedValidationMessage);
          break;
        }
      }
    },
    [rules, wasNotValid],
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
