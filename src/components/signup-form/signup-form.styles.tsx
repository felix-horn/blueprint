import { css, styled } from 'styled-components';

export type ValidationProp = {
  isInputValid?: boolean;
};

export const StyledHeadline = styled.h2`
  text-align: center;
`;

export const StyledSubHeadline = styled.h5`
  text-align: center;
  font-weight: 100;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledLabel = styled.label<ValidationProp>`
  margin-top: var(--spacing-s);
  padding-inline: var(--spacing-l);
  max-width: 100%;

  ${({ isInputValid }) =>
    !isInputValid &&
    css`
      color: red;
    `}

  @media (min-width: 576px) {
    /* flex: 0 0 50%; */
    /* min-width: 50%; */
  }
`;

export const StyledInput = styled.input<ValidationProp>`
  border-radius: 4px;
  margin-top: var(--spacing-m);
  width: 100%;

  ${({ isInputValid }) =>
    isInputValid
      ? css`
          border: 1px solid black;
        `
      : css`
          border: 2px solid red;
        `}
`;

export const StyledWarningText = styled.p`
  color: red;
  font-size: small;
  margin-top: var(--spacing-s);
`;

export const StyledCentering = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledButton = styled.button`
  border-radius: 4px;
  cursor: pointer;
  font: inherit;
  min-width: 100%;
  outline: inherit;
  padding: 11px 16px 9px;
  pointer-events: ${(props) => (props.disabled ? 'none' : null)};

  ${({ disabled }) =>
    disabled
      ? css`
          background: #fff;
          border: 1px solid #76b72a;
          color: #76b72a;
        `
      : css`
          background: #76b72a;
          border: border: 1px solid #fff;
          color: #ffffff;
        `}

  @media (min-width: 375px) {
    min-width: unset;
  }
`;
