import React, { useState } from 'react'
<<<<<<< HEAD
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'

const RichTextEditor = () => {
    const [value, setValue] = useState()
  return (
    <div>
        <EditorProvider>
            <Editor value={value} onChange={() => {
                setValue(e.target.value)
            }}>
                <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnUnderline />
                    <BtnStrikeThrough />
                    <Separator />
                    <BtnNumberedList />
                    <BtnBulletList />
                    <Separator />
                    <BtnLink />
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor
=======
import {BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, Separator, BtnNumberedList,
        BtnBulletList, BtnLink, Editor, EditorProvider, Toolbar} from 'react-simple-wysiwyg'

function RichTexteditor({onRichTextEditorChange, defaultValue}) {
    const [value,setValue]=useState(defaultValue);
  return (
    <div>
    <EditorProvider>
      <Editor value={value} onChange={(e)=>{
        setValue(e.target.value)
        onRichTextEditorChange(e)
      }}>
         <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <BtnLink />
        </Toolbar>    
      </Editor>
    </EditorProvider>
    </div>
  )
}
export default RichTexteditor
>>>>>>> 5bf110b704d8e8cecf61080f65031f5acc955db7
