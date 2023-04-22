//Variables
let input = document.querySelector(".repos-container .repos-form input"),
  btn = document.querySelector(".repos-container .repos-form button"),
  reposBoxContent = document.querySelector(".repos-container .repos-box"),
  message = document.querySelector(".repos-container .repos-box .message ");

const getRepositories = () => {
  if (input.value == "") {
    console.log("Username Empty!");
    message.innerHTML = "Please Write Username!";
  } else {
    let username = input.value;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw Error("Cannot Connect To The Server!");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        reposBoxContent.innerHTML = "";
        data.forEach((repo) => {
          console.log(repo.name);
          console.log(repo.description);
          console.log(repo.language);
          console.log(repo.stargazers_count);
          console.log(repo.url);
          //Start Create Repository Box
          let reposBoxDiv = document.createElement("div");
          reposBoxDiv.className = "repo-box";
          reposBoxDiv.innerHTML += `<h2>${repo.name}</h2>`;
          reposBoxDiv.innerHTML += `  <p>${repo.description}</p>`;
          reposBoxDiv.innerHTML += `
          <div class="laguages">
           <span>${repo.language}</span>
          </div>`;
          let url = repo.homepage;
          reposBoxDiv.innerHTML += ` 
          <div class="go">
          <div class="stars">
            <span><i class="fa-solid fa-star fa-flip"></i></span>
            <span>${repo.stargazers_count}</span>
          </div>
          <div class="visit">
            <span><i class="fa-solid fa-circle-right fa-fade"></i></span>
            
            <a href=${url}  target= "_blank" >Visit Now</a>
          </div>
        </div>`;
          reposBoxContent.appendChild(reposBoxDiv);
          //End Create Repository Box
        });
      })
      .catch((err) => (message.innerHTML = err.message));
  }
  input.value = "";
};
btn.addEventListener("click", getRepositories);
