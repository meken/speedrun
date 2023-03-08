const { auth } = require('google-auth-library');
const { google } = require('googleapis');

const creds = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
});
google.options({
    auth: creds
});
const run = google.run("v1")
const logging = google.logging("v2")
const ar = google.artifactregistry("v1")

/* 
    Return Cloud Run logs written in the past 5 minutes.    
*/
async function RecentCloudRunLogs(){
    let projectId = await auth.getProjectId()
    const twoHoursInMilliseconds = 2 * 60 * 60 * 1000
    const start = new Date(new Date().valueOf() - twoHoursInMilliseconds);
    
    const filter = `resource.type = cloud_run_revision 
    AND severity >= DEFAULT 
    AND timestamp>="${start.toISOString()}"`
        
    const response = await logging.entries.list({
        filter, 
        orderBy: "timestamp desc", 
        pageSize: 100, 
        resourceNames: [`projects/${projectId}`]
    })
    const logs = response.data?.entries || []
    return logs
}

async function ListRepositories() {
    let projectId = await auth.getProjectId()
    let locations = await ar.projects.locations.list({name: `projects/${projectId}`})
    
    let ps = locations.data.locations.map(l => {
        return ar.projects.locations.repositories.list({
            parent: l.name
        })
    })
    let repos = (await Promise.all(ps))
        .map(resp => resp.data?.repositories)
        .filter(r => r != undefined);
    
    return repos.flat()
}

async function ListImages(repoName) {    
    let images = await ar.projects.locations.repositories.dockerImages.list({
        parent: repoName
    })
    result = images.data?.dockerImages || []    
    return result
}

async function ListRevisions(){
    let projectId = await auth.getProjectId()
    let revisions = await run.projects.locations.revisions.list({
        parent: `projects/${projectId}/locations/-`
    })
    return revisions.data.items
}

async function ListServices() {
    let projectId = await auth.getProjectId()
    let services = await run.projects.locations.services.list({
        parent: `projects/${projectId}/locations/-`
    })
    return services.data.items
}

module.exports = {
    ListServices,
    ListRepositories, 
    ListImages,
    RecentCloudRunLogs
}
