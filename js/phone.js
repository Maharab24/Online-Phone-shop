const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 7 phone
    const showAllBtn = document.getElementById('show-all-btn');
    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden');
    }

    //display only first 12 phones if no show all

    if (!isShowAll)
        phones = phones.slice(0, 12);


    phones.forEach(phone => {

        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100  shadow-sm p-7`;
        phoneCard.innerHTML = `
        <figure>
                        <img src="${phone.image}" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts
                        </p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                        </div>
                    </div>
        `

        //append child
        phoneContainer.appendChild(phoneCard);

    });
    toggleLoaddingring(false);

}



//phone search

const phoneSearch = (isShowAll) => {
    toggleLoaddingring(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}


//loading ring
const toggleLoaddingring = (isLoading) => {
    const loadingRing = document.getElementById('loading-ring');
    if (isLoading) {
        loadingRing.classList.remove('hidden');
    }
    else {
        loadingRing.classList.add('hidden');
    }
}


// show all button

const handleShowAll = () => {
    phoneSearch(true);

}


//show details
const handleShowDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    shhowPhoneDetails(phone);

}

const shhowPhoneDetails = (phone) => {
    console.log(phone);


    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
                    <div class="flex justify-center">
                        <img src="${phone.image}" alt="" class="align-middle">
                    </div>

                    <h3 class="text-3xl font-bold text-center">${phone.name}</h3>


                    <div class=" my-3">
                        <p><b>Storage : </b>${phone.mainFeatures.storage}</p>
                    <p><b>Display Size : </b>${phone.mainFeatures.displaySize}</p>
                    <p><b>Chipset : </b>${phone.mainFeatures.chipset}</p>
                    <p><b>Memory : </b>${phone.mainFeatures.memory}</p>
                    <p><b>Slug : </b>${phone.slug}</p>
                    <p><b>Release Data:</b>${phone.releaseDate}</p>
                    <p><b>Brand : </b>${phone.brand}</p>
                    <p><b>GPS : </b>${phone.others.GPS}</p>
                    </div>


    `



    //show the modal
    my_modal_5.showModal();

}


loadPhone();
