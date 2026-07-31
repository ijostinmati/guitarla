import { useState, useEffect } from 'react'
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from './data/db'

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  useEffect(() => {

  }, [cart])

  function addToCart(item) {
    localStorage.setItem('cart', JSON.stringify(cart))
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)

    if (itemExist >= 0) { //Existe en el carrito
      if (cart[itemExist].quantity >= MAX_ITEMS) return

      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }


  function decreaseQuantity(id) {
    var updatedCart = cart.map(item => {
      if (item.id === id && item.quantity >= MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    updatedCart = updatedCart.filter(guitar => guitar.quantity > 0)
    setCart(updatedCart)
  }

  function increaseQuantity(id) {

    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        console.log("coincidio id " + item.quantity)
        return {
          ...item,
          quantity: item.quantity + 1
        }

        saveLocalStorage()
      }

      return item

    })

    setCart(updatedCart)
  }
  function clearCart() {
    setCart([])
  }

  return (
    <>

      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}


      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />

          ))}

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
