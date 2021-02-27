import {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import products from '../products.json'

const defaultCart = {
  products: {}
}

export default function Home() {
  const [cart, updateCart] = useState(defaultCart);

  console.log('cart', cart);

  function addToCart({id} = {}) {
    updateCart(prev => {
      let cartState = {...prev};

      if ( cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1
        }
      }

      return cartState;
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Space Jelly Shop</h1>

        <p className={styles.description}>
          The best space jellyfish swag in the universe!
        </p>

        <p className={styles.description}>
          <strong>Items:</strong> 2
          <br />
          <strong>Total Cost:</strong> $20
          <br />
          <button>Check Out</button>
        </p>

        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, title, description, image, price } = product;
            return (
              <li key={id} className={styles.card}>
                <a href="https://nextjs.org/docs">
                  <img src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>${price}</p>
                  <p>{description}</p>
                </a>
                <p>
                  <button onClick={() => {
                    addToCart({
                      id
                    })
                  }}>Buy Now</button>
                </p>
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
