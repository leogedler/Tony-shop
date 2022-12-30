import { list_products } from "../../utils/data.js";
import { list_item, item_cart } from "./node.js";

export const templateCartItem = (item) => {
    const { id, name, img } = item;
	return `									
    <li class="list_item" id="list_item_${id}">
        <figure>
            <img
                src="public/imgProducts/${img}"
                alt="img product"
                class="img_item"
            />
        </figure>
        <div>
            <h3>${name}</h3>
        </div>
        <button class="btn_delete" onclick="removeFromCart('${id}')">
            <figure>
                <img
                    class="delete_icon"
                    src="./public/icons/delete.png"
                    alt="delete item"
                />
            </figure>
        </button>
    </li>`;
};

item_cart.addEventListener("mouseover", () => {
	// const arrayOfItems = localStorage.getItem("element_cart");
	// const list_ofItems_inCart = JSON.parse(arrayOfItems);

	// if (list_ofItems_inCart && list_ofItems_inCart.length > 0) {
	// 	list_ofItems_inCart.map((item) => {
	// 		const divItem = document.createElement("div");
	// 		list_item.innerHTML = templateItem(item);
	// 		list_item.appendChild(divItem);
	// 		// console.log(item);
	// 	});
	// 	console.log("esto son las list_ofItems_inCart", list_ofItems_inCart.length);
	// } else {
	// 	return console.log("el carritto esta vacio");
	// }
});
