 "use client"
import { useRouter } from 'next/navigation'
 import React from 'react'
 import {useDraftModeEnvironment} from "next-sanity/hooks"

const DisableDraftMode = () => {
 
    const environment = useDraftModeEnvironment()
    const router = useRouter()

    if(environment != "live" && environment !== "unknown"){
return null
    }
    const handleClient = async() =>{
        await fetch("/draft-mode/disable")
        router.refresh()
    }
 
    return (
    <button
    onClick = {handleClient}
    className=' fixed bottom-4 right-4 bg-gray-400 px-4 py-3 z-50'>
        Disable Draft Mode

    </button>
  )
}

export default DisableDraftMode