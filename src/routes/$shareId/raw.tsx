import { createFileRoute, Link, notFound, } from '@tanstack/react-router'
import { getShare } from '@/serverFunctions/share' 
import remarkGfm from 'remark-gfm' 
import Markdown, { Components } from 'react-markdown'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export const Route = createFileRoute('/$shareId/raw')({
  loader: async ({ params }) => {
    const share = await getShare({ data: { shareId: params.shareId } }) 
    if (!share) throw notFound()
    return { share }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { shareId } = Route.useParams()
  const { share } = Route.useLoaderData()  
  return (
    <ScrollArea className='rounded-md border px-4 py-1 flex flex-col flex-1 overflow-y-auto py-4 h-full w-full overflow-x-hidden'>
      <pre className='whitespace-pre-wrap overflow-x-auto'>{share?.formattedData.contentMarkdown}</pre>
    </ScrollArea>
  )
}

 