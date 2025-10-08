import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router' 
import { Textarea } from "@/components/ui/textarea" 
import { useState } from 'react'  
import { createShare } from '@/serverFunctions/share'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {   
  const [text, setText] = useState<string>("dfsfsd") 
  const navigate = useNavigate()
  const createShareFn = useServerFn(createShare)
  const { mutate: createShareMut } = useMutation({
    mutationFn: createShareFn,
    onSuccess: (data) => {
      console.log(data);
      navigate({ to: `/${data}` })
    },
    onError: (error) => {
      console.log(error);
    }
  })

  return <div className="container mx-auto flex flex-col gap-4">
    <h1 className="text-2xl font-bold text-center">Share Tool</h1>
    <Textarea className="w-full" rows={10} placeholder="Paste data here..." value={text}  onChange={(e) => setText(e.currentTarget.value)} />
    <Button onClick={() => createShareMut({ data: { text: text } })}>Format</Button>  
  </div>
}
