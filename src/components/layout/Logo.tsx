import { type ComponentPropsWithoutRef, forwardRef } from 'react';

export const Logo = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<'svg'>>(
  (props, ref) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
      ref={ref}
    >
      <path d='M16.126 5H20a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h3.911L6.81 2.13a1 1 0 11.934-.359L8.983 5h6.099l1.22-3.334a1.062 1.062 0 01-.152-1.01c.192-.527.756-.79 1.258-.588.502.202.753.794.56 1.321a.984.984 0 01-.757.643L16.126 5zM8.5 12a1 1 0 01-2 0v-2a1 1 0 012 0v2zm4 0a1 1 0 01-2 0v-2a1 1 0 012 0v2zm7-5a1.5 1.5 0 10.001 3.001A1.5 1.5 0 0019.5 7zm0 4a1.5 1.5 0 10.001 3.001A1.5 1.5 0 0019.5 11zM17 8.5a2 2 0 00-2-2H5.5a2 2 0 00-2 2v7a2 2 0 002 2H15a2 2 0 002-2v-7z' />
    </svg>
  )
);
Logo.displayName = 'Logo';
