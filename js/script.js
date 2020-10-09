const searchContainer=document.getElementsByClassName("search-container");

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




fetch("https://randomuser.me/api/?results=12").then(res => res.json()).then(data =>createCard(data.results));

createCard =(users)=>{
    console.log(users);
    
    allUsers=users;
    for(let i=0 ; i<users.length ; i++)
    {
        const  card  = document.createElement("div");
        card.className="card";
        let currentUser=users[i];
        
         const cardImage=document.createElement("div");
        cardImage.className="card-img-container";
        cardImage.innerHTML=`<img class="card-img" src = "${users[i].picture.medium}" alt= "profile picture" />`;
        
        const cardInfo=document.createElement("div");
        cardInfo.className="card-info-container";
        cardInfo.innerHTML=`<h3 id ="name" class="card-name cap"> ${users[i].name.title} ${users[i].name.first} ${users[i].name.last} </h3> <p class="card-text"> ${users[i].email}</p> <p class="card-text cap">${users[i].location.city}, ${users[i].location.state}  </p>`;

        card.appendChild(cardImage);
        card.appendChild(cardInfo);
      
        gallery.appendChild(card);
        card.addEventListener("click", ()=>{
                createModal(currentUser);
        });
        

    }

}   

    createModal=(user)=>    {
        let formattedPhone=user.cell.replace(/\D*/g,"");
        formattedPhone=formattedPhone.replace(/(\d{3})(\d{3})(\d+)/,"($1) $2-$3" );

        let formatteddate= new Date(user.dob.date);
        console.log(formatteddate.toLocaleDateString('en-US'));
        console.log(`this is the cell now:   ${formattedPhone}`)
     

        let modalContent=`<img class="modal-img" src="${user.picture.medium}" alt="profile picture">  <h3 id="name" class="modal-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>   <p class="modal-text"> ${user.email}</p> <p class="modal-text cap">${user.location.city}</p><hr><p class="modal-text">${formattedPhone}</p>  <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.zip}</p><p class="modal-text">Birthday: ${formatteddate.toLocaleDateString('en-US')}</p>`;

      
    modalInfo.innerHTML=modalContent;
    gallery.appendChild(modalContainer);
    }

    



