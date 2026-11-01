import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';
import { socialProfiles } from './socialProfiles';

function SocialIcon({name}) {
 if (name === 'instagram') return <Instagram size={20} strokeWidth={1.8} aria-hidden="true"/>;
 if (name === 'youtube') return <Youtube size={21} strokeWidth={1.8} aria-hidden="true"/>;
 if (name === 'facebook') return <Facebook size={20} strokeWidth={1.8} aria-hidden="true"/>;
 return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.64 19.31c-.03-.79 0-1.74.2-2.6l1.29-5.46s-.32-.64-.32-1.59c0-1.49.86-2.61 1.93-2.61.91 0 1.35.68 1.35 1.5 0 .91-.58 2.29-.88 3.56-.25 1.06.53 1.93 1.57 1.93 1.89 0 3.17-2.43 3.17-5.31 0-2.19-1.48-3.83-4.17-3.83-3.04 0-4.94 2.27-4.94 4.8 0 .87.26 1.49.66 1.96.18.21.2.29.14.53l-.19.77c-.06.25-.27.34-.5.25-1.39-.57-2.04-2.09-2.04-3.81 0-2.83 2.39-6.23 7.13-6.23 3.81 0 6.32 2.76 6.32 5.72 0 3.92-2.18 6.85-5.39 6.85-1.08 0-2.1-.58-2.45-1.24l-.7 2.76c-.25.89-.73 1.79-1.16 2.49A10 10 0 1 0 12 2Z"/></svg>;
}
export default function SocialLinks() {
 const pending = socialProfiles.some(profile => !profile.url);
 return <div className="social-profiles"><nav className="social-icons" aria-label="Follow Sneh Jewels on social media">{socialProfiles.map(profile => profile.url ? <a key={profile.key} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} (opens in a new tab)`} title={profile.name}><SocialIcon name={profile.key}/></a> : <button key={profile.key} type="button" disabled aria-label={`${profile.name} profile coming soon`} title={`${profile.name} — profile link coming soon`}><SocialIcon name={profile.key}/></button>)}</nav>{pending && <p className="social-pending">Social profiles coming soon.</p>}</div>;
}
