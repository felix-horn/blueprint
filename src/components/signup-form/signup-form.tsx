/* eslint-disable no-console */
import { FC, FormEvent } from 'react';

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
  hasNoCapitalLetter:
    'Dein Passwort muss mindestens einen Großbuchstaben enthalten.',
  hasNoLowerCaseLetter:
    'Dein Passwort muss mindestens einen Kleinbuchstaben enthalten.',
  hasNoNumber: 'Dein Passwort muss mindestens eine Zahl enthalten.',
  isEmpty: 'Bitte fülle das Feld aus.',
  isNoEmail: 'Dies scheint keine E-Mail Adresse zu sein.',
  isNoName: 'Dies scheint nicht Dein Name zu sein.',
  isTooShort: 'Dein Passwort muss mindestens acht Zeichen haben.',
};

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

const emailValidationRules: TFieldValidationRule[] = [
  ruleIsNotEmpty,
  {
    validateInput: (input: string) =>
      Boolean(input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
    validationMessage: WARNING_TEXTS.isNoEmail,
  },
];

const passwordValidationRules: TFieldValidationRule[] = [
  ruleIsNotEmpty,
  {
    validateInput: (input: string) => Boolean(input.match(/[A-Z]/)),
    validationMessage: WARNING_TEXTS.hasNoCapitalLetter,
  },
  {
    validateInput: (input: string) => Boolean(input.match(/[a-z]/)),
    validationMessage: WARNING_TEXTS.hasNoLowerCaseLetter,
  },
  {
    validateInput: (input: string) => Boolean(input.match(/\d/)),
    validationMessage: WARNING_TEXTS.hasNoNumber,
  },
  {
    validateInput: (input: string) => input.length > 8,
    validationMessage: WARNING_TEXTS.isTooShort,
  },
];

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  console.log(event);
};

export const Form: FC = () => {
  const nameValidation = useFieldValidation(nameValidationRules);
  const emailValidation = useFieldValidation(emailValidationRules);
  const passwordValidation = useFieldValidation(passwordValidationRules);

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
      {/* triggerd browser form submission */}
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel isInputValid={nameValidation.isValid}>
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
        <StyledLabel isInputValid={emailValidation.isValid}>
          E-Mail
          <StyledInput
            type="email"
            name="email"
            placeholder={PLACEHOLDER_TEXTS.email}
            onChange={emailValidation.handleChange}
            onBlur={emailValidation.handleBlur}
          />
          <StyledWarningText>
            {emailValidation.validationMessage}
          </StyledWarningText>
        </StyledLabel>
        <StyledLabel isInputValid={passwordValidation.isValid}>
          Passwort
          <StyledInput
            type="password"
            name="password"
            placeholder={PLACEHOLDER_TEXTS.password}
            onChange={passwordValidation.handleChange}
            onBlur={passwordValidation.handleBlur}
          />
          <StyledWarningText>
            {passwordValidation.validationMessage}
          </StyledWarningText>
          <StyledCentering>
            {/* @todo: grey out until all input fields ready */}
            <StyledButton type="submit">Speichern</StyledButton>
          </StyledCentering>
        </StyledLabel>
      </StyledForm>
    </div>
  );
};
