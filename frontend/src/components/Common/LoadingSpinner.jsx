import React from 'react'

import { Loader } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <Loader
      color='#00a2ff'
      className='animate-spinner'
      size={ 75 }
      aria-label="Loading Spinner"
    />
  )
}

export default LoadingSpinner
