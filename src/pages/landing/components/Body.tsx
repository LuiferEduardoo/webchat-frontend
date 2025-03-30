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
          src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-4494-51f7-8353-a1f7eac75859/raw?se=2025-03-30T04%3A21%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=1bf48b7d-0f23-5740-a577-12fcaf7bd0dc&skoid=365eb242-95ba-4335-a618-2c9f8f766a86&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-30T01%3A19%3A48Z&ske=2025-03-31T01%3A19%3A48Z&sks=b&skv=2024-08-04&sig=/DgtxHbpCTRUtDUlNDi6TOc/ITJoVqonFzbVtn1gT5k%3D" 
          alt="boy_with_laptop" 
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Body;