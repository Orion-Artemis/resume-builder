import React, { useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './form/Summary'
import Experience from './form/Experience'

const FormSection = () => {
    const [activeformIndex, setActiveformIndex] = useState(1)
    const [enabledNext, setEnabledNext] = useState(false)
  return (
    <div>
        <div className='flex justify-between items-center'>
            <Button variant='outline' size='sm' className='flex gap-2'><LayoutGrid/> Theme</Button>
            <div className='flex gap-2'>
                {activeformIndex>1&&<Button size='sm' onClick={() => setActiveformIndex(activeformIndex-1)}><ArrowLeft /></Button>}
                <Button className='flex gap-2' size='sm' disabled={!enabledNext} onClick={() => setActiveformIndex(activeformIndex+1)}> Next <ArrowRight/> </Button>
            </div>
        </div>
            
        {/* Personal Details */}
        {activeformIndex===1?<PersonalDetail enabledNext={(v) => setEnabledNext(v)}/>:null}
        {/* Summary */}
        {activeformIndex === 2? <Summary enabledNext={(v) => setEnabledNext(v)}/> : null}
        {/* Experience  */}
        {activeformIndex === 3? <Experience enabledNext={(v) => setEnabledNext(v)}/> : null}
        {/* Educational Details  */}
        {/* Skills  */}
    </div>
  )
}

export default FormSection