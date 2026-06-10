const icons = {
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/>',
  people: '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.75"/>',
  building: '<path d="M4 21V6l8-3 8 3v15M8 9h2m4 0h2M8 13h2m4 0h2M8 17h2m4 0h2M2 21h20"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  map: '<path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15m6-12v15"/>',
  rocket: '<path d="M14 6c3.8-3.8 7-3 7-3s.8 3.2-3 7l-4 4-4-4 4-4Z"/><path d="m9 11-4 1-2 3 6 1m4-1-1 4-3 2-1-6"/><circle cx="16" cy="8" r="1.5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  handshake: '<path d="m11 16 2 2a2 2 0 0 0 3-3l-3-3m-2 4-2 2a2 2 0 0 1-3-3l4-4a3 3 0 0 1 4 0l1 1h3l3 3M3 7l4 4m14-4-4 4"/>'
}

export function portalIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`
}
