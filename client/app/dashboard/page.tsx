"use client"

import Head from 'next/head'
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTable from '../components/tools/Table';
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import MyChart from '../components/tools/Chart';
import SideNav from '../components/SideNav';

//sections
import PropertyUpload from '../components/sections/PropertyUpload';
import InterestedUsers from '../components/sections/InterestedUsers';
import MyProperties from '../components/sections/MyProperties';

export default function Home() {

  const [activeComponent, setActiveComponent] = useState('upload');
  const handleActiveComponent = (data: string) => {
    setActiveComponent(data)
  }

  return (

    <div className="">
      <SideNav sendChangedComponent={handleActiveComponent} />
      <div className="p-8 sm:ml-64 bg-gray-200">
          {activeComponent === 'upload' && <PropertyUpload />}
          {activeComponent === 'users' && <InterestedUsers />}
          {activeComponent === 'properties' && <MyProperties />}
      </div>
    </div>
  );
}
