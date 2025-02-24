'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function Home() {
  const router = useRouter()
  const handleStart = () => router.push(`/lanche-express`)
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Button onClick={handleStart} className='rounded-full'>
        Clique aqui para entrar
      </Button>
    </div>
  )
}
