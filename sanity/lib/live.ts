// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './client'
// so here i set my viewing token 
const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error('SANITY_API_TOKEN is not set')
}



export const { sanityFetch, SanityLive } = defineLive({ 
  // client: client.withConfig({ 
  //   // Live content is currently only available on the experimental API
  //   // https://www.sanity.io/docs/api-versioning
  //   apiVersion: 'vX' 

  // we made it bit coustom 
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions:{
    revalidate: 0,
  }
  // we just make sure that  this is server time rendering each time 
  }) 
;
