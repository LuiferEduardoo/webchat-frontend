import React from "react";

import { FaComments, FaUserShield, FaPaintBrush } from "react-icons/fa";

const Body: React.FC = () => {
  return (
    <section className="bg-gray-100">
      <div className="bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between p-16">
        {/* Sección de texto */}
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">
            Tu espacio de conversación en línea
          </h1>
          <p className="mt-4 text-lg">
            Chatea en tiempo real, sin complicaciones. Un lugar sencillo y
            rápido para conectar con amigos o conocer nuevas personas.
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
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Chatea en tiempo real con una persona
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Conecta instantáneamente con amigos, familiares o colegas.
            </p>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://img.luifereduardoo.com/webChat/chat.webp"
                alt="Interfaz de chat uno a uno mostrando una conversación en tiempo real"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Tienes amigos? ¡Chatea en grupo!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Crea grupos y mantén conversaciones con varias personas a la vez.
            </p>
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://img.luifereduardoo.com/webChat/groups.webp"
                alt="Interfaz de chat grupal mostrando múltiples participantes"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">
          Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-indigo-500">
            <div className="text-indigo-600 mb-4">
              <FaComments size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Chat en tiempo real
            </h3>
            <p className="text-gray-600">
              Conéctate y chatea con tus amigos al instante con nuestra
              tecnología de baja latencia.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
            <div className="text-blue-600 mb-4">
              <FaPaintBrush size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Interfaz intuitiva
            </h3>
            <p className="text-gray-600">
              Diseño limpio y minimalista que ofrece una experiencia de usuario
              fluida y sencilla.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
            <div className="text-green-600 mb-4">
              <FaUserShield size={40} />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Seguridad y privacidad
            </h3>
            <p className="text-gray-600">
              Las conversaciones están guardadas de manera segura. Y ningun usuario dentro de la plataforma puede ver tus mensajes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
