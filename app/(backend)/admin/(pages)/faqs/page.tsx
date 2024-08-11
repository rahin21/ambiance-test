import FaqForm from '@/components/tailAdmin/faq/faqForm'
import FAQTable from '@/components/tailAdmin/faq/faqTable';
import React from 'react'

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/faq`, 
    {
    next: { tags: ["faq"] },
  }
);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function FAQs() {
  const faqs = await getData();
  // console.log(faqs);
  return (
    <div>
      <FaqForm />
      <FAQTable faq={faqs}/>
    </div>
  )
}

export default FAQs