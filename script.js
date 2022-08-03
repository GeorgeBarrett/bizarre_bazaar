let shop = document.getElementById('shop');

// the or statement, with the empty string, prevents the app from breaking when there is no data to pass
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((x) => {

        let { id, name, price, desc, img, } = x

        // if the id already exists on the local storage then the item amount will be placed into the page.  If the ID does not exist nothing will happen
        let search = basket.find((x) => x.id === id) || [];

        return  `
        <div id=product-id-${id} class="item">
                <img width="220" src=${img} alt="figs">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>£ ${price} per box</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>   
                                <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>`;
    })
    .join(""));
    
};

generateShop();

let increment = (id) => {
    let selectedItem = id;

    // This variable performs a search to see if the item already exists in the basket
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        })
    }else{
        search.item += 1;
    }

    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    // if there are no figs in the local storage and the user decrements the figs an error will show.  This if statement prevents that from happening    
    if(search === undefined) return;
    
    // i used return to stop the function performing once the basket quantity equals 0
    else if(search.item === 0) return; 
        
    else {
        search.item -= 1;
    }

     update(selectedItem.id);
    
    // .filter targets all the objects in the basket array one by one.  The .filter will remove the ones that are equal to zero
    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    // only if the item exists will it increase 
    let search = basket.find((x) => x.id === id)
    
    document.getElementById(id).innerHTML = search.item;
    calculation();
};


let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
};

// the calculation function has been invoked to prevent the basket value going to zero when the page is refreshed 
calculation();