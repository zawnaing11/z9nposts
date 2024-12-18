import Navbar from '@/components/Navbar'
import React from 'react'

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default Layout
