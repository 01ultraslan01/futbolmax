export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 1. Tarayıcı direkt ana siteye girerse index.html arayüzünü açar
    if (url.pathname === "/" || url.pathname === "") {
      return env.assets.get("index.html");
    }
    
    // 2. Gelen istekteki dosya adını temizler (Örn: /filmtv.m3u -> filmtv.m3u yapar)
    const fileName = url.pathname.substring(1);
    
    // 3. Depoda bu isimde bir dosya var mı diye kontrol eder
    const asset = await env.assets.get(fileName);
    
    if (asset) {
      // Dosya m3u ise tarayıcıya veya IPTV uygulamasına bunun bir liste olduğunu bildirir (Headers)
      if (fileName.endsWith('.m3u') || fileName.endsWith('.m3u8')) {
        return new Response(asset.body, {
          headers: { 
            "Content-Type": "application/x-mpegurl; charset=utf-8",
            "Access-Control-Allow-Origin": "*" 
          }
        });
      }
      return asset;
    }
    
    // 4. Eğer dosya hiçbir şekilde bulunamazsa hata mesajı verir
    return new Response(`Hata: '${fileName}' adinda bir dosya bulunamadi! Lutfen GitHub deponuzdaki dosya adiyla linkteki adin (Buyuk/Kucuk harfler dahil) birebir ayni oldugundan emin olun.`, { status: 404 });
  },
};
