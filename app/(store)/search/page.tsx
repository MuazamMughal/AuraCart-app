import React from 'react'
// so the main thing to concider is that in Next.js15 
// the aprameter of geting the serch prms from the urs is differet from next14

async function SearchPage({searchParams}:{searchParams: {query: string}}) {
    
    const {query} =await searchParams
    return (
        <div>
            Serchpage with the query{query} 
        </div>
    )
    
}

export default SearchPage