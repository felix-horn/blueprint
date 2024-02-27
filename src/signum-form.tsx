/* eslint-disable no-console */
import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react';

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
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            id="name"
            placeholder={PLACEHOLDER_TEXTS.name}
            value={inputValues.name}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </label>
        <label>
          <input
            type="email"
            id="email"
            placeholder={PLACEHOLDER_TEXTS.email}
            value={inputValues.email}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </label>
        <label>
          <input
            type="password"
            id="password"
            placeholder={PLACEHOLDER_TEXTS.password}
            value={inputValues.password}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </label>
      </form>
      <button onClick={handleSubmit}>Speichern</button>
    </div>
  );
};
