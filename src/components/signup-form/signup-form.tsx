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
  checkIsInputValid: (input: string) => input?.trim() !== '',
  validationMessage: WARNING_TEXTS.isEmpty,
};

const nameValidationRules: TFieldValidationRule[] = [
  ruleIsNotEmpty,
  {
    checkIsInputValid: (input: string) => Boolean(input.match(/^[ A-Za-z]+$/)),
    validationMessage: WARNING_TEXTS.isNoName,
  },
];

const emailValidationRules: TFieldValidationRule[] = [
  ruleIsNotEmpty,
  {
    checkIsInputValid: (input: string) =>
      Boolean(input.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)),
    validationMessage: WARNING_TEXTS.isNoEmail,
  },
];

const passwordValidationRules: TFieldValidationRule[] = [
  ruleIsNotEmpty,
  {
    checkIsInputValid: (input: string) => Boolean(input.match(/[A-Z]/)),
    validationMessage: WARNING_TEXTS.hasNoCapitalLetter,
  },
  {
    checkIsInputValid: (input: string) => Boolean(input.match(/[a-z]/)),
    validationMessage: WARNING_TEXTS.hasNoLowerCaseLetter,
  },
  {
    checkIsInputValid: (input: string) => Boolean(input.match(/\d/)),
    validationMessage: WARNING_TEXTS.hasNoNumber,
  },
  {
    checkIsInputValid: (input: string) => input.length > 8,
    validationMessage: WARNING_TEXTS.isTooShort,
  },
];

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  // eslint-disable-next-line no-console
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
        <i>
          <b>JobRad </b>
          und
          <b> JobRad für Selbstständige </b>
          anbieten - ohne Abnahmeverpflichtung.
        </i>
      </StyledSubHeadline>
      {/* trigger browser form submission */}
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel isInputValid={nameValidation.isValid}>
          Name
          <StyledInput
            isInputValid={nameValidation.isValid}
            name="name"
            onBlur={nameValidation.handleBlur}
            onChange={nameValidation.handleChange}
            placeholder={PLACEHOLDER_TEXTS.name}
            type="text"
          />
          <StyledWarningText>
            {nameValidation.validationMessage}
          </StyledWarningText>
        </StyledLabel>
        <StyledLabel isInputValid={emailValidation.isValid}>
          E-Mail
          <StyledInput
            isInputValid={emailValidation.isValid}
            name="email"
            onBlur={emailValidation.handleBlur}
            onChange={emailValidation.handleChange}
            placeholder={PLACEHOLDER_TEXTS.email}
            type="email"
          />
          <StyledWarningText>
            {emailValidation.validationMessage}
          </StyledWarningText>
        </StyledLabel>
        <StyledLabel isInputValid={passwordValidation.isValid}>
          Passwort
          <StyledInput
            isInputValid={passwordValidation.isValid}
            name="password"
            onBlur={passwordValidation.handleBlur}
            onChange={passwordValidation.handleChange}
            placeholder={PLACEHOLDER_TEXTS.password}
            type="password"
          />
          <StyledWarningText>
            {passwordValidation.validationMessage}
          </StyledWarningText>
        </StyledLabel>
        <StyledCentering>
          {/* @todo: disable until all input fields ready */}
          <StyledButton
            disabled={
              !(
                nameValidation.isValid &&
                emailValidation.isValid &&
                passwordValidation.isValid
              )
            }
            type="submit"
          >
            Speichern
          </StyledButton>
        </StyledCentering>
      </StyledForm>
    </div>
  );
};
