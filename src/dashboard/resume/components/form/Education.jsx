import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { resumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react'
import GlobalAPI from './../../../../../service/GlobalAPI'
import { toast } from 'sonner'

function Education() {

    const [loading, setLoading] = useState(false);
    const params=useParams()
    const {resumeInfo,setResumeInfo}=useContext(resumeInfoContext);
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: ''
        }
    ])

    const handleChange = (index, event) => {
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setEducationalList(newEntries);
    }

    const AddNewEducation = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: ''
        }])
    }

    const RemoveEducation = () => {
        setEducationalList(educationalList=>educationalList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                Education:educationalList
            }
        }

        GlobalAPI.updateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            setLoading(false)
            toast('Details updated successfully!')
          },(error)=>{
            setLoading(false);
            toast('Server Error, Please try again!')
          })
    }

    useEffect(()=>{
        setResumeInfo({
          ...resumeInfo,
          education:educationalList
        })
      },[educationalList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your educational details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input name='universityName' onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label>Degree</label>
                                <Input name='degree' onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label>Major</label>
                                <Input name='major' onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label>Start Date</label>
                                <Input type='date' name='startDate' onChange={(e) => handleChange(index, e)} />
                            </div>

                            <div>
                                <label>End Date</label>
                                <Input type='date' name='endDate' onChange={(e) => handleChange(index, e)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewEducation} className='text-primary'> + Add more educational details</Button>
                    <Button variant='outline' onClick={RemoveEducation} className='text-primary'> - Remove </Button>
                </div>
                <Button disabled={loading} onClick={()=>onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Education