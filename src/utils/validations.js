export function isUUIDv4(uuid) {
  // Expresión regular para validar UUID v4
  const regexUUIDv4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regexUUIDv4.test(uuid);
}
