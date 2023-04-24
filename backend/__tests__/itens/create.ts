import Item from '../../src/db/models/Item'

const mock = [
  {
    "name": "Café Expresso",
    "price": 3.50,
    "description": "Um café forte e encorpado, perfeito para começar o dia.",
    "menu": true,
    "category": "Café"
  },
  {
    "name": "Café com Leite",
    "price": 4.50,
    "description": "Uma mistura cremosa de café e leite, ideal para quem gosta de um sabor suave.",
    "menu": true,
    "category": "Café"
  },
  {
    "name": "Cappuccino",
    "price": 5.50,
    "description": "Um clássico italiano feito com café, leite vaporizado e espuma de leite.",
    "menu": true,
    "category": "Café"
  },
  {
    "name": "Mocha",
    "price": 6.00,
    "description": "Uma deliciosa combinação de café, chocolate e leite vaporizado.",
    "menu": true,
    "category": "Café"
  },
  {
    "name": "Chá Verde",
    "price": 4.00,
    "description": "Um chá leve e refrescante, rico em antioxidantes e nutrientes.",
    "menu": true,
    "category": "Chá"
  },
  {
    "name": "Chá de Camomila",
    "price": 4.00,
    "description": "Um chá suave e reconfortante, perfeito para relaxar.",
    "menu": true,
    "category": "Chá"
  },
  {
    "name": "Chá de Hortelã",
    "price": 4.00,
    "description": "Um chá refrescante e revigorante, ótimo para aliviar a digestão.",
    "menu": true,
    "category": "Chá"
  },
  {
    "name": "Suco de Laranja",
    "price": 5.00,
    "description": "Um suco natural e nutritivo, rico em vitamina C.",
    "menu": true,
    "category": "Suco"
  },
  {
    "name": "Suco de Abacaxi",
    "price": 5.00,
    "description": "Um suco tropical e refrescante, ideal para dias quentes.",
    "menu": true,
    "category": "Suco"
  },
  {
    "name": "Suco de Limão",
    "price": 5.00,
    "description": "Um suco cítrico e energizante, perfeito para dar um up no seu dia.",
    "menu": true,
    "category": "Suco"
  },
  {
    "name": "Sanduíche de Presunto e Queijo",
    "price": 7.50,
    "description": "Um clássico dos cafés, feito com pão, presunto e queijo.",
    "menu": true,
    "category": "Sanduíche"
  }
]

Item.create({ data: mock })