import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface City {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  attractions: Attraction[];
}

interface Attraction {
  id: number;
  name: string;
  description: string;
  rating: number;
}

interface Route {
  id: number;
  title: string;
  duration: string;
  cities: string[];
  description: string;
}

interface Review {
  id: number;
  author: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

const cities: City[] = [
  {
    id: 1,
    name: 'Москва',
    description: 'Столица России с богатой историей и современной архитектурой',
    image: 'https://cdn.poehali.dev/projects/b5d62a1e-3ad4-4d64-aa6e-780b63479560/files/0bc26a70-b721-428e-be4f-eab7e6c27290.jpg',
    rating: 4.8,
    reviewsCount: 1240,
    attractions: [
      { id: 1, name: 'Красная площадь', description: 'Сердце Москвы и символ России', rating: 4.9 },
      { id: 2, name: 'Кремль', description: 'Исторический комплекс и резиденция президента', rating: 4.8 },
      { id: 3, name: 'Третьяковская галерея', description: 'Крупнейший музей русского искусства', rating: 4.7 }
    ]
  },
  {
    id: 2,
    name: 'Санкт-Петербург',
    description: 'Культурная столица с дворцами и музеями мирового класса',
    image: 'https://cdn.poehali.dev/projects/b5d62a1e-3ad4-4d64-aa6e-780b63479560/files/ea9a9c84-a2bf-4e60-a984-3f2c44fad88e.jpg',
    rating: 4.9,
    reviewsCount: 980,
    attractions: [
      { id: 4, name: 'Эрмитаж', description: 'Один из крупнейших музеев мира', rating: 5.0 },
      { id: 5, name: 'Петергоф', description: 'Дворцово-парковый ансамбль с фонтанами', rating: 4.8 },
      { id: 6, name: 'Исаакиевский собор', description: 'Величественный православный храм', rating: 4.7 }
    ]
  },
  {
    id: 3,
    name: 'Казань',
    description: 'Город двух культур с уникальным архитектурным наследием',
    image: 'https://cdn.poehali.dev/projects/b5d62a1e-3ad4-4d64-aa6e-780b63479560/files/2774f05a-b937-4e6b-9398-e3da7644030b.jpg',
    rating: 4.7,
    reviewsCount: 540,
    attractions: [
      { id: 7, name: 'Казанский Кремль', description: 'Объект Всемирного наследия ЮНЕСКО', rating: 4.9 },
      { id: 8, name: 'Мечеть Кул-Шариф', description: 'Главная мечеть Татарстана', rating: 4.8 },
      { id: 9, name: 'Храм всех религий', description: 'Уникальный архитектурный комплекс', rating: 4.6 }
    ]
  },
  {
    id: 4,
    name: 'Сочи',
    description: 'Курортная столица России на берегу Чёрного моря',
    image: 'https://cdn.poehali.dev/projects/b5d62a1e-3ad4-4d64-aa6e-780b63479560/files/b99ff616-de0a-4f13-8d9d-eca169448780.jpg',
    rating: 4.6,
    reviewsCount: 820,
    attractions: [
      { id: 10, name: 'Олимпийский парк', description: 'Наследие зимней Олимпиады 2014 года', rating: 4.7 },
      { id: 11, name: 'Роза Хутор', description: 'Горнолыжный курорт мирового класса', rating: 4.8 },
      { id: 12, name: 'Дендрарий', description: 'Уникальный ботанический парк', rating: 4.5 }
    ]
  },
  {
    id: 5,
    name: 'Владивосток',
    description: 'Ворота на Дальний Восток с живописными видами на бухту',
    image: 'https://cdn.poehali.dev/projects/b5d62a1e-3ad4-4d64-aa6e-780b63479560/files/30c9a15e-55a9-4f7c-81a1-d816e321e146.jpg',
    rating: 4.5,
    reviewsCount: 380,
    attractions: [
      { id: 13, name: 'Золотой мост', description: 'Символ города и инженерное чудо', rating: 4.8 },
      { id: 14, name: 'Русский мост', description: 'Один из крупнейших вантовых мостов', rating: 4.7 },
      { id: 15, name: 'Набережная Цесаревича', description: 'Прогулочная зона с видом на бухту', rating: 4.6 }
    ]
  }
];

const routes: Route[] = [
  {
    id: 1,
    title: 'Золотое кольцо',
    duration: '5-7 дней',
    cities: ['Сергиев Посад', 'Переславль-Залесский', 'Ростов Великий', 'Ярославль', 'Суздаль', 'Владимир'],
    description: 'Классический маршрут по древним русским городам с уникальными памятниками архитектуры'
  },
  {
    id: 2,
    title: 'Две столицы',
    duration: '7-10 дней',
    cities: ['Москва', 'Санкт-Петербург'],
    description: 'Знакомство с главными достопримечательностями Москвы и Петербурга'
  },
  {
    id: 3,
    title: 'По Волге',
    duration: '10-14 дней',
    cities: ['Нижний Новгород', 'Казань', 'Ульяновск', 'Самара', 'Волгоград', 'Астрахань'],
    description: 'Путешествие вдоль великой реки с посещением исторических городов'
  }
];

const tips = [
  {
    id: 1,
    title: 'Документы и виза',
    icon: 'FileText',
    content: 'Для граждан России внутренний паспорт обязателен. Иностранцам может потребоваться виза и миграционный учёт.'
  },
  {
    id: 2,
    title: 'Лучшее время для поездки',
    icon: 'Calendar',
    content: 'Май-сентябрь — идеальное время. Белые ночи в Петербурге (июнь-июль). Золотая осень в средней полосе (сентябрь).'
  },
  {
    id: 3,
    title: 'Транспорт',
    icon: 'Train',
    content: 'Развитая сеть железных дорог. Скоростные поезда между крупными городами. Метро в больших городах.'
  },
  {
    id: 4,
    title: 'Язык',
    icon: 'Languages',
    content: 'Русский язык. В туристических местах есть англоговорящий персонал. Полезно выучить базовые фразы.'
  },
  {
    id: 5,
    title: 'Валюта',
    icon: 'Wallet',
    content: 'Российский рубль (₽). Карты принимают везде. Наличные полезны в небольших городах.'
  },
  {
    id: 6,
    title: 'Связь и интернет',
    icon: 'Wifi',
    content: 'Мобильные операторы: МТС, Билайн, Мегафон. Wi-Fi в отелях и кафе. Можно купить сим-карту туриста.'
  }
];

const reviews: Review[] = [
  {
    id: 1,
    author: 'Анна Петрова',
    city: 'Санкт-Петербург',
    rating: 5,
    text: 'Невероятный город! Эрмитаж поразил своими коллекциями, гуляли по Невскому до поздней ночи. Обязательно вернёмся!',
    date: '15 октября 2024'
  },
  {
    id: 2,
    author: 'Дмитрий Козлов',
    city: 'Москва',
    rating: 5,
    text: 'Красная площадь, Кремль, парк Зарядье — всё на высшем уровне. Город живой и динамичный, есть что посмотреть.',
    date: '3 ноября 2024'
  },
  {
    id: 3,
    author: 'Елена Смирнова',
    city: 'Казань',
    rating: 4,
    text: 'Очень понравился Кремль и мечеть Кул-Шариф. Кухня потрясающая! Немного не хватило времени на все музеи.',
    date: '28 сентября 2024'
  }
];

export default function Index() {
  const [newReview, setNewReview] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState(5);

  const handleSubmitReview = () => {
    if (newReview.trim() && selectedCity) {
      alert('Спасибо за ваш отзыв! (В реальном приложении отзыв будет сохранён)');
      setNewReview('');
      setSelectedCity('');
      setSelectedRating(5);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-4 border-primary bg-card shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Map" size={36} className="text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                Путеводитель по России
              </h1>
            </div>
            <Badge variant="secondary" className="hidden md:block text-base px-4 py-2">
              Откройте страну заново
            </Badge>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-b from-accent/30 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Исследуйте красоту России
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Древние города, величественные храмы, уникальные музеи и незабываемые впечатления. 
              Ваше путешествие по самой большой стране мира начинается здесь.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="cities" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2">
            <TabsTrigger value="cities" className="text-base py-3">
              <Icon name="Building2" size={20} className="mr-2" />
              Города
            </TabsTrigger>
            <TabsTrigger value="routes" className="text-base py-3">
              <Icon name="Route" size={20} className="mr-2" />
              Маршруты
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-base py-3">
              <Icon name="Lightbulb" size={20} className="mr-2" />
              Советы
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-base py-3">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Отзывы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cities" className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary mb-3">Популярные города</h3>
              <p className="text-muted-foreground text-lg">Выберите направление для путешествия</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Card key={city.id} className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={city.image} 
                      alt={city.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-2xl text-primary">{city.name}</CardTitle>
                      <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded">
                        <Icon name="Star" size={16} className="fill-secondary text-secondary" />
                        <span className="font-bold text-secondary">{city.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="text-base">{city.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <Icon name="Users" size={14} className="inline mr-1" />
                        {city.reviewsCount} отзывов
                      </p>
                    </div>
                    
                    <Accordion type="single" collapsible>
                      <AccordionItem value="attractions" className="border-none">
                        <AccordionTrigger className="text-base font-semibold hover:text-primary">
                          Достопримечательности ({city.attractions.length})
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pt-2">
                            {city.attractions.map((attraction) => (
                              <div key={attraction.id} className="border-l-2 border-accent pl-3 py-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-foreground">{attraction.name}</h4>
                                  <div className="flex items-center gap-1">
                                    <Icon name="Star" size={12} className="fill-secondary text-secondary" />
                                    <span className="text-sm font-medium">{attraction.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{attraction.description}</p>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary mb-3">Популярные маршруты</h3>
              <p className="text-muted-foreground text-lg">Готовые маршруты для путешествий</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route) => (
                <Card key={route.id} className="border-2 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-3 mb-2">
                      <Icon name="MapPin" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <CardTitle className="text-2xl text-primary mb-2">{route.title}</CardTitle>
                        <Badge variant="outline" className="text-base">
                          <Icon name="Clock" size={14} className="mr-1" />
                          {route.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {route.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-3 text-foreground">Города маршрута:</h4>
                    <div className="flex flex-wrap gap-2">
                      {route.cities.map((city, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary mb-3">Советы путешественникам</h3>
              <p className="text-muted-foreground text-lg">Полезная информация для поездки</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip) => (
                <Card key={tip.id} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={tip.icon as any} size={24} className="text-primary" />
                      </div>
                      <CardTitle className="text-xl">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{tip.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary mb-3">Отзывы путешественников</h3>
              <p className="text-muted-foreground text-lg">Делитесь впечатлениями о поездках</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {reviews.map((review) => (
                <Card key={review.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-xl mb-1">{review.author}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          <Icon name="MapPin" size={14} className="inline mr-1" />
                          {review.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-secondary/20 px-3 py-1 rounded">
                        <Icon name="Star" size={16} className="fill-secondary text-secondary" />
                        <span className="font-bold text-secondary">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} className="inline mr-1" />
                      {review.date}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary/20 bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Оставьте свой отзыв</CardTitle>
                <CardDescription>Поделитесь впечатлениями о вашем путешествии</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Выберите город</label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 border-2 rounded-md bg-background text-foreground"
                  >
                    <option value="">-- Выберите город --</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Оценка</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className="p-2 hover:scale-110 transition-transform"
                      >
                        <Icon 
                          name="Star" 
                          size={24} 
                          className={selectedRating >= rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ваш отзыв</label>
                  <Textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Расскажите о своих впечатлениях..."
                    rows={5}
                    className="resize-none border-2"
                  />
                </div>

                <Button 
                  onClick={handleSubmitReview}
                  size="lg"
                  className="w-full text-base"
                  disabled={!newReview.trim() || !selectedCity}
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить отзыв
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t-4 border-primary bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl text-primary mb-3">О проекте</h3>
              <p className="text-muted-foreground">
                Путеводитель по самым интересным городам и маршрутам России. 
                Откройте страну заново!
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl text-primary mb-3">Контакты</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <Icon name="Mail" size={16} className="inline mr-2" />
                  info@russia-guide.ru
                </p>
                <p>
                  <Icon name="Phone" size={16} className="inline mr-2" />
                  +7 (495) 123-45-67
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xl text-primary mb-3">Соцсети</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-muted-foreground">
            <p>© 2024 Путеводитель по России. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}