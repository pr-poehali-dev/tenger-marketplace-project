import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prev => ({ ...prev, [id.replace('login-', '')]: value }));
  };

  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    setRegisterData(prev => ({ ...prev, [id.replace('reg-', '')]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация входа
    setTimeout(() => {
      setIsLoading(false);
      // Сохраняем данные пользователя (в реальном приложении это был бы токен и данные из API)
      const userData = {
        name: "Пользователь", // В реальном приложении получили бы из API
        email: loginData.email,
        registeredDate: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // После авторизации перенаправление
      navigate("/profile");
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Проверка совпадения паролей
    if (registerData.password !== registerData.passwordConfirm) {
      alert("*");
      return;
    }
    
    setIsLoading(true);
    
    // Имитация регистрации
    setTimeout(() => {
      setIsLoading(false);
      
      // Сохраняем данные пользователя
      const userData = {
        name: registerData.name,
        email: registerData.email,
        registeredDate: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      // После регистрации перенаправление
      navigate("/profile");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Tenger</CardTitle>
          <CardDescription>
            Войдите в свой аккаунт или зарегиструйтесь
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Холдинг</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="example@mail.com" 
                    required 
                    value={loginData.email}
                    onChange={handleLoginChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Забыли пароль?
                    </Link>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    required 
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "*Вход..." : "Войти"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Имя</Label>
                  <Input 
                    id="reg-name" 
                    placeholder="*Иван *Иванов" 
                    required 
                    value={registerData.name}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Холдинг</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    placeholder="example@mail.com" 
                    required 
                    value={registerData.email}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Пароль</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    required 
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-passwordConfirm">Подфирмите пароль</Label>
                  <Input 
                    id="reg-passwordConfirm" 
                    type="password" 
                    required 
                    value={registerData.passwordConfirm}
                    onChange={handleRegisterChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "*Регистрация..." : "Зарегистрироваться"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500">
            Продолжая, вы соглашаетесь с <a href="#" className="text-primary hover:underline">Условиями использования</a> и <a href="#" className="text-primary hover:underline">Политикой конфиденциальности</a>.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;