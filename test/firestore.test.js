const { ListServices } = require("./modules/gapi")
const { fetchWithTimeout } = require('./modules/fetchtimeout')

test('expect the firestore/ endpoint to return a record', async () => {
    const services = await ListServices()
    expect(services.length).toBeGreaterThanOrEqual(1)
    let service = undefined

    //Find a service with a successful /firestore response
    for (let index = 0; index < services.length; index++) {
        const s = services[index];
        
        let serviceUrl = s.status?.url
        if (serviceUrl) {
            try {
                let resp = await fetchWithTimeout(`${serviceUrl}/firestore`, 5000)
                if (resp.status == 200) {                        
                    service = s;
                }
            } catch (error) {
                console.log(error);
                continue // ignore timeout
            }
        }
    }
    // If service is defined here, the endpoint returned
    // a record from firestore/
    expect(service).toBeDefined()
})