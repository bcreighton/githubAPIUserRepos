const searchUrl = 'https://api.github.com/users/';

function displayUserRepos(userRepos, user) {
    console.log(`Displaying ${user}'s repos...`);

}

function getRepos(user) {
    console.log('Generating repos...');
    const url = searchUrl + user + '/repos';

    const fetchRepos = async () => {
        try {
            const repoRes = await fetch(url);

            if(repoRes.ok){
                const userRepos = await repoRes.json();
                displayUserRepos(userRepos, user);
                console.log(userRepos);

            } else {
                throw new Error(repoRes.statusText);
            }

        } catch(e) {
            const errorMessage = (e.message).toLowerCase();
            console.log(`${user} was ${errorMessage}; please try again.`);
        }
    }

    fetchRepos();
}

function watchForm() {
    $('.githubUserForm').submit(event => {
        event.preventDefault();
        const userName = $('#githubUserName').val();
        getRepos(userName);
        console.log('Listening to form...');
    })
}

$(watchForm);