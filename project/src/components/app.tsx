import { ImportStatementDialog } from './import-statement-dialog'
import { Visualizer } from './visualizer'

export function App() {
  return (
    <main className="h-[100dvh] w-screen overflow-hidden bg-radial from-[#222222] from-0% to-[#050505] to-100%">
      <ImportStatementDialog />
      <Visualizer />
    </main>
  )
}
