import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className='w-full  flex justify-center bg-gray-900 h-12  bottom-0'>
      <div className="">
          <div className="flex  items-center justify-center  font-bold  ">
          <img src="/heart.jpeg" alt="logo" className="w-6 h-6   text-white" />
          <span className="text-white">&lt;</span>
          <span className="text-green-400">Pass OP</span>
          <span className="text-white">/&gt;</span>
        </div>
        <span className='text-white text-sm '>Made with ❤️ by <a href="manikmohite564@gamil.com" className='text-green-400'>Manik Mohite</a></span>
      </div>
      </footer>
    </div>
  )
}
