import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

export const Pagination = () => {

  const {page,totalPages,handlePageChange} = useContext(AppContext)
  return (
    <div className='w-full flex justify-center items-center fixed bottom-0 bg-white border-2'>
      <div className='flex justify-between w-11/12 max-w-[670px] mt-1 mb-1'>

      <div className='flex gap-x-2'>

        {
            page > 1 &&
            (          
              <button
              className='border-2 rounded-md py-1 px-4'
               onClick={()=>handlePageChange(page-1)}
              >Previous</button>
            )
          }
          {
            page < totalPages &&
            (
              <button
                className='border-2 rounded-md py-1 px-4'
               onClick={()=>{handlePageChange(page+1)}}
              >Next</button>
            )
          }

      </div>
        

        <p className='font-bold text-sm'>
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  )
}
