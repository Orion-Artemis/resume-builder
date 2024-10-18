import React, { useEffect, useState } from 'react'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import { resumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalAPI from './../../../../service/GlobalAPI'
import { RWebShare } from "react-web-share";

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        getResumeInfo();
    }, [])

    const getResumeInfo = () => {
        GlobalAPI.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <resumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id='no-print'>
                <Header />
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>Your personalized resume is ready!</h2>
                    <p className='text-center text-gray-400'>Download your resume or share your unique url</p>
                    <div className='flex justify-between mx-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <RWebShare
                            data={{
                                text: "Hello, this is my resume, Please open the url to view",
                                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <Button>Share</Button>
                        </RWebShare>
                    </div>

                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id='print-area'>
                    <ResumePreview />
                </div>
            </div>
        </resumeInfoContext.Provider>
    )
}

export default ViewResume