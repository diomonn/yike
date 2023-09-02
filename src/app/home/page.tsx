'use client'

import TitleName from '@/app/components/titleName'
import Classification from '@/app/components/Classification'
import Drawer from '@/app/components/Drawer'
import {Write} from '@/app/components/form'
import { useState } from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {MaterialSymbolsAddCircleOutlineRounded} from '@/until/icon'
export default function Page(){
  const [active,useactive]=useState('全部')
  const [display,usedisply] =useState(true)
  const [create,addCreate] =useState(false)
  const ClassificationArray=['全部','我','ta','最喜欢的','最有意义的','最值得纪念的','我的母校','我的生活','天空','大海','无题']
    return <> 
    <div className="min-h-[calc(100vh-2.5rem)">
     {/* <h1>你好</h1> */}
    <TitleName title="照片墙" message="很多事情值得记录,当然也值得回味"></TitleName>
    <div className='px-12 transition-all' >
    <Classification Classification={ClassificationArray} active={active} useactive={useactive}></Classification>

    </div>
             
 <button onClick={()=>{usedisply(true)}}> 打开了</button>
    </div>
    {/* // 这个组件可以抽出遮罩层DRAW */}
    <Drawer mode='Write' show={display} setshow={usedisply} >
      <Write/>
    </Drawer>
    </>

  }
