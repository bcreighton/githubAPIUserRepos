const searchUrl = 'https://api.github.com/users/';

function displayUserRepos(userRepos, user) {
    //remove previous results
    $('#userRepos').empty();

    //populate new results
    //iterate through json data

    for(let i = 0; i < userRepos.length; i++) {
        $('#userRepos').append(
            `<li class='repo'>
                <h3 class='repoTitle'>
                    <a href=${userRepos[i].html_url}>
                        ${userRepos[i].name}
                    </a>
                </h3>
                <p class='repoDescription'><span>Description: </span>${userRepos[i].description}</p>
            </li>`
        )
    }
    $('#userReposContainer').removeClass('hidden');

}

function getRepos(user) {
    const url = searchUrl + user + '/repos';

    const fetchRepos = async () => {
        try {
            const repoRes = await fetch(url);

            if(repoRes.ok){
                const userRepos = await repoRes.json();
                displayUserRepos(userRepos, user);

            } else {
                throw new Error(repoRes.statusText);
            }

        } catch(e) {
            const errorMessage = (e.message).toLowerCase();
            $('#userRepos').html(
                `<p class='error'>${user} was ${errorMessage}; please try again.</p>`
            )
        }
    }

    fetchRepos();
}

function watchForm() {
    $('.githubUserForm').submit(event => {
        event.preventDefault();
        const userName = $('#githubUserName').val();
        getRepos(userName);
    })
}

$(watchForm);