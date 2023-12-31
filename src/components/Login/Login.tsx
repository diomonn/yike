'use client'
import {inter} from '@/hooks/font';
import {useForm as UseForm,SubmitHandler} from 'react-hook-form';
interface User{
  name?:String 
  email?:String
  password:String
}
import fn from '@/hooks/api'
import {Getuserinfo} from '@/features/module/User'
import {useAppDispatch as UseAppDispatch} from '@/features/hooks'
export default function moduleName(){
  const {register,handleSubmit,watch,formState:{errors}}=UseForm<User>({
  })
  const dispatch =UseAppDispatch()
  const {POST_NOTOKEN}=fn()
  const onSubmit: SubmitHandler<User>=async (data) => {
    const res =await POST_NOTOKEN('api/User/Get/login',data) 
    if (res.data) {
      dispatch(Getuserinfo({value:res.data, token:res.token}))
    }else{
      console.error(res.err);
    }
  }

  return <form className='flex flex-col items-center w-full' onSubmit={handleSubmit(onSubmit)}>
  <input className='w-full m-2 shadow-dodgerblue shadow-sm h-10'  type="text" {...register("email")} placeholder='输入你的邮箱' />
  <input className='w-full m-2 shadow-dodgerblue shadow-sm h-10' type="password" {...register("password")} placeholder='输入你的密码' />
  <button  className={`bg-dodgerblue w-3/4 py-2 px-8 rounded-full text-xl ${inter.className}`}>登录</button>
      </form>
}
