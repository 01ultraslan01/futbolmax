export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Tarayıcı direkt ana siteye girerse index.html (Arayüzü) sunar
    if (url.pathname === "/" || url.pathname === "") {
      return env.assets.get("index.html");
    }
    
    // Eğer /dizi.m3u adresine istek gelirse m3u listesini sunar
    if (url.pathname === "/dizi.m3u") {
      return env.assets.get("dizi.m3u");
    }
    
    // Diğer tüm dosyaları arar
    return env.assets.get(url.pathname.substring(1));
  },
};
