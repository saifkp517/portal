"use client"

import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import MyTable from './components/Table';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import MyChart from './components/Chart';


export default function Home() {

  const [tableData, setTabledata] = useState<any>([]);

  //text editor
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const [convertedContent, setConvertedContent] = useState<string | Node>("");

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  function createMarkup(html: string | Node) {
    console.log(html)
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  
  function HandleTableData(data: any) {
    setTabledata(data);
  }
  

  return (

    <div className="">
      <div className="">
        <div className="">
          <div className="border-black border-2 rounded-md">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={{
                options: ['inline', 'blockType']
              }}
            />
          </div>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(convertedContent)}>
          </div>
        </div>
      </div>
      <div className="">
        <MyTable TableData={HandleTableData}/>
      </div>
      <br />
      <div className="">
        <MyChart />
      </div>
    </div>
  );
}
