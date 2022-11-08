// Carrito v1
// #1 BASE DE DATOS
const db = [
  {
    id: 1,
    name: 'Morral Para Hombre Dragonar',
    price: 300,
    image: 'assets/img/featured1.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 2,
    name: 'Morral Outdoor Balard',
    price: 200,
    image: 'assets/img/featured2.png',
    category: 'Outdoor ',
    quantity: 10
  },
  {
    id: 3,
    name: 'Morral Tracer ',
    price: 250,
    image: 'assets/img/featured3.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 4,
    name: 'Morral Kiran',
    price:280,
    image: 'assets/img/featured4.png',
    category: 'Outdoor ',
    quantity: 10
  },
  {
    id: 5,
    name: 'Morral Gommas',
    price: 195,
    image: 'assets/img/featured5.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 6,
    name: 'Morral Tocax',
    price: 180,
    image: 'assets/img/featured6.png',
    category: 'office ',
    quantity: 10
  }, {
    id: 7,
    name: 'Morral Compliment',
    price: 200,
    image: 'assets/img/featured7.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 8,
    name: 'Morral Arvar',
    price: 210,
    image: 'assets/img/featured8.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 9,
    name: 'Morral Deleg',
    price: 215,
    image: 'assets/img/featured9.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 10,
    name: 'Morral Dinamicon',
    price: 220,
    image: 'assets/img/featured10.png',
    category: 'office ',
    quantity: 10
  },
  {
    id: 11,
    name: 'Morral Bike',
    price: 235,
    image: 'assets/img/featured11.png',
    category: 'school ',
    quantity: 10
  },
  {
    id: 12,
    name: 'Morral Ribbony',
    price: 240,
    image: 'assets/img/featured12.png',
    category: 'office ',
    quantity: 10
  },
]

const products = window.localStorage.getItem('productsDB') ? JSON.parse(window.localStorage.getItem('productsDB')) : db

// #2 Pintar los productos en el DOM
const productContainer = document.getElementById('products__content')

function printProducts() {
  let html = ''

  for (let product of products) {
    html += `
    <article class="products__card hoodies">
    <div class="products__shape">
      <img src="${product.image}" alt="${product.name}" class="products__img">
    </div>

    <div class="products__data">
      <h2 class="products__name">${product.name}</h2>
      <div class="">
        <h3 class="products__price">$ ${product.price}</h3>
        <span class="products__quantity">Quedan solo ${product.quantity} unidades</span>
      </div>
      <button type="button" class="button products__button addToCart" data-id="${product.id}">
        <i class="bx bx-plus"></i>
      </button>
    </div>
  </article>`
  }

  productContainer.innerHTML = html
  window.localStorage.setItem('productsDB', JSON.stringify(products))
}

printProducts()

// #3 Carrito
let cart = window.localStorage.getItem('cartDB') ? JSON.parse(window.localStorage.getItem('cartDB')) : []

const cartContainer = document.getElementById('cart__container')
const cartCount = document.getElementById('cart-count')
const itemsCount = document.getElementById('items-count')
const cartTotal = document.getElementById('cart-total')

function printCart() {
  let html = ''
  for (let article of cart) {
    const product = products.find(p => p.id === article.id)

    html += `
    <article class="cart__card">
    <div class="cart__box">
      <img src="${product.image}" alt="${product.name}" class="cart__img">
    </div>

    <div class="cart__details">
      <h3 class="cart__title">${product.name} <span class="cart__price">$ ${product.price}</span></h3>

      <div class="cart__amount">
        <div class="cart__amount-content">
          <span class="cart__amount-box removeToCart" data-id="${product.id}">
            <i class="bx bx-minus"></i>
          </span>

          <span class="cart__amount-number">${article.qty}</span>

          <span class="cart__amount-box addToCart" data-id="${product.id}">
            <i class="bx bx-plus"></i>
          </span>
        </div>

        <i class="bx bx-trash-alt cart__amount-trash deleteToCart" data-id="${product.id}"></i>
      </div>

      <span class="cart__subtotal">
        <span class="cart__stock">Quedan ${product.quantity - article.qty} unidades</span>
        <span class="cart__subtotal-price">${product.price * article.qty}</span>
      </span>
    </div>
  </article>`
  }

  cartContainer.innerHTML = html
  cartCount.innerHTML = totalArticles()
  itemsCount.innerHTML = totalArticles()
  cartTotal.innerHTML = numberToCurrency(totalAmount())
  checkButtons()

  window.localStorage.setItem('cartDB', JSON.stringify(cart))
}

