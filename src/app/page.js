"use client";
import React, { useState, useEffect } from "react";
import Modal from "./components/modal"; // Componente para los detalles del evento
import Cart from "./components/cart"; // Componente para el carrito
import Image from "next/image";

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [modalData, setModalData] = useState(null); // Modal para los detalles del evento
  const [warningModal, setWarningModal] = useState(false); // Modal de advertencia
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla el estado del carrito

  const events = [
    {
      id: '3',
      image: '/sessionimg14.jpg', // Actualiza con la imagen correspondiente
      name: 'Session - Edición Especial',
      price: 2000.0, // Estima un precio si no se proporcionó
      flyer: '/session14.jpeg', // Actualiza con el flyer correspondiente
      description: '14 diciembre',
      details: {
        subtitle: 'Cumbia y Reggaetón Old School',
        mainDJ: 'Alan Villafañe, Maxi Ramos, Kechu DJ',
        place: 'Av. Libertador 1545 (C)',
        time: '22:00 hs', // Ajusta el horario si lo sabes
      },
      extraDescription:
        '¡No te pierdas esta edición especial de Session el 14 de diciembre! Una noche con los mejores ritmos de cumbia y reggaetón old school, acompañada de un line-up espectacular: Alan Villafañe, Maxi Ramos y Kechu DJ. Disfruta de la recepción con helados y vive una noche inolvidable.',
      instagramLink: 'https://www.instagram.com/maldito_miercoles_sj/', // Reemplaza con el link correcto
    },
    {
      id: '4',
      image: '/caserioimg.jpg', // Actualiza con la imagen correspondiente
      name: 'El Caserio',
      price: 2500.0,
      flyer: '/caserio.jpeg', // Actualiza con el flyer correspondiente
      description: '21 diciembre',
      details: {
        subtitle: '¡Prepárate para una noche épica en El Caserío Club!',
        mainDJ: 'Gnabry, Kevo DJ, Juana Vincet, Adri Fuentes',
        place: 'La Meseta',
        time: '21:00 hs', // Puedes ajustar el horario si lo sabes
      },
      extraDescription:
        'Este 21 de diciembre llega la Session #13, una fiesta única llena de energía y los mejores beats. Disfruta de la música de artistas increíbles como Gnabry, Kevo DJ, Juana Vincet, y Adri Fuentes, quienes harán vibrar a La Meseta con su talento.',
      instagramLink: 'https://www.instagram.com/maldito_miercoles_sj/', // Reemplaza con el link correcto
    },
    {
      id: '5',
      image: '/sessionimg.jpg', // Actualiza con la imagen correspondiente
      name: 'Session 31 de Diciembre',
      price: 3000.0,
      flyer: '/session31.jpeg', // Actualiza con el flyer correspondiente
      description: '31 diciembre',
      details: {
        subtitle: 'Cierra el año con el evento más exclusivo en La Meseta',
        mainDJ: 'Oriana Carrieri Mdz, Tainy Loops, Kechu, Maxi Ramos',
        place: 'La Meseta',
        time: '23:00 hs', // Ajusta el horario si es necesario
      },
      extraDescription:
        'Prepárate para cerrar el año con el evento más exclusivo en La Meseta, este 31 de diciembre. Una noche cargada de buena música y energía, con un increíble line-up: Oriana Carrieri Mdz, Tainy Loops (ex DJ de Daddy Yankee), Kechu (DJ residente), Maxi Ramos (DJ residente). Ven a disfrutar de una atmósfera única y celebra el comienzo del 2025 en el mejor lugar de San Juan.',
      instagramLink: 'https://www.instagram.com/maldito_miercoles_sj/', // Reemplaza con el link correcto
    }
  ];

  const addToCart = (event) => {
    if (cart.length > 0 && cart[0].event.id !== event.id) {
      setWarningModal(true);
      return;
    }

    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.event.id === event.id);

      if (itemIndex > -1) {
        return prevCart.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { event, quantity: 1 }];
      }
    });
  };

  const openModal = (event) => {
    setModalData(event); // Abre el modal de detalles del evento
  };

  const closeModal = () => {
    setModalData(null); // Cierra el modal de detalles del evento
  };

  const closeWarningModal = () => {
    setWarningModal(false); // Cierra el modal de advertencia
  };

    // Función para actualizar la cantidad de un evento en el carrito
  const updateQuantity = (eventId, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.event.id === eventId) {
            const newQuantity = item.quantity + change;
            if (newQuantity > 0) {
              return { ...item, quantity: newQuantity };
            } else {
              return null; // Marcar para eliminar
            }
          }
          return item;
        })
        .filter((item) => item !== null); // Eliminar los elementos marcados
      return updatedCart;
    });
  };

  const smoothScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector("#eventos");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Header */}
      <header
        className="relative flex justify-center items-center mb-8 w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center gap-5">
          <img src="/LOGO.svg" alt="Logo" className="h-52" />
          <h2 className="text-3xl font-bold text-white text-center">
            BIENVENIDOS A MALDITO MIERCOLES
          </h2>
          <a
            href="#eventos"
            onClick={smoothScroll}
            className="hover:text-neutral-300 hover:bg-neutral-800 text-md font-bold bg-white text-black px-10 py-1 rounded-md transition duration-500 ease-in-out"
          >
            VER EVENTOS
          </a>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="fixed top-5 right-5">
          <svg
            className="w-8 h-8 text-neutral-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M10 21a2 2 0 11-4 0 2 2 0 014 0zM20 21a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      {/* Lista de eventos */}
      <h3 className="text-3xl font-bold text-white pl-7 md:pl-14">NUESTROS EVENTOS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 md:px-10 pb-28" id="eventos">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 rounded shadow hover:shadow-lg transition flex flex-col items-center justify-between"
          >
            <div className="w-full mb-4" onClick={() => openModal(event)}>
              <Image
                src={event.image}
                alt={event.name}
                width={500}
                height={500}
                priority
                className="w-full h-[40vh] object-cover rounded cursor-pointer"
              />
            </div>
            <div className="flex flex-col text-left w-full">
              <h2 className="text-3xl font-semibold mb-1 text-neutral-200">
                {event.name}
              </h2>
              <p className="mb-1 text-[18px] text-neutral-300">
                {event.description}
              </p>
              <p className="mb-4 text-[16px] text-neutral-400">
                Precio: ${event.price}
              </p>
              <button
                onClick={() => addToCart(event)}
                className="text-neutral-300 border border-neutral-500 rounded-lg px-4 py-2 w-1/2 text-sm hover:text-neutral-900 hover:bg-neutral-300 transition-all duration-300"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-neutral-300  text-center py-4">
        <p>&copy; 2024 Digi Software Solutions. Todos los derechos reservados.</p>
      </footer>

      {/* Modal de detalles del evento */}
      {typeof window !== 'undefined' && modalData && (
        <Modal event={modalData} onClose={closeModal} addToCart={addToCart} />
      )}

      {/* Modal de advertencia */}
      {warningModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={closeWarningModal} // Cierra al hacer clic fuera del modal
        >
          <div
            className="bg-neutral-800 text-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center h-[70vh] md:w-[50vw] md:h-[50vh] relative"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro del modal
          >
            {/* Botón para cerrar con "X" */}
            <button
              onClick={closeWarningModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300 transition-all"
            >
              &times;
            </button>

            {/* Contenido del modal */}
            <h2 className="text-4xl font-bold mb-4">Eventos Diferentes</h2>
            <p className="text-center text-2xl mb-4">No puedes agregar diferentes eventos al carrito.</p>
            <p className="text-center mb-6">¿Quieres comprar el Combo de Eventos?</p>
            <div className="flex gap-4">
              <button
                onClick={closeWarningModal}
                className="bg-neutral-500 hover:bg-neutral-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  closeWarningModal();
                  setCart([{ event: events.find((e) => e.id === "3"), quantity: 1 }]); // Borra el carrito y agrega el combo
                  setIsCartOpen(true); // Abre el carrito para mostrar el combo
                }}
                className="bg-neutral-500 hover:bg-neutral-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
              >
                Agregar Combo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Carrito */}
      {typeof window !== 'undefined' && isCartOpen && (
        <Cart
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default HomePage;
