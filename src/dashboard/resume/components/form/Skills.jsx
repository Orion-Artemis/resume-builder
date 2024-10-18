import React, { useState, useContext, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { resumeInfoContext } from '@/context/ResumeInfoContext'
import './../../../../../src/index.css';
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom';
import GlobalAPI from './../../../../../service/GlobalAPI'
import { toast } from 'sonner'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function Skills() {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(resumeInfoContext);
    const [loading, setLoading] = useState(false);
    const [skillsList, setSkillsList] = useState([
        {
            name: '',
            rating: 0
        },
    ]);

    useEffect(() => {
        resumeInfo?.skills.length > 0 && setSkillsList(resumeInfo?.skills)

    }, [])

    const AddNewSkill = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }])
    }

    const RemoveSkill = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true)
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalAPI.updateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            setLoading(false)
            toast('Details updated successfully!')
        }, (error) => {
            setLoading(false);
            toast('Server Error, Please try again!')
        })
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])

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
                    <div className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div>
                            <label className="text-xs">Name</label>
                            <Input
                                className="w-full"
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                defaultValue={item?.name}
                            />
                        </div>

                        <Rating style={{ maxWidth: 120 }} value={item.rating} 
                        onChange={(v)=> handleChange(index, 'rating', v)} />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant='outline' onClick={AddNewSkill} className='text-primary'> + Add more skills</Button>
                    <Button variant='outline' onClick={RemoveSkill} className='text-primary'> - Remove </Button>
                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
