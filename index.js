// load list of questionSets
fetch("Set_Questions.json").then((data) => {

    return data.json();

}).then((completedata) => {
    
    let dataSets="";

    completedata.map((values) => {
        
        var baseUrl = "Questions.html";
        var title = values.title;
        var que = values.questions;
        var path = values.path;
        var url = baseUrl + "?title=" + encodeURIComponent(title) + "&que=" + encodeURIComponent(que) + "&path=" + encodeURIComponent(path);
        
        dataSets+=`
        <article class="set">
            <a href=${url}></a>
            <button></button>
            <h3>${values.title}</h3>
            <p>${values.desc}</p>
            <h2>${values.questions}</h2>
            <h4>questions</h4>
        </article>`
    })

    document.getElementById("sets").innerHTML = dataSets;


}).catch((err) => {
    console.log(err);
})
