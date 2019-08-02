import {
    Gitlab,
} from 'gitlab';

import {
    existsSync,
    readFileSync,
    writeFileSync
} from 'fs';

import {
    join
} from 'path';

let app = async () => {

    const realPath = (path) => join(process.cwd(), path);
    const fileName = {
        gitlabHost: `gitlab-host.txt`,
        gitlabPersonalToken: 'gitlab-personal-token.txt',
        projectId: 'ProjectIDs.txt',
        mergeRequestDescription: 'MR-description.md',
        mergeRequestTitle: 'MR-title.txt',
        sourceBranch: 'source-branch.txt',
        targetBranch: 'target-branch.txt',
    }

    var isInitial = false;

    if (!await existsSync(realPath(`${fileName.gitlabHost}`))) {
        writeFileSync(realPath(`${fileName.gitlabHost}`), ``)
        console.log(`Please check ${fileName.gitlabHost} in folder.`)
        isInitial = true;
    }

    if (!await existsSync(realPath(`${fileName.gitlabPersonalToken}`))) {
        writeFileSync(realPath(`${fileName.gitlabPersonalToken}`), ``)
        console.log(`Please check ${fileName.gitlabPersonalToken} in folder.`)
        isInitial = true;
    }

    if (!await existsSync(realPath(`${fileName.projectId}`))) {
        writeFileSync(realPath(`${fileName.projectId}`), ``)
        console.log(`Please check ${fileName.projectId} in folder.`)
        isInitial = true;
    }
    if (!await existsSync(realPath(`${fileName.mergeRequestDescription}`))) {
        writeFileSync(realPath(`${fileName.mergeRequestDescription}`), ``)
        console.log(`Please check ${fileName.mergeRequestDescription} in folder.`)
        isInitial = true;
    }
    if (!await existsSync(realPath(`${fileName.mergeRequestTitle}`))) {
        writeFileSync(realPath(`${fileName.mergeRequestTitle}`), ``)
        console.log(`Please check ${fileName.mergeRequestTitle} in folder.`)
        isInitial = true;
    }
    if (!await existsSync(realPath(`${fileName.sourceBranch}`))) {
        writeFileSync(realPath(`${fileName.sourceBranch}`), ``)
        console.log(`Please check ${fileName.sourceBranch} in folder.`)
        isInitial = true;
    }
    if (!await existsSync(realPath(`${fileName.targetBranch}`))) {
        writeFileSync(realPath(`${fileName.targetBranch}`), ``)
        console.log(`Please check ${fileName.targetBranch} in folder.`)
        isInitial = true;
    }
    if (isInitial) return;

    var isValidConfig = true;

    const gitlabHost = readFileSync(realPath(`${fileName.gitlabHost}`), `utf8`).replace(`\n`, ``).replace(`\r`, ``)
    if (gitlabHost == ``) {
        console.log(`gitlab-host.txt is empty!`);
        isValidConfig = false;
    }

    const gitlabPersonalToken = readFileSync(realPath(`${fileName.gitlabPersonalToken}`), `utf8`).replace(`\n`, ``).replace(`\r`, ``)
    if (gitlabPersonalToken == ``) {
        console.log(`${fileName.gitlabPersonalToken} is empty!`);
        isValidConfig = false;
    }

    const selectedProjectIDs = readFileSync(realPath(`${fileName.projectId}`), `utf8`)
        .split(`\n`).filter(x => x != ``)
    if (selectedProjectIDs.length == 0) {
        console.log(`${fileName.projectId} is empty!`);
        isValidConfig = false;
    }

    const mergeRequestDescription = readFileSync(realPath(`${fileName.mergeRequestDescription}`), `utf8`)
    if (mergeRequestDescription == ``) {
        console.log(`${fileName.mergeRequestDescription} is empty!`);
        isValidConfig = false;
    }

    const mergeRequestTitle = readFileSync(realPath(`${fileName.mergeRequestTitle}`), `utf8`).replace(`\n`, ``).replace(`\r`, ``)
    if (mergeRequestTitle == ``) {
        console.log(`${fileName.mergeRequestTitle} is empty!`);
        isValidConfig = false;
    }

    const sourceBranch = readFileSync(realPath(`${fileName.sourceBranch}`), `utf8`).replace(`\n`, ``).replace(`\r`, ``)
    if (sourceBranch == ``) {
        console.log(`${fileName.sourceBranch} is empty!`);
        isValidConfig = false;
    }

    const targetBranch = readFileSync(realPath(`${fileName.targetBranch}`), `utf8`).replace(`\n`, ``).replace(`\r`, ``)
    if (targetBranch == ``) {
        console.log(`${fileName.targetBranch} is empty!`);
        isValidConfig = false;
    }

    if (isValidConfig == false) return;

    const gitlab = new Gitlab({
        host: gitlabHost,
        token: gitlabPersonalToken
    })

    selectedProjectIDs.map(async (id) => {
        try {
            await gitlab.MergeRequests
                .create(id, sourceBranch, targetBranch, mergeRequestTitle, {
                    // assignee_id : number;
                    description: mergeRequestDescription,
                    target_project_id: id,
                    // labels: string,
                    // milestone_id: number,
                    remove_source_branch: false,
                    // allow_collaboration: true,
                    // allow_maintainer_to_push: true,
                    squash: true,
                })
        } catch (error) {
            console.log(error)
        }

    });
};
app();
