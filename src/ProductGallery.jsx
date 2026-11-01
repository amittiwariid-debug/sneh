import React, { useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
export default function ProductGallery({product}) {
 const dialog = useRef(null);
 const [detail, setDetail] = useState(false);
 return <div className="gallery"><button className="gallery-main" onClick={() => dialog.current.showModal()} aria-label={`Enlarge ${product.name} image`}><img className={detail ? 'is-detail' : ''} src={product.image} alt={product.alt}/><span><ZoomIn size={16}/> Enlarge image</span></button><div className="gallery-tabs" aria-label="Image view"><button aria-pressed={!detail} onClick={() => setDetail(false)}>Full image</button><button aria-pressed={detail} onClick={() => setDetail(true)}>Detail crop</button></div><p className="detail-note">AI-generated concept image. Detail is a crop of the same image; additional product angles await real photography.</p><dialog className="image-dialog" ref={dialog} onClick={event => {if(event.target === event.currentTarget) dialog.current.close();}}><button className="icon-button" aria-label="Close enlarged image" onClick={() => dialog.current.close()}><X/></button><img src={product.image} alt={product.alt}/><p>{product.name} · Concept image</p></dialog></div>;
}
