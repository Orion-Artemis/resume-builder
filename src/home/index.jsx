import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import Header from '@/components/custom/Header'

function Home() {
  return (
    <div>
        <Header/>
        Landing Screen
        <UserButton/>
    </div>
  )
}

export default Home