/* eslint-disable react/display-name */
import React from 'react';

type ILoadingComponentProps = React.HTMLProps<HTMLDivElement>;
const LoadingComponent = React.forwardRef<
  HTMLDivElement,
  ILoadingComponentProps
>((props, ref) => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <span className="loader" ref={ref} />
  );
});

export default LoadingComponent;
