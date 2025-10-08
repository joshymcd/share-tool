import { createFileRoute, notFound, } from '@tanstack/react-router'
import { getShare } from '@/serverFunctions/share'

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
  return (
  <div className='flex flex-col gap-4'>
    <div className="">Hello {shareId}!</div>
    <span>{share?.rawData}</span>
  </div>)
}
