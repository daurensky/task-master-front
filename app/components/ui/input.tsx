import * as React from 'react'

import {cn} from '~/lib/utils'
import {Label} from './label'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | string[]
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type, label, error, ...props}, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <input
          type={type}
          className={cn(
            'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="block text-sm text-red-500">{error}</span>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export {Input}
