/* eslint-disable no-console */
import { ChangeEvent, FC, FormEvent, useState } from 'react';

import {
  StyledButton,
  StyledCentering,
  StyledForm,
  StyledHeadline,
  StyledInput,
  StyledLabel,
  StyledSubHeadline,
  StyledWarningText,
} from './signup-form.styles.js';
import {
  TFieldValidationRule,
  useFieldValidation,
} from './use-field-validation.js';

export type InputValues = {
  email: string;
  name: string;
  password: string;
};

export type InputValueKeys = keyof InputValues;

export const PLACEHOLDER_TEXTS = {
  email: 'Vorname.Nachname@gmail.de',
  name: 'Dein Vorname',
  password: '€!n_$!c#€r€$_P@$$w0rd',
};

export const WARNING_TEXTS = {
  hasNoCapitalLetters:
    'Dein Passwort muss mindestens einen Großbuchstaben enthalten.',
  hasNoLowerCaseLetters:
    'Dein Passwort muss mindestens einen Kleinbuchstaben enthalten.',
  hasNoNumber: 'Dein Passwort muss mindestens eine Zahl enthalten.',
  isEmpty: 'Bitte fülle das Feld aus.',
  isNoEmail: 'Dies scheint keine E-Mail Adresse zu sein.',
  isNoName: 'Dies scheint nicht Dein Name zu sein.',
  isTooShort: 'Dein Passwort muss mindestens acht Zeichen haben.',
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  console.log(event);
};

// eslint-disable-next-line prettier/prettier
const validateIsEmail = (input: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(input);
// eslint-disable-next-line prettier/prettier
const validateHasCapitalLetter = (input: string) => (/[A-Z]/).test(input);
// eslint-disable-next-line prettier/prettier
const validateHasLowerCaseLetter = (input: string) => (/[a-z]/).test(input);
// eslint-disable-next-line prettier/prettier
const validateHasNumber = (input: string) => (/\d/).test(input);
// eslint-disable-next-line prettier/prettier
const validateIsLongEnough = (input: string) => input.length > 8;

const ruleIsNotEmpty = {
  validateInput: (input: string) => input?.trim() !== '',
  validationMessage: WARNING_TEXTS.isEmpty,
};

const nameValidationRules: TFieldValidationRule[] = [
  ruleIsNotEmpty,
  {
    validateInput: (input: string) => Boolean(input.match(/^[ A-Za-z]+$/)),
    validationMessage: WARNING_TEXTS.isNoName,
  },
];
// triggerd browser form submission

export const Form: FC = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    email: '',
    name: '',
    password: '',
  });

  const [invalidInputInformation, setInvalidInputInformation] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  // @todo: useCallback
  const validateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setInvalidInputInformation({
      ...invalidInputInformation,
      [name]: '',
    });

    // if (!validateIsNotEmpty(value)) {
    //   setInvalidInputInformation({
    //     ...invalidInputInformation,
    //     [name]: WARNING_TEXTS.isEmpty,
    //   });
    //   return;
    // }

    // if (name === 'name' && !validateIsName(value)) {
    //   setInvalidInputInformation({
    //     ...invalidInputInformation,
    //     [name]: WARNING_TEXTS.isNoName,
    //   });
    //   return;
    // }

    if (name === 'email' && !validateIsEmail(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [name]: WARNING_TEXTS.isNoEmail,
      });
      return;
    }

    if (name === 'password') {
      if (!validateHasCapitalLetter(value)) {
        setInvalidInputInformation({
          ...invalidInputInformation,
          [name]: WARNING_TEXTS.hasNoCapitalLetters,
        });
        return;
      }

      if (!validateHasLowerCaseLetter(value)) {
        setInvalidInputInformation({
          ...invalidInputInformation,
          [name]: WARNING_TEXTS.hasNoLowerCaseLetters,
        });
        return;
      }
    }

    if (!validateHasNumber(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [name]: WARNING_TEXTS.hasNoNumber,
      });
      return;
    }

    if (!validateIsLongEnough(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [name]: WARNING_TEXTS.isTooShort,
      });
    }
  };

  const nameValidation = useFieldValidation(nameValidationRules);

  return (
    <div>
      <StyledHeadline>Jetzt JobRad-Fachhandelspartner werden!</StyledHeadline>
      <StyledSubHeadline>
        {/* @todo */}
        <i>
          <b>JobRad</b>
          und
          <b>JobRad für Selbstständige</b>
          anbieten - ohne Abnahmeverpflichtung.
        </i>
      </StyledSubHeadline>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel hasNonValidInput={!nameValidation.isValid}>
          Name
          <StyledInput
            type="text"
            name="name"
            placeholder={PLACEHOLDER_TEXTS.name}
            onChange={nameValidation.handleChange}
            onBlur={nameValidation.handleBlur}
          />
          <StyledWarningText>
            {nameValidation.validationMessage}
          </StyledWarningText>
        </StyledLabel>
        <StyledLabel>
          E-Mail
          <StyledInput
            type="email"
            name="email"
            placeholder={PLACEHOLDER_TEXTS.email}
            value={inputValues.email}
            onChange={handleChange}
            onBlur={validateInput}
          />
          <StyledWarningText>{invalidInputInformation.email}</StyledWarningText>
        </StyledLabel>
        <StyledLabel>
          Passwort
          <StyledInput
            type="password"
            name="password"
            placeholder={PLACEHOLDER_TEXTS.password}
            value={inputValues.password}
            onChange={handleChange}
            onBlur={validateInput}
          />
          <StyledWarningText>
            {invalidInputInformation.password}
          </StyledWarningText>
          <StyledCentering>
            // @todo: grey out until all input fields ready
            <StyledButton type="submit">Speichern</StyledButton>
          </StyledCentering>
        </StyledLabel>
      </StyledForm>
    </div>
  );
};
