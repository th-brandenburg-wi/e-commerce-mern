import React from 'react'

const NewsletterBox = () => {


    const onSubmitHandler = (event) => {
        event.preventDefault();

    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Abonnieren Sie und bekommen 20% Rabatt</p>
      <p className='text-gray-400 mt-3'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio officiis nostrum, dolore necessitatibus fugiat quo, aliquam, alias harum beatae consequuntur numquam ex. Possimus reprehenderit inventore corrupti, ex debitis dicta modi.</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" placeholder='Ihre Email' className='w-full sm:flex-1 outline-none' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>ABONNIEREN</button>
      </form>
    </div>
  )
}

export default NewsletterBox
