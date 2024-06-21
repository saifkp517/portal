"use client"

import Head from 'next/head'
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import MyTable from '../components/tools/Table';
import axios from 'axios'
import MyChart from '../components/tools/Chart';
import SideNav from '../components/SideNav';

//sections
import PropertyUpload from '../components/sections/PropertyUpload';
import InterestedUsers from '../components/sections/Meetings';
import MyProperties from '../components/sections/MyProperties';
import EditSection from '../components/sections/EditSection';
import Meetings from '../components/sections/Meetings';

export default function Home() {

  const [activeComponent, setActiveComponent] = useState('properties');
  const handleActiveComponent = (data: string) => {
    setActiveComponent(data)
    console.log(data)
  }

  return (

    <div className="">
      <SideNav sendChangedComponent={handleActiveComponent} />
      <div className="p-8 sm:ml-64 bg-gray-200">
          {activeComponent === 'upload' && <PropertyUpload />}
          {activeComponent === 'users' && <InterestedUsers />}
          {activeComponent === 'properties' && <MyProperties sendChangedComponent={handleActiveComponent} />}
          {activeComponent === 'meetings' && <Meetings />}
          {activeComponent.startsWith('edit/') && <EditSection id={activeComponent.substring(5)} />}
      </div>
    </div>
  );
}
