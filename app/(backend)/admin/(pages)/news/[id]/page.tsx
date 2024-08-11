import NewsForm from '@/components/tailAdmin/news/newsForm'
import { getNewsData } from '@/constants/admin/newsData';
import { ParamsType } from '@/types/types';
import axios from 'axios';
import React from 'react'

async function NewsId({params}:{params:ParamsType}) {
    const news = await getNewsData(params.id)
  return (
    <div>
        <NewsForm isUpdate news={news}/>
    </div>
  )
}

export default NewsId