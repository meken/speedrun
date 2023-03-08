const { ListServices } = require("./modules/gapi")

test('expect at least one deployed Cloud Run service', async () => {
    const services = await ListServices()
    expect(services.length).toBeGreaterThanOrEqual(1)
  })