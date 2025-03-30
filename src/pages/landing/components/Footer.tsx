import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-black text-center p-4 mt-auto">
      <p>© {currentYear} webChat. Todos los derechos reservados.</p>
      <p>Desarrollado por: Luifer Ortega</p>
    </footer>
  );
};

export default Footer;