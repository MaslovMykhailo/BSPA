import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from './app-sidebar'
import { AppTitle } from './app-title'
import { GraphTypeSwitch } from './graph-type-switch'
import { GraphVisualizer } from './graph-visualizer'
// import { Visualizer } from './visualizer'

export function App() {
  return (
    <SidebarProvider className="h-full w-full">
      <AppSidebar />
      <main className="h-full w-screen overflow-hidden bg-radial from-[#222222] from-0% to-[#050505] to-100% relative">
        <GraphVisualizer />
        <div className="absolute top-0 left-0 right-0 flex z-10">
          <SidebarTrigger
            size="lg"
            className="text-white hover:text-gray-300 bg-muted p-5 rounded-md shadow-md w-10 -mr-10"
          />
          <AppTitle />
        </div>
        <GraphTypeSwitch />
      </main>
    </SidebarProvider>
  )
}
