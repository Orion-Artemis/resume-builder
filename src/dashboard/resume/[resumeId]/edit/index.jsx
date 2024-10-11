import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import Dummy from '@/data/Dummy'
import { resumeInfoContext } from '@/context/ResumeInfoContext'

const EditResume = () => {
    const params = useParams()
    const [resumeInfo, setResumeInfo ] = useState()
    useEffect(() => {
        setResumeInfo(Dummy)
    },[])
    // useEffect(() => {
    //     console.log(params.resumeId)
    // },[])
    return (
        <resumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section */}
                <FormSection />
                {/* Preview Section */}
                <ResumePreview />   
            </div>
        </resumeInfoContext.Provider>
    )
}

export default EditResume