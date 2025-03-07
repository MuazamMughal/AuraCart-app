import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  

  //  so for realtime studio maupulation to our frountend we have to use the new tech named as, 
  //  stega 
  stega:{
    // so here we write the logic for url that if we have depled then vercel or othervise local host in development 

    studioUrl:     process.env.VERCEL_URL ?
     `https://${process.env.VERCEL_URL}/studio` : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  }

})
