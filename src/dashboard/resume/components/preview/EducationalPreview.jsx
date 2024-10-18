import React from 'react'

const EducationalPreview = ({resumeInfo}) => {
    const theme = resumeInfo?.themeColor

  return (
    <div className='my-6'>
        <h2 className={`text-center font-bold text-sm mb-2 text-[${resumeInfo?.themeColor}]`}>
            Education
        </h2>
        <hr className='border-[1.5px]' style={{
            borderColor:resumeInfo?.themeColor
        }}/>

        {resumeInfo?.Education?.map((education, index) => (
            <div key={index} className='my-5'>
                <h2 className={`text-sm font-bold text-[${theme}]`}>{education?.universityName}</h2>
                <h2 className='text-xs flex justify-between'>
                    {education?.degree} in {education?.major}
                    <span>{education?.startDate} - {education?.endDate}</span>
                </h2>
            </div>
        ))}
    </div>
  )
}

export default EducationalPreview