import { startHacks } from 'lib/startHacks'

/**
 * @param {NS} ns
 * TODO: Disable default logs, add logging
 * TODO: Add terminal feedback on success
 */
export async function main(ns) {
  const serverFile = ns.read(ns.args[0])
  const servers = serverFile.split('\n')

  startHacks(ns, 'home', servers, true, 2)
}
