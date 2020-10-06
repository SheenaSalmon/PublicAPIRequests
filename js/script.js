const searchContainer=document.getElementsByClassName("search-container");

//searchContainer[0].innerHTML="Hello";
//console.log(searchContainer[0]);
const gallery=document.getElementById("gallery");

const modalContainer=document.createElement("div");
modalContainer.className="modal-container";

const modal=document.createElement("div");
modal.className="modal";

const modalButton = document.createElement("button");
modalButton.className="modal-close-btn";
modalButton.setAttribute("type","button");
modalButton.setAttribute("id","modal-close-btn");
modalButton.innerHTML=`<stong>X</strong>`;
modalButton.addEventListener(("click"),()=>{modalContainer.remove()})

const modalInfo =document.createElement("div");
modalInfo.className="modal-info-container";

modalContainer.appendChild(modal);
modal.appendChild(modalButton);
modal.appendChild(modalInfo);

let allUsers={};




fetch("https://randomuser.me/api/?results=10").then(res => res.json()).then(data =>createCard(data.results));

createCard =(users)=>{
    console.log(users);
    
    allUsers=users;
    for(let i=0 ; i<users.length ; i++)
    {
        const  card  = document.createElement("div");
        card.className="card";
        let currentUser=users[i];
        
        //console.log(`<p> ${users[i].name.title} ${users[i].name.first} ${users[i].name.last} </p>`);
        const cardImage=document.createElement("div");
        cardImage.className="card-img-container";
        cardImage.innerHTML=`<img class="card-img" src = "${users[i].picture.medium}" alt= "profile picture" />`;
        
        const cardInfo=document.createElement("div");
        cardInfo.className="card-info-container";
        cardInfo.innerHTML=`<h3 id ="name" class="card-name cap"> ${users[i].name.title} ${users[i].name.first} ${users[i].name.last} </h3> <p class="card-text"> ${users[i].email}</p> <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}  </p>`;

        card.appendChild(cardImage);
        card.appendChild(cardInfo);
        console.log(card);
        gallery.appendChild(card);
        card.addEventListener("click", ()=>{
                createModal(currentUser);
        });
        

    }
    // gallery.innerHTML=userDom;
    console.log(typeof users);
}
   

    createModal=(user)=>    {
        let formattedPhone=user.cell.replace(/^\D*(\d{3})\D*(\d{3})\D*(\d+)\D*/,"($1) $2-$3");
        let modalContent=`<img class="modal-img" src="${user.picture.medium}" alt="profile picture">  <h3 id="name" class="modal-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>   <p class="modal-text"> ${user.email}</p> <p class="modal-text cap">${user.location.city}</p><hr><p class="modal-text">${formattedPhone}</p>  <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.zip}</p><p class="modal-text">Birthday: ${user.dob.date}</p>`;

       console.log(modalContent);
    modalInfo.innerHTML=modalContent;
    gallery.appendChild(modalContainer);
    }

    



