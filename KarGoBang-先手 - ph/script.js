const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {

    try {
        const {
            data

        } = await axios(APIURL + username)


        createUserCard(data)
        getRepos(username)

    } catch (err) {
        if (err.response.status == 404) {
            createErrorCard('没有找到该人')
        }
    }
}

async function getRepos(username) {
    try {
        const {
            data
        } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch (err) {
        createErrorCard('获取不到repos')
    }
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
        <h1>${msg}</h1>
        </div>
        `

    main.innerHTML = cardHTML
}

function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : 'bio不存在'
    const cardHTML =
        `
    <div class="card">

    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${userID}</h2>
        ${userBio}
        <ul>
            <li>${user.followers} <strong>Followes</strong> </li>
            <li>${user.following} <strong>Following</strong> </li>
            <li>${user.public_repos} <strong>Repos</strong> </li>
        </ul>
        <div id="repos">
        
        
        </div>
    </div>

</div>
    `
    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    console.log(repos);
    const reposEL = document.getElementById('repos')

    repos.slice(0, 5).forEach(repo => {
        const repoEL = document.createElement('a')
        repoEL.classList.add('repo')
        repoEL.href = repo.html_url
        repoEL.target = '_blank'
        repoEL.innerText = repo.name

        reposEL.appendChild(repoEL)

    });

}
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value

    if (user) {
        getUser(user)
        search.value = ''
    }
})
