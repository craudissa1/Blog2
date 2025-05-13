import Link from 'next/link';

// Para os ícones, você pode usar uma biblioteca como react-icons ou SVGs diretamente.
// Se for usar react-icons, instale com: npm install react-icons
// e descomente as importações e usos abaixo.
// import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-blue-400">Stay</span><span className="text-purple-400">Focus</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Transformando tempo em resultados com a plataforma definitiva de produtividade e estudos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" legacyBehavior><a className="text-gray-400 hover:text-white transition">Início</a></Link></li>
              <li><Link href="/funcionalidades" legacyBehavior><a className="text-gray-400 hover:text-white transition">Funcionalidades</a></Link></li>
              <li><Link href="/precos" legacyBehavior><a className="text-gray-400 hover:text-white transition">Preços</a></Link></li>
              <li><Link href="/blog" legacyBehavior><a className="text-gray-400 hover:text-white transition">Blog</a></Link></li>
              <li><Link href="/contato" legacyBehavior><a className="text-gray-400 hover:text-white transition">Contato</a></Link></li>
            </ul>
          </div>

          {/* Categorias do Blog */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Categorias do Blog</h4>
            <ul className="space-y-2">
              <li><Link href="/blog/produtividade" legacyBehavior><a className="text-gray-400 hover:text-white transition">Produtividade</a></Link></li>
              <li><Link href="/blog/concursos" legacyBehavior><a className="text-gray-400 hover:text-white transition">Concursos</a></Link></li>
              <li><Link href="/blog/estudos" legacyBehavior><a className="text-gray-400 hover:text-white transition">Estudos</a></Link></li>
              <li><Link href="/blog/hiperfocos" legacyBehavior><a className="text-gray-400 hover:text-white transition">Hiperfocos</a></Link></li>
              <li><Link href="/blog/saude-bem-estar" legacyBehavior><a className="text-gray-400 hover:text-white transition">Saúde & Bem-estar</a></Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-gray-400"></i>
                <a href="mailto:contato@stayfocus.com" className="text-gray-400 hover:text-white transition">contato@stayfocus.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2 text-gray-400"></i>
                <a href="tel:+5511999999999" className="text-gray-400 hover:text-white transition">(11) 99999-9999</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 StayFocus. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/termos-de-uso" legacyBehavior><a className="text-gray-400 hover:text-white text-sm mr-4">Termos de Uso</a></Link>
            <Link href="/politica-de-privacidade" legacyBehavior><a className="text-gray-400 hover:text-white text-sm">Política de Privacidade</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;