import { Loader2, PlusSquare } from 'lucide-react'
import {React, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalAPI from './../../../service/GlobalAPI.js'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
  

const AddResume = () => {

    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState()
    const { user } = useUser();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()

    
    const onCreate = () =>{
      setLoading(true)
      const uuid = uuidv4()
      const data = {
        data:{
          title: resumeTitle,
          resumeId: uuid,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        }
      }
      GlobalAPI.createNewResume(data).then(resp => {
        console.log(resp)
        if(resp){
          setLoading(false)
          navigation('/dashboard/resume/' + resp.data.data.documentId + '/edit')
        }
      },(error) => setLoading(false))
    }

  return (
    <div>
        <div className='p-14 py-24 items-center border flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' onClick={() => {setOpenDialog(true)}}>
            <PlusSquare />
        </div>
        <Dialog open={openDialog}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add Title for your New Resume</p>
              <Input className='my-2 ' placeholder='Ex. Full Stack Resume' onChange={(e) => setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button disable={!resumeTitle || loading} onClick={() => onCreate()}>
                {
                  loading?<Loader2 className='animate-spin'/>: 'Create'
                }
              </Button>
            </div>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddResume