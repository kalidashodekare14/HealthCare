import React from 'react'
import loader from '../../public/loading.svg'
import Image from 'next/image'

const loading = () => {
  return (
    <div className='relative'>
        <Image className='absolute top-52 left-1/2 z-60 w-20' src={loader} width={500} height={300} alt='Loading....' />
    </div>
  )
}

export default loading