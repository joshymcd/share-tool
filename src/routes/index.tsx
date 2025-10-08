import { createFileRoute } from '@tanstack/react-router' 

export const Route = createFileRoute('/')({
  component: App,
})

function App() { 
  return <div className="bg-red-500 text-white p-4">Hello World</div>
}
