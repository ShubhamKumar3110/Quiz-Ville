//To check if the site is visited the first time
//for first visit : there is no previous stored image, 0th image is loaded and url is stored in the local storage
//for revisits : the stored image url is used to load the last visited background image
if(window.localStorage.getItem("bg-image") == null)
{
    document.getElementById("bg-image").style.backgroundImage = "url(Portrait/Background0.jpg)";
    document.body.setAttribute("data-theme", "dark");
    window.localStorage.setItem("bg-image", "url(Portrait/Background0.jpg)");
    window.localStorage.setItem("bg-theme", "dark");
} else
{
    document.getElementById("bg-image").style.backgroundImage = window.localStorage.getItem("bg-image");
    document.body.setAttribute("data-theme", window.localStorage.getItem("bg-theme"));
}

document.querySelectorAll(".theme-all").forEach(btn => {
    btn.addEventListener("click", changeTheme);
});

function changeTheme()
{
    let currentt = this.getAttribute('data-no');
    let bgURL = "";
    if(window.innerWidth <= 800)
    {
        bgURL = "url(Portrait/Background" + currentt + ".jpg)";
    } else
    {
        // bgURL = "url(Landscape/Background_Landslide" + currentt + ".jpg)";
        bgURL = "url(Portrait/Background" + currentt + ".jpg)";
    }
    document.getElementById("bg-image").style.backgroundImage = bgURL;
    window.localStorage.setItem("bg-image", bgURL);

    if(currentt == 1 || currentt == 2 || currentt == 7)
    {
        document.body.setAttribute("data-theme", "light");
        window.localStorage.setItem("bg-theme", "light");
    } else
    {
        document.body.setAttribute("data-theme", "dark");
        window.localStorage.setItem("bg-theme", "dark");
    }
}

const hamToggle = document.getElementById("hamburger-toggle");
const hamNavbar = document.getElementById("hamburger-navbar");
const themeLink = document.getElementById("links-theme");

//To check if the navbar is expanded or collapsed
hamToggle.addEventListener("click", () =>
{
    const visibility = hamNavbar.getAttribute("data-visible");
    const theme_visibility = hamNavbar.getAttribute("data-theme");
    if(visibility == "false")       //True for : Navbar is not opened
    {
        hamNavbar.setAttribute("data-visible", "true");
        document.body.style.overflow = "hidden";
    } else if(theme_visibility == "true")       //True for : Navbar and theme both are opened
    {
        hamNavbar.setAttribute("data-theme", "false");
    } else if(visibility == "true")         //True for : Navbar is opened but theme is not opened
    {
        hamNavbar.setAttribute("data-visible", "false");
        document.body.style.overflow = "auto";
    }
})

//To check if the theme navigation is expanded or collapsed
themeLink.addEventListener("click", () =>
{
    const theme_visibility = hamNavbar.getAttribute("data-theme");
    if(theme_visibility == "false")
    {
        hamNavbar.setAttribute("data-theme", "true");
    }
})

//To set the veiwport height of the window (respective to url bar) into a css variable
window.addEventListener("resize",(event) => {
    document.documentElement.style.setProperty('--viewh', `${window.innerHeight/100}px`);
});
document.documentElement.style.setProperty('--viewh', `${window.innerHeight/100}px`);


let logo = document.querySelector(".heading");
let set = document.getElementById("sets");
//To check when the user is scrolling and the logo is moved
document.getElementById("head-set").addEventListener("scroll", () => {
    
    let logoTop = logo.getBoundingClientRect().top;
    //Minus logTop for adjusting to url bar height (sometimes when page is scrolled but url bar is not hidden)
    let setTop = set.getBoundingClientRect().top - logoTop;
    if(setTop > 170)
    {
        logo.classList.remove("at-top");
        document.querySelector("#profile button").classList.remove("at-top-profile");
        document.getElementById("profile-name").style.display = "block";
        document.querySelector(".heading-item").style.fontSize = "75px";
    } else
    {
        logo.classList.add("at-top");
        document.querySelector("#profile button").classList.add("at-top-profile");
        document.getElementById("profile-name").style.display = "none";
        document.querySelector(".heading-item").style.fontSize = "30px";
    }
});
