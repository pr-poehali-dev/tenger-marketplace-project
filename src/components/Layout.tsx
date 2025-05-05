
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Верхняя навигационная панель */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">Tenger</Link>
          
          <div className="relative w-full max-w-md mx-4">
            <Input 
              className="pl-10 pr-4 py-2 w-full" 
              placeholder="Поиск товаров..."
            />
            <Icon name="Search" className="absolute left-3 top-3 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/favorites">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={20} />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline">Войти</Button>
            </Link>
            <Link to="/sell">
              <Button>Продать</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Футер */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">О Tenger</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">О нас</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Как это работает</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Блог</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Центр помощи</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Связаться с нами</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Правила сайта</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Покупателям</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Безопасная сделка</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Отзывы</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Гарантии</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Продавцам</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary">Как продавать</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Правила продажи</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary">Тарифы</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>© 2025 Tenger. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
