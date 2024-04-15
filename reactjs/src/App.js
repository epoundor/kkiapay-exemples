import { useMemo, useState } from 'react';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

function App() {
  const [search, setSearch] = useState("")
  const shoes = [
    {
      name: "Reebok",
      price: 990,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240301112151/shoes.png",
    },
    {
      name: "Sketchers",
      price: 1299,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240301112151/sneakers.png",
    },
    {
      name: "Adidas",
      price: 1499,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240301112150/running-shoe.png",
    },
    {
      name: "Converse",
      price: 1999,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240301112149/sneakers-(1).png",
    },
  ];
  const filteredShoes = useMemo(() => {
    const query = search.toLowerCase();
    const filteredShoes = shoes.filter((shoe) =>
      shoe.name.toLowerCase().includes(query)
    );
    return filteredShoes;
  }, [search])

  function handleClick(shoe) {
    openKkiapayWidget({
      amount: shoe.price,
      api_key: "****************************",
      data: {
        name: shoe.name
      }
    });
  }
  return (
    <div className="App">
      <h1 className="text-3xl text-center text-blue-500 font-bold mb-4">
        SHOE COMPANY
      </h1>
      <nav className="flex items-center py-4 sticky top-0 bg-white z-10">
        <ul className="flex-1 text-center">
          <li className="list-none inline-block px-5">
            <a
              href="#"
              className="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
            >
              Home
            </a>
          </li>
          <li className="list-none inline-block px-2">
            <a
              href="#"
              className="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
            >
              About
            </a>
          </li>
          <li className="list-none inline-block px-2">
            <a
              href="#"
              className="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
            >
              Features
            </a>
          </li>
          <li className="list-none inline-block px-2">
            <a
              href="#"
              className="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
            >
              Contact
            </a>
          </li>
          <li className="list-none inline-block px-2">
            <input
              type="text"
              id="searchInput"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              className="w-64 h-8 pl-2 pr-4 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Search..."
              aria-label="Search shoes"
            />
          </li>
        </ul>
      </nav>

      <div className="h-auto bg-white p-10">
        <ul
          id="shoe-list"
          className="flex flex-wrap justify-center align-center gap-10"
        >
          {filteredShoes.map((shoe) => (
            <li className="p-2">
              <a
                href="#"
                className="block bg-gray-200 hover:scale-105 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
              >
                <img src={shoe.image}
                  className="w-60 h-60 object-cover p-10"
                  alt={shoe.name}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{shoe.name}</h3>
                  <p className="text-gray-700">
                    {
                      new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "XOF",
                        minimumFractionDigits: 0,
                      }).format(shoe.price)
                    }
                  </p>
                  <button
                    onClick={() => handleClick(shoe)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition-colors duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App;
