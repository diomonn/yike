'use client'
import './globals.css'

import Nav from '@/components/nav'
import Footer from '@/components/footer'
import {usePathname} from 'next/navigation'
import {useAutoAnimate} from '@formkit/auto-animate/react'
export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const Router= usePathname()
  const [auto]=useAutoAnimate()
  return (
    <html lang="en"  className='bg-dodgerblue text-[1.125rem] '>
      <body className='flex flex-col'>
      <header>  
     
         <Nav route={Router}/>
      </header>
       <main className='min-h-[calc(100vh-2.5rem)]' ref={auto} >
        {children}
       </main>
       <footer className='flex-2'>
        <Footer/>
       </footer>
      </body>
    </html>
  )
}
