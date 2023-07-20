function changeTheme(button)
{
    let currentt = button.getAttribute('data-no');
    let url = "";
    if(window.innerWidth <= 800)
    {
        url = "url(Portrait/Background" + currentt + ".jpg)";
    } else
    {
        url = "url(Landscape/Background_Landslide" + currentt + ".jpg)";
    }
    document.getElementById("bg-image").style.backgroundImage = url;
}

const hamToggle = document.getElementById("hamburger-toggle");
const hamNavbar = document.getElementById("hamburger-navbar");
const themeLink = document.getElementById("links-theme");

hamToggle.addEventListener("click", () =>
{
    const visibility = hamNavbar.getAttribute("data-visible");
    const theme_visibility = hamNavbar.getAttribute("data-theme");
    if(visibility == "false")
    {
        hamNavbar.setAttribute("data-visible", "true");
        document.body.style.overflow = "hidden";
    } else if(theme_visibility == "true")
    {
        hamNavbar.setAttribute("data-theme", "false");
    } else if(visibility == "true")
    {
        hamNavbar.setAttribute("data-visible", "false");
        document.body.style.overflow = "auto";
    }
})

themeLink.addEventListener("click", () =>
{
    const theme_visibility = hamNavbar.getAttribute("data-theme");
    if(theme_visibility == "false")
    {
        hamNavbar.setAttribute("data-theme", "true");
    }
})

window.addEventListener("resize",(event) => {
    document.documentElement.style.setProperty('--viewh', `${window.innerHeight/100}px`);
});

document.documentElement.style.setProperty('--viewh', `${window.innerHeight/100}px`);