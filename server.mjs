import path from 'path'
import server from 'live-server'

server.start({
  file: 'index.html',
  root: getRoot(),
  open: true,
})

function getRoot() {
  return path.resolve(getFolderFromArgv())
}

function getFolderFromArgv() {
  return process.argv[2]
}
