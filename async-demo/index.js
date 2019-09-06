console.log('Before');

// Promise-based approach
// getUser(1)
//     .then(user => getRepository(user.GitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(comints => console.log('Commints: ' + comints))
//     .catch(err => console.log('Error', err.message));


// Async and Await approach
async function displayCommints() {
    try {
        const user = await getUser(1);
        const repos = await getRepository(user.gitHubUsername);
        const commints = await getCommits(repos[0]);
        console.log(commints);
    }
    catch(err) {
        console.log('Error', err.message);
    }
}

displayCommints();

console.log('After');

function getUser(id)  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from the data base...');
            resolve({ id: id, gitHubUsername: 'HB' });
        }, 2000);
    });
}

function getRepository(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting the repos from GitHub') ;
            resolve(['repo1', 'repo2', 'repo3']);
         }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting the commits from GitHub') ;
            resolve(['commit1', 'commit2', 'commit3']);
         }, 2000);
    });
}