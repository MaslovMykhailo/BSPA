import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from './app-sidebar'
import { AppTitle } from './app-title'
import { Visualizer } from './visualizer'

export function App() {
  return (
    <SidebarProvider className="h-full w-full">
      <AppSidebar />
      <main className="h-full w-screen overflow-hidden bg-radial from-[#222222] from-0% to-[#050505] to-100% relative">
        <Visualizer />
        <div className="absolute top-0 left-0 w-full flex gap-2 z-10">
          <SidebarTrigger size="lg" className="text-white hover:text-gray-300 bg-muted p-5 rounded-md shadow-md w-10" />
          <AppTitle />
        </div>
      </main>
    </SidebarProvider>
  )
}
