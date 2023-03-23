const { RecentCloudRunLogs } = require("./modules/gapi")

let logs = []

beforeAll(async () => {
    logs = await RecentCloudRunLogs()
});


test('expect a log "Hello World" from a Cloud Run container', async () => {
    const helloLogs = logs.map(
        ({ textPayload, jsonPayload, severity }) => {
            return {
                message: textPayload || jsonPayload?.message?.message,
                severity
            }
        }).filter(({message}) => message?.includes('Hello World'))

    expect(helloLogs.length).toBeGreaterThanOrEqual(1)
})

// test.skip('expect a log "Hello World" with different severity levels', async () => { })