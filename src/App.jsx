import HomeEdits from "./HomeEdits";
import SocialLinks from "./SocialLinks";
import { products, categories, matchesProduct, imageUrl } from "./catalog";
import React, { useEffect, useMemo, useRef, useState } from "react";
import StorePages from "./StorePages";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";


const readStored = (key, fallback) => {
  try {
    const value = JSON.parse(window.localStorage.getItem(key));
    const ids = new Set(products.map(({ id }) => id));
    if (Array.isArray(fallback)) return Array.isArray(value) ? [...new Set(value.filter(id => ids.has(id)))] : fallback;
    return value && typeof value === "object" && !Array.isArray(value)
      ? Object.fromEntries(Object.entries(value).filter(([id, qty]) => ids.has(id) && Number.isSafeInteger(qty) && qty > 0 && qty <= 99))
      : fallback;
  } catch { return fallback; }
};

const persist = (key, value) => {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* Shopping remains usable when storage is unavailable. */ }
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function BrandMark({ compact = false }) {
  return (
    <a className={`brand${compact ? " brand--compact" : ""}`} href="#top" aria-label="Sneh Jewels by Shilpa, home">
      <svg className="brand__symbol" viewBox="0 0 52 54" aria-hidden="true">
        <path d="M26 48 7.7 29.5C-3 17.7 5.2 4.3 16.8 6.2c4.1.7 7.3 3.2 9.2 7.1 2.7-5.4 8.6-8.3 14.3-6.7 10.1 2.8 12.1 14.5 3.8 23.2L26 48Z" fill="none" stroke="currentColor" strokeWidth="2.1" />
        <path d="M26 39c-7.9-9.2-7.2-18.7.2-20.4 6.8-1.6 10.1 5.4 6.6 11.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="37.5" cy="33.5" r="5.4" fill="#f3ede3" stroke="#b48b50" strokeWidth="1.5" />
      </svg>
      <span className="brand__words">
        <span className="brand__name">Sneh Jewels</span>
        <span className="brand__byline">by Shilpa</span>
      </span>
    </a>
  );
}

function ProductCard({ product, isSaved, onToggleSave, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <a className="product-image-link" href={`#/product/${product.id}`} aria-label={`View ${product.name}`}><img className="product-card__image" src={product.image} alt={product.alt} loading="lazy" /></a>
        <span className="product-card__badge">A little favourite</span>
        <button
          className={`icon-button product-card__heart${isSaved ? " is-active" : ""}`}
          type="button"
          onClick={() => onToggleSave(product.id)}
          aria-label={`${isSaved ? "Remove" : "Add"} ${product.name} ${isSaved ? "from" : "to"} wishlist`}
          aria-pressed={isSaved}
        >
          <Heart size={19} strokeWidth={1.6} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <button className="product-card__quick-add" type="button" onClick={() => onAdd(product.id)}>
          Add to bag <Plus size={15} />
        </button>
      </div>
      <div className="product-card__details">
        <div>
          <p className="product-card__category">{product.category}</p>
          <h3><a href={`#/product/${product.id}`}>{product.name}</a></h3>
        </div>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
      <p className="product-card__note">{product.note}</p>
    </article>
  );
}

