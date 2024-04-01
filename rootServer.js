import { getPortOpeners } from 'lib/getPortOpeners'

export function autocomplete(data) {
  return [...data.servers]
}

/**
 * @param {NS} ns
 */
export async function main(ns) {
  const serverFile = ns.read('servers.txt').split('\n')
  const servers =
    serverFile.length == 1 && serverFile[0] == [''] ? [] : serverFile

  const honeypotsFile = ns.read('honeypots.txt').split('\n')
  const honeypots =
    honeypotsFile.length == 1 && honeypotsFile[0] == [''] ? [] : honeypotsFile

  for (const server of ns.args) {
    if (!ns.serverExists(server)) {
      ns.tprint(`WARN: Could not connect to server ${server}. Skipping...`)
      continue
    }

    if (ns.getServerRequiredHackingLevel(server) > ns.getHackingLevel()) {
      ns.tprint(`WARN: Insufficient hacking skill for ${server}. Skipping...`)
      continue
    }

    const portOpeners = getPortOpeners(ns)

    if (portOpeners.length < ns.getServerNumPortsRequired(server)) {
      ns.tprint(
        `WARN: Insufficient port openers to gain root access to ${server}. Skipping...`
      )
      continue
    }

    for (const portOpener of portOpeners) {
      portOpener(server)
    }

    ns.nuke(server)
    if (ns.getServerMoneyAvailable(server) == 0) {
      if (honeypots.includes(server)) {
        ns.tprint(
          `SUCCESS: ${server} rooted. $0 available. ${server} already exists in honeypots.txt. Skipping write.`
        )
        honeypots.push(server)
        continue
      }

      ns.tprint(
        `SUCCESS: ${server} rooted. $0 available. Writing to honeypots.txt`
      )

      ns.write('honeypots.txt', `\n${server}`, 'a')
      continue
    }

    if (servers.includes(server)) {
      ns.tprint(
        `SUCCESS: ${server} rooted. ${server} already exists in servers.txt. Skipping write.`
      )
      continue
    }

    ns.write('servers.txt', `\n${server}`, 'a')
    servers.push(server)
    ns.tprint(`SUCCESS: ${server} rooted and added to servers.txt`)
  }
}
