export const shielding = (text: string) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
