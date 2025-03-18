import { client } from "@/sanity/lib/client"
import {validatePreviewUrl} from "@sanity/preview-url-secret"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

// this file is used to allow presentaion to set the app in Darft mode  which will load visual editing and quwey drat content and preview the content as it will appere everthing is publish 

const token = process.env.SANITY_API_READ_TOKEN
export async function GET(request: Request) {
    const {isValid , redirectTo="/"} = await validatePreviewUrl(
        client.withConfig({token}),
        request.url
    )
    if(!isValid){
        return new Response("Invalid secret" , {status:401})
    }
    (await draftMode()).enable()
    redirect(redirectTo)
}