const {fetchWithTimeout} = require("./modules/fetchtimeout")
const { ListServices } = require("./modules/gapi")

let service = undefined

beforeAll(async () => {
    let services = await ListServices();
    for (let index = 0; index < services.length; index++) {        
        const s = services[index];
        let sqlUrl = s.status?.url        
        if (sqlUrl) {            
            try {
                let resp = await fetchWithTimeout(`${sqlUrl}/sql`, 5000)    
                if (resp.status != 404){
                    service = s;
                    return;
                }            
            } catch (error) {
                continue // ignore timeout
            }
        }
    }
});

test('expect a SQL connection to be configured on the Cloud Run service', async () => {
    expect(service).toBeDefined()
    instanceName = service.spec?.template?.metadata?.annotations["run.googleapis.com/cloudsql-instances"]
    expect(instanceName).toBeDefined()    
})

test('expect the sql/ path to return success on the Cloud Run service', async () => {
    expect(service).toBeDefined()
    let resp = await fetch(`${service.status.url}/sql`)    
    expect(resp.status).toEqual(200)
})


