import { fireEvent } from '@testing-library/react';

export function typeText<T extends HTMLElement>(el: T, value: string) {
  return fireEvent.change(el, { target: { value } });
}

// tries to mimic the browser click, which actually focuses the DOM element -- https://github.com/testing-library/react-testing-library/issues/276
export const clickElement = <T extends HTMLElement>(el: T) => {
  fireEvent.click(el);
  fireEvent.focus(el);
  el.focus(); // this will actually set the document.activeElement property
};
