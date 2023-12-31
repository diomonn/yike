'use client'

import TitleName from '@/components/titleName'
import Classification from '@/components/Classification'
import Card from '@/components/card'
import {Read as Readview, Write as Writeview} from '@/components/form'
import { useState,useEffect } from "react";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {MaterialSymbolsAddCircleOutlineRounded} from '@/until/icon'
import Drawer from '../../components/Drawer'

import fn from '@/hooks/api';
import  {useAppDispatch as UseAppDispatch ,useAppSelector} from '@/features/hooks';
import  {GetAllNote,PostNote} from '@/features/module/Note';


export default function Page(){
    const [active,useactive]=useState(0)
    const [index,setindex]=useState(0)
    const [display,usedisply] =useState(false)
    const [create,addCreate] =useState(false)
    const ClassificationArray=['全部','留言','目标','理想','过去','将来','爱情','亲情','友情','秘密','信条','无题']
    // const [messages,setmessages]=useState<Message[]>([])
    const messages =useAppSelector(state=>state.Note)
    const dispatch=UseAppDispatch()
    const {GET,POST}=fn()
    const User=useAppSelector(state=>state.User.id)
    const [parent]=useAutoAnimate({
      duration:300
    })

    
    const CreateCard=async function(Note:Message){
      const data=await POST<Message>('api/Note/Post',Note)
      if (data.ok) {
        dispatch(PostNote(data.data))
      }
       
    }
    const addCard=async function(){
      const data=await GET('api/Note/Get/GetNote')
      if (data) {
      dispatch(GetAllNote(data))
      }
    }
    const Setdisply=(index:number)=>{
      setindex(index)
      usedisply(true)
    }
    useEffect(()=>{
     
      addCard()
       //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return <>
    <div>
    
    <TitleName title="留言墙" message="很多事情值得记录,当然也值得回味"></TitleName>
    <div  className='px-12 transition-all' >
    <Classification Classification={ClassificationArray} active={active} useactive={useactive}></Classification>

    </div>
     <div className="flex justify-center flex-wrap " ref={parent} >
     {
     messages.map((messages,index)=>{
           return  messages.statusId===active||active===0?<div key={messages.id} onClick={()=>{Setdisply(index)}} className='hover:-translate-y-2  hover:drop-shadow-lg hover:shadow-[black]'><Card    Message={messages} ></Card></div>:null
           })
     }
     </div>
     <div onClick={()=>{
    addCreate(true)
      
     }}  className={
      `text-5xl  fixed right-0 bottom-0 cursor-pointer }`
     }>
       <MaterialSymbolsAddCircleOutlineRounded className='transition-all dark:text-Darktextcolor'/>

     </div>
    </div>
     <Drawer mode={true} show={display} setshow={usedisply}>
      <Readview message={messages[index]}></Readview>
     </Drawer>
     <Drawer mode={false} show={create} setshow={addCreate} >
    
      <Writeview CreateCard={CreateCard} setshow={addCreate}></Writeview>
      
     </Drawer>
    </>
}
