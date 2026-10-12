import type { Product } from '@/types';

/**
 * Chronos Relojoaria — dataset fictício.
 * Todos os modelos, referências e especificações abaixo são inventados para
 * fins de demonstração. Não representam relógios de marcas reais.
 */

const IMG = (id: string): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`;

export const WATCHES: Product[] = [
  {
    id: 'w-001',
    slug: 'chronos-heritage-1958',
    name: 'Chronos Heritage 1958',
    reference: 'CHR-HR-1958',
    category: 'classico',
    price: 18900,
    shortDescription: 'Relógio de vestir de inspiração vintage com caixa em aço polido.',
    description:
      'Uma homenagem à tradição relojoeira do meio do século. Caixa em aço inoxidável ' +
      'polido, mostrador marfim com ponteiros tipo folha e pequenos segundos às 6h. ' +
      'Uma peça pensada para ser usada por décadas.',
    images: [
      IMG('1523170335258-f5ed11844a49'),
      IMG('1547996160-81dfa63595aa'),
      IMG('1524805444758-089113d48a6d'),
    ],
    specs: {
      movement: 'manual',
      movementLabel: 'Corda manual Chronos Calibre C-01, 42h de reserva',
      caseMaterial: 'Aço inoxidável polido',
      strapMaterial: 'Couro de bezerro marrom',
      caseDiameter: '38 mm',
      waterResistance: '50 m',
    },
    featured: true,
    stock: 6,
  },
  {
    id: 'w-002',
    slug: 'chronos-meridian-gmt',
    name: 'Chronos Meridian GMT',
    reference: 'CHR-MR-GMT',
    category: 'esportivo',
    price: 32500,
    shortDescription: 'Relógio de viagem com função GMT e bracelete integrado.',
    description:
      'Projetado para quem cruza fusos horários. Mostrador azul-noite com indicação ' +
      'GMT em aro de 24 horas, bracelete em aço escovado e movimento automático de ' +
      'alta precisão. Combina com uma camisa ou com um jeans.',
    images: [
      IMG('1622434641406-a158123450f9'),
      IMG('1533139502658-0198f920d8e8'),
      IMG('1508138221679-760a23a2285b'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-02 GMT, 60h de reserva',
      caseMaterial: 'Aço inoxidável escovado',
      strapMaterial: 'Bracelete de aço',
      caseDiameter: '40 mm',
      waterResistance: '100 m',
    },
    featured: true,
    stock: 4,
  },
  {
    id: 'w-003',
    slug: 'chronos-aurora-moonphase',
    name: 'Chronos Aurora Moonphase',
    reference: 'CHR-AU-MPH',
    category: 'classico',
    price: 68000,
    shortDescription: 'Fase da lua em esmalte feito à mão sobre mostrador azul profundo.',
    description:
      'Uma das peças mais elaboradas da coleção. O disco de fase da lua é executado ' +
      'em esmalte grand feu por um artesão dedicado, e o mostrador em laca azul ' +
      'profunda é polido em doze etapas. Caixa em ouro amarelo 18k.',
    images: [
      IMG('1495856455881-7d1e28b03a33'),
      IMG('1594534475808-b18fc33b045e'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-07 Moonphase, 48h de reserva',
      caseMaterial: 'Ouro amarelo 18k',
      strapMaterial: 'Couro de aligátor azul',
      caseDiameter: '39 mm',
      waterResistance: '30 m',
    },
    featured: true,
    stock: 2,
  },
  {
    id: 'w-004',
    slug: 'chronos-regatta-diver',
    name: 'Chronos Regatta Diver',
    reference: 'CHR-RG-300',
    category: 'mergulho',
    price: 24500,
    shortDescription: 'Relógio de mergulho com resistência a 300 metros.',
    description:
      'Construído para o fundo do mar. Aro giratório unidirecional com inserto cerâmico, ' +
      'coroa rosqueada e mostrador preto fosco com marcadores em Super-LumiNova. ' +
      'Certificado para mergulho profissional (demonstração).',
    images: [
      IMG('1611591437281-460bfbe1220a'),
      IMG('1587836374828-4dbafa94cf0e'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-04, 70h de reserva',
      caseMaterial: 'Aço inoxidável escovado',
      strapMaterial: 'Borracha preta',
      caseDiameter: '42 mm',
      waterResistance: '300 m',
    },
    featured: true,
    stock: 8,
  },
  {
    id: 'w-005',
    slug: 'chronos-eclipse-skeleton',
    name: 'Chronos Eclipse Skeleton',
    reference: 'CHR-EC-SKL',
    category: 'classico',
    price: 45000,
    shortDescription: 'Movimento esqueletizado à vista, com acabamento manual.',
    description:
      'Um exercício de transparência mecânica. As pontes do movimento foram ' +
      'cuidadosamente esqueletizadas e anguladas à mão, revelando as engrenagens ' +
      'em constante movimento. Uma peça para quem aprecia micro-mecânica.',
    images: [
      IMG('1610375461246-83df859d849d'),
      IMG('1627293622304-21b0b0e1e4b0'),
    ],
    specs: {
      movement: 'manual',
      movementLabel: 'Corda manual Chronos Calibre C-08 Skeleton, 60h de reserva',
      caseMaterial: 'Aço inoxidável polido',
      strapMaterial: 'Couro de vitelo preto',
      caseDiameter: '41 mm',
      waterResistance: '30 m',
    },
    featured: false,
    stock: 3,
  },
  {
    id: 'w-006',
    slug: 'chronos-terra-field',
    name: 'Chronos Terra Field',
    reference: 'CHR-TR-FLD',
    category: 'esportivo',
    price: 8900,
    shortDescription: 'Relógio de campo com mostrador legível e pulseira em lona.',
    description:
      'Inspirado em relógios militares de campo. Mostrador preto de alta legibilidade, ' +
      'numeração grande e pulseira em lona com fivela em aço. Uma companhia confiável ' +
      'para o dia a dia.',
    images: [
      IMG('1523170335258-f5ed11844a49'),
      IMG('1524805444758-089113d48a6d'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-03, 40h de reserva',
      caseMaterial: 'Aço inoxidável fosco',
      strapMaterial: 'Lona verde-oliva',
      caseDiameter: '39 mm',
      waterResistance: '100 m',
    },
    featured: false,
    stock: 15,
  },
  {
    id: 'w-007',
    slug: 'chronos-astral-chronograph',
    name: 'Chronos Astral Chronograph',
    reference: 'CHR-AS-CHR',
    category: 'cronografo',
    price: 38000,
    shortDescription: 'Cronógrafo bicompax com mostrador prateado e contadores azuis.',
    description:
      'Um cronógrafo clássico de inspiração anos 1960. Dois contadores em azul ' +
      'cobalto sobre mostrador prateado opalino, ponteiros em aço azulado e ' +
      'escala taquimétrica gravada no aro.',
    images: [
      IMG('1508138221679-760a23a2285b'),
      IMG('1533139502658-0198f920d8e8'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-05 Chrono, 55h de reserva',
      caseMaterial: 'Aço inoxidável polido',
      strapMaterial: 'Couro de bezerro preto',
      caseDiameter: '41 mm',
      waterResistance: '50 m',
    },
    featured: true,
    stock: 5,
  },
  {
    id: 'w-008',
    slug: 'chronos-noir-ceramic',
    name: 'Chronos Noir Ceramic',
    reference: 'CHR-NR-CRM',
    category: 'esportivo',
    price: 42500,
    shortDescription: 'Caixa em cerâmica preta com bracelete integrado.',
    description:
      'Uma abordagem contemporânea do esportivo de luxo. Caixa e bracelete ' +
      'esculpidos em cerâmica preta de alta densidade, o que garante leveza e ' +
      'resistência a riscos. Movimento automático de manufatura.',
    images: [
      IMG('1587836374828-4dbafa94cf0e'),
      IMG('1611591437281-460bfbe1220a'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-06, 65h de reserva',
      caseMaterial: 'Cerâmica preta',
      strapMaterial: 'Cerâmica integrada',
      caseDiameter: '42 mm',
      waterResistance: '200 m',
    },
    featured: false,
    stock: 3,
  },
  {
    id: 'w-009',
    slug: 'chronos-camille',
    name: 'Chronos Camille',
    reference: 'CHR-CM-032',
    category: 'classico',
    price: 12900,
    shortDescription: 'Relógio feminino em ouro amarelo com mostrador marfim.',
    description:
      'Um clássico atemporal em proporções reduzidas. Caixa em ouro amarelo 18k ' +
      'de 32 mm, mostrador marfim com índices aplicados e pulseira em couro de ' +
      'aligátor. Quartzo de alta precisão para uso descomplicado.',
    images: [
      IMG('1622434641406-a158123450f9'),
      IMG('1495856455881-7d1e28b03a33'),
    ],
    specs: {
      movement: 'quartzo',
      movementLabel: 'Quartzo suíço, precisão ±10s/mês',
      caseMaterial: 'Ouro amarelo 18k',
      strapMaterial: 'Couro de aligátor marrom',
      caseDiameter: '32 mm',
      waterResistance: '30 m',
    },
    featured: false,
    stock: 9,
  },
  {
    id: 'w-010',
    slug: 'chronos-sport-titanium',
    name: 'Chronos Sport Titanium',
    reference: 'CHR-SP-TI',
    category: 'esportivo',
    price: 28900,
    shortDescription: 'Titânio grau 5 com bracelete integrado de baixo peso.',
    description:
      'Pensado para o uso diário sem concessões. Caixa e bracelete em titânio ' +
      'grau 5 com acabamento escovado, o que reduz o peso em cerca de 40% em ' +
      'relação ao aço equivalente.',
    images: [
      IMG('1533139502658-0198f920d8e8'),
      IMG('1508138221679-760a23a2285b'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-02, 60h de reserva',
      caseMaterial: 'Titânio grau 5 escovado',
      strapMaterial: 'Bracelete de titânio',
      caseDiameter: '42 mm',
      waterResistance: '200 m',
    },
    featured: false,
    stock: 6,
  },
  {
    id: 'w-011',
    slug: 'chronos-vintage-revival',
    name: 'Chronos Vintage Revival',
    reference: 'CHR-VR-RVL',
    category: 'classico',
    price: 22000,
    shortDescription: 'Releitura contemporânea de um relógio dos anos 1940.',
    description:
      'Algarismos árabes, mostrador creme envelhecido por processo controlado e ' +
      'ponteiros em aço azulado. Um relógio que carrega a memória do pós-guerra ' +
      'com a confiabilidade da relojoaria atual.',
    images: [
      IMG('1547996160-81dfa63595aa'),
      IMG('1523170335258-f5ed11844a49'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-01, 42h de reserva',
      caseMaterial: 'Aço inoxidável polido',
      strapMaterial: 'Couro de bezerro marrom',
      caseDiameter: '38 mm',
      waterResistance: '50 m',
    },
    featured: false,
    stock: 7,
  },
  {
    id: 'w-012',
    slug: 'chronos-nautique-steel',
    name: 'Chronos Nautique Steel',
    reference: 'CHR-NQ-STL',
    category: 'esportivo',
    price: 35500,
    shortDescription: 'Esportivo de luxo com bracelete integrado e mostrador azul.',
    description:
      'Silhueta esportiva com bracelete integrado à caixa e mostrador azul ' +
      'com acabamento em raios de sol. Uma peça que transita com elegância ' +
      'entre o escritório e o fim de semana.',
    images: [
      IMG('1610375461246-83df859d849d'),
      IMG('1627293622304-21b0b0e1e4b0'),
    ],
    specs: {
      movement: 'automatico',
      movementLabel: 'Automático Chronos Calibre C-02, 60h de reserva',
      caseMaterial: 'Aço inoxidável polido',
      strapMaterial: 'Bracelete de aço integrado',
      caseDiameter: '41 mm',
      waterResistance: '100 m',
    },
    featured: true,
    stock: 5,
  },
];
