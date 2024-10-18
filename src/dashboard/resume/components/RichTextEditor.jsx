import React, { useState } from 'react'
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