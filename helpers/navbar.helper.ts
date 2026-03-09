export function formatWhatsappLink(value: string) {
  const digits = value.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}

export function formatPhoneLink(value: string) {
  const digits = value.replace(/\D/g, '');
  return `tel:${digits}`;
}