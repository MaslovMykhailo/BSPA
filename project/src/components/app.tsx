import { SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from './app-sidebar'
import { Visualizer } from './visualizer'

export function App() {
  return (
    <SidebarProvider className="h-full w-full">
      <AppSidebar />
      <main className="h-full w-screen overflow-hidden bg-radial from-[#222222] from-0% to-[#050505] to-100%">
        <Visualizer />
      </main>
    </SidebarProvider>
  )
}
