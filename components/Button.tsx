import React, { forwardRef, useCallback, useRef } from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...rest }, ref) => {
    const localRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLButtonElement) => {
        localRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref]
    );
    return (
      <button
        ref={setRefs}
        {...rest}
        className={`${className} w-full flex justify-center items-center border border-transparent rounded-2xl shadow-sm cursor-pointer`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
