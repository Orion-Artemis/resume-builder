import React from 'react'

const PersonalDetailPreview = ({resumeInfo}) => {
  const theme = resumeInfo?.themeColor

  return (
    <div>
        <h2 className={`font-bold text-xl text-center text-[${theme}]`}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        <h2 className='text-center text-sm font-medium'>
            {resumeInfo?.jobTitle}
        </h2>
        <h2 className={`text-center font-normal text-xs text-[${theme}]`}>
          {resumeInfo?.address}
        </h2>
        <div className={`font-normal text-xs text-[${theme}] flex justify-between`}>
            <h2>
                {resumeInfo?.phone}
            </h2>
            <h2>
                {resumeInfo?.email}
            </h2>
        </div>
        <hr className='border-[2px] my-2' style={{
            borderColor: theme
        }}/>
    </div>
  )
}

export default PersonalDetailPreview