// Editable demo catalog. Appearance descriptions do not verify materials or plating.
export const products = [
  {
    id: "pearl-drop-earrings",
    description: "A floral silhouette with pearl-style drops and a warm gold-tone appearance. An artificial jewellery concept for festive outfits and traditional looks.",
    style: "Floral drops",
    occasion: "Festive",
    tags: ["artificial","imitation","fashion","floral","drops","traditional","festive","pearl"],
    name: "Floral Pearl-Style Earrings",
    category: "Earrings",
    price: 699,
    image: "/images/earrings-demo.png",
    alt: "Artificial jewellery concept: gold-tone floral earrings with pearl-style drops",
    note: "A little something lovely",
  },
  {
    id: "everyday-pendant",
    description: "A delicate floral pendant with pearl-style accents and a gold-tone appearance. An artificial jewellery concept for everyday styling and gifting inspiration.",
    style: "Pendant necklace",
    occasion: "Everyday",
    tags: ["artificial","imitation","fashion","floral","pendant","everyday","gifting","pearl"],
    name: "Pearl-Style Floral Pendant",
    category: "Necklaces",
    price: 899,
    image: "/images/pendant-demo.png",
    alt: "Artificial jewellery concept: gold-tone chain with a pearl-style floral pendant",
    note: "Made for every day",
  },
  {
    id: "classic-gold-bangles",
    description: "Decorative bangles with floral motifs and a gold-tone appearance. An artificial jewellery concept for traditional and festive styling.",
    style: "Decorative bangles",
    occasion: "Festive",
    tags: ["artificial","imitation","fashion","bangles","traditional","festive","gold tone"],
    name: "Classic Gold-Tone Bangles",
    category: "Bangles",
    price: 1199,
    image: "/images/bangles-demo.png",
    alt: "Artificial jewellery concept: decorative gold-tone bangles",
    note: "An old favourite, anew",
  },
  {
    id: "pearl-twist-ring",
    description: "A floral statement silhouette with a pearl-style centre and gold-tone appearance. An artificial jewellery concept for adding a playful finishing touch.",
    style: "Floral statement ring",
    occasion: "Everyday",
    tags: ["artificial","imitation","fashion","floral","ring","everyday","pearl"],
    name: "Floral Pearl-Style Ring",
    category: "Rings",
    price: 549,
    image: "/images/ring-demo.png",
    alt: "Artificial jewellery concept: floral gold-tone ring with a pearl-style centre",
    note: "The finishing touch",
  },
];

export const categories = [
  { name: "Earrings", image: "/images/earrings-demo.png", alt: "Artificial pearl-style drop earrings" },
  { name: "Necklaces", image: "/images/pendant-demo.png", alt: "Artificial pearl-style pendant necklace" },
  { name: "Bangles", image: "/images/bangles-demo.png", alt: "Gold-tone artificial bangles" },
  { name: "Rings", image: "/images/ring-demo.png", alt: "Gold-tone artificial ring with pearl-style detail" },
];

export const matchesProduct = (product, query) => {
 const text = [product.name, product.category, product.style, product.occasion, ...(product.tags || [])].join(" ").toLowerCase();
 return query.trim().toLowerCase().split(/\s+/).filter(Boolean).every(word => text.includes(word));
};
export const curatedCollections = {
 Bestsellers: { title: 'The Favourites Edit', caption: 'Little statements. Lasting impressions.', note: 'Demo bestseller selection — not based on sales data.', ids: ['pearl-drop-earrings', 'classic-gold-bangles', 'everyday-pendant'] },
 Everyday: { title: 'Everyday Muse', caption: 'A little shine for your everyday story.', ids: ['everyday-pendant', 'pearl-twist-ring'] },
 Festive: { title: 'Festive Reverie', caption: 'Dress for the moments you will remember.', ids: ['pearl-drop-earrings', 'classic-gold-bangles'] },
 Floral: { title: 'In Full Bloom', caption: 'Romantic details, a character of their own.', ids: ['pearl-drop-earrings', 'everyday-pendant', 'pearl-twist-ring'] },
};
export const matchesCollection = (product, slug) => slug === 'All' || (curatedCollections[slug] ? curatedCollections[slug].ids.includes(product.id) : slug === 'Picks' ? ['pearl-drop-earrings', 'everyday-pendant'].includes(product.id) : product.category === slug);
