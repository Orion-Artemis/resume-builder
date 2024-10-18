import React, { useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './form/Summary'
import Experience from './form/Experience'
<<<<<<< HEAD
=======
import Education from './form/Education'
import Skills from './form/Skills'
import { Link, Navigate, useParams } from 'react-router-dom'
import ThemeColor from './ThemeColor'
>>>>>>> 5bf110b704d8e8cecf61080f65031f5acc955db7

const FormSection = () => {
    const {resumeId}=useParams();
    const [activeformIndex, setActiveformIndex] = useState(1)
    const [enabledNext, setEnabledNext] = useState(false)
  return (
    <div>
        <div className='flex justify-between items-center'>
          <div className='flex-gap-5'>
            <Link to={"/dashboard"}>
            <Button><Home/></Button>
            </Link>
            <ThemeColor/>
            </div>
            <div className='flex gap-2'>
                {activeformIndex>1&&<Button size='sm' onClick={() => setActiveformIndex(activeformIndex-1)}><ArrowLeft /></Button>}
                <Button className='flex gap-2' size='sm' disabled={!enabledNext} onClick={() => setActiveformIndex(activeformIndex+1)}> Next <ArrowRight/> </Button>
            </div>
        </div>
            
        {/* Personal Details */}
        {activeformIndex===1?<PersonalDetail enabledNext={(v) => setEnabledNext(v)}/>:null}
        {/* Summary */}
        {activeformIndex===2? <Summary enabledNext={(v) => setEnabledNext(v)}/> : null}
        {/* Experience  */}
<<<<<<< HEAD
        {activeformIndex === 3? <Experience enabledNext={(v) => setEnabledNext(v)}/> : null}
=======
        {activeformIndex==3? <Experience enabledNext={(v) => setEnabledNext(v)}/> : null}
>>>>>>> 5bf110b704d8e8cecf61080f65031f5acc955db7
        {/* Educational Details  */}
        {activeformIndex==4? <Education enabledNext={(v) => setEnabledNext(v)}/> : null}
        {/* Skills  */}
        {activeformIndex==5? <Skills enabledNext={(v) => setEnabledNext(v)}/> : null}
        {activeformIndex==6? <Navigate to={'/my-resume/'+resumeId+'/view'}/> : null}
    </div>
  )
}

export default FormSection