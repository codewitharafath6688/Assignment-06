let categories = document.getElementById("categories");

let cardCon = document.getElementById("card-con");

let history = document.getElementById("history");

let infoArray = [];

let showLoading = () => {
  cardCon.innerHTML = `
        <span class="loading loading-dots loading-xl mx-50 mt-4 lg:mx-100 lg:mt-50"></span>
    `;
};

let modal = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => displayModal(data.plants));
};

let displayModal = (data) => {
  modalContainer.innerHTML = "";
  modalView.showModal();
  modalContainer.innerHTML += `
        <div>
            <h2 class="font-bold">${data.name}</h2>
        </div>
        <div class="w-full">
            <img src="${data.image}" class="w-full h-[250px] lg:h-[250px]  rounded-xl">
        </div>
        <div>
            <h2><span class="font-bold mt-3">Category:</span> ${data.category}</h2>
            <h2><span class="font-bold mt-3">Price:</span> ৳ ${data.price}</h2>
            <p><span class="font-bold mt-3">Description:</span> ${data.description}</p>
        </div>
        <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
        </div>
    `;
};

let showCard = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
  .then((res) => res.json())
  .then((data) => showCardFirst(data));
}

let showCardFirst = (data) => {
  for(let dt of data.plants){
    console.log(dt);
    cardCon.innerHTML += `
    <div id="${dt.id}" class="card border-none flex-col justify-evenly items-center py-4 px-4 gap-2 h-full bg-white">
                  <div class="w-full">
                      <img src="${dt.image}" class=" w-full h-[300px] lg:h-[220px]  rounded-xl" alt="">
                  </div>
                  <div class="flex flex-col justify-evenly items-center gap-5">
                      <div>
                      <button onclick="modal(${dt.id})" class="mb-2">${dt.name}</button>
                      <p >${dt.description}</p>
                      </div>
                      <div class="flex justify-between items-center w-full">
                      <button class="btn bg-[#DCFCE7] text-[#15803D]">${dt.category}</button>
                      <h3 class="font-bold"><span>৳</span><span>${dt.price}</span></h3>
                      </div>
                      <button  id="${dt.id}" class="btn w-full rounded-2xl bg-[#15803D] text-white">Add to Cart</button>
                  </div>
        </div>
    `
  }
}

showCard();

let loadData = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayData(data));
};

let loadCard = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayCard(data));
};

let displayCard = (data) => {
  // console.log(data.plants)
  cardCon.innerHTML = "";
  data.plants.forEach((dt) => {
    // console.log(dt)
    cardCon.innerHTML += `
            <div id="${dt.id}" class="card border-none flex-col justify-evenly items-center py-4 px-4 gap-2 bg-[white] h-full ">
                  <div class="w-full">
                      <img src="${dt.image}" class=" w-full h-[300px] lg:h-[220px]  rounded-xl" alt="">
                  </div>
                  <div class="flex flex-col justify-evenly items-center gap-5">
                      <div>
                      <button onclick="modal(${dt.id})" class="mb-2">${dt.name}</button>
                      <p >${dt.description}</p>
                      </div>
                      <div class="flex justify-between items-center w-full">
                      <button class="btn bg-[#DCFCE7] text-[#15803D]">${dt.category}</button>
                      <h3 class="font-bold"><span>৳</span><span>${dt.price}</span></h3>
                      </div>
                      <button  class="btn w-full rounded-2xl bg-[#15803D] text-white">Add to Cart</button>
                  </div>
            </div>
        `;
  });
};


cardCon.addEventListener("click", (e) => {
  let total = document.getElementById("total");
  let currentTotal = Number(total.innerText);
  if (e.target.innerText === "Add to Cart") {
    let nameTree = e.target.parentNode.children[0].children[0].innerText;
    let priceValue =
      e.target.parentNode.children[1].children[1].children[1].innerText;
    let id = e.target.id;
    let newtotal = currentTotal + Number(priceValue);
    // console.log(newtotal)
    total.innerText = newtotal;
    console.log(total);
    infoArray.push({
      nameTree: nameTree,
      priceValue: priceValue,
      id: id,
    });

    // console.log(infoArray);

    displayHistory(infoArray);
  }
});


let displayHistory = (data) => {
  history.innerHTML = "";
  data.forEach((dt) => {
    history.innerHTML += `
            <div class="flex justify-between border border-gray-300 mt-4 px-1 gap-2 items-center">
                <div>
                    <h2 class="font-bold">${dt.nameTree}</h2>
                    <p class="font-bold"><span>৳</span><span>${dt.priceValue}</span></p>
                </div>
                <button >❌</button>
            </div>
        `;
  });
};

history.addEventListener("click", (e) => {
  let total = document.getElementById("total");
  let currentTotal = Number(total.innerText);
  // console.log(currentTotal);
  if (e.target.localName === "button") {
    let pPrice = e.target.parentNode.children[0].children[1].children[1].innerText;
    e.target.parentNode.remove();
    let nameData = e.target.parentNode.children[0].children[0].innerText;
    infoArray = infoArray.filter(info => info.nameTree !== nameData);
      let nowTotal = currentTotal - Number(pPrice);
      if (nowTotal < 0) {
        nowTotal = 0;
      }
      total.innerText = nowTotal;
  }
});

let displayData = (data) => {
  categories.innerHTML = "";
  data.categories.forEach((dt) => {
    categories.innerHTML += `
            <button id="${dt.id}" onclick="loadCard(${dt.id})" class="btn border-none w-full hover:bg-[#15803D] hover:text-[white]"> ${dt.category_name} </button>
        `;
  });
};

categories.addEventListener("click", (e) => {
  let allBtn = document.querySelectorAll("button");
  for (let btn of allBtn) {
    btn.classList.remove("bg-[#15803D]", "text-[white]");
  }
  if (e.target.localName === "button") {
    e.target.classList.add("bg-[#15803D]", "text-[white]");
    showLoading();
  }
});

loadData();
