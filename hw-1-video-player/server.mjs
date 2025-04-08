import path from 'path'
import server from 'live-server'

server.start({
  file: 'index.html',
  root: path.resolve('.'),
  open: true,
})
