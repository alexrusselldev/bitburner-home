/**
 * @param {NS} ns
 * @param {string} host
 * @param {string[]} servers
 * @param {boolean} maxScripts should the function try and start the maximum amount of scripts
 * @param {number} threadModifier an integer that gets subtracted from the thread count before exec
 */

export function startHacks(ns, host, servers, maxScripts, threadModifier) {
  const ram = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
  const scriptInstances = ram / ns.getScriptRam('hack.js')
  const threads = maxScripts ? Math.floor(scriptInstances / servers.length) : 1

  if (threadModifier && !Number.isInteger(threadModifier)) {
    throw new Error('Thread modifier value must be an integer.')
  }

  if (threads == 0) {
    ns.print(`Could not fit scripts on ${host}`)
    return
  }

  for (const server of servers) {
    ns.exec(
      'hack.js',
      host,
      threadModifier && maxScripts ? threads - threadModifier : threads,
      server,
      1
    )
  }
}
