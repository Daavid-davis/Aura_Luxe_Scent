/* =====================================
   AURALUXE SCENTS
   WEBSITE INTERACTIVITY
===================================== */


/*
    DEMONSTRATION PRODUCTS

    Replace these entries with verified
    AuraLuxe Scents products and prices.

    The images below are illustrative
    fragrance imagery, not verified
    product photographs.
*/


const products = [

    {
        id: 1,

        name: "Midnight Essence",

        category: "men",

        categoryLabel: "For Him",

        price: 25000,

        description:
            "A sophisticated fragrance concept with warm, deep notes.",

        image:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",

        badge: "Signature"
    },


    {
        id: 2,

        name: "Golden Bloom",

        category: "women",

        categoryLabel: "For Her",

        price: 22000,

        description:
            "An elegant fragrance concept inspired by soft floral notes.",

        image:
            "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",

        badge: "Elegant"
    },


    {
        id: 3,

        name: "Amber Woods",

        category: "unisex",

        categoryLabel: "Unisex",

        price: 28000,

        description:
            "A balanced fragrance concept with warm, woody character.",

        image:
            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",

        badge: "Unisex"
    },


    {
        id: 4,

        name: "Velvet Rose",

        category: "women",

        categoryLabel: "For Her",

        price: 24000,

        description:
            "A graceful fragrance concept inspired by romantic florals.",

        image:
            "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80",

        badge: "Popular"
    },


    {
        id: 5,

        name: "Ocean Noir",

        category: "men",

        categoryLabel: "For Him",

        price: 30000,

        description:
            "A fresh fragrance concept with a confident, modern feel.",

        image:
            "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80",

        badge: "Modern"
    },


    {
        id: 6,

        name: "Soft Musk",

        category: "unisex",

        categoryLabel: "Unisex",

        price: 18000,

        description:
            "A subtle fragrance concept designed for everyday wear.",

        image:
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",

        badge: "Everyday"
    },


    {
        id: 7,

        name: "Blush Aura",

        category: "women",

        categoryLabel: "For Her",

        price: 21000,

        description:
            "A delicate fragrance concept with a soft, refined character.",

        image:
            "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=700&q=80",

        badge: "Refined"
    },


    {
        id: 8,

        name: "Fresh Mist",

        category: "body-spray",

        categoryLabel: "Body Spray",

        price: 8500,

        description:
            "A refreshing body-spray concept for everyday use.",

        image:
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80",

        badge: "Fresh"
    }

];



/* =====================================
   SELECT HTML ELEMENTS
===================================== */


const productGrid = document.getElementById("productGrid");

const filterButtons = document.querySelectorAll(".filter-btn");

const searchInput = document.getElementById("searchInput");

const emptyMessage = document.getElementById("emptyMessage");


const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");


const modal = document.getElementById("productModal");

const modalOverlay = document.getElementById("modalOverlay");

const modalClose = document.getElementById("modalClose");


let activeCategory = "all";

let lastFocusedElement = null;



/* =====================================
   FORMAT PRICES
===================================== */


function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {

        style: "currency",

        currency: "NGN",

        maximumFractionDigits: 0

    }).format(price);

}



/* =====================================
   RENDER PRODUCTS
===================================== */


function renderProducts() {

    const searchTerm = searchInput.value
        .trim()
        .toLowerCase();


    const filteredProducts = products.filter(product => {

        const matchesCategory =
            activeCategory === "all" ||
            product.category === activeCategory;


        const searchableText = [

            product.name,

            product.categoryLabel,

            product.description

        ].join(" ").toLowerCase();


        const matchesSearch =
            searchableText.includes(searchTerm);


        return matchesCategory && matchesSearch;

    });


    productGrid.replaceChildren();


    emptyMessage.hidden = filteredProducts.length !== 0;


    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.tabIndex = 0;

        card.setAttribute("role", "button");

        card.setAttribute(
            "aria-label",
            `View details for ${product.name}`
        );


        const imageContainer = document.createElement("div");

        imageContainer.className = "product-image";


        const image = document.createElement("img");

        image.src = product.image;

        image.alt = `${product.name} fragrance`;

        image.loading = "lazy";


        const badge = document.createElement("span");

        badge.className = "product-badge";

        badge.textContent = product.badge;


        imageContainer.append(image, badge);


        const info = document.createElement("div");

        info.className = "product-info";


        const category = document.createElement("span");

        category.className = "product-category";

        category.textContent = product.categoryLabel;


        const name = document.createElement("h3");

        name.textContent = product.name;


        const description = document.createElement("p");

        description.className = "product-description";

        description.textContent = product.description;


        const bottom = document.createElement("div");

        bottom.className = "product-bottom";


        const price = document.createElement("span");

        price.className = "product-price";

        price.textContent = formatPrice(product.price);


        const view = document.createElement("span");

        view.className = "view-product";

        view.textContent = "View details →";


        bottom.append(price, view);

        info.append(category, name, description, bottom);

        card.append(imageContainer, info);


        card.addEventListener("click", () => {

            openProductModal(product);

        });


        card.addEventListener("keydown", event => {

            if (
                event.target === card &&
                (event.key === "Enter" || event.key === " ")
            ) {

                event.preventDefault();

                openProductModal(product);

            }

        });


        productGrid.appendChild(card);

    });

}



/* =====================================
   CATEGORY FILTERS
===================================== */


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.category;


        filterButtons.forEach(filterButton => {

            const isActive =
                filterButton === button;


            filterButton.classList.toggle(
                "active",
                isActive
            );


            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );

        });


        renderProducts();

    });

});



/* =====================================
   SEARCH
===================================== */


searchInput.addEventListener("input", renderProducts);



/* =====================================
   PRODUCT DETAILS MODAL
===================================== */


function openProductModal(product) {

    lastFocusedElement = document.activeElement;


    document.getElementById("modalImage").src =
        product.image;


    document.getElementById("modalImage").alt =
        `${product.name} fragrance`;


    document.getElementById("modalCategory").textContent =
        product.categoryLabel;


    document.getElementById("modalTitle").textContent =
        product.name;


    document.getElementById("modalPrice").textContent =
        formatPrice(product.price);


    document.getElementById("modalDescription").textContent =
        product.description;


    modal.hidden = false;

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");


    modalClose.focus();

}


function closeProductModal() {

    modal.hidden = true;

    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");


    if (lastFocusedElement) {

        lastFocusedElement.focus();

    }

}


modalClose.addEventListener("click", closeProductModal);


modalOverlay.addEventListener("click", closeProductModal);


document.addEventListener("keydown", event => {

    if (event.key === "Escape" && !modal.hidden) {

        closeProductModal();

    }

});



/* =====================================
   MOBILE NAVIGATION
===================================== */


menuToggle.addEventListener("click", () => {

    const isOpen =
        navigation.classList.toggle("open");


    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );


    menuToggle.textContent = isOpen ? "×" : "☰";

});


navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.textContent = "☰";

    });

});



/* =====================================
   COPYRIGHT YEAR
===================================== */


document.getElementById("currentYear").textContent =
    new Date().getFullYear();



/* =====================================
   INITIALISE WEBSITE
===================================== */


filterButtons.forEach(button => {

    button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === "all")
    );

});


renderProducts();