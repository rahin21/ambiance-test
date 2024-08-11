import PrivacyTermForm from '@/components/tailAdmin/privacy/privacyForm'
import PrivacyTable from '@/components/tailAdmin/privacy/privacyTable'
import { getTermData } from '@/constants/admin/privacyData'
import React from 'react'

async function TermsOfServices() {
  const term = await getTermData();

  return (
    <div>
       <h4 className="text-2xl font-semibold text-black mb-4">
        Terms of Services
      </h4>
      <PrivacyTermForm terms isUpdate privacyTerms={term}/>
      
    </div>
  )
}

export default TermsOfServices