// #4 agregar al carrito
function addToCart(id, qty = 1) {
  const product = products.find(p => p.id === id)

  if (product && product.quantity > 0) {
    const article = cart.find(a => a.id === id)

    if (article) {
      if (checkStock(id, qty + article.qty)) {
        article.qty++
      } else {
        window.alert('No hay stock suficiente')
      }
    } else {
      cart.push({ id, qty })
    }
  } else {
    window.alert('Producto agotado')
  }
  printCart()
}

function checkStock(id, qty) {
  const product = products.find(p => p.id === id)
  return product.quantity - qty >= 0
}

// #5 remover articulos
function removeFromCart(id, qty = 1) {
  const article = cart.find(a => a.id === id)

  if (article && article.qty - qty > 0) {
    article.qty--
  } else {
    const confirm = window.confirm('Estás Seguro que desear eliminar este artículo???')

    if (confirm) {
      cart = cart.filter(a => a.id !== id)
    }
  }
  printCart()
}

// #6 Eliminar del carrito
function deleteFormCart(id) {
  const article = cart.find(a => a.id === id)
  cart.splice(cart.indexOf(article), 1)
  printCart()
}

// #7 Contar Articulos
function totalArticles() {
  // let acc = 0
  // for (let article of cart) {
  //   acc += article.qty
  // }
  // return acc

  return cart.reduce((acc, article) => acc + article.qty, 0)
}

// #8 El total
function totalAmount() {
  return cart.reduce((acc, article) => {
    const product = products.find(p => p.id === article.id)

    return acc + product.price * article.qty
  }, 0)
}

// #9 Limpiar carrito
function clearCart() {
  cart = []
  // cart.length = 0
  printCart()
}

// #10 Comparar
function checkout() {
  cart.forEach(artcile => {
    const product = products.find(p => p.id === artcile.id)

    product.quantity -= artcile.qty
  })
  clearCart()
  printCart()
  printProducts()
  window.alert('Gracias por su compra')
}

function checkButtons() {
  if (cart.length > 0) {
    document.getElementById('cart-checkout').removeAttribute('disabled')
    document.getElementById('cart-empty').removeAttribute('disabled')
  } else {
    document.getElementById('cart-checkout').setAttribute('disabled', 'disabled')
    document.getElementById('cart-empty').setAttribute('disabled', 'disabled')
  }
}

function numberToCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

printCart()

productContainer.addEventListener('click', function (e) {
  const add = e.target.closest('.addToCart')

  if (add) {
    const id = +add.dataset.id
    addToCart(id)
  }
})

cartContainer.addEventListener('click', function (e) {
  const remove = e.target.closest('.removeToCart')
  const add = e.target.closest('.addToCart')
  const deleteCart = e.target.closest('.deleteToCart')

  if (remove) {
    const id = +remove.dataset.id
    removeFromCart(id)
  }

  if (add) {
    const id = +add.dataset.id
    addToCart(id)
  }

  if (deleteCart) {
    const id = +deleteCart.dataset.id
    deleteFormCart(id)
  }
})

const actionButtons = document.getElementById('action-buttons')

actionButtons.addEventListener('click', function (e) {
  const clear = e.target.closest('#cart-empty')
  const buy = e.target.closest('#cart-checkout')

  if (clear) {
    clearCart()
  }

  if (buy) {
    checkout()
  }
})