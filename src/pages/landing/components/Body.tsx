import React from 'react';

const Body: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between p-16">
      {/* Sección de texto */}
      <div className="max-w-md">
        <h1 className="text-4xl font-bold">Tu espacio de conversación en línea</h1>
        <p className="mt-4 text-lg">
        Chatea en tiempo real, sin complicaciones. Un lugar sencillo y rápido para conectar con amigos o conocer nuevas personas. 
        </p>
      </div>

      {/* Imagen */}
      <div className="mt-6 md:mt-0">
        <img 
          src="https://img.luifereduardoo.com/webChat/boy_with_laptop.webp" 
          alt="boy_with_laptop" 
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Body;