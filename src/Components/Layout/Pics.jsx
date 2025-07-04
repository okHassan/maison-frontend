import React from 'react'

const Pics = () => {
    return (
        <div className='bg-white w-full '>
            <div className='container mx-auto py-16'>
                <div className='flex gap-5'>
                    <img src='/pics/saree.jpg' alt='saree' className='w-[450px] h-[550px]' />
                    <img src='/pics/kurtis.jpg' alt='kurti' className='w-[450px] h-[550px]' />
                    <img src='/pics/lehnga.jpg' alt='lahnga' className='w-[450px] h-[550px]' />
                    <img src='/pics/westurn.jpg' alt='westurn' className='w-[450px] h-[550px]' />
                </div>
            </div>
        </div>
    )
}

export default Pics