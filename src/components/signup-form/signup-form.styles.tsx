import { styled } from 'styled-components';

export const StyledHeadline = styled.h2`
  text-align: center;
`;

export const StyledSubHeadline = styled.h5`
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledLabel = styled.label`
  margin-top: 1rem;
  padding-inline: 15px;
  max-width: 100%;

  @media (min-width: 576px) {
    /* flex: 0 0 50%; */
    /* min-width: 50%; */
  }
`;

export const StyledInput = styled.input`
  width: 100%;
`;

export const StyledCentering = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  font: inherit;
  outline: inherit;
  padding: 0;
  background: #76b72a;
  pointer-events: none;
  padding: 11px 16px 9px;
  color: #ffffff;
  border-radius: 4px;

  @media (min-width: 480px) {
    max-width: 50%;
  }
`;
