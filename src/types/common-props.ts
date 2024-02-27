export interface ComponentCommonProps<T extends HTMLElement = HTMLElement> {
  /** String passed as HTML class attribute */
  className?: string;
  /** HTML global `id` attribute, unique in the whole document */
  id?: string;
  /** Reference to the host DOM node of the component */
  ref?: React.Ref<T>;
  /** Unique identifier for testing purposes */
  testId?: string;
}
