import React from 'react'

const loadingEmoji = ["🧠", "⛏️", "🦚", "🦌"]

const Loader = () => {
  return (
    <div className='grid grid-cols-12 h-screen ' >
        <div className='col-span-12 mx-auto text-4xl animate-pulse'>
        {loadingEmoji[Math.floor(Math.random()*loadingEmoji.length)]}
        </div>
    </div>
  )
}

export default Loader