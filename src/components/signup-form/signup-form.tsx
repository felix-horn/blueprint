/* eslint-disable no-console */
import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';

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

const handleSubmit = (
  event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
) => {
  console.log(event);
};

const validateIsNotEmpty = (input: string) => input?.trim() !== '';
// eslint-disable-next-line prettier/prettier
const validateIsName = (input: string) => (/^[ A-Za-z]+$/).test(input);
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
    const { value, id } = event.target;

    setInputValues({ ...inputValues, [id]: value });
  };

  const validateInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    setInvalidInputInformation({
      ...invalidInputInformation,
      [id]: '',
    });

    if (!validateIsNotEmpty(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [id]: WARNING_TEXTS.isEmpty,
      });
      return;
    }

    if (id === 'name' && !validateIsName(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [id]: WARNING_TEXTS.isNoName,
      });
      return;
    }

    if (id === 'email' && !validateIsEmail(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [id]: WARNING_TEXTS.isNoEmail,
      });
      return;
    }

    if (id === 'password') {
      if (!validateHasCapitalLetter(value)) {
        setInvalidInputInformation({
          ...invalidInputInformation,
          [id]: WARNING_TEXTS.hasNoCapitalLetters,
        });
        return;
      }

      if (!validateHasLowerCaseLetter(value)) {
        setInvalidInputInformation({
          ...invalidInputInformation,
          [id]: WARNING_TEXTS.hasNoLowerCaseLetters,
        });
        return;
      }
    }

    if (!validateHasNumber(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [id]: WARNING_TEXTS.hasNoNumber,
      });
      return;
    }

    if (!validateIsLongEnough(value)) {
      setInvalidInputInformation({
        ...invalidInputInformation,
        [id]: WARNING_TEXTS.isTooShort,
      });
    }
  };

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
        <StyledLabel hasNonValidInput={Boolean(invalidInputInformation.name)}>
          Name
          <StyledInput
            type="text"
            id="name"
            placeholder={PLACEHOLDER_TEXTS.name}
            value={inputValues.name}
            onChange={handleChange}
            onBlur={validateInput}
          />
          <StyledWarningText>{invalidInputInformation.name}</StyledWarningText>
        </StyledLabel>
        <StyledLabel>
          E-Mail
          <StyledInput
            type="email"
            id="email"
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
            id="password"
            placeholder={PLACEHOLDER_TEXTS.password}
            value={inputValues.password}
            onChange={handleChange}
            onBlur={validateInput}
          />
          <StyledWarningText>
            {invalidInputInformation.password}
          </StyledWarningText>
        </StyledLabel>
      </StyledForm>
      <StyledCentering>
        <StyledButton onClick={handleSubmit}>Speichern</StyledButton>
      </StyledCentering>
    </div>
  );
};
