import react from 'react';

export interface ComponentCommonProps<T extends HTMLElement = any> {
  /** String passed as HTML class attribute */
  className?: string;
  /** Unique identifier for testing purposes */
  'data-testid'?: string;
  /** HTML global `id` attribute, unique in the whole document */
  id?: string;
  /** Reference to the host DOM node of the component */
  ref?: react.Ref<T>;
}
