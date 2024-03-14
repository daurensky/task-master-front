import clsx from 'clsx'
import {ComponentProps} from 'react'

type TextInputProps = ComponentProps<'input'> & {
  variant?: 'primary'
  label?: string
  error?: string
}

export const TextInput = ({
  variant = 'primary',
  label,
  className,
  id,
  type,
  error,
  ...props
}: TextInputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm">
          {label}
        </label>
      )}
      <input
        type={type || 'text'}
        className={clsx(
          'rounded-lg px-4 py-2 outline-none',
          variant === 'primary' &&
            'enabled:focus:ring-primary bg-background-alternative enabled:focus:ring-2',
          className,
        )}
        {...props}
      />
      {error && <span className="block text-sm text-red-500">{error}</span>}
    </div>
  )
}