function App() {
  const [route, setRoute] = useState(window.location.hash);
  useEffect(() => {
    const navigate = () => { setRoute(window.location.hash); if (window.location.hash.startsWith("#/")) window.scrollTo(0, 0); };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  const [cart, setCart] = useState(() => readStored("sneh-cart", {}));
  const [wishlist, setWishlist] = useState(() => readStored("sneh-wishlist", []));
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [toast, setToast] = useState(null);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(null), 6000); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { setMobileMenuOpen(false); setSearchOpen(false); }, [route]);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!cartOpen) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector("button")?.focus();
    const handleKey = (event) => {
      if (event.key === "Escape") setCartOpen(false);
      if (event.key !== "Tab") return;
      const controls = [...drawerRef.current.querySelectorAll('button:not(:disabled), a[href], input')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [cartOpen]);

  useEffect(() => {
    persist("sneh-cart", cart);
  }, [cart]);

  useEffect(() => {
    persist("sneh-wishlist", wishlist);
  }, [wishlist]);

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const cartItems = products.filter((product) => cart[product.id]);
  const cartTotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesWishlist = !wishlistOnly || wishlist.includes(product.id);
      const matchesSearch =
        !query ||
        matchesProduct(product, query);
      return matchesCategory && matchesWishlist && matchesSearch;
    });
  }, [activeCategory, search, wishlist, wishlistOnly]);

  const updateCart = (id, change) => {
    setCart((current) => {
      const nextQuantity = (current[id] || 0) + change;
      const next = { ...current };
      if (nextQuantity > 0) next[id] = Math.min(99, nextQuantity);
      else delete next[id];
      return next;
    });
  };

  const addToCart = (id) => {
    updateCart(id, 1);
    setToast({ text: `${products.find(product => product.id === id).name} added to your bag.` });
    setAnnouncement(`${products.find((product) => product.id === id).name} added to your bag.`);
  };

  const toggleWishlist = (id) => {
    const product = products.find((item) => item.id === id);
    const isSaved = wishlist.includes(id);
    setWishlist((current) =>
      isSaved ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
    setAnnouncement(`${product.name} ${isSaved ? "removed from" : "added to"} your wishlist.`);
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setWishlistOnly(false);
    setMobileMenuOpen(false);
    window.location.hash = `#/shop/${category}`;
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const showWishlist = () => {
    window.location.hash = "#/wishlist";
    setWishlistOnly(true);
    setActiveCategory("All");
    setSearch("");
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const closeCart = () => setCartOpen(false);

  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="announcement">
        <span className="announcement__sparkle" aria-hidden="true">✦</span>
        <p>Artificial jewellery for everyday & festive moments</p>
        <span className="announcement__sparkle" aria-hidden="true">✦</span>
      </div>

      <header className="site-header">
        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <BrandMark />
        <nav id="main-navigation" onKeyDown={event => { if (event.key === "Escape") { setMobileMenuOpen(false); document.querySelector(".mobile-menu-toggle")?.focus(); } }} className={`main-nav${mobileMenuOpen ? " main-nav--open" : ""}`} aria-label="Main navigation">
          <a href="#/shop/All">Shop all</a>
          <a href="#/shop/Earrings" onClick={() => setMobileMenuOpen(false)}>Earrings</a>
          <a href="#/shop/Necklaces" onClick={() => setMobileMenuOpen(false)}>Necklaces</a>
          <a href="#/shop/Bangles" onClick={() => setMobileMenuOpen(false)}>Bangles</a>
          <a href="#/shop/Rings">Rings</a>
          <a href="#our-story" onClick={() => setMobileMenuOpen(false)}>Our story</a>
        </nav>
        <div className="header-actions">
          <button
            className={`icon-button header-actions__search${searchOpen ? " is-active" : ""}`}
            type="button"
            aria-label={searchOpen ? "Close search" : "Search jewellery"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setSearch("");
              setWishlistOnly(false);
            }}
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>
          <button
            className={`icon-button header-actions__wishlist${wishlistOnly ? " is-active" : ""}`}
            type="button"
            aria-label={`Show wishlist, ${wishlist.length} saved`}
            aria-pressed={wishlistOnly}
            onClick={showWishlist}
          >
            <Heart size={19} strokeWidth={1.5} />
            {wishlist.length > 0 && <span className="action-count">{wishlist.length}</span>}
          </button>
          <button
            className="icon-button header-actions__bag"
            type="button"
            aria-label={`Open shopping bag, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />
            {cartCount > 0 && <span className="action-count">{cartCount}</span>}
          </button>
        </div>
      </header>

      {searchOpen && (
        <form className="search-panel" role="search" onSubmit={(event) => {
          event.preventDefault();
          window.location.hash = "#/shop/All";
          document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
        }}>
          <Search size={17} aria-hidden="true" />
          <label className="sr-only" htmlFor="site-search">Search jewellery</label>
          <input
            id="site-search"
            type="search"
            placeholder="Try “floral”, “festive” or “earrings”"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setWishlistOnly(false);
              setActiveCategory("All");
            }}
            autoFocus
          />
          <span>Search our little collection</span>
        </form>
      )}

      <main id="main-content" tabIndex={-1}>
        {route.startsWith("#/") ? <StorePages route={route} products={products} categories={categories} cart={cart} wishlist={wishlist} updateCart={updateCart} toggleWishlist={toggleWishlist} addToCart={addToCart} formatPrice={formatPrice} ProductCard={ProductCard} globalSearch={search} /> : <>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow">SNEH / THE EVERYDAY EDIT</p>
            <h1 id="hero-title">Little details.<br />Lasting feelings.</h1>
            <p className="hero__description">
              Artificial jewellery with a little everyday charm and a touch of festive joy.
            </p>
            <a className="button button--primary" href="#/shop/All">
              Shop the collection <ArrowRight size={16} strokeWidth={1.6} />
            </a>
            <a className="hero-secondary" href="#/shop/All">Explore your everyday favourites <ArrowUpRight size={16} /></a><div className="hero__side-note">
              <span className="hero__side-line" />
              <p>JEWELLERY<br />FOR A BRIGHTER<br />YOU, EVERY DAY.</p>
            </div>
            <span className="hero__number" aria-hidden="true">01 / 04</span>
          </div>
          <div className="hero__visual">
            <img src={imageUrl("campaign-hero.png")} alt="AI-generated campaign portrait of a woman wearing floral pearl-style jewellery" />
            <div className="hero__caption">
              <span>THE SNEH FEELING</span>
              <span>Made for moments of love <ArrowUpRight size={14} /></span>
            </div>
            <div className="hero__seal" aria-hidden="true">
              <span>little things</span>
              <span className="hero__seal-heart">♡</span>
              <span>with love</span>
            </div>
          </div>
          <div className="hero-product-stack"><a href="#/product/pearl-twist-ring"><img src={imageUrl("ring-demo.png")} alt="Concept image of pearl twist ring"/><span>01 / THE FINISHING TOUCH <ArrowUpRight size={17}/></span></a><a href="#/product/everyday-pendant"><img src={imageUrl("pendant-demo.png")} alt="Concept image of pearl pendant"/><span>02 / CLOSE TO YOUR HEART <ArrowUpRight size={17}/></span></a></div><a className="hero__scroll" href="#categories" aria-label="Scroll to explore">
            <ArrowDownRight size={16} /> SCROLL TO EXPLORE
          </a>
        </section>

        <div className="moments-strip" aria-label="Jewellery for every moment">
          <span>Everyday favourites</span><i /><span>Thoughtful little gifts</span><i /><span>Moments to keep</span>
        </div>

        <section className="categories section-wrap" id="categories" aria-labelledby="categories-title">
          <div className="section-heading">
            <p className="eyebrow"><span /> FIND YOUR SOMETHING <span /></p>
            <h2 id="categories-title">Find your favourite</h2>
            <p className="section-heading__intro">The pieces you reach for, and the ones you remember.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <button
                className="category-card"
                key={category.name}
                type="button"
                onClick={() => selectCategory(category.name)}
                aria-label={`Shop ${category.name.toLowerCase()}`}
              >
                <span className="category-card__image-wrap">
                  <img src={category.image} alt={category.alt} loading="lazy" />
                  <span className="category-card__index">0{index + 1}</span>
                  <span className="category-card__arrow"><ArrowUpRight size={17} /></span>
                </span>
                <span className="category-card__label">{category.name}</span>
                <span className="category-card__sub">A favourite, waiting to be found</span>
              </button>
            ))}
          </div>
        </section>

        <section className="collection section-wrap" id="collection" aria-labelledby="collection-title">
          <div className="collection__top">
            <div className="section-heading section-heading--left">
              <p className="eyebrow"><span /> THE LITTLE FAVOURITES <span /></p>
              <h2 id="collection-title">Loved by you</h2>
              <p className="section-heading__intro">
                {wishlistOnly ? "The pieces you’ve been keeping close." : "Thoughtful details for your everyday."}
              </p>
            </div>
            <a className="text-link collection__all" href="#collection" onClick={() => {
              setActiveCategory("All");
              setWishlistOnly(false);
              setSearch("");
            }}>
              Shop the edit <ArrowRight size={16} />
            </a>
          </div>
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSaved={wishlist.includes(product.id)}
                  onToggleSave={toggleWishlist}
                  onAdd={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__heart">♡</span>
              <h3>{wishlistOnly ? "Your wishlist is a little quiet." : "Nothing found just yet."}</h3>
              <p>{wishlistOnly ? "Tap the little heart on a piece to keep it close." : "Try another search, or explore the full collection."}</p>
              <button className="text-link" type="button" onClick={() => {
                setWishlistOnly(false);
                setSearch("");
                setActiveCategory("All");
              }}>See all the little favourites <ArrowRight size={15} /></button>
            </div>
          )}
          <div className="collection-browse"><a className="button button--outline" href="#/shop/All">View all jewellery <ArrowRight size={16}/></a></div><p className="demo-note">Frontend demo · AI-generated demo imagery and editable sample INR prices. No orders or payments are taken.</p>
        </section>

        <HomeEdits products={products} wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} ProductCard={ProductCard} />
        <section className="story" id="shilpas-picks" aria-labelledby="story-title">
          <div className="story__image">
            <img src={imageUrl("earrings-demo.png")} alt="Concept image of pearl drop earrings in the featured edit" loading="lazy" />
            <span className="story__image-caption">A little Sneh, in the details.</span>
          </div>
          <div className="story__copy">
            <p className="eyebrow"><span /> A NOTE FROM SHILPA <span /></p>
            <h2 id="story-title">Shilpa&rsquo;s Picks</h2>
            <p>
              Sneh means love. This little collection is a celebration of the pieces that make an ordinary day feel special — thoughtful, personal, and always close to your heart.
            </p>
            <p className="story__signature">With love, <span>Shilpa</span></p>
            <p className="demo-note">Suggested brand story — ready for Shilpa’s own words.</p>
            <a className="button button--primary" href="#/shop/Picks">Explore the edit <ArrowRight size={16} /></a>
            <span className="story__flower" aria-hidden="true">✳</span>
          </div>
        </section>

        <section className="brand-story section-wrap" id="our-story"><p className="eyebrow">SNEH JEWELS BY SHILPA</p><h2>A little love, in every detail.</h2><p>Discover the world of Sneh: artificial jewellery for everyday styling, traditional looks and festive celebrations. Find a detail that feels like you.</p><p className="demo-note">Draft introduction — Shilpa’s personal story will be added here.</p></section>
        <section className="newsletter" aria-labelledby="newsletter-title">
          <div className="newsletter__ornament" aria-hidden="true">♡</div>
          <p className="eyebrow">A LITTLE NOTE, NOW AND THEN</p>
          <h2 id="newsletter-title">Love a lovely little update?</h2>
          <p>Our newsletter sign-up will be here soon. In the meantime, come say hello on Instagram.</p>
          <a className="button button--outline" href="#footer">Follow along <Instagram size={16} /></a>
        </section>
        </>}
      </main>

      <footer className="site-footer" id="footer">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <BrandMark compact />
            <p>Artificial jewellery for everyday<br />and festive moments.</p>
          </div>
          <div className="site-footer__links">
            <div><h2>Explore</h2><a href="#/shop/All">Shop all</a><a href="#categories">Our collections</a><a href="#our-story">Our story</a></div>
            <div><h2>A little help</h2><a href="#/help/contact">Contact details</a><a href="#/help/care">Product care</a><a href="#/help/policies">Delivery & returns</a></div>
          </div>
          <div className="site-footer__social">
            <p>Stay close, lovely.</p>
            <SocialLinks />
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Sneh Jewels by Shilpa</span>
          <span>Made for moments of love <span aria-hidden="true">♡</span></span>
          <a href="#top">Back to the beginning ↑</a>
        </div>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeCart();
        }}>
          <aside ref={drawerRef} className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="cart-drawer__header">
              <div><p className="eyebrow">A LITTLE SOMETHING FOR YOU</p><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div>
              <button className="icon-button" type="button" aria-label="Close shopping bag" onClick={closeCart}><X size={21} /></button>
            </div>
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={28} strokeWidth={1.2} />
                <h3>Your bag is waiting for a little love.</h3>
                <p>Find a favourite and it’ll be right here.</p>
                <button className="button button--primary" type="button" onClick={closeCart}>Explore the collection <ArrowRight size={15} /></button>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {cartItems.map((product) => (
                    <article className="cart-item" key={product.id}>
                      <img src={product.image} alt={product.alt} />
                      <div className="cart-item__details"><p className="cart-item__category">{product.category}</p><h3>{product.name}</h3><p>{formatPrice(product.price)}</p>
                        <div className="quantity-control" aria-label={`Quantity of ${product.name}`}>
                          <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateCart(product.id, -1)}><Minus size={13} /></button>
                          <span>{cart[product.id]}</span>
                          <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateCart(product.id, 1)}><Plus size={13} /></button>
                        </div>
                      </div>
                      <button className="icon-button cart-item__remove" type="button" aria-label={`Remove ${product.name} from bag`} onClick={() => setCart((current) => {
                        const next = { ...current };
                        delete next[product.id];
                        return next;
                      })}><X size={16} /></button>
                    </article>
                  ))}
                </div>
                <div className="cart-drawer__summary">
                  <div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div>
                  <p>Preview only — checkout isn’t connected yet.</p>
                  <a className="button button--primary cart-drawer__checkout" href="#/bag" onClick={closeCart}>View bag <ArrowRight size={16} /></a>
                  <button className="text-link cart-drawer__continue" type="button" onClick={closeCart}>Keep browsing</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
      {toast && <div className="bag-toast" role="status"><span>{toast.text}</span><a href="#/bag" onClick={() => setToast(null)}>View bag</a><button className="icon-button" aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={18}/></button></div>}<div className="sr-only" role="status" aria-live="polite">{announcement}</div>
    </div>
  );
}

export default App;
