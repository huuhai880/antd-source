// ** React Imports
import { useEffect, useState } from 'react'


const BlankLayout = ({ children }) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default BlankLayout
