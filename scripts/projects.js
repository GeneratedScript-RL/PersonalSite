const projectsContainer = document.getElementById("ProjectContainer");

Projects = {
    "HotShot":{
        ImagePath: "images/HotShot.png",
        Description: "A project im currently working on under Sorcles, a game where you pass bomb around other players and use abilities/powerups along the way.",
        Links: {
            "SC": "https://www.sorcles.com/",
            "YT": "https://youtu.be/GzmeT4LgaMo",
        },
    },
}

for (let project in Projects){
    let projectElement = document.createElement("div");

    projectElement.classList.add("Project");

    // Create the image under the project card ye
    let projectImage = document.createElement("img");
    projectImage.src = Projects[project].ImagePath;
    projectElement.appendChild(projectImage);
    
    //Title
    let projectTitle = document.createElement("h3");
    projectTitle.textContent = project;
    projectElement.appendChild(projectTitle);

    // Create the description under the project card
    let projectDescription = document.createElement("p");
    projectDescription.textContent = Projects[project].Description;
    projectElement.appendChild(projectDescription);

    //link buttons div
    let linkButtonsDiv = document.createElement("div");
    linkButtonsDiv.classList.add("LinkButtons");
    projectElement.appendChild(linkButtonsDiv);

    //Create the link buttons under the project card (text)

    for (let link in Projects[project].Links){
        let linkButton = document.createElement("a");
        linkButton.href = Projects[project].Links[link];
        linkButton.textContent = link;
        linkButton.classList.add("LinkButton");
        linkButton.target = "_blank";
        linkButtonsDiv.appendChild(linkButton);
    }

    projectsContainer.appendChild(projectElement);
}