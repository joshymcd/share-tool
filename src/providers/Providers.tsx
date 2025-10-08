import { DevToolsProvider } from "./DevToolsProvider"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DevToolsProvider>
      {children}
    </DevToolsProvider>
  )
}