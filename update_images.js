const fs = require('fs');
const file = '/Users/pragad-7957/Documents/SculptureStore/lib/data.ts';
let data = fs.readFileSync(file, 'utf8');

const replacements = [
  {
    find: `    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&q=80',
    ],`,
    replace: `    image: '/images/products/ganesha-blessing.png',
    images: ['/images/products/ganesha-blessing.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&q=80'],`,
    replace: `    image: '/images/products/shiva-nataraja.png',
    images: ['/images/products/shiva-nataraja.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1619847563180-6aea4dd2ea28?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1619847563180-6aea4dd2ea28?w=600&q=80'],`,
    replace: `    image: '/images/products/lakshmi-prosperity.png',
    images: ['/images/products/lakshmi-prosperity.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80'],`,
    replace: `    image: '/images/products/buddha-meditating.png',
    images: ['/images/products/buddha-meditating.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],`,
    replace: `    image: '/images/products/apj-kalam-monument.png',
    images: ['/images/products/apj-kalam-monument.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80'],`,
    replace: `    image: '/images/products/ganesha-dashboard.png',
    images: ['/images/products/ganesha-dashboard.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&q=80'],`,
    replace: `    image: '/images/products/custom-portrait.png',
    images: ['/images/products/custom-portrait.png'],`
  },
  {
    find: `    image: 'https://images.unsplash.com/photo-1609609861234-fd1a3c0e0e8e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1609609861234-fd1a3c0e0e8e?w=600&q=80'],`,
    replace: `    image: '/images/products/temple-gopuram.png',
    images: ['/images/products/temple-gopuram.png'],`
  }
];

replacements.forEach(r => {
  data = data.replace(r.find, r.replace);
});

// Also update the category images while we're at it if any match
data = data.replace(
  `    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&q=80',`,
  `    image: '/images/products/ganesha-blessing.png',`
);
data = data.replace(
  `    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',`,
  `    image: '/images/products/apj-kalam-monument.png',`
);
data = data.replace(
  `    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',`,
  `    image: '/images/products/ganesha-dashboard.png',`
);
data = data.replace(
  `    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',`,
  `    image: '/images/products/custom-portrait.png',`
);

fs.writeFileSync(file, data);
console.log('Images updated successfully in lib/data.ts');
