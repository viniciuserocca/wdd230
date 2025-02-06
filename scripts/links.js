const baseURL = "https://viniciuserocca.github.io/wdd230/";
const linksURL = "https://viniciuserocca.github.io/wdd230/data/links.json";
const linkList = document.querySelector('#link-list');

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        if (response.ok) {
            const data = await response.json();
            displayLinks(data.weeks);
        }
        else {
            throw Error(await response.text());
        }
    } 
    catch (error) {
        console.error(error);
    }
}

const displayLinks = (weeks) => {
    weeks.forEach(week => {
        let line = document.createElement('li');
        line.textContent = `${week.week}: `;

        week.links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            if (link.url.includes("https://")) {
                linkElement.href = link.url;
            } else {
                linkElement.href = `${baseURL}${link.url}`;
            }
            linkElement.textContent = link.title;

            line.appendChild(linkElement);

            if (index < week.links.length - 1) {
                line.append(" | ");
            }
        });

        linkList.appendChild(line);
    });
} 
  
getLinks();
  
