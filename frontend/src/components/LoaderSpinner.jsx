import React from "react"
import { MutatingDots } from "react-loader-spinner"

const LoaderSpinner = ({ color, secondaryColor }) => {
  return (
    <div className="w-full h-full absolute inset-0 backdrop-blur-sm">
      <div className="w-full h-full flex items-center justify-center">
        <MutatingDots
          height="100"
          width="100"
          color={color}
          secondaryColor={secondaryColor}
        />
      </div>
    </div>
  )
}

export default LoaderSpinner
