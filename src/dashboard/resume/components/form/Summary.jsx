import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { resumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../service/GlobalAPI.js'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const Summary = ({enabledNext}) => {
    const {resumeInfo, setResumeInfo} = useContext(resumeInfoContext)
    const [summary, setSummary] = useState()
    const params = useParams()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        summary&&setResumeInfo({
            ...resumeInfo,
             summary: summary
        })
    }, [summary])
    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data =  {
            data:{
                summary:summary
            }
        }
        GlobalAPI.updateResumeDetail(params?.resumeId, data).then((resp) => {
            console.log(resp)
            enabledNext(true)
            setLoading(false)
            toast("Details Updated Successfully")
        },(error) =>{
            setLoading(false)
        })
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summary for your Job Title</p>
            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-start'>
                    <label>Add Summary</label>
                </div>
                    <Textarea required defaultValue={resumeInfo?.summary} onChange={(e) => {
                        setSummary(e.target.value)
                        enabledNext(false)
                    }}className='mt-5' />
                <div className='mt-2 flex justify-end'>
                <Button type='submit' disabled={loading}> {loading?<LoaderCircle className='animate-spin' />:'Save'}</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Summary