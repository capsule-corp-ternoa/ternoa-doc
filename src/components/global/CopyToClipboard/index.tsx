import React, { useEffect, useState } from 'react'
import styles from './styles.module.css';

const clipboardCopy = (str) => {
  try {
    navigator.clipboard.writeText(str)
  } catch (error) {
    console.log(error)
  }
}

const CheckMark = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"></path>
  </svg>
)

const CopyPaste = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
    <path d="M22 6v16H6V6h16zm2-2H4v20h20V4zM0 21V0h21v2H2v19H0z"></path>
  </svg>
)

const Clipboard = ({ content, placeholder }) => {
  const [isCopyIndicator, setIsCopyIndicator] = useState(false)

  useEffect(() => {
    if (isCopyIndicator) {
      const timer = setTimeout(() => {
        setIsCopyIndicator(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isCopyIndicator])

  return (
    <div
      className={styles.clipboardCopyRoot}
      onClick={() => {
        clipboardCopy(content)
        setIsCopyIndicator(true)
      }}
    >
        {placeholder && 
        <small className="clipboardCopyRoot-placeholder">{placeholder}</small>}
        {isCopyIndicator ? (
          <CheckMark className={styles.checkMarkIcon}/>
        ) : (
          <CopyPaste className={styles.copyPasteIcon}/>
        )}
    </div>
  )
}

export default Clipboard