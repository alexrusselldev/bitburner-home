import { getPortOpeners } from 'lib/getPortOpeners'

export function autocomplete(data) {
  return [...data.servers]
}

/**
 * @param {NS} ns
 */
export async function main(ns) {
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

    ns.write('servers.txt', `\n${server}`, 'a')
  }
}
