
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
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

      <main className="container mx-auto px-4 py-6">
        {/* Баннер */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Маркетплейс Tenger</h1>
          <p className="text-gray-600 mb-6">Покупайте и продавайте новые и Б/У товары</p>
          <div className="flex gap-4 justify-center">
            <Button>Начать продавать</Button>
            <Button variant="outline">Узнать больше</Button>
          </div>
        </div>

        {/* Категории товаров */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Категории</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {["Электроника", "Одежда", "Дом и сад", "Спорт", "Детские товары", "Авто"].map((category) => (
              <Card key={category} className="hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                    <Icon name="Package" size={24} />
                  </div>
                  <span className="text-sm text-center">{category}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Табы для переключения между новыми и Б/У товарами */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Товары</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Все товары</TabsTrigger>
              <TabsTrigger value="new">Новые</TabsTrigger>
              <TabsTrigger value="used">Б/У</TabsTrigger>
            </TabsList>
            
            {/* Содержимое табов */}
            <TabsContent value="all" className="mt-0">
              <ProductGrid />
            </TabsContent>
            <TabsContent value="new" className="mt-0">
              <ProductGrid condition="new" />
            </TabsContent>
            <TabsContent value="used" className="mt-0">
              <ProductGrid condition="used" />
            </TabsContent>
          </Tabs>
        </div>
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

// Компонент для отображения товаров
const ProductGrid = ({ condition }: { condition?: "new" | "used" }) => {
  // Имитация данных товаров
  const products = [
    { id: 1, title: "iPhone 13", price: 45000, condition: "used", seller: "Анна К.", image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format" },
    { id: 2, title: "Ноутбук Asus", price: 65000, condition: "new", seller: "МегаМаг", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format" },
    { id: 3, title: "Наушники Sony", price: 7500, condition: "used", seller: "Максим Д.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format" },
    { id: 4, title: "Кроссовки Nike", price: 5900, condition: "new", seller: "СпортМаркет", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format" },
    { id: 5, title: "Книжная полка", price: 3500, condition: "used", seller: "Елена В.", image: "https://images.unsplash.com/photo-1588447555751-22da59a3d175?w=500&auto=format" },
    { id: 6, title: "Смарт-часы", price: 11900, condition: "new", seller: "ТехноСтор", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format" },
    { id: 7, title: "Фотоаппарат Canon", price: 24000, condition: "used", seller: "Артем П.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format" },
    { id: 8, title: "Велосипед Trek", price: 32000, condition: "used", seller: "Николай С.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format" },
  ];

  // Фильтрация по состоянию, если указано
  const filteredProducts = condition 
    ? products.filter(product => product.condition === condition)
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
            <div className="relative pt-[100%]">
              <img 
                src={product.image} 
                alt={product.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {product.condition === "new" ? (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Новый</span>
                ) : (
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Б/У</span>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-lg font-bold mt-2">{product.price} ₽</p>
              <p className="text-sm text-gray-500 mt-1">
                {product.condition === "new" 
                  ? <span className="flex items-center gap-1"><Icon name="Store" size={14} /> {product.seller}</span>
                  : <span className="flex items-center gap-1"><Icon name="User" size={14} /> {product.seller}</span>
                }
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Index;
