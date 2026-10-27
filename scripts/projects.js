const projectsContainer = document.getElementById("ProjectContainer");

Projects = {
    "HotShot":{
        ImagePath: "images/HotShot.png",
        Description: "A project im currently working on under Sorcles, a game where you pass bomb around other players and use abilities/powerups along the way.",
        Links: {
            "SC": "https://www.sorcles.com/",
            "YT": "https://youtu.be/GzmeT4LgaMo",
            "RBLX": "https://www.roblox.com/games/129046331033002/Hotshot",
        },
    },
    "Voidfarers": {
        ImagePath: "images/Voidfarers.png",
        Description: "INDEV Arcade flight game rougelite, inspired by delivery may complete.",
        Links: {
            "RBLX": "https://www.roblox.com/games/112883841333164/Voidfarers",
        }
    },
    "Dicer": {
        ImagePath: "images/Dicer.png",
        Description: "INDEV Game inspired by library of ruina and limbus company.",
        Links: {
            "YT": "https://youtu.be/Bl4D5vxUlmM",
            "RBLX": "https://www.roblox.com/games/108923609917012/Dicer",
        }
    },
    "Pathology System (Area-19)": {
        ImagePath: "images/Area19Pathology.png",
        Description: "Cool chemistry inspired project for Area 19.",
        Links: {
            "YT": "https://www.youtube.com/watch?v=hxX8qCCGDSg",
        }
    },
    "Redemption": {
        ImagePath: "images/Redemption.png",
        Description: "Made many features including the backend for this very cool gun system for this AOT Perma Death CC game.",
        Links: {
            "YT": "https://www.youtube.com/watch?v=BdrJzycWlNs",
        }
    },
    "BioPython": {
        ImagePath: "images/BioPython.png",
        Description: "Contributed Open-Source pull requests to python (~2-3 merged PRs)",
        Links: {
            "GIT": "https://github.com/biopython/biopython",
        } 
    },
    "Personal Website (Stardance)": {
        ImagePath: "images/Stardance.png",
        Description: "Yes, this project is a submission to stardance (html, js, css personal website)! Just made this card to show the source code.",
        Links: {
            "GIT": "https://github.com/GeneratedScript-RL/PersonalSite",
        }
    },
    "Ligander": {
        ImagePath: "images/Ligander.png",
        Description: "Uses GNNs to predict binding sites, unfortunately this is very bad, but it was a good learnign experience.",
        Links: {
            "GIT": "https://github.com/GeneratedScript-RL/Ligander"
        }
    },
    "Curricula": {
        ImagePath: "images/Curricula.png",
        Description: "I needed a learning planner so I just decided to speedrun one. Unfortunately this was very ai augmented, as I wanted to test out agentic coding.",
        Links: {
            "GIT": "https://github.com/GeneratedScript-RL/Curricula"
        }
    },
    "SHSSC": {
        ImagePath: "images/SHSSC.png",
        Description: "Student council at my highschool asked for a website, then didnt use it.",
        Links: {}
    },
    "Surge": {
        ImagePath: "images/Railgun.png",
        Description: "One of the primary programmers for this very cool abandoned fps game.",
        Links: {
            "YT": "https://www.youtube.com/watch?v=BzApdKNhq5k",
            "DC": "https://discord.gg/FBseYDs2zA",
        }
    },
    "Gunblade": {
        ImagePath: "images/Gunblade.png",
        Description: "Solo coded this cool fps game, abandoned, mainly for showcase.",
        Links: {
            "YT": "https://www.youtube.com/watch?v=nS7wG2SAhsE",
        }
    }
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