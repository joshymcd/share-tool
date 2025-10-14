import { createFileRoute, Link, Outlet, notFound } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu" 
import { Badge } from '@/components/ui/badge'
import { getShare } from '@/serverFunctions/share'
import { Separator } from '@/components/ui/separator'

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
  return <div className='flex flex-col gap-4 h-full py-4'>
    <div className="flex flex-row gap-2  w-full items-center ">
    <Link to="/" className=' '>Home</Link>

      <Separator orientation="vertical" />      <NavigationMenu className='w-full flex-1'>
        <NavigationMenuLink asChild>
          <Link to="/$shareId" params={{ shareId: shareId }}>Formatted</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link to="/$shareId/raw" params={{ shareId: shareId }}>Markdown</Link>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <Link to="/$shareId/original" params={{ shareId: shareId }}>Original</Link>
        </NavigationMenuLink>
      </NavigationMenu>
    </div>
    <main className='flex-1 overflow-y-hidden flex flex-col gap-2'>
      <div className='w-full   rounded-md  p-2 flex items-center gap-2 flex-wrap'>
      
        {share.formattedData.tags.map((tag) => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>
      <Outlet />
    </main>
  </div>
}
