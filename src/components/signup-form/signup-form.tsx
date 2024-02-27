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
} from './signup-form.styles.js';

export type InputValues = {
  email: string;
  name: string;
  password: string;
};

export const PLACEHOLDER_TEXTS = {
  email: 'Vorname.Nachname@gmail.de',
  name: 'Dein Vorname',
  password: '€!n_$!c#€r€$_P@$$w0rd',
};

const handleSubmit = (
  event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
) => {
  console.log(event);
};

export const Form: FC = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;

    setInputValues({ ...inputValues, [id]: value });
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
        <StyledLabel>
          <StyledInput
            type="text"
            id="name"
            placeholder={PLACEHOLDER_TEXTS.name}
            value={inputValues.name}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </StyledLabel>
        <StyledLabel>
          <StyledInput
            type="email"
            id="email"
            placeholder={PLACEHOLDER_TEXTS.email}
            value={inputValues.email}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </StyledLabel>
        <StyledLabel>
          <StyledInput
            type="password"
            id="password"
            placeholder={PLACEHOLDER_TEXTS.password}
            value={inputValues.password}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </StyledLabel>
      </StyledForm>
      <StyledCentering>
        <StyledButton onClick={handleSubmit}>Speichern</StyledButton>
      </StyledCentering>
    </div>
  );
};
