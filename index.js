var allLinks = [];

const title = document.getElementById("title")
const subtitle = document.getElementById("subtitle")
const search = document.getElementById("search")
const links = document.getElementById("links")
const bottom = document.getElementById("bottom")

const blocks = document.getElementsByClassName("hideonfocus");

onsearchfocus = () => {
    title.classList.remove("titlebigfont");
    title.classList.add("titlelittlefont");
    [...blocks].forEach(block => {
        block.classList.remove("block")
        block.classList.add("hidden")
    });

}

onsearchblur = () => {
    // title.classList.remove("titlelittlefont");
    // title.classList.add("titlebigfont");
    // subtitle.classList.remove("hidden");
    // subtitle.classList.add("block");
}

onsearchinput = () => {
    renderLinks();
}

renderLinks = () => {
    const searchTerm = search.value
    var linksToRender = allLinks;
    if (searchTerm && searchTerm.length > 0) {
        const s = searchTerm.toLowerCase()
        linksToRender = allLinks.filter(l => l[1].toLowerCase().indexOf(s) > -1 || l[0].toLowerCase().indexOf(s) > -1)
    }

    links.innerHTML = linksToRender.map(l => `<a href="${l[0]}" target="_blank">${l[1]}</a>`).join(' ')
    bottom.innerHTML = linksToRender.length + " nga gjithsej " + allLinks.length + " linqe."
}

getAllLinks = async () => {
    const alllinksFile = "/alllinks.json"
    const response = await fetch(alllinksFile)
    const json = await response.json();
    return json;
}

getAllLinks().then(links => {
    allLinks = Object.entries(links).map(([key, value]) => [key, value]);

    renderLinks();

})