import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import RichTexteditor from '../RichTexteditor'
import { resumeInfoContext } from '@/context/ResumeInfoContext';
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalAPI from './../../../../../service/GlobalAPI'
import { toast } from 'sonner'

const formField={
    title:'',
    companyname:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}

function Experience() {

    const {resumeInfo, setResumeInfo}=useContext(resumeInfoContext)
    const params=useParams()
    const [loading,setLoading]=useState(false);
    const [experienceList, setExperienceList] = useState([
        formField
    ]);


    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setExperienceList(newEntries);
    }

    const AddNewExperience=()=>{
        setExperienceList([...experienceList,{
            title:'',
            companyname:'',
            city:'',
            state:'',
            startDate:'',
            endDate:'',
            workSummary:''
        }])
    }

    const RemoveExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0, -1))
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name]=e.target.value;
        setExperienceList(newEntries);
    }

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                Experience:experienceList
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
            experience:experienceList
        })
    },[experienceList])

  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous job experience</p>

        <div>
            {experienceList.map((item,index)=>(
                <div>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name='title' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name='companyname' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>City</label>
                            <Input name='city' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>State</label>
                            <Input name='state' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type='date' name='startDate' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type='date' name='endDate' onChange={(event)=>handleChange(index,event)}/>
                        </div>

                        <div className='col-span-2'>
                            <RichTexteditor
                            onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummary',index)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant='outline' onClick={AddNewExperience} className='text-primary'> + Add more experience </Button>
            <Button variant='outline' onClick={RemoveExperience} className='text-primary'> - Remove </Button>
            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
                {loading?<LoaderCircle className='animate-spin'/>:'Save'}
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Experience