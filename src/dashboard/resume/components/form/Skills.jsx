import React, { useState, useContext, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resumeInfoContext } from '@/context/ResumeInfoContext'
import './../../../../../src/index.css';
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom';
import GlobalAPI from './../../../../../service/GlobalAPI'
import { toast } from 'sonner'

function Skills() {
    const params=useParams();
    const {resumeInfo,setResumeInfo}=useContext(resumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [skillsList, setSkillsList] = useState([
        {
            name: '',
            rating: 0
        },
    ]);

    const AddNewSkill=()=>{
        setSkillsList([...skillsList,{
            name: '',
            rating: 0
        }])
    }

    const RemoveSkill=()=>{
        setSkillsList(skillsList=>skillsList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true)
        const data={
            data:{
                skills:skillsList
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
            skills:skillsList
        })
    },[skillsList])

    const handleChange = (index, name, value) => {
        const updatedSkills = [...skillsList]; 
        if (name === 'rating') {
            updatedSkills[index].rating = value; 
        } else {
            updatedSkills[index][name] = value; 
        }
        setSkillsList(updatedSkills); 
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add your professional skills</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className="flex justify-between mb-2 border rounded-lg p-3">
                        <div className="w-3/4">
                            <label className="text-xs">Name</label>
                            <Input
                                className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center w-1/4 justify-end">
                            <div className="flex space-x-1">
                                {Array(5)
                                    .fill(0)
                                    .map((_, starIndex) => (
                                        <span
                                            key={starIndex}
                                            className={`cursor-pointer text-2xl ${item.rating > starIndex ? 'text-yellow-400' : 'text-gray-300'}`}
                                            onClick={() => handleChange(index, 'rating', starIndex + 1)}
                                        >
                                            ★
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewSkill} className='text-primary'> + Add more skills</Button>
                    <Button variant='outline' onClick={RemoveSkill} className='text-primary'> - Remove </Button>
                </div>
                <Button disabled={loading} onClick={()=>onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
