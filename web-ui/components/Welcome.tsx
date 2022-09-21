import React from 'react'


const Welcome = () => {

   
  return (
    <div className='text-[#21E800] my-5'>
        <div>Welcome to BitChat.</div>
        <ol>
            <li>Bitchat is a Realtime Chatroom on the Bitcoin Blockchain</li>
            <li>Your messages are stored on Bitcoin forever as a Bitcoin OP_RETURN transaction.</li>
            <li>A RelayX wallet is required. If you don't have one, sign up <a target="_blank" rel="noreferrer" href='https://relayx.com/sign-up'>here</a>.</li>
        </ol>
    </div>
  )
}

export default Welcome