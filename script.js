const inputUsername = document.getElementById("inputUsername");
const searchBtn = document.getElementById("searchBtn");
const messageDiv = document.querySelector(".messageDiv");
const messagePara = document.getElementById("messagePara");
const profileAvatar = document.getElementById("profileAvatar");
const profileUsername = document.getElementById("profileUsername");
const profileName = document.getElementById("profileName");
const profileLocation = document.getElementById("profileLocation");
const githubLink = document.getElementById("githubLink");
const repoCount = document.getElementById("repoCount");
const followersCount = document.getElementById("followersCount")
const followingCount = document.getElementById("followingCount")



searchBtn.addEventListener("click", inputHandler);

async function inputHandler() {
  const username = inputUsername.value.trim();

  if (!username) {
    alert("please enter the Username");
    return;
  }

  const response = await fetch(`https://api.github.com/users/${username}`);
  const fetchRepo = await fetch(`https://api.github.com/users/${username}/repos/`)
  const result = await response.json();
  const repoResult = await fetchRepo.json();

  if (!response.ok) {
    alert("User not found");
    return;
  }
  renderData(result);
}

function renderData(result, repoResult) {
  class User {
    constructor(
      username,
      name,
      repos,
      avatar,
      accLink,
      followers,
      following,
      userLocation
    ) {
      this.username = username;
      this.name = name;
      this.repos = repos;
      this.avatar = avatar;
      this.accLink = accLink
      this.followers = followers;
      this.following = following;
      this.userLocation = userLocation;
    }
  }
  const user = new User(
    result.login,
    result.name,
    result.public_repos,
    result.avatar_url,
    result.html_url,
    result.followers,
    result.following,
    result.location,
  );
  console.log(user);
  console.log(repoResult);

  profileUsername.textContent = `@${user.username}`
  profileName.textContent =
    user.name;
  repoCount.textContent = user.repos;
  followersCount.textContent = user.followers;
  followingCount.textContent = user.following;
  profileLocation.textContent = user.userLocation;
  profileAvatar.src = user.avatar
  githubLink.href = user.accLink

  inputUsername.value = ""
}
