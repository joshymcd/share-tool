import { createFileRoute, notFound, } from '@tanstack/react-router'
import { getShare } from '@/serverFunctions/share'
import { marked } from 'marked';

export const Route = createFileRoute('/$shareId')({
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
  const getMarkdownText = () => {
    var rawMarkup = marked.parse(share?.formattedData.contentMarkdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""));
    return { __html: rawMarkup };
  }
  return (
  <div className='flex flex-col gap-4 h-full overflow-y-auto container mx-auto'>
    <div className="">Hello {shareId}!</div> 
    <div className='flex-1 overflow-y-auto' dangerouslySetInnerHTML={getMarkdownText()} />
  </div>)
}
