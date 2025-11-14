import React from 'react'
import Spline from '@splinetool/react-spline'

const SplineBlobsEmbed = ({ className = "" }) => {
  return (
    <div 
      className={`w-full h-full ${className}`} 
      style={{ 
        transform: 'scale(1.3)', 
        transformOrigin: 'center',
        willChange: 'transform'
      }}
    >
      <Spline
        scene="https://prod.spline.design/EBu8QT-Q1vSFVa7v/scene.splinecode"
      />
    </div>
  )
}

export default SplineBlobsEmbed
