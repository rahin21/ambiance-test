import ServiceForm from '@/components/tailAdmin/Services/serviceForm'
import ServiceTable from '@/components/tailAdmin/Services/serviceTable'
import { getServiceData } from '@/constants/admin/serviceData';

import React from 'react'


async function Services() {
  const services = await getServiceData();
  
  return (
    <div>
      <ServiceForm/>
      <h1 className="text-2xl font-semibold text-black capitalize mt-5 mb-3">
        Servies
      </h1>
      <ServiceTable service={services}/>
    </div>
  )
}

export default Services