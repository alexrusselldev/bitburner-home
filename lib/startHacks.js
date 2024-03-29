/** @param {NS} ns
 *  @param {string} host
 *  @param {string[]} servers
 *  @param {boolean} maxScripts
 */
export function startHacks(ns, host, servers, maxScripts, threadModifier) {
  const ram = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
  const scriptInstances = ram / ns.getScriptRam('hack.js')
  const threads = maxScripts ? Math.floor(scriptInstances / servers.length) : 1
  if (threads == 0) {
    ns.print(`Could not fit scripts on ${host}`)
    return
  }
  for (const server of servers) {
    ns.exec(
      'hack.js',
      host,
      threadModifier ? threads - threadModifier : threads,
      server,
      1
    )
  }
}
