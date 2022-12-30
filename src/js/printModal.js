import { list_products } from "../../utils/data.js";
import { modal } from "./node.js";
import { templateCartItem } from "./printItemInCart.js";
import { list_item, go_to_pay_button } from "./node.js";

const templateModal = (itemSelect) => {
	const { name, img, price, description, id } = itemSelect;

	return `    
    <div class="modal">
        <div class="modal_flex_row">
            <figure class="container_modal_img">
                <img
                    src="./public/imgProducts/${img}"
                    alt="img product"
                    class="img_modal"
                />
            </figure>
            <div class="modal_flex_column">
                <p class="description_modal">${name}</p>
                <hr />
                <p class="text_modal">
                    ${description}
                </p>
                <p class="price_modal">
                    Price: USD$${price}
                </p>
                <button class="btn_addCart" onclick="addCart('${id}')">
                    Add to cart
                    <figure>
                        <img src="./public/icons/shopping-cart.png" alt="btn add cart" class="imgIcon" />
                    </figure>
                </button>
                <button id="btnCloseModal" class="btn_close" onclick="closeModal()">
                    <figure>
                        <img
                            src="./public/icons/close.png"
                            alt="icon close"
                        />
                    </figure>
                </button>
            </div>
        </div>
    </div>`;
};

export const findElementById = (id, array) => {
	// encontrar el elemento por id dentro del array object de list_products
	return array.find((element) => element.id === id);
};

export const viewModal = (id) => {
	let partSelect = findElementById(id, list_products[0].spareParts);
	let gadgetSelect = findElementById(id, list_products[1].gadgets);

	// condition if the user choose one item or another
	if (partSelect) {
		const divModal = document.createElement("div");
		modal.innerHTML = templateModal(partSelect);
		modal.appendChild(divModal);
	} else if (gadgetSelect) {
		const divModal = document.createElement("div");
		modal.innerHTML = templateModal(gadgetSelect);
		modal.appendChild(divModal);
	}

	// this trigger the efect when modal appears
	modal.style.clipPath = "circle(70.7% at 50% 50%)";
};


const savedCartItems = localStorage.getItem("element_cart");
const arrayOfItems = savedCartItems ? JSON.parse(savedCartItems) : [];

export const addingItem = (id, saveToLocal = true) => {
	let partSelect = findElementById(id, list_products[0].spareParts);
	let gadgetSelect = findElementById(id, list_products[1].gadgets);

	let itemCart = {};
	if (partSelect) {
		const { name, img, id } = partSelect;
		itemCart = {
			id: id,
			name: name,
			img: img,
		};

	} else if (gadgetSelect) {
		const { name, img } = gadgetSelect;
		itemCart = {
			id: id,
			name: name,
			img: img,
		};
	}

	arrayOfItems.push(itemCart);
	if (saveToLocal) localStorage.setItem("element_cart", JSON.stringify(arrayOfItems));

	list_item.innerHTML += templateCartItem(itemCart);

	go_to_pay_button.style.visibility = 'visible';

	console.log("esta es la cantidad de items que hay", arrayOfItems.length);
};

export const removeFromCart = id => {
	const savedCartItems = localStorage.getItem("element_cart");
	let arrayOfItems = savedCartItems ? JSON.parse(savedCartItems) : [];
	const item = document.getElementById(`list_item_${id}`);
	
	if (!item) return;

	item.remove();
	arrayOfItems = arrayOfItems.filter(item => item.id !== id);
	
	if (arrayOfItems.length === 0) go_to_pay_button.style.visibility = 'hidden';
	localStorage.setItem("element_cart", JSON.stringify(arrayOfItems));

}
