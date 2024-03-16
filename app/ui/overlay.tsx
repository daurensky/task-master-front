import {CheckCircleIcon} from '@heroicons/react/24/outline'
import {AnimatePresence, motion} from 'framer-motion'
import {useEffect, useState} from 'react'

type ToastProps = {
  type: 'success' | 'warning' | 'error'
  message: string
}

export const Toast = ({type, message}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 5_000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{y: '100%', scale: 0}}
          animate={{y: 0, scale: 1}}
          exit={{y: '100%', scale: 0}}
          className="absolute bottom-0 right-0 p-4"
        >
          <div className="flex items-center gap-2 rounded-lg border border-regular p-4">
            {type === 'success' && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
