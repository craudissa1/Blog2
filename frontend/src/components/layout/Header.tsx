'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-gray-800"> {/* Cor do texto do logo conforme protótipo */}
              <span className="text-blue-600">Stay</span><span className="text-purple-600">Focus</span> {/* Cores específicas para Stay e Focus */}
            </a>
          </Link>
        </div>

        {/* Navegação Desktop - classes de texto e hover conforme protótipo */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600">Início</a></Link>
          <Link href="/funcionalidades" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600">Funcionalidades</a></Link>
          <Link href="/concursos" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600">Concursos</a></Link>
          <Link href="/produtividade" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600">Produtividade</a></Link>
          <Link href="/sobre" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600">Sobre</a></Link>
        </nav>

        <div className="flex items-center">
          {/* Botão "Começar Agora" - utilizando a classe .btn-primary global e ajustes de texto */}
          <button className="btn-primary px-6 py-2 text-sm font-medium">
            Começar Agora
          </button>
          <button className="md:hidden ml-4" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <i className="fas fa-times text-xl text-gray-800" /> /* Cor do ícone conforme protótipo */
            ) : (
              <i className="fas fa-bars text-xl text-gray-800" /> /* Cor do ícone conforme protótipo */
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - classes de texto e hover conforme protótipo */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-40"> {/* Ajuste top-full e shadow-lg */}
          <nav className="flex flex-col space-y-2 px-4"> {/* Ajuste space-y e padding */}
            <Link href="/" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600 py-2 block text-center" onClick={toggleMobileMenu}>Início</a></Link>
            <Link href="/funcionalidades" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600 py-2 block text-center" onClick={toggleMobileMenu}>Funcionalidades</a></Link>
            <Link href="/concursos" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600 py-2 block text-center" onClick={toggleMobileMenu}>Concursos</a></Link>
            <Link href="/produtividade" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600 py-2 block text-center" onClick={toggleMobileMenu}>Produtividade</a></Link>
            <Link href="/sobre" legacyBehavior><a className="nav-link font-medium text-gray-800 hover:text-blue-600 py-2 block text-center" onClick={toggleMobileMenu}>Sobre</a></Link>
          </nav>
        </div>
      )}
      {/* O estilo global para .nav-link e .btn-primary foi movido para globals.css */}
      {/* Removido o bloco <style jsx global> daqui */}
    </header>
  );
};

export default Header;