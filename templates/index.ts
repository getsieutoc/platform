import { generate as generate_blender } from './blender';
import { generate as generate_plausible } from './plausible';
import { generate as generate_taijutsu } from './taijutsu';

const templates = [
  {
    slug: 'blender',
    title: 'Blender',
    generate: generate_blender,
  },
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
