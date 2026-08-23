export type DemoProduct = {
  id: number;
  title: string;
  handle: string;
  category: string;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
  photoCount: number;
  tags: string[];
};

export const products: DemoProduct[] = [
  { id: 1, title: "Ímã Personalizado com Foto", handle: "ima-personalizado-com-foto", category: "Ímã Personalizado", description: "Transforme uma foto especial em um ímã de alta qualidade para guardar seus melhores momentos.", price: 9.9, image: "products/prod-single.jpg", photoCount: 1, tags: ["destaque", "personalizado"] },
  { id: 2, title: "Combo 6 Ímãs Personalizados", handle: "combo-6-imas-personalizados", category: "Combo Personalizado", description: "Seis memórias impressas com cores vivas e acabamento resistente.", price: 49.9, compareAt: 59.4, image: "products/prod-combo6.jpg", photoCount: 6, tags: ["combo", "foto"] },
  { id: 3, title: "Combo 12 Ímãs Personalizados", handle: "combo-12-imas-personalizados", category: "Combo Personalizado", description: "O combo mais pedido para montar um mural cheio de memórias.", price: 89.9, compareAt: 118.8, image: "products/prod-combo12.jpg", photoCount: 12, tags: ["destaque", "combo"] },
  { id: 4, title: "Combo 24 Ímãs Personalizados", handle: "combo-24-imas-personalizados", category: "Combo Personalizado", description: "Vinte e quatro fotos para eternizar uma coleção completa de momentos.", price: 159.9, compareAt: 237.6, image: "products/prod-combo24.jpg", photoCount: 24, tags: ["combo", "economia"] },
  { id: 5, title: "Combo Temático Magia & Bruxaria", handle: "combo-tematico-magia-bruxaria", category: "Combo Temático", description: "Kit ilustrado inspirado em um universo de magia, poções e aventuras.", price: 59.9, image: "products/prod-harry.jpg", photoCount: 0, tags: ["temático", "presente"] },
  { id: 6, title: "Combo Temático Amigos Para Sempre", handle: "combo-tematico-amigos", category: "Combo Temático", description: "Um kit divertido para fãs da série de amigos mais querida dos anos 90.", price: 59.9, image: "products/prod-friends.jpg", photoCount: 0, tags: ["temático", "fãs"] },
  { id: 7, title: "Combo Temático Mundo Invertido", handle: "combo-tematico-mundo-invertido", category: "Combo Temático", description: "Mistério, neon e referências dos anos 80 em seis ímãs colecionáveis.", price: 59.9, image: "products/prod-stranger.jpg", photoCount: 0, tags: ["temático", "coleção"] },
  { id: 8, title: "Combo 8 Ímãs Polaroid", handle: "combo-8-imas-polaroid", category: "Combo Personalizado", description: "Suas fotos em formato retrô com a clássica borda branca.", price: 64.9, compareAt: 79.2, image: "products/prod-polaroid.jpg", photoCount: 8, tags: ["polaroid", "personalizado"] }
];

export const orders = [
  { id: "FIS-1048", customer: "Mariana Costa", email: "mariana.demo@email.com", date: "19/08/2026", total: 109.7, payment: "Pago", status: "Em produção", items: 2 },
  { id: "FIS-1047", customer: "Lucas Ribeiro", email: "lucas.demo@email.com", date: "19/08/2026", total: 74.8, payment: "Pago", status: "A enviar", items: 1 },
  { id: "FIS-1046", customer: "Camila Santos", email: "camila.demo@email.com", date: "18/08/2026", total: 169.8, payment: "Pago", status: "Enviado", items: 2 },
  { id: "FIS-1045", customer: "Rafael Oliveira", email: "rafael.demo@email.com", date: "18/08/2026", total: 59.9, payment: "Pendente", status: "Aguardando", items: 1 },
  { id: "FIS-1044", customer: "Beatriz Lima", email: "beatriz.demo@email.com", date: "17/08/2026", total: 98.9, payment: "Pago", status: "Entregue", items: 2 },
  { id: "FIS-1043", customer: "André Martins", email: "andre.demo@email.com", date: "16/08/2026", total: 49.9, payment: "Pago", status: "Entregue", items: 1 }
];

export const visitorsByDay = [
  { day: "13/08", visitors: 42, views: 96 }, { day: "14/08", visitors: 58, views: 132 },
  { day: "15/08", visitors: 51, views: 119 }, { day: "16/08", visitors: 74, views: 181 },
  { day: "17/08", visitors: 69, views: 166 }, { day: "18/08", visitors: 91, views: 228 },
  { day: "19/08", visitors: 108, views: 279 }
];

export const customers = [
  { name: "Mariana Costa", email: "mariana.demo@email.com", phone: "(11) 99999-1048", orders: 3, spent: 289.4 },
  { name: "Camila Santos", email: "camila.demo@email.com", phone: "(21) 98888-2046", orders: 2, spent: 239.7 },
  { name: "Beatriz Lima", email: "beatriz.demo@email.com", phone: "(31) 97777-1044", orders: 2, spent: 158.8 },
  { name: "Lucas Ribeiro", email: "lucas.demo@email.com", phone: "(41) 96666-1047", orders: 1, spent: 74.8 }
];
