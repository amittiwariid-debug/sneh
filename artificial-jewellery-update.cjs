const fs = require('fs');
let p='src/App.jsx',s=fs.readFileSync(p,'utf8');
const names = [['Pearl Drop Earrings','Floral Pearl-Style Earrings'],['Everyday Pearl Pendant','Pearl-Style Floral Pendant'],['Classic Gold Bangles','Classic Gold-Tone Bangles'],['Floral Pearl Ring','Floral Pearl-Style Ring']];
for(const [from,to] of names) s=s.replaceAll(from,to);
s=s.replace('Concept image of gold drop earrings with luminous pearl details','Artificial jewellery concept: gold-tone floral earrings with pearl-style drops').replace('Concept image of fine gold necklace with a pearl pendant','Artificial jewellery concept: gold-tone chain with a pearl-style floral pendant').replace('Concept image of stack of softly polished gold bangles','Artificial jewellery concept: decorative gold-tone bangles').replace('Concept image of gold statement ring with a pearl centre','Artificial jewellery concept: floral gold-tone ring with a pearl-style centre');
s=s.replace('alt: "Pearl drop earrings"','alt: "Artificial pearl-style drop earrings"').replace('alt: "Pearl pendant necklace"','alt: "Artificial pearl-style pendant necklace"').replace('alt: "Gold bangles"','alt: "Gold-tone artificial bangles"').replace('alt: "Pearl gold ring"','alt: "Gold-tone artificial ring with pearl-style detail"');
s=s.replace('Jewellery for the moments that feel like you','Artificial jewellery for everyday & festive moments');
s=s.replace('Thoughtful little treasures, chosen to make the everyday feel a little more yours.','Artificial jewellery with a little everyday charm and a touch of festive joy.');
s=s.replace('A space for personal pieces and meaningful moments. Meet the world of Sneh, where jewellery becomes part of your everyday story.','Discover the world of Sneh: artificial jewellery for everyday styling, traditional looks and festive celebrations. Find a detail that feels like you.');
s=s.replace('Jewellery for the little moments<br />that mean everything.','Artificial jewellery for everyday<br />and festive moments.');
s=s.replace('Try “pearl” or “earrings”','Try “floral”, “festive” or “earrings”');
const start=s.indexOf('const products = [');const end=s.indexOf('\nconst readStored', start);
let catalog=s.slice(start,end).replace('const products =','export const products =').replace('const categories =','export const categories =');
const details={
 'pearl-drop-earrings':{style:'Floral drops',occasion:'Festive',description:'A floral silhouette with pearl-style drops and a warm gold-tone appearance. An artificial jewellery concept for festive outfits and traditional looks.',tags:['artificial','imitation','fashion','floral','drops','traditional','festive','pearl']},
 'everyday-pendant':{style:'Pendant necklace',occasion:'Everyday',description:'A delicate floral pendant with pearl-style accents and a gold-tone appearance. An artificial jewellery concept for everyday styling and gifting inspiration.',tags:['artificial','imitation','fashion','floral','pendant','everyday','gifting','pearl']},
 'classic-gold-bangles':{style:'Decorative bangles',occasion:'Festive',description:'Decorative bangles with floral motifs and a gold-tone appearance. An artificial jewellery concept for traditional and festive styling.',tags:['artificial','imitation','fashion','bangles','traditional','festive','gold tone']},
 'pearl-twist-ring':{style:'Floral statement ring',occasion:'Everyday',description:'A floral statement silhouette with a pearl-style centre and gold-tone appearance. An artificial jewellery concept for adding a playful finishing touch.',tags:['artificial','imitation','fashion','floral','ring','everyday','pearl']}
};
for(const [id, data] of Object.entries(details))catalog=catalog.replace(`id: "${id}",`,`id: "${id}",\n    description: ${JSON.stringify(data.description)},\n    style: ${JSON.stringify(data.style)},\n    occasion: ${JSON.stringify(data.occasion)},\n    tags: ${JSON.stringify(data.tags)},`);
catalog += '\nexport const matchesProduct = (product, query) => {\n const text = [product.name, product.category, product.style, product.occasion, ...(product.tags || [])].join(" ").toLowerCase();\n return query.trim().toLowerCase().split(/\\s+/).filter(Boolean).every(word => text.includes(word));\n};\n';
fs.writeFileSync('src/catalog.js','// Editable demo catalog. Appearance descriptions do not verify materials or plating.\n'+catalog);
s=s.slice(0,start)+s.slice(end);
s='import { products, categories, matchesProduct } from "./catalog";\n'+s;
s=s.replace('`${product.name} ${product.category}`.toLowerCase().includes(query)','matchesProduct(product, query)');
fs.writeFileSync(p,s);
p='src/StorePages.jsx';s=fs.readFileSync(p,'utf8');
s='import { matchesProduct } from "./catalog";\n'+s;
s=s.replace('`${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())','matchesProduct(item, query)');
// Move customer information out of the breadcrumb into the page body.
const helpStart=s.indexOf('{page === "help" ? <section');const helpEnd=s.indexOf(' : page === "product" ?',helpStart);
const help=s.slice(helpStart+1,helpEnd);
s=s.slice(0,helpStart)+'{page === "product" ?'+s.slice(helpEnd+' : page === "product" ?'.length);
s=s.replace('    {page === "product" ? product ? <>','    {'+help+' : page === "product" ? product ? <>');
s=s.replace('<p>A finishing touch for the days you want to remember. Explore this illustrative piece from our everyday edit.</p>','<p>{product.description}</p><p className="detail-note">Artificial / fashion jewellery · Gold-tone and pearl-style describe appearance only. Base materials, plating and stone composition await supplier confirmation.</p>');
s=s.replace('<dl className="product-specs">','<dl className="product-specs"><div><dt>Jewellery type</dt><dd>Artificial / fashion</dd></div><div><dt>Style</dt><dd>{product.style}</dd></div><div><dt>Styling occasion</dt><dd>{product.occasion}</dd></div>');
s=s.replace('Illustrated sample for exploring the storefront. Final materials, dimensions and care instructions are awaiting confirmation.','AI-generated artificial jewellery concept. Final materials, dimensions, plating and care instructions require supplier confirmation.');
s=s.replace('The everyday collection.','The artificial jewellery collection.').replace('A little expression of you. Find the detail that feels just right.','Artificial jewellery for everyday, traditional and festive looks. Explore our demo edit.');
fs.writeFileSync(p,s);
p='index.html';s=fs.readFileSync(p,'utf8').replace('Discover thoughtful, everyday jewellery from Sneh Jewels by Shilpa.','Explore artificial jewellery for everyday and festive styling at Sneh Jewels by Shilpa. Browse our demo earrings, necklaces, bangles and rings.').replace('Sneh Jewels by Shilpa — Little details. Lasting feelings.','Sneh Jewels by Shilpa | Artificial Jewellery');fs.writeFileSync(p,s);
