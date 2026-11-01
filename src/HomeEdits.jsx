import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { curatedCollections } from './catalog';

export default function HomeEdits({ products, wishlist, toggleWishlist, addToCart, ProductCard }) {
 const favourites = curatedCollections.Bestsellers.ids.map(id => products.find(product => product.id === id)).filter(Boolean);
 const collections = [
  {key:'Everyday', image:'/images/pendant-demo.png', alt:'Pearl-style pendant concept on blush fabric and ivory stone'},
  {key:'Festive', image:'/images/bangles-demo.png', alt:'Decorative gold-tone bangle concepts for festive styling'},
  {key:'Floral', image:'/images/ring-demo.png', alt:'Floral pearl-style ring concept'},
 ];
 return <>
  <section className="home-favourites" aria-labelledby="favourites-title">
   <div className="edit-heading"><div><p className="edit-eyebrow">BESTSELLERS / DEMO EDIT</p><h2 id="favourites-title">The Favourites Edit</h2><p>Little statements. Lasting impressions.</p></div><a className="text-link" href="#/shop/Bestsellers">Explore the favourites <ArrowUpRight size={18}/></a></div>
   <div className="favourites-grid">{favourites.map(product => <ProductCard key={product.id} product={product} isSaved={wishlist.includes(product.id)} onToggleSave={toggleWishlist} onAdd={addToCart}/>)}</div>
   <p className="demo-note">{curatedCollections.Bestsellers.note}</p>
  </section>
  <section className="signature-collections" aria-labelledby="signature-title">
   <div className="edit-heading"><div><p className="edit-eyebrow">FIND YOUR KIND OF BEAUTIFUL</p><h2 id="signature-title">Signature Collections</h2><p>Different moods. The same little Sneh.</p></div></div>
   <div className="signature-grid">{collections.map(({key,image,alt},index) => <a className="signature-card" key={key} href={`#/shop/${key}`}><div className="signature-image"><img src={image} alt={alt} loading="lazy"/><span className="signature-number" aria-hidden="true">0{index+1}</span><span className="signature-arrow" aria-hidden="true"><ArrowUpRight size={21}/></span></div><div className="signature-copy"><h3>{curatedCollections[key].title}</h3><p>{curatedCollections[key].caption}</p><span>Discover the collection</span></div></a>)}</div>
  </section>
 </>;
}
