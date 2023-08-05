let cartItems = [];

// CART
function toggleCart() {
  var cart = document.getElementById("cartToggle");
  if (cart.style.display === "none") {
    cart.style.display = "block"; // Show the cart
    updateCart();
    document.addEventListener("click", handleClickOutside);
  } else {
    cart.style.display = "none"; // Hide the cart
    document.removeEventListener("click", handleClickOutside);
  }
}

function handleClickOutside(event) {
  var cart = document.getElementById("cartToggle");
  if (!cart.contains(event.target) && event.target.id !== "cart-icon-img") {
    cart.style.display = "none"; // Hide the cart when clicking outside of it
    document.removeEventListener("click", handleClickOutside);
  }
}

// CART CONTENT 

function addItemToCart() {
  const itemName = "Fall Limited Edition Sneakers";
  const itemPrice = 125.00;
  const quantityInput = document.querySelector(".quantity-input");
  const quantity = parseInt(quantityInput.value);

  if (quantity > 0) {
    const itemTotal = itemPrice * quantity;
    const cartItem = {
      name: itemName,
      price: itemPrice,
      quantity: quantity,
      total: itemTotal,
    };

    cartItems.push(cartItem);
    updateCart();
    alert("Item added to cart!");
    quantityInput.value = "0";
  } else {
    alert("Please select a quantity greater than 0.");
  }

  updateCartQuantity();

  saveCartToLocalStorage();
  
}

function removeItemFromCart(index, event) {
  event.stopPropagation();
  cartItems.splice(index, 1);
  updateCart();

  updateCartQuantity();

  saveCartToLocalStorage();
}



function updateCart() {
  const cartItemsList = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cartContainer = document.getElementById("cart-container");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const checkoutButton = document.querySelector(".checkout-btn");
  let cartHTML = "";
  let cartTotal = 0;

  if (cartItems.length === 0) {
    emptyCartMessage.style.display = "block";
    cartContainer.style.display = "none";
    checkoutButton.style.display = "none";
  } else {
    emptyCartMessage.style.display = "none";
    cartContainer.style.display = "block";
    checkoutButton.style.display = "block";
    cartItems.forEach((item, index) => {
      cartHTML += `
      <li>
        <img src="images/image-product-1-thumbnail.jpg" class="product-img-cart" alt="${item.name}" width="50">
        <div class= "cart-mid-item">
          <div class="cart-item-name" >${item.name}</div>  
          <div class= "cart-item-qty" >$${item.price.toFixed(2)} x ${item.quantity} <span>$${item.total.toFixed(2)}</span></div>
        </div>
        <div class="delete-item-btn" onclick="removeItemFromCart(${index}, event)">
          <img src="images/icon-delete.svg" alt="Delete" width="20">
        </div>
      </li>`;
      cartTotal += item.total;
    });

    cartItemsList.innerHTML = cartHTML;
    cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
  } 

  updateCartQuantity();

  saveCartToLocalStorage();

}

function updateCartQuantity() {
  const cartQty = document.getElementById("cartQty");
  const cartTotal = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartTotal > 0) {
    cartQty.textContent = cartTotal;
    cartQty.style.display = "block";
  } else {
    cartQty.style.display = "none";
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function getCartFromLocalStorage() {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
    updateCart(); // Update the cart display after retrieving from local storage
  }
}

 
function checkout() {
  alert("Thank you for your purchase!");
  cartItems = [];
  updateCart();
};

getCartFromLocalStorage();




// THE MOBILE CAROUSEL

const slideImages = document.querySelectorAll('.carousel-cont img');
  let currentSlideIndex = 0;

  function showSlide(index) {
    slideImages.forEach((image) => {
      image.style.display = 'none';
    });

    slideImages[index].style.display = 'block';
  }

  function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
      currentSlideIndex = slideImages.length - 1;
    } else if (currentSlideIndex >= slideImages.length) {
      currentSlideIndex = 0;
    }
   
   
    showSlide(currentSlideIndex);
  }

  // Show the initial slide
  showSlide(currentSlideIndex);




// TABLET AND DESKTOP CAROUSEL 

const carouselImages = document.querySelectorAll('.carousel-cont img');
const thumbnailImages = document.querySelectorAll('.thumbnail');

  function showCarouselImage(index) {
    carouselImages.forEach((image) => {
      image.style.display = 'none';
    });

    thumbnailImages.forEach((thumbnail) => {
      thumbnail.classList.remove('thumbnailActive', 'thumbnailActiveBorder');
    });

    carouselImages[index].style.display = 'block';
    thumbnailImages[index].classList.add('thumbnailActive', 'thumbnailActiveBorder');
  }

  // Show the initial slide
  showCarouselImage(0);



  
