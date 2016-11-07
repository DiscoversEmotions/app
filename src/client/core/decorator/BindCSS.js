import CSSModules from 'react-css-modules';

export function BindCSS (styles, options) {
  return (component) =>  CSSModules(component, styles, options);
}
