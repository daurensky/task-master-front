import clsx from 'clsx'
import {SVGProps, useEffect, useState} from 'react'

export const AppLogoWhite = ({
  className,
  width = 248,
  height = 64,
  ...props
}: SVGProps<SVGSVGElement>) => {
  const [isExplosionShowing, setIsExplosionShowing] = useState(false)
  const [isEmptyShowing, setIsEmptyShowing] = useState(false)
  const [clicks, setClicks] = useState(0)

  const handleClick = () => {
    if (isExplosionShowing) return

    setClicks(c => c + 1)
  }

  useEffect(() => {
    if (clicks > 10) {
      setIsExplosionShowing(true)
    }
  }, [clicks])

  useEffect(() => {
    if (!isExplosionShowing) return

    const timeout = setTimeout(() => {
      setIsExplosionShowing(false)
      setIsEmptyShowing(true)
    }, 790)

    return () => clearTimeout(timeout)
  }, [isExplosionShowing])

  useEffect(() => {
    if (!isEmptyShowing) return

    const timeout = setTimeout(() => {
      setIsEmptyShowing(false)
      setClicks(0)
    }, 2_000)

    return () => clearTimeout(timeout)
  }, [isEmptyShowing])

  if (isExplosionShowing || isEmptyShowing) {
    return (
      <div
        className="bg-contain bg-center bg-no-repeat"
        style={{
          width,
          height,
          backgroundImage: !isEmptyShowing
            ? 'url(/assets/img/explosion.gif)'
            : undefined,
        }}
      ></div>
    )
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 248 64"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(className, 'group')}
      onClick={handleClick}
      {...props}
    >
      <path
        d="M41.7386 18.6307V15.8182H61.375V18.6307H53.142V42H49.9716V18.6307H41.7386ZM79.2617 38.364L80.0897 38.976C79.7537 39.696 79.1297 40.38 78.2177 41.028C77.3297 41.676 76.5137 42 75.7697 42C74.3537 42 73.6457 41.256 73.6457 39.768C73.6457 39.072 73.8257 38.244 74.1857 37.284L72.8537 38.652C71.5577 39.972 70.4297 40.86 69.4697 41.316C68.5337 41.772 67.6097 42 66.6977 42C65.7857 42 65.0897 41.748 64.6097 41.244C64.1537 40.716 63.9257 39.996 63.9257 39.084C63.9257 37.404 64.5737 35.748 65.8697 34.116C67.1657 32.46 68.8217 31.116 70.8377 30.084C72.8537 29.052 74.8697 28.524 76.8857 28.5L76.9577 29.688L75.4457 30.012C73.2617 30.492 71.3297 31.452 69.6497 32.892C67.9937 34.332 67.1657 35.772 67.1657 37.212C67.1657 38.628 67.7417 39.336 68.8937 39.336C69.9737 39.336 71.3057 38.58 72.8897 37.068C74.4737 35.556 75.7937 33.78 76.8497 31.74L78.3617 32.64C76.8737 35.64 76.1297 37.548 76.1297 38.364C76.1297 38.7 76.2377 38.988 76.4537 39.228C76.6937 39.444 76.9217 39.552 77.1377 39.552C77.3777 39.552 77.5337 39.54 77.6057 39.516C77.6777 39.492 77.7497 39.468 77.8217 39.444C77.8937 39.396 77.9777 39.336 78.0737 39.264C78.1937 39.192 78.2897 39.12 78.3617 39.048C78.4577 38.976 78.6017 38.868 78.7937 38.724C78.9857 38.58 79.1417 38.46 79.2617 38.364ZM97.3814 26.7614L94.6712 27.5284C94.5007 27.0767 94.2493 26.6378 93.9169 26.2116C93.593 25.777 93.1499 25.419 92.5874 25.1378C92.0249 24.8565 91.3047 24.7159 90.4268 24.7159C89.2251 24.7159 88.2237 24.9929 87.4226 25.5469C86.63 26.0923 86.2337 26.7869 86.2337 27.6307C86.2337 28.3807 86.5064 28.973 87.0518 29.4077C87.5973 29.8423 88.4496 30.2045 89.6087 30.4943L92.5234 31.2102C94.2791 31.6364 95.5874 32.2884 96.4482 33.1662C97.3089 34.0355 97.7393 35.1562 97.7393 36.5284C97.7393 37.6534 97.4155 38.6591 96.7678 39.5455C96.1286 40.4318 95.2337 41.1307 94.0831 41.642C92.9325 42.1534 91.5945 42.4091 90.0689 42.4091C88.0661 42.4091 86.4084 41.9744 85.0959 41.1051C83.7834 40.2358 82.9524 38.9659 82.603 37.2955L85.4666 36.5795C85.7393 37.6364 86.255 38.429 87.0135 38.9574C87.7805 39.4858 88.782 39.75 90.0178 39.75C91.424 39.75 92.5405 39.4517 93.3672 38.8551C94.2024 38.25 94.62 37.5256 94.62 36.6818C94.62 36 94.3814 35.429 93.9041 34.9688C93.4268 34.5 92.6939 34.1506 91.7053 33.9205L88.4325 33.1534C86.6342 32.7273 85.3132 32.0668 84.4695 31.1719C83.6342 30.2685 83.2166 29.1392 83.2166 27.7841C83.2166 26.6761 83.5277 25.696 84.1499 24.8438C84.7805 23.9915 85.6371 23.3224 86.7195 22.8366C87.8104 22.3509 89.0462 22.108 90.4268 22.108C92.37 22.108 93.8956 22.5341 95.0036 23.3864C96.12 24.2386 96.9126 25.3636 97.3814 26.7614ZM105.093 34.8409L105.042 31.108H105.656L114.247 22.3636H117.98L108.826 31.6193H108.571L105.093 34.8409ZM102.281 42V15.8182H105.298V42H102.281ZM114.758 42L107.088 32.2841L109.235 30.1875L118.593 42H114.758ZM132.397 15.8182H136.181L145.079 37.5511H145.386L154.283 15.8182H158.067V42H155.102V22.108H154.846L146.664 42H143.8L135.619 22.108H135.363V42H132.397V15.8182ZM169.794 42.4602C168.549 42.4602 167.42 42.2259 166.406 41.7571C165.392 41.2798 164.586 40.5938 163.99 39.6989C163.393 38.7955 163.095 37.7045 163.095 36.4261C163.095 35.3011 163.316 34.3892 163.76 33.6903C164.203 32.983 164.795 32.429 165.537 32.0284C166.278 31.6278 167.096 31.3295 167.991 31.1335C168.895 30.929 169.802 30.767 170.714 30.6477C171.907 30.4943 172.875 30.3793 173.616 30.3026C174.366 30.2173 174.912 30.0767 175.252 29.8807C175.602 29.6847 175.777 29.3437 175.777 28.858V28.7557C175.777 27.4943 175.431 26.5142 174.741 25.8153C174.059 25.1165 173.024 24.767 171.635 24.767C170.194 24.767 169.065 25.0824 168.247 25.7131C167.429 26.3437 166.853 27.017 166.521 27.733L163.657 26.7102C164.169 25.517 164.85 24.5881 165.703 23.9233C166.564 23.25 167.501 22.7812 168.515 22.517C169.538 22.2443 170.544 22.108 171.532 22.108C172.163 22.108 172.887 22.1847 173.706 22.3381C174.532 22.483 175.329 22.7855 176.096 23.2457C176.872 23.706 177.515 24.4006 178.027 25.3295C178.538 26.2585 178.794 27.5028 178.794 29.0625V42H175.777V39.3409H175.623C175.419 39.767 175.078 40.223 174.6 40.7088C174.123 41.1946 173.488 41.608 172.696 41.9489C171.903 42.2898 170.936 42.4602 169.794 42.4602ZM170.254 39.75C171.447 39.75 172.453 39.5156 173.271 39.0469C174.098 38.5781 174.72 37.973 175.137 37.2315C175.564 36.4901 175.777 35.7102 175.777 34.892V32.1307C175.649 32.2841 175.368 32.4247 174.933 32.5526C174.507 32.6719 174.012 32.7784 173.45 32.8722C172.896 32.9574 172.355 33.0341 171.826 33.1023C171.306 33.1619 170.885 33.2131 170.561 33.2557C169.777 33.358 169.044 33.5241 168.362 33.7543C167.689 33.9759 167.143 34.3125 166.725 34.7642C166.316 35.2074 166.112 35.8125 166.112 36.5795C166.112 37.6278 166.5 38.4205 167.275 38.9574C168.059 39.4858 169.052 39.75 170.254 39.75ZM198.21 26.7614L195.499 27.5284C195.329 27.0767 195.077 26.6378 194.745 26.2116C194.421 25.777 193.978 25.419 193.415 25.1378C192.853 24.8565 192.133 24.7159 191.255 24.7159C190.053 24.7159 189.052 24.9929 188.251 25.5469C187.458 26.0923 187.062 26.7869 187.062 27.6307C187.062 28.3807 187.335 28.973 187.88 29.4077C188.425 29.8423 189.278 30.2045 190.437 30.4943L193.352 31.2102C195.107 31.6364 196.415 32.2884 197.276 33.1662C198.137 34.0355 198.567 35.1562 198.567 36.5284C198.567 37.6534 198.244 38.6591 197.596 39.5455C196.957 40.4318 196.062 41.1307 194.911 41.642C193.761 42.1534 192.423 42.4091 190.897 42.4091C188.894 42.4091 187.237 41.9744 185.924 41.1051C184.612 40.2358 183.781 38.9659 183.431 37.2955L186.295 36.5795C186.567 37.6364 187.083 38.429 187.842 38.9574C188.609 39.4858 189.61 39.75 190.846 39.75C192.252 39.75 193.369 39.4517 194.195 38.8551C195.031 38.25 195.448 37.5256 195.448 36.6818C195.448 36 195.21 35.429 194.732 34.9688C194.255 34.5 193.522 34.1506 192.533 33.9205L189.261 33.1534C187.462 32.7273 186.141 32.0668 185.298 31.1719C184.462 30.2685 184.045 29.1392 184.045 27.7841C184.045 26.6761 184.356 25.696 184.978 24.8438C185.609 23.9915 186.465 23.3224 187.548 22.8366C188.638 22.3509 189.874 22.108 191.255 22.108C193.198 22.108 194.724 22.5341 195.832 23.3864C196.948 24.2386 197.741 25.3636 198.21 26.7614ZM211.649 22.3636V24.9205H201.473V22.3636H211.649ZM204.439 17.6591H207.456V36.375C207.456 37.2273 207.579 37.8665 207.826 38.2926C208.082 38.7102 208.406 38.9915 208.798 39.1364C209.199 39.2727 209.62 39.3409 210.064 39.3409C210.396 39.3409 210.669 39.3239 210.882 39.2898C211.095 39.2472 211.265 39.2131 211.393 39.1875L212.007 41.8977C211.802 41.9744 211.517 42.0511 211.15 42.1278C210.784 42.2131 210.319 42.2557 209.757 42.2557C208.904 42.2557 208.069 42.0724 207.251 41.706C206.441 41.3395 205.768 40.7812 205.231 40.0312C204.703 39.2812 204.439 38.3352 204.439 37.1932V17.6591ZM224.209 42.4091C222.317 42.4091 220.685 41.9915 219.313 41.1562C217.949 40.3125 216.897 39.1364 216.155 37.6278C215.422 36.1108 215.056 34.3466 215.056 32.3352C215.056 30.3239 215.422 28.5511 216.155 27.017C216.897 25.4744 217.928 24.2727 219.249 23.4119C220.578 22.5426 222.13 22.108 223.902 22.108C224.925 22.108 225.935 22.2784 226.932 22.6193C227.929 22.9602 228.837 23.5142 229.655 24.2812C230.473 25.0398 231.125 26.0455 231.611 27.2983C232.097 28.5511 232.34 30.0937 232.34 31.9261V33.2045H217.203V30.5966H229.272C229.272 29.4886 229.05 28.5 228.607 27.6307C228.172 26.7614 227.55 26.0753 226.74 25.5724C225.939 25.0696 224.993 24.8182 223.902 24.8182C222.701 24.8182 221.661 25.1165 220.783 25.7131C219.914 26.3011 219.245 27.0682 218.776 28.0142C218.307 28.9602 218.073 29.9744 218.073 31.0568V32.7955C218.073 34.2784 218.328 35.5355 218.84 36.5668C219.36 37.5895 220.08 38.3693 221 38.9062C221.921 39.4347 222.99 39.6989 224.209 39.6989C225.002 39.6989 225.718 39.5881 226.357 39.3665C227.005 39.1364 227.563 38.7955 228.032 38.3438C228.5 37.8835 228.863 37.3125 229.118 36.6307L232.033 37.4489C231.726 38.4375 231.211 39.3068 230.486 40.0568C229.762 40.7983 228.867 41.3778 227.801 41.7955C226.736 42.2045 225.539 42.4091 224.209 42.4091ZM236.929 42V22.3636H239.844V25.3295H240.049C240.407 24.358 241.054 23.5696 241.992 22.9645C242.929 22.3594 243.986 22.0568 245.162 22.0568C245.384 22.0568 245.661 22.0611 245.993 22.0696C246.326 22.0781 246.577 22.0909 246.748 22.108V25.1761C246.645 25.1506 246.411 25.1122 246.044 25.0611C245.686 25.0014 245.307 24.9716 244.907 24.9716C243.952 24.9716 243.1 25.1719 242.35 25.5724C241.608 25.9645 241.02 26.5099 240.586 27.2088C240.159 27.8991 239.946 28.6875 239.946 29.5739V42H236.929Z"
        className="transition-transform group-active:-translate-x-6"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.47523 0H0.475235V2V62V64H2.47523H88.6248H90.6248V62V52H88.6248V60V62H86.6248H4.47523H2.47523V60V4V2H4.47523H86.6248H88.6248V4V12H90.6248V2V0H88.6248H2.47523Z"
      />
    </svg>
  )
}
