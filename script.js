const inputUsername = document.getElementById("inputUsername");
const searchBtn = document.getElementById("searchBtn");

const profileAvatar = document.getElementById("profileAvatar");
const profileUsername = document.getElementById("profileUsername");
const profileName = document.getElementById("profileName");
const profileLocation = document.getElementById("profileLocation");
const githubLink = document.getElementById("githubLink");

const repoCount = document.getElementById("repoCount");
const followersCount = document.getElementById("followersCount");
const followingCount = document.getElementById("followingCount");

const viewRepoBtn = document.getElementById("viewRepoBtn");
const repositoriesCard = document.getElementById("repositoriesCard");
const repositoriesList = document.getElementById("repositoriesList");


// Stores the repositories fetched for the current user
let repositoriesData = [];


class User {
  constructor(
    username,
    name,
    repositoryCount,
    avatarUrl,
    profileUrl,
    followers,
    following,
    location
  ) {
    this.username = username;
    this.name = name;
    this.repositoryCount = repositoryCount;
    this.avatarUrl = avatarUrl;
    this.profileUrl = profileUrl;
    this.followers = followers;
    this.following = following;
    this.location = location;
  }
}


searchBtn.addEventListener("click", inputHandler);
viewRepoBtn.addEventListener("click", showRepos);


async function inputHandler() {
  const username = inputUsername.value.trim();

  if (!username) {
    alert("Please enter a username");
    return;
  }

  const profileResponse = await fetch(
    `https://api.github.com/users/${username}`
  );

  const repositoriesResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  const profileData = await profileResponse.json();
  repositoriesData = await repositoriesResponse.json();


  if (!profileResponse.ok) {
    alert("User not found");
    return;
  }


  console.log(profileData);
  console.log(repositoriesData);


  renderProfile(profileData);

  inputUsername.value = "";

  // Clear old repository cards
  repositoriesList.innerHTML = "";

  // Hide repositories when a new user is searched
  repositoriesCard.style.display = "none";
}


function renderProfile(profileData) {

  const user = new User(
    profileData.login,
    profileData.name,
    profileData.public_repos,
    profileData.avatar_url,
    profileData.html_url,
    profileData.followers,
    profileData.following,
    profileData.location
  );


  console.log(user);


  profileUsername.textContent = `@${user.username}`;
  profileName.textContent = user.name;
  repoCount.textContent = user.repositoryCount;
  followersCount.textContent = user.followers;
  followingCount.textContent = user.following;
  profileLocation.textContent = user.location;
  profileAvatar.src = user.avatarUrl;
  githubLink.href = user.profileUrl;
}


function showRepos() {

  repositoriesList.innerHTML = "";


  repositoriesData.forEach((repo) => {

    const card = document.createElement("article");

    card.className = "repositoryCard";


    card.innerHTML = `
      <h3 class="repositoryName">
        ${repo.name}
      </h3>

      <p class="repositoryDescription">
        ${repo.description || "No description"}
      </p>

      <div class="repositoryInfo">

        <span class="repositoryLanguage">
          ${repo.language || "Unknown"}
        </span>

        <span class="repositoryStars">
          <i class="fa-solid fa-star"></i>
          ${repo.stargazers_count}
        </span>

        <span class="repositoryForks">
          <i class="fa-solid fa-code-fork"></i>
          ${repo.forks_count}
        </span>

      </div>
    `;


    repositoriesList.appendChild(card);
  });


  repositoriesCard.style.display = "flex";
}