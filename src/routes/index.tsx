import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router' 
import { Textarea } from "@/components/ui/textarea" 
import { useState } from 'react' 
import { useWebShare } from '@/hooks/use-web-share'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {   
  const [data, setData] = useState<string>("") 

  return <div className="container mx-auto flex flex-col gap-4">
    <h1 className="text-2xl font-bold text-center">Share Tool</h1>
    <Textarea className="w-full" rows={10} placeholder="Paste data here..." value={data} onKeyDown={(e) => {
       e.preventDefault()
       setData(e.currentTarget.value)
    }}  />
    <Button>Share</Button>  
  </div>
}
