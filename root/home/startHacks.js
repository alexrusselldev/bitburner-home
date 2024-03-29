import { startHacks } from 'lib/startHacks'

/** @param {NS} ns */
export async function main(ns) {
  const serverFile = ns.read(ns.args[0])
  const servers = serverFile.split('\n')

  startHacks(ns, 'home', servers, true, 2)
}
