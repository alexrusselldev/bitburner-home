import { startHacks } from 'lib/startHacks'

/** @param {NS} ns */
export async function main(ns) {
  const serverFile = ns.read(ns.args[0])
  const servers = serverFile.split('\n')
  const myServers = ns.getPurchasedServers()

  for (const myServer of myServers) {
    if (ns.fileExists('hack.js', myServer)) {
      ns.rm('hack.js', myServer)
    }
    ns.scp('hack.js', myServer)

    startHacks(ns, myServer, servers, true)
  }
}