// HAMBURGER MENU

document.addEventListener('DOMContentLoaded', function() {
  var body = document.querySelector('body');
  var menu = document.querySelector('.menu');
  var hamburgerMenu = document.querySelector('.hamburger-menu');
  var closeMenu = document.querySelector('.close-menu');

  hamburgerMenu.addEventListener('click', function() {
    menu.style.display = 'block';
    hamburgerMenu.style.display = 'none';
    closeMenu.style.display = 'block';
    // body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    body.classList.add('dark-overlay');
  });

  closeMenu.addEventListener('click', function() {
    menu.style.display = 'none';
    hamburgerMenu.style.display = 'block';
    closeMenu.style.display = 'none';
    // body.style.backgroundColor = 'initial';
    body.classList.remove('dark-overlay');
  });
});



// INCREASING AND DECREASING THE QUANTITY 

document.addEventListener('DOMContentLoaded', function() {
    const decreaseBtn = document.querySelector('.decrease-btn');
    const increaseBtn = document.querySelector('.increase-btn');
    const quantityInput = document.querySelector('.quantity-input');
  
    decreaseBtn.addEventListener('click', function() {
      if (quantityInput.value > 1) {
        quantityInput.value--;
      }
    });
  
    increaseBtn.addEventListener('click', function() {
      quantityInput.value++;
    });
  });
  

//  LIGHTBOX 

const toogleLightbox = document.querySelectorAll('.carousel-cont img');
const lightbox = document.querySelector('.lightbox');
const lightboxImages = document.querySelectorAll('.lightbox-cont img');
const lightboxThumbnails = document.querySelectorAll('.thumbnail-lgb');
const lightboxClose = document.querySelector('.lightbox-close img');
const prevLightbox = document.querySelector('.prev-lgb');
const nextLightbox = document.querySelector('.next-lgb');
let currentLbSlideIndex = 0;


// function checkScreenWidthAndEnableClick() {
//   if (window.innerWidth >= 700) {
//     toogleLightbox.forEach(() => {
//       this.addEventListener('click', showLightboxContainer);
//     })
//   } else {
//     toogleLightbox.forEach(() => {
//       this.removeEventListener('click', showLightboxContainer);
//     })
//   }
// }

// checkScreenWidthAndEnableClick();

// window.addEventListener("resize", checkScreenWidthAndEnableClick);


function showLightboxContainer (index) {

  toogleLightbox.forEach((lbImage) => {
    lbImage.addEventListener('click', function() {
      lightbox.style.display = "flex";
    });
  });

  lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';  
  });

}

showLightboxContainer(0);


function showLightboxImage(indexLb) {
  currentLbSlideIndex = indexLb;
  lightboxImages.forEach((imageLightbox) => {
    imageLightbox.style.display = 'none';
  });

  lightboxThumbnails.forEach((thumbnailLightbox) => {
    thumbnailLightbox.classList.remove('thumbnailLightboxActive');
  });

  lightboxImages[indexLb].style.display = 'block';
  lightboxThumbnails[indexLb].classList.add('thumbnailLightboxActive');

}

showLightboxImage(0);


function previousImage(event) {
  event.preventDefault();
  currentLbSlideIndex = (currentLbSlideIndex - 1 + lightboxImages.length) % lightboxImages.length;
  showLbSlide(currentLbSlideIndex);
}

function nextImage(event) {
  event.preventDefault();
  currentLbSlideIndex = (currentLbSlideIndex + 1) % lightboxImages.length;
  showLbSlide(currentLbSlideIndex);
}

prevLightbox.addEventListener('click', previousImage);
nextLightbox.addEventListener('click', nextImage);

showLbSlide(currentLbSlideIndex);


function showLbSlide(slideLbIndex) {
  lightboxImages.forEach((lbSlideImg) => {
    lbSlideImg.style.display = 'none';
  });

  lightboxThumbnails.forEach((thumbnailLightbox) => {
    thumbnailLightbox.classList.remove('thumbnailLightboxActive');
  });

  lightboxImages[slideLbIndex].style.display = 'block';
  lightboxThumbnails[slideLbIndex].classList.add('thumbnailLightboxActive');
}

// function handleResize() {
//   if (window.innerWidth <= 700) {
//     toogleLightbox.forEach((lbImage) => {
//       lbImage.removeEventListener('click', handleClick);
//     });
//   } else { 
//     showLightboxContainer(currentLbSlideIndex);
//   }
// }

// handleResize();
// window.addEventListener('resize', handleResize);
