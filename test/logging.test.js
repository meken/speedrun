const { RecentCloudRunLogs } = require("./modules/gapi")

let logs = []

beforeAll(async () => {
    logs = await RecentCloudRunLogs()
});


test('expect a log "Hello World" from a Cloud Run container', async () => {    
    const helloLogs = logs.filter( l => l.textPayload.includes("Hello World!"))
    expect(helloLogs.length).toBeGreaterThanOrEqual(1)
})

test.skip('expect a log "Hello World" with different severity levels', async () => {})