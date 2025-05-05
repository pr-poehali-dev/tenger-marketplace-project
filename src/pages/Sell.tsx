
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const Sell = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [productType, setProductType] = useState<"used" | "new">("used");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация отправки данных на сервер
    setTimeout(() => {
      setIsLoading(false);
      // После успешной публикации перенаправляем на профиль
      navigate("/profile");
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: string[] = [];
      
      Array.from(e.target.files).forEach(file => {
        // В реальном приложении здесь был бы код загрузки изображения на сервер
        // Сейчас просто создаем локальный URL для предпросмотра
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      });
      
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Ограничиваем количество изображений
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Разместить объявление</CardTitle>
          <CardDescription>
            Заполните информацию о товаре, который хотите продать
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Тип товара */}
            <div className="space-y-2">
              <Label>Тип товара</Label>
              <RadioGroup 
                value={productType} 
                onValueChange={(value) => setProductType(value as "used" | "new")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="used" id="used" />
                  <Label htmlFor="used" className="cursor-pointer">Б/У товар</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="cursor-pointer">Новый товар</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Название товара */}
            <div className="space-y-2">
              <Label htmlFor="title">Название товара</Label>
              <Input id="title" placeholder="Например: iPhone 13 Pro 128GB" required />
            </div>

            {/* Категория */}
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <Select required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Электроника</SelectItem>
                  <SelectItem value="clothes">Одежда</SelectItem>
                  <SelectItem value="home">Дом и сад</SelectItem>
                  <SelectItem value="sport">Спорт и отдых</SelectItem>
                  <SelectItem value="kids">Детские товары</SelectItem>
                  <SelectItem value="auto">Авто</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Цена */}
            <div className="space-y-2">
              <Label htmlFor="price">Цена (₽)</Label>
              <Input id="price" type="number" min="1" placeholder="0" required />
            </div>

            {/* Описание */}
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea 
                id="description" 
                placeholder="Опишите подробно ваш товар, укажите важные характеристики, состояние, комплектацию и т.д." 
                rows={5} 
                required 
              />
            </div>

            {/* Загрузка изображений */}
            <div className="space-y-2">
              <Label>Фотографии товара (до 5 шт.)</Label>
              <div className="grid grid-cols-5 gap-2">
                {/* Превью загруженных изображений */}
                {images.map((image, index) => (
                  <div key={index} className="relative w-full pt-[100%] bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Превью ${index + 1}`} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-1 right-1 h-6 w-6 bg-white/80 rounded-full"
                      type="button"
                      onClick={() => removeImage(index)}
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                ))}
                
                {/* Кнопка добавления изображения */}
                {images.length < 5 && (
                  <div className="relative w-full pt-[100%] border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                    <label htmlFor="image-upload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-gray-700">
                      <Icon name="Plus" size={24} />
                      <span className="text-xs mt-1">Добавить</span>
                    </label>
                    <Input 
                      id="image-upload" 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
                
                {/* Пустые ячейки */}
                {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, index) => (
                  <div key={`empty-${index}`} className="w-full pt-[100%] border border-gray-200 rounded-md"></div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">Первое фото будет главным в объявлении</p>
            </div>

            {/* Контактная информация */}
            <div className="space-y-2">
              <Label htmlFor="contact">Контактный телефон</Label>
              <Input id="contact" placeholder="+7 (___) ___-__-__" />
              <p className="text-sm text-gray-500">Если не указан, будет использоваться телефон из профиля</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Публикация..." : "Опубликовать объявление"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Sell;
