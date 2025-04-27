import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col gap-1">
      <h1 className="text-3xl font-bold underline">"Hello, world!"</h1>
      <Button>Click me</Button>
    </div>
  )
}
