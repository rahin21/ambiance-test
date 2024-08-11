import GalleryForm from '@/components/tailAdmin/about/galleryForm'
import { ParamsType } from '@/types/types'
import axios from 'axios'
import React from 'react'

async function GalleryId({params}:{params:ParamsType}) {
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/gallery/${params.id}`)
  let gallery = res.data;
  console.log(gallery);
  return (
    <div>
      <GalleryForm gallery={gallery} isUpdate/>
    </div>
  )
}

export default GalleryId