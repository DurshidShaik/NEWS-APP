const Api_key ="f51e5f3049b840bb8496092108fa2494";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',fetchNews("India"))

function reload(){  //reoading a home page
  window.location.reload()
}


async function fetchNews(query){
  const result = await fetch(`${url}${query}&apiKey=${Api_key}`);
  const data = await result.json();
  console.log(data);
  BindData(data.articles);  //fetching articles and sending to Binddata function  article mean a card {image,details,..etc}
}


function BindData(articles){
  const template =  document.querySelector(".news-template"); // template class
  const main_container = document.querySelector(".original");  //container class we need to add all the articles to it
  main_container.innerHTML ="";

  articles.forEach((article)=>{  
    if(!article.urlToImage) return;    //blank image news are not perfect we are not taking it
    const Clone = template.content.cloneNode(true); //creating a clone for add it to main Container
    Fill_image_data_Card(Clone,article);
    main_container.appendChild(Clone)  //appending every clone to main container    
  })
}


function Fill_image_data_Card(Clone,article){
  const Newsimage = Clone.querySelector("#news-image");
  const title = Clone.querySelector("#news-title");
  const date = Clone.querySelector("#news-date");
  const Description = Clone.querySelector("#news-desc");
  title.innerHTML = article.title;    //adding title
  Description.innerHTML = article.description;  //adding descriptiom
  Newsimage.src = article.urlToImage;  //adding Image
  
  Clone.firstElementChild.addEventListener('click', ()=>{
    window.open(article.url,"-blank");  //opening the main page of news
  })
}
let currentclass = null;
function navitem(id){
  fetchNews(id);   //using nav we are searching the news
  const navitem =document.getElementById(id);
  currentclass?.classList.remove("active");
  currentclass = navitem;
  currentclass.classList.add('active');
}

//search values

const searchInput = document.querySelector(".input-search");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener('click',()=>{  //onclick on search button shows the values
  if(!searchInput.value) return;
  fetchNews(searchInput.value);
  currentclass?.classList.remove("active");  //rempoves active class from the main
  currentclass = null;
})
 





//
