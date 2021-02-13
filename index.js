console.log("Welcome to NeerajTV");


//Initialize the news api parameters as your requirement
let source = "bbc";
let apiKey = "7fb75c5324014b42b4465bfa5149ec2";

//Grab the news container
let newsAccordion = document.getElementById("newsAccordion");

//Create a ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `http://api.mediastack.com/v1/news?access_key=4${apiKey}&sources=${source}&country=in&language=en`);

//What to do when response is ready
xhr.onload = () => {
    console.log(xhr.status);
    if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        let data = json.data;

        //console.log(data);
        let newshtml = "";
        data.forEach(function (element, index) {

            newshtml += `<div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
            <b>Breaking News ${index + 1}:</b> ${element["title"]}</button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}"
            data-bs-parent="#newsAccordion">
            <div class="accordion-body">
            ${element["description"]}<a href="${element["url"]}" target="_blank">Read more</a>  
            </div>
            </div>
            </div>`;
        })
        newsAccordion.innerHTML = newshtml;
    }
    else {
        console.log("Some error occured");
    }
}


xhr.send();

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {

    let inputVal = searchTxt.value;
    //console.log(inputVal);
    let title = document.getElementsByClassName("accordion-header")

    Array.from(title).forEach(function (element) {

        let titleTxt = element.getElementsByTagName("button")[0].innerText;

        // console.log(element);
        // console.log(titleTxt);

        if (titleTxt.includes(inputVal)) {

            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

});
