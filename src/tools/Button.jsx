import React from 'react'

const Button = ({styles}) => {
  return (
    <button className={`px-5 py-4 bg-blue-gradient text-primary outline-none rounded-md ${styles} text-[18px] font-medium`}>
      Get Started
    </button>
  )
}

export default Button;
