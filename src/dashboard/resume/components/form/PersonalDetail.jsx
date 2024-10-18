import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalAPI from './../../../../../service/GlobalAPI.js'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const PersonalDetail = ({enabledNext}) => {

    const {resumeInfo, setResumeInfo} = useContext(resumeInfoContext)
    const params = useParams()
    const [formData, setFormData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        console.log(params);
    }, [])


    const handleInputChange = (e) => {
        enabledNext(false)
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]:value
        })

        setResumeInfo({
            ...resumeInfo,
            [name]:value,
        })

        console.log(params?.documentId)
    }
    const onSave = (e) => {
        e.preventDefault()
        setLoading(true)
        const data =  {
            data:formData
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
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with some basic Information</p>

        <form onSubmit={onSave}>
            <div className='grid grid-cols-2 mt-5 gap-3'>
                <div>
                    <label className='text-sm'>First Name</label>
                    <Input name='firstName' defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Last Name</label>
                    <Input name='lastName' defaultValue={resumeInfo?.lastName} required onChange={handleInputChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Job Title</label>
                    <Input name='jobTitle' defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
                </div>
                <div className='col-span-2'>
                    <label className='text-sm'>Address</label>
                    <Input name='address' defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Phone</label>
                    <Input type="tel" name='phone' defaultValue={resumeInfo?.phone} required onChange={handleInputChange}/>
                </div>
                <div>
                    <label className='text-sm'>Email</label>
                    <Input type="email" name='email' defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
                </div>
            </div>
            <div>
                <Button type='submit' disabled={loading} className='mt-3 flex justify-end'> {loading?<LoaderCircle className='animate-spin' />:'Save'}</Button>
            </div>
        </form>
    </div>
  )
}

export default PersonalDetail