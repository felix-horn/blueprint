import { ChangeEvent, FC, useState } from 'react';

export type InputValues = {
  name: string;
};

export const Form: FC = () => {
  const [inputValues, setInputValues] = useState<InputValues>({ name: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValues({ name: value });
  };

  return (
    <div>
      <h2>Jetzt JobRad-Fachhandelspartner werden!</h2>
      <h5>
        JobRad und JobRad für Selbstständige anbieten - ohne
        Abnahmeverpflichtung.
      </h5>
      <form>
        <label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Felix"
            value={inputValues.name}
            onChange={handleChange}
            onBlur={() => console.log('blur')}
          />
        </label>
      </form>
    </div>
  );
};
