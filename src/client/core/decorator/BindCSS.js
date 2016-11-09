import CSSModules from 'react-css-modules';

export function BindCSS (styles, options = { allowMultiple: true }) {
  return (component) =>  CSSModules(component, styles, options);
}
