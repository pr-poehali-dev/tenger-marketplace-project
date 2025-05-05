import { useState, useEffect } from "react"; import { Link } from "react-router-dom"; import { Button } from "@/components/ui/button"; import { Card, CardContent } from "@/components/ui/card"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; import { Input } from "@/components/ui/input"; import Icon from "@/components/ui/icon"; 

const Index = () => {  const [products, setProducts] = useState<any[]>([]);

  // Функция для генерации случайных товаров
  const generateRandomProducts = () => {
    // Примеры товаров
    const productExamples = [
      { title: "iPhone 13", price: 45000, condition: "used", seller: "Анна К.", image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format" },
      { title: "Ноутбук Asus", price: 65000, condition: "new", seller: "МегаМаг", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format" },
      { title: "Наушники Sony", price: 7500, condition: "used", seller: "Максим Д.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format" },
      { title: "Кроссовки Nike", price: 5900, condition: "new", seller: "СпортМаркет", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format" },
      { title: "Книжная полка", price: 3500, condition: "used", seller: "Елена В.", image: "https://images.unsplash.com/photo-1588447555751-22da59a3d175?w=500&auto=format" },
      { title: "Смарт-часы", price: 11900, condition: "new", seller: "ТехноСтор", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format" },
      { title: "Фотоаппарат Canon", price: 24000, condition: "used", seller: "Артем П.", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format" },
      { title: "Велосипед Trek", price: 32000, condition: "used", seller: "Николай С.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format" },
      { title: "Гитара акустическая", price: 15000, condition: "used", seller: "Сергей М.", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format" },
      { title: "Микроволновая печь", price: 4500, condition: "new", seller: "ДомоТех", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format" },
      { title: "PlayStation 5", price: 49990, condition: "new", seller: "ГеймШоп", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&auto=format" },
      { title: "Кофемашина", price: 18500, condition: "used", seller: "Ольга К.", image: "https://images.unsplash.com/photo-1516231415412-942a2481c44b?w=500&auto=format" },
      { title: "Монитор Samsung", price: 12000, condition: "new", seller: "ЭлектроМир", image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500&auto=format" },
      { title: "Диван угловой", price: 35000, condition: "used", seller: "Виктор П.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format" },
    ];
    
    // Перемешиваем массив товаров
    const shuffled = [...productExamples].sort(() => 0.5 - Math.random());
    
    // Берем до 8 товаров из перемешанного массива
    const randomProducts = shuffled.slice(0, 8).map((product, index) => ({
      ...product,
      id: index + 1,
      // Случайно изменяем цены, чтобы товары выглядели по-разному
      price: Math.round(product.price * (0.9 + Math.random() * 0.3))
    }));
    
    return randomProducts;
  };

  // При каждой загрузке страницы генерируем новые товары
  useEffect(() => {
    setProducts(generateRandomProducts());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Верхняя навигационная панель в Layout.tsx */}

      <main className="container mx-auto px-4 py-6">
        {/* Баннер */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Маркетплейс Tenger</h1>
          <p className="text-gray-600 mb-6">Покупайте и продавайте новые и Б/У товары</p>
          <div className="flex gap-4 justify-center">
            <Link to="/sell">
              <Button>Начать продавать</Button>
            </Link>
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
              <ProductGrid products={products} />
            </TabsContent>
            <TabsContent value="new" className="mt-0">
              <ProductGrid products={products} condition="new" />
            </TabsContent>
            <TabsContent value="used" className="mt-0">
              <ProductGrid products={products} condition="used" />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Футер в Layout.tsx */}
    </div>
  );
};

// Компонент для отображения товаров
const ProductGrid = ({ products, condition }: { products: any[], condition?: "new" | "used" }) => {
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