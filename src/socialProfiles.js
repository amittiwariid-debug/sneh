// Add the official Sneh profile URLs here when available.
// Add the business number with its country code, using digits only, to enable chat.
const whatsappNumber = "";
export const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
  : "";

export const socialProfiles = [
  { name: 'WhatsApp', key: 'whatsapp', url: whatsappUrl },
  { name: 'Facebook', key: 'facebook', url: '' },
  { name: 'Pinterest', key: 'pinterest', url: '' },
  { name: 'Instagram', key: 'instagram', url: '' },
  { name: 'YouTube', key: 'youtube', url: '' },
];
