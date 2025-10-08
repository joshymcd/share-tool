import { DevToolsProvider } from "./DevToolsProvider"
import { TanstackQuery } from "./TanstackQuery"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackQuery>
        <DevToolsProvider>
        {children}
        </DevToolsProvider>
    </TanstackQuery>

  )
}