import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import Dummy from '@/data/Dummy'
import { resumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalAPI from './../../../../../service/GlobalAPI'

const EditResume = () => {
    const {resumeId} = useParams()
    const [resumeInfo, setResumeInfo ] = useState();
    useEffect(() => {
        // setResumeInfo(Dummy);
        GetResumeInfo();
    },[])


    const GetResumeInfo=()=>{
        GlobalAPI.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data)
            setResumeInfo(resp.data.data)
        })
    }
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