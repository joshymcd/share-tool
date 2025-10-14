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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/$shareId/')({
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
    <ScrollArea className='rounded-md border px-4 py-1 flex flex-col flex-1 overflow-y-auto py-4 h-full'>
      <Markdown components={markdownComponents} remarkPlugins={[remarkGfm]} >{share?.formattedData.contentMarkdown}</Markdown>
    </ScrollArea>
 )
}


const markdownComponents:Components = {
 
 
  table: ({ node, ...props }) => {
    return <Table {...props}  />
  }, 
  tbody: ({ node, ...props }) => {
    return <TableBody {...props} />
  },
  td: ({ node, ...props }) => {
    return <TableCell {...props} />
  },
  thead: ({ node, ...props }) => {
    return <TableHeader {...props} />
  },
  caption: ({ node, ...props }) => {
    return <TableCaption {...props} />
  },
  tr: ({ node, ...props }) => {
    return <TableRow {...props} />
  },
  th: ({ node, ...props }) => {
    return <TableHead {...props} />
  },

 
  li: ({ node, ...props }) => {
    return <Item><ItemContent className='flex flex-row gap-2'>{props.children}</ItemContent></Item>
  },


  input: ({ node, ...props }) => {
    switch (props.type) {
      case 'checkbox':
        return <Checkbox>{props.children}</Checkbox>
      default:
        return <Input {...props} />
    }
  },


  h1: ({ node, ...props }) => {
    return <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance" {...props} />
  },
  h2: ({ node, ...props }) => {
    return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props} />
  },
  h3: ({ node, ...props }) => {
    return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  },
  h4: ({ node, ...props }) => {
    return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight" {...props} />
  },
}

 