const { ListRepositories, ListImages } = require("./modules/gapi")

let repositories = []

beforeAll(async () => {
    repositories = await ListRepositories()
});

test('expect at least one Docker repository', async () => {    
    let repos = repositories.filter(r => r.description != "Cloud Run Source Deployments")
    expect(repos.length).toBeGreaterThanOrEqual(1)
})

test('expect one container image in Artifact Registry', async () => {
    let repos = repositories.filter(r => r.description != "Cloud Run Source Deployments")
    let ps = repos.map(r => ListImages(r.name))    
    let images = (await Promise.all(ps)).flat()
    expect(images.length).toBeGreaterThanOrEqual(1)
})

test.skip('expect one new revision with the new image', () => {})