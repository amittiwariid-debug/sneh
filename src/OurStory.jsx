import React from "react";
import { ArrowDown, ArrowRight, Heart, Sparkles } from "lucide-react";
import { imageUrl } from "./catalog";

const storyNotes = [
  {
    number: "01",
    title: "Love, in the little things",
    copy: "Sneh means love. We bring that feeling to the details you choose for yourself, the moments you celebrate, and the people you hold close.",
  },
  {
    number: "02",
    title: "Made for your kind of day",
    copy: "A familiar favourite for an ordinary morning. A finishing touch for a day worth remembering. Your jewellery should feel like it belongs to you.",
  },
  {
    number: "03",
    title: "Chosen with feeling",
    copy: "Every piece in the Sneh edit is presented as an invitation to find something that feels personal, joyful, and unmistakably yours.",
  },
];

export default function OurStory() {
  return (
    <article className="our-story-page" aria-labelledby="our-story-title">
      <nav className="breadcrumbs our-story-page__breadcrumbs" aria-label="Breadcrumb">
        <a href="#top">Home</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Our story</span>
      </nav>

      <section className="story-hero">
        <div className="story-hero__copy">
          <p className="eyebrow"><span /> THE HEART OF SNEH <span /></p>
          <h1 id="our-story-title">A little love,<br /><em>in every detail.</em></h1>
          <p>
            Some things are chosen for how they make you feel. Sneh is a celebration of those small details: the ones you wear, remember, and make your own.
          </p>
          <a className="button button--primary" href="#/shop/All">
            Find your favourite <ArrowRight size={16} />
          </a>
          <a className="story-hero__discover" href="#story-meaning">
            <ArrowDown size={15} /> A little more about Sneh
          </a>
        </div>
        <div className="story-hero__portrait">
          <img
            src={imageUrl("campaign-hero.png")}
            alt="Concept portrait for Sneh Jewels, styled with floral pearl-look jewellery"
          />
          <span className="story-hero__caption">SNEH JEWELS BY SHILPA <span>✦</span></span>
          <div className="story-hero__seal" aria-hidden="true">
            <Heart size={20} strokeWidth={1.3} />
            <span>with love</span>
          </div>
        </div>
      </section>

      <section className="story-meaning" id="story-meaning" aria-labelledby="story-meaning-title">
        <div className="story-meaning__mark" aria-hidden="true">
          <span>स्नेह</span>
          <i />
          <span>sneh</span>
        </div>
        <div className="story-meaning__copy">
          <p className="eyebrow"><span /> A NAME WITH A FEELING <span /></p>
          <h2 id="story-meaning-title">It begins with <em>Sneh.</em></h2>
          <p>
            Sneh is a word for affection and love. It is the feeling behind this little jewellery edit: thoughtful details that can make an everyday moment feel a bit more special.
          </p>
          <p className="story-meaning__note">
            Not about dressing for someone else. Just finding the detail that feels like you.
          </p>
        </div>
      </section>

      <section className="story-beliefs" aria-labelledby="story-beliefs-title">
        <div className="story-beliefs__heading">
          <p className="eyebrow"><span /> THE SNEH POINT OF VIEW <span /></p>
          <h2 id="story-beliefs-title">Little details.<br /><em>Lasting feelings.</em></h2>
          <p>A few things we hope you feel when you find your piece.</p>
        </div>
        <div className="story-beliefs__list">
          {storyNotes.map((note) => (
            <article className="story-note" key={note.number}>
              <span className="story-note__number">{note.number}</span>
              <div>
                <h3>{note.title}</h3>
                <p>{note.copy}</p>
              </div>
              <Sparkles className="story-note__sparkle" size={18} strokeWidth={1.3} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="story-founder" aria-labelledby="story-founder-title">
        <div className="story-founder__image">
          <img
            src={imageUrl("earrings-demo.png")}
            alt="Concept image of pearl-look earrings from the Sneh jewellery edit"
            loading="lazy"
          />
          <span>THE LITTLE DETAILS EDIT</span>
        </div>
        <div className="story-founder__copy">
          <p className="eyebrow"><span /> A NOTE FROM SHILPA <span /></p>
          <h2 id="story-founder-title">With love,<br /><em>Shilpa.</em></h2>
          <p>
            Sneh Jewels is a personal brand by Shilpa, shaped around jewellery, self-expression, and the little moments that matter. This page is a first introduction; Shilpa’s own story and words will make it even more personal.
          </p>
          <p className="story-founder__placeholder">
            Founder note: ready for Shilpa’s personal message.
          </p>
          <a className="text-link" href="#/help/contact">Say hello <ArrowRight size={16} /></a>
        </div>
      </section>

      <section className="story-invitation" aria-labelledby="story-invitation-title">
        <p className="eyebrow"><span /> YOUR STORY, YOUR SNEH <span /></p>
        <h2 id="story-invitation-title">Find a little something<br /><em>that feels like you.</em></h2>
        <p>Explore the edit and make a little space for something lovely.</p>
        <a className="button button--primary" href="#/shop/All">
          Explore the collection <ArrowRight size={16} />
        </a>
        <span className="story-invitation__heart" aria-hidden="true">♡</span>
      </section>
      <p className="story-art-note">Concept imagery for preview only; replace with approved brand and product photography.</p>
    </article>
  );
}
