import { generate as generate_plausible } from './plausible';
import { generate as generate_taijutsu } from './taijutsu';

const templates = [
  {
    slug: 'plausible',
    title: 'Plausible Analytics',
    generate: generate_plausible,
  },
  {
    slug: 'taijutsu',
    title: 'Taijutsu Stack',
    generate: generate_taijutsu,
  },
];

export { templates };
