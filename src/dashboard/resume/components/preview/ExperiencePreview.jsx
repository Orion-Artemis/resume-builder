import React from 'react'

const ExperiencePreview = ({resumeInfo}) => {
  return (
    <div className='my-6'>
        <h2 className={`text-center font-bold text-sm mb-2 text-[${resumeInfo?.themeColor}]`}>
            Professional Experience
        </h2>
        <hr className='border-[1.5px]' style={{
            borderColor:resumeInfo?.themeColor
        }}/>

        {resumeInfo?.Experience?.map((Experience, index) => (
            <div key={index} className='my-5'>
                <h2 className={`text-sm font-bold text-[${resumeInfo?.themeColor}]`}>{Experience?.title}</h2>
                <h2 className={`text-xs flex justify-between`}>{Experience?.companyName}, {Experience?.city}, {Experience?.state}
                <span>{Experience?.startDate} to {Experience?.currentlyWorking? 'Present':Experience?.endDate}</span>
                </h2>
                {/* <p className='text-xs my-2'>{experience?.workSummary}</p> */}
                <div dangerouslySetInnerHTML={{__html:Experience?.workSummary}}/>
            </div>
        ))}

    </div>
  )
}

export default ExperiencePreview