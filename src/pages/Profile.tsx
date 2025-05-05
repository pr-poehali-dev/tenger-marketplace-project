import { useState, useEffect } from "react");
import { Link } from "react-router-dom");
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs");
import { Button } from "@/components/ui/button");
import { Card, CardContent } from "@/components/ui/card");
import { Avatar, AvatarFallback } from "@/components/ui/avatar");
import Icon from "@/components/ui/icon");

const Profile = () => {
  // Получаем данные пользователя из localStorage (имитация авторизации)
  const getUserData = () => {
    // В реальном приложении здесь был бы запрос к API или Redux store
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    
    // Данные по умолчанию, если не найдены в localStorage
    return {
      name: "Пользователь",
      email: "user@example.com",
      registeredDate: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
    };
  };
  
  const [user, setUser] = useState(getUserData());

  // Обновляем данные пользователя при изменении в localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUserData());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // При монтировании компонента имитируем регистрацию данных, 
    // если в localStorage еще нет информации о пользователе
    if (!localStorage.getItem('user')) {
      const userFromRegistration = {
        name: "Иван Иванов",
        email: "ivan@example.com",
        registeredDate: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
      };
      localStorage.setItem('user', JSON.stringify(userFromRegistration));
      setUser(userFromRegistration);
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Пример товаров пользователя
  const userProducts = [
    { id: 1, title: "Смартфон Samsung", price: 18000, condition: "used", image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=500&auto=format", status: "active" },
    { id: 2, title: "Велосипед горный", price: 27500, condition: "used", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format", status: "active" },
    { id: 3, title: "Книжная полка", price: 3500, condition: "used", image: "https://images.unsplash.com/photo-1588447555751-22da59a3d175?w=500&auto=format", status: "sold" },
  ];

  // Пример истории заказов
  const orders = [
    { id: 1, title: "Наушники Sony", price: 7500, seller: "Максим Д.", date: "15.04.2025", status: "delivered" },
    { id: 2, title: "Кроссовки Nike", price: 5900, seller: "СпортМаркет", date: "02.03.2025", status: "in_progress" },
  ];

  // Пример избранных товаров
  const favorites = [
    { id: 1, title: "iPhone 13", price: 45000, condition: "used", seller: "Анна К.", image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&auto=format" },
    { id: 2, title: "Наушники Sony", price: 7500, condition: "used", seller: "Максим Д.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Сайдбар с информацией о пользователе */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-gray-500">На Tenger с {user.registeredDate}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{user.email}</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Icon name="Settings" className="mr-2" size={16} />
                  Редактировать профиль
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Основной контент */}
        <div className="w-full md:w-3/4">
          <Tabs defaultValue="myProducts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="myProducts">Мои товары</TabsTrigger>
              <TabsTrigger value="orders">История покупок</TabsTrigger>
              <TabsTrigger value="favorites">Избранное</TabsTrigger>
            </TabsList>
            
            {/* Мои товары */}
            <TabsContent value="myProducts">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Мои товары</h2>
                <Link to="/sell">
                  <Button>
                    <Icon name="Plus" className="mr-2" size={16} />
                    Добавить товар
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProducts.map((product) => (
                  <Card key={product.id} className={`overflow-hidden ${product.status === 'sold' ? 'opacity-70' : ''}`}>                    <div className="relative pt-[80%]">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {product.status === 'sold' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                          <span className="bg-red-600 text-white px-3 py-1 rounded font-medium">Продано</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{product.title}</h3>
                      <p className="text-lg font-bold mt-1">{product.price} ₽</p>
                      <div className="flex justify-between mt-3">
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="BarChart2" size={16} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* История покупок */}
            <TabsContent value="orders">
              <h2 className="text-xl font-semibold mb-6">История покупок</h2>
              
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{order.title}</h3>
                            <p className="text-lg font-bold">{order.price} ₽</p>
                            <p className="text-sm text-gray-500">Продавец: {order.seller}</p>
                            <p className="text-sm text-gray-500">Дата: {order.date}</p>
                          </div>
                          <div>
                            {order.status === 'delivered' ? (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Доставлено</span>
                            ) : (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">В процессе</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="ShoppingBag" className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-500">У вас пока нет истории покупок</p>
                </div>
              )}
            </TabsContent>
            
            {/* Избранное */}
            <TabsContent value="favorites">
              <h2 className="text-xl font-semibold mb-6">Избранное</h2>
              
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative pt-[80%]">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full h-8 w-8"
                        >
                          <Icon name="Heart" className="text-red-500" size={18} />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-lg font-bold mt-1">{product.price} ₽</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {product.condition === "new" 
                            ? <span className="flex items-center gap-1"><Icon name="Store" size={14} /> {product.seller}</span>
                            : <span className="flex items-center gap-1"><Icon name="User" size={14} /> {product.seller}</span>
                          }
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Heart" className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-500">У вас пока нет избранных товаров</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;