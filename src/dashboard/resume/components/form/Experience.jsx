import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import RichTextEditor from '../RichTextEditor'

const formField = {
    title: '',
    componyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: ''
}

const Experience = ({resumeInfo}) => {
    const [experienceList, setExperienceList] = useState([formField])

    const handleChange = (index, event) => {

    }
    const AddMoreExperience = () => {
        setExperienceList([...experienceList, formField])
    }
    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous Job Experience</p>
        <div>
            {experienceList.map((item, index) => (
                <div className='grid grid-cols-2 gap-3 border p-2 my-5 rounded-lg'>
                    <div>
                        <label className='text-sm'>Position Title</label>
                        <Input name='title' onChange={(event) => handleChange(index, event)}/>
                    </div>
                    <div>
                        <label className='text-sm'>Company Name</label>
                        <Input name='companyName' onChange={(event) => handleChange(index, event)}/>
                    </div>
                    <div>
                        <label className='text-sm'>City</label>
                        <Input name='city' onChange={(event) => handleChange(index, event)}/>
                    </div>
                    <div>
                        <label className='text-sm'>State</label>
                        <Input name='state' onChange={(event) => handleChange(index, event)}/>
                    </div>
                    <div>
                        <label className='text-sm'>Start Date</label>
                        <Input type='date' name='startDate' onChange={(event) => handleChange(index, event)}/>
                    </div>
                    <div>
                        <label className='text-sm'>End Date</label>
                        <Input type='date' name='endDate' onChange={(event) => handleChange(index, event)}/>
                    </div>
                    <div className='col-span-2'>
                        {/* Work Summary*/}
                        <RichTextEditor />
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Button variant='outline' onClick={AddMoreExperience} className='text-primary'> + Add More Experience</Button>
                <Button variant='outline' onClick={RemoveExperience} className='text-primary'> - Remove</Button>
            </div>
            <Button>Save</Button>
        </div>
        </div>
    </div>
  )
}

export default Experience