import FaqForm from '@/components/tailAdmin/faq/faqForm'
import { ParamsType } from '@/types/types'
import axios from 'axios'
import React from 'react'

async function FAQid({params}:{params:ParamsType}) {
    let faq
    try {
        const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/faq/${params.id}`)
        faq = res.data;
    } catch (error) {
        console.log(error);
    }

  return (
    <FaqForm faq={faq} isUpdate/>
  )
}

export default FAQid