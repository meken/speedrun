async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController()
    const signal = controller.signal

    setTimeout(() => { 
        controller.abort()
      }, timeout)
      
    return fetch(url, { signal })
}

module.exports = {
    fetchWithTimeout
}