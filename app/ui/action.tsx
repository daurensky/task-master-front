import clsx from 'clsx'
import {ComponentProps} from 'react'

type IconButtonProps = ComponentProps<'button'> & {
  variant?: 'primary'
}

export const IconButton = ({
  variant = 'primary',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={clsx(
        'rounded-lg p-2 text-center outline-none transition-opacity',
        variant === 'primary' &&
          'bg-background-alternative text-regular disabled:opacity-25',
        className,
      )}
      {...props}
    />
  )
}

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
        'rounded-lg px-8 py-2 text-center outline-none transition-opacity',
        variant === 'primary' &&
          'bg-background-alternative text-regular disabled:opacity-25',
        className,
      )}
      {...props}
    />
  )
}
