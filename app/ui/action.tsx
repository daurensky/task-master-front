import clsx from 'clsx'
import {ComponentProps} from 'react'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary'
}

export const Button = ({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-lg px-8 py-2 text-center outline-none',
        variant === 'primary' &&
          'bg-background-alternative text-regular enabled:focus:ring-primary enabled:focus:ring-2',
        className,
      )}
      {...props}
    />
  )
}
