export const eventCategories = [
  {
    id: 'vivencias',
    label: 'Vivências',
    eyebrow: 'Encontros presenciais',
    title: 'Vivências',
    summary: 'Rodas, práticas e experiências sensíveis para mulheres que desejam presença, troca e reconexão.',
    image: 'photo-vivencia.png',
  },
  {
    id: 'retiros-viagens',
    label: 'Retiros e viagens',
    eyebrow: 'Imersões Lumine',
    title: 'Retiros e viagens',
    summary: 'Pausas mais profundas, deslocamentos e imersões criadas para viver cuidado com tempo e beleza.',
    image: 'photo-retiro.png',
  },
];

export const eventOptions = [
  {
    id: 'vivencia-paranavai',
    category: 'vivencias',
    location: 'Paranavaí',
    title: 'Vivência de reconexão',
    summary: 'Um encontro com roda de conversa, práticas de presença e criação sensível.',
    image: 'photo-vivencia.png',
    link: '',
  },
  {
    id: 'vivencia-sao-paulo',
    category: 'vivencias',
    location: 'São Paulo',
    title: 'Vivência urbana',
    summary: 'Uma pausa no ritmo da cidade para respirar, se escutar e voltar para si.',
    image: 'photo-retiro.png',
    link: '',
  },
  {
    id: 'retiro-paranavai',
    category: 'retiros-viagens',
    location: 'Paranavaí',
    title: 'Retiro de fim de semana',
    summary: 'Uma imersão curta com práticas guiadas, cuidado coletivo e reconexão interna.',
    image: 'photo-vivencia.png',
    link: '',
  },
  {
    id: 'viagem-sao-paulo',
    category: 'retiros-viagens',
    location: 'São Paulo',
    title: 'Imersão e viagem',
    summary: 'Experiência aprofundada para mulheres que desejam ampliar presença e clareza.',
    image: 'photo-retiro.png',
    link: '',
  },
];

export function getEventCategory(categoryId) {
  return eventCategories.find((item) => item.id === categoryId) ?? eventCategories[0];
}
