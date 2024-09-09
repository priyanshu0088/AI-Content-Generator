"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListsection from './_components/TemplateListSection'

function Dashboard() {

  const [userSearchInput,setUserSearchInput] = useState<string>()
  return (
    <div>
        {/* searchSection */}
        <SearchSection onSearchInput={(value:string)=>setUserSearchInput(value)}/>

        {/* templatesection */}
        <TemplateListsection userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard
