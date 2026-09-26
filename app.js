/* Loja Prof. Luiz Atividades Pedagógicas: lógica de todas as páginas.
   Os dados ficam em produtos.js. Não é preciso mexer neste arquivo para cadastrar produtos. */
(function () {
  'use strict';

  var L = window.LOJA;
  var TODOS = window.PRODUTOS || [];
  var pagina = document.body.getAttribute('data-pagina');

  /* ================= Utilidades ================= */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ºª°]/g, '').toLowerCase();
  }
  function ic(nome, cls) { return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + nome + '"/></svg>'; }
  function preco(n) { return n == null ? null : 'R$ ' + Number(n).toFixed(2).replace('.', ','); }
  function plural(n, um, varios) { return n + ' ' + (n === 1 ? um : varios); }
  function $(sel, el) { return (el || document).querySelector(sel); }
  function miniatura(src) { return /\/p(\d+)\.jpg$/.test(src) ? src.replace(/\/p(\d+)\.jpg$/, '/t$1.jpg') : src; }
  function paramsURL() { return new URLSearchParams(location.search); }

  /* ================= Mapas ================= */
  var mapaAssunto = {};
  L.assuntos.forEach(function (a) {
    mapaAssunto[a.id] = { id: a.id, nome: a.nome, pai: null, cor: a.cor, icone: a.icone };
    (a.sub || []).forEach(function (s) {
      mapaAssunto[s.id] = { id: s.id, nome: s.nome, pai: a.id, cor: a.cor, icone: a.icone };
    });
  });
  var mapaTipo = {}; L.tipos.forEach(function (t) { mapaTipo[t.id] = t; });
  var mapaAno = {}; L.anos.forEach(function (a) { mapaAno[a.id] = a; });
  var mapaData = {}; L.datas.forEach(function (d) { mapaData[d.id] = d; });

  function datasDe(p) { return !p.data ? [] : (Array.isArray(p.data) ? p.data : [p.data]).filter(function (d) { return mapaData[d]; }); }

  /* Entram no site os produtos com link de compra e os marcados como em_breve */
  var temLink = function (p) { return !!(p.link_kiwify && String(p.link_kiwify).trim()); };
  var P = TODOS.filter(function (p) { return p && p.id && (temLink(p) || p.em_breve); });
  P.forEach(function (p, i) {
    p._ordem = i;
    var s = {};
    (p.assuntos || []).forEach(function (a) {
      if (!mapaAssunto[a]) return;
      s[a] = true;
      if (mapaAssunto[a].pai) s[mapaAssunto[a].pai] = true;
    });
    p._assuntos = s;
    p._busca = norm([
      p.nome, p.descricao, (p.itens || []).join(' '), anosTexto(p),
      Object.keys(s).map(function (a) { return mapaAssunto[a].nome; }).join(' '),
      mapaTipo[p.tipo] ? mapaTipo[p.tipo].nome : '',
      datasDe(p).map(function (d) { return mapaData[d].nome; }).join(' ')
    ].join(' '));
  });
  var porId = {}; P.forEach(function (p) { porId[p.id] = p; });

  function contarAssunto(id) { return P.filter(function (p) { return p._assuntos[id]; }).length; }
  function contarTipo(id) { return P.filter(function (p) { return p.tipo === id; }).length; }
  function contarAno(id) { return P.filter(function (p) { return (p.anos || []).indexOf(id) >= 0; }).length; }
  function produtosDaData(id) { return P.filter(function (p) { return datasDe(p).indexOf(id) >= 0; }); }

  function anosTexto(p) {
    if (p.publico) return p.publico;
    var a = p.anos || [], partes = [];
    if (a.indexOf('aee') >= 0) partes.push('AEE');
    var ordem = ['ei', '1', '2', '3', '4', '5'];
    var idx = ordem.filter(function (x) { return a.indexOf(x) >= 0; }).map(function (x) { return ordem.indexOf(x); });
    if (idx.length) {
      var nome = function (i) { return i === 0 ? 'Ed. Infantil' : ordem[i] + 'º'; };
      var seguidos = idx[idx.length - 1] - idx[0] === idx.length - 1;
      if (idx.length === 1) partes.push(idx[0] === 0 ? 'Educação Infantil' : ordem[idx[0]] + 'º ano');
      else if (!seguidos) partes.push(idx.map(nome).join(', ').replace(/, ([^,]*)$/, ' e $1') + ' ano');
      else if (idx.length === 2) partes.push(nome(idx[0]) + ' e ' + nome(idx[1]) + ' ano');
      else partes.push(nome(idx[0]) + ' ao ' + nome(idx[idx.length - 1]) + ' ano');
    }
    return partes.join(' • ');
  }

  /* ================= Datas ================= */
  var DIA = 864e5;
  var HOJE = (function () {
    var q = paramsURL().get('hoje'); // para testar: ?hoje=2026-11-05
    var d = q ? new Date(q + 'T00:00:00') : new Date();
    if (isNaN(d)) d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  })();
  function dm(s) { var x = String(s).split('/'); return { d: +x[0], m: +x[1] }; }
  function proxima(s) {
    var o = dm(s), y = HOJE.getFullYear();
    var x = new Date(y, o.m - 1, o.d);
    if (x < HOJE) x = new Date(y + 1, o.m - 1, o.d);
    return x;
  }
  function dias(a, b) { return Math.round((b - a) / DIA); }
  function infoData(dt) {
    var i = dm(dt.destaqueDe), f = dm(dt.destaqueAte), y = HOJE.getFullYear();
    var a = new Date(y, i.m - 1, i.d), b = new Date(y, f.m - 1, f.d);
    var ativa = a <= b ? (HOJE >= a && HOJE <= b) : (HOJE >= a || HOJE <= b);
    return {
      ativa: ativa,
      ateInicio: ativa ? 0 : dias(HOJE, proxima(dt.destaqueDe)),
      ateDia: dt.dia ? dias(HOJE, proxima(dt.dia)) : null
    };
  }
  /* Datas que têm produto, da mais próxima para a mais distante */
  var DATAS = L.datas.filter(function (d) { return produtosDaData(d.id).length; }).map(function (d) {
    var inf = infoData(d);
    return { d: d, inf: inf, n: produtosDaData(d.id).length };
  }).sort(function (x, y) {
    return (x.inf.ateInicio - y.inf.ateInicio) || ((x.inf.ateDia == null ? 999 : x.inf.ateDia) - (y.inf.ateDia == null ? 999 : y.inf.ateDia));
  });
  var posData = {}; DATAS.forEach(function (x, i) { posData[x.d.id] = i; });
  var AGORA = DATAS.filter(function (x) { return x.inf.ativa || x.inf.ateInicio <= 10; });
  if (!AGORA.length && DATAS.length) AGORA = [DATAS[0]];
  AGORA = AGORA.slice(0, 4);
  var idsAgora = {}; AGORA.forEach(function (x) { idsAgora[x.d.id] = true; });

  function contagem(x) {
    var n = x.inf.ateDia;
    if (n === 0) return 'É hoje!';
    if (n === 1) return 'É amanhã!';
    if (n != null) return 'Faltam ' + n + ' dias';
    return x.d.quando;
  }
  function dataPrincipal(p) {
    var ds = datasDe(p).slice().sort(function (a, b) { return (posData[a] == null ? 99 : posData[a]) - (posData[b] == null ? 99 : posData[b]); });
    return ds.length ? mapaData[ds[0]] : null;
  }

  /* ================= Ícones (uma vez por página) ================= */
  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="M20 6 9 17l-5-5"/></symbol>' +
    '<symbol id="i-pagina" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></g></symbol>' +
    '<symbol id="i-email" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></g></symbol>' +
    '<symbol id="i-cartao" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></g></symbol>' +
    '<symbol id="i-calendario" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></g></symbol>' +
    '<symbol id="i-relogio" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g></symbol>' +
    '<symbol id="i-busca" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></g></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></symbol>' +
    '<symbol id="i-filtro" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M3 5h18l-7 8v6l-4 2v-8z"/></symbol>' +
    '<symbol id="i-baixo" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6"/></symbol>' +
    '<symbol id="i-esq" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="m15 18-6-6 6-6"/></symbol>' +
    '<symbol id="i-dir" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" d="m9 18 6-6-6-6"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" d="M18 6 6 18M6 6l12 12"/></symbol>' +
    '<symbol id="i-sacola" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1 14H5z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></g></symbol>' +
    '<symbol id="i-impressora" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></g></symbol>' +
    '<symbol id="i-escudo" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></g></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.870.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.650-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.830 9.830 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.820 11.820 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.880 11.880 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.820 11.820 0 0 0-3.48-8.4Z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.3"/></g><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor"/></symbol>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24"><path fill="currentColor" d="M9.1 23.7v-8H6.63v-3.66H9.1v-1.58c0-4.09 1.85-5.98 5.86-5.98.4 0 .96.04 1.47.1.5.06.87.12 1.14.2v3.32a8.6 8.6 0 0 0-1.39-.05c-.7 0-1.25.1-1.67.31a1.7 1.7 0 0 0-.68.62c-.26.42-.38 1-.38 1.75v1.3h3.92l-.67 3.66h-3.25v8.25C19.4 23.24 24 18.18 24 12.04 24 5.42 18.63.04 12 .04S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65Z"/></symbol>' +
    '</defs></svg>';
  document.body.insertAdjacentHTML('afterbegin', SPRITE);

  /* ================= Topo e rodapé ================= */
  function linkLoja(k, v) { return 'loja.html?' + k + '=' + encodeURIComponent(v); }

  function montarTopo() {
    var el = $('#topo'); if (!el) return;
    var assuntos = L.assuntos.filter(function (a) { return contarAssunto(a.id); });
    var tipos = L.tipos.filter(function (t) { return contarTipo(t.id); });
    var ativo = function (p) { return pagina === p ? ' aria-current="page"' : ''; };
    var q = pagina === 'loja' ? (paramsURL().get('q') || '') : '';

    el.innerHTML =
      '<div class="faixa-topo"><div class="container">' +
        '<span>' + ic('impressora') + 'Materiais em PDF para imprimir</span>' +
        '<span>' + ic('email') + 'Acesso na hora por e-mail</span>' +
        '<span>' + ic('cartao') + 'Pix, cartão ou boleto</span>' +
      '</div></div>' +
      '<div class="barra"><div class="container">' +
        '<button class="bt-menu" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu">' + ic('menu') + '</button>' +
        '<a class="marca" href="index.html" aria-label="Prof. Luiz Atividades Pedagógicas: página inicial">' +
          '<img src="img/logo.png" width="48" height="48" alt="">' +
          '<span><b>Prof. Luiz</b><small>Atividades Pedagógicas</small></span></a>' +
        '<form class="busca" action="loja.html" role="search">' +
          '<label class="sr" for="busca-topo">Buscar materiais</label>' +
          '<input id="busca-topo" name="q" type="search" value="' + esc(q) + '" placeholder="Buscar: sílabas, Dia das Crianças, 1º ano..." autocomplete="off">' +
          '<button type="submit" aria-label="Buscar">' + ic('busca') + '</button>' +
        '</form>' +
        '<a class="btn btn-whats bt-canal" href="' + esc(L.contatos.canalWhatsApp) + '" target="_blank" rel="noopener">' + ic('whatsapp') + '<span>Canal do WhatsApp</span></a>' +
      '</div></div>' +
      '<nav class="nav" aria-label="Menu principal"><div class="container">' +
        '<ul class="menu" id="menu-principal">' +
          '<li><a href="index.html"' + ativo('inicio') + '>Início</a></li>' +
          '<li><a href="loja.html"' + ativo('loja') + '>Loja</a></li>' +
          '<li class="tem-sub"><button type="button" aria-expanded="false"' + (pagina === 'categorias' ? ' class="atual"' : '') + '>Por assunto' + ic('baixo', 'seta-sub') + '</button>' +
            '<div class="sub"><ul>' +
              assuntos.map(function (a) {
                return '<li><a href="' + linkLoja('assunto', a.id) + '"><span class="emo" aria-hidden="true">' + a.icone + '</span>' + esc(a.nome) + '<small>' + contarAssunto(a.id) + '</small></a></li>';
              }).join('') +
              '<li class="ver-todos"><a href="categorias.html">Ver todas as categorias</a></li>' +
            '</ul></div></li>' +
          '<li class="tem-sub"><button type="button" aria-expanded="false">Por recurso' + ic('baixo', 'seta-sub') + '</button>' +
            '<div class="sub"><ul>' +
              tipos.map(function (t) {
                return '<li><a href="' + linkLoja('tipo', t.id) + '"><span class="emo" aria-hidden="true">' + t.icone + '</span>' + esc(t.nome) + '<small>' + contarTipo(t.id) + '</small></a></li>';
              }).join('') +
              '<li class="ver-todos"><a href="categorias.html#recursos">Ver todos os tipos</a></li>' +
            '</ul></div></li>' +
          '<li class="tem-sub"><button type="button" aria-expanded="false">Datas' + ic('baixo', 'seta-sub') + '</button>' +
            '<div class="sub sub-datas"><ul>' +
              DATAS.map(function (x) {
                return '<li><a href="' + linkLoja('data', x.d.id) + '">' + esc(x.d.nome) +
                  (idsAgora[x.d.id] ? '<em>agora</em>' : '') + '<small>' + esc(x.d.quando) + '</small></a></li>';
              }).join('') +
            '</ul></div></li>' +
        '</ul>' +
      '</div></nav>';

    var bt = $('.bt-menu', el), nav = $('.nav', el);
    bt.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      bt.setAttribute('aria-expanded', aberto);
      bt.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    var subs = el.querySelectorAll('.tem-sub > button');
    function fecharSubs(exceto) {
      subs.forEach(function (b) { if (b !== exceto) { b.setAttribute('aria-expanded', 'false'); b.parentNode.classList.remove('aberto'); } });
    }
    subs.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var abrir = b.getAttribute('aria-expanded') !== 'true';
        fecharSubs(b);
        b.setAttribute('aria-expanded', abrir);
        b.parentNode.classList.toggle('aberto', abrir);
      });
    });
    document.addEventListener('click', function (e) { if (!el.contains(e.target)) fecharSubs(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharSubs(); });
  }

  function montarRodape() {
    var el = $('#rodape'); if (!el) return;
    var c = L.contatos;
    el.innerHTML =
      '<div class="container"><div class="canal">' +
        '<div><h2>Receba os avisos de materiais novos</h2>' +
        '<p>Entre no meu Canal do WhatsApp para saber primeiro quando sair material novo e receber amostras grátis.</p></div>' +
        '<a class="btn btn-whats btn-grande" href="' + esc(c.canalWhatsApp) + '" target="_blank" rel="noopener">' + ic('whatsapp') + 'Entrar no Canal do WhatsApp</a>' +
      '</div></div>' +
      '<div class="rodape-escuro"><div class="container">' +
        '<div class="rod-marca">' +
          '<a class="marca" href="index.html"><img src="img/logo.png" width="48" height="48" alt=""><span><b>Prof. Luiz</b><small>Atividades Pedagógicas</small></span></a>' +
          '<p>Materiais pedagógicos e simulados em PDF para imprimir, da Educação Infantil ao Ensino Médio. Pagamento e entrega pela Kiwify.</p>' +
        '</div>' +
        '<div class="rod-col"><h2>Loja</h2>' +
          '<a href="loja.html">Todos os materiais</a>' +
          '<a href="categorias.html">Categorias</a>' +
          (DATAS.length ? '<a href="' + linkLoja('data', DATAS[0].d.id) + '">' + esc(DATAS[0].d.nome) + '</a>' : '') +
          '<a href="index.html#duvidas">Dúvidas frequentes</a>' +
        '</div>' +
        '<div class="rod-col redes"><h2>Acompanhe</h2>' +
          '<a href="' + esc(c.canalWhatsApp) + '" target="_blank" rel="noopener"><span class="bola" style="background:#1f9d55">' + ic('whatsapp') + '</span>Canal do WhatsApp</a>' +
          '<a href="' + esc(c.instagram) + '" target="_blank" rel="noopener"><span class="bola" style="background:linear-gradient(45deg,#f9a825,#e91e63,#8e24aa)">' + ic('instagram') + '</span>Instagram</a>' +
          '<a href="' + esc(c.facebook) + '" target="_blank" rel="noopener"><span class="bola" style="background:#1877f2">' + ic('facebook') + '</span>Facebook</a>' +
        '</div>' +
        '<div class="copy">© ' + new Date().getFullYear() + ' Prof. Luiz Atividades Pedagógicas. Material para uso do comprador em suas turmas; proibida a revenda e o compartilhamento.</div>' +
      '</div></div>';
  }

  /* ================= Cartão de produto ================= */
  function cartao(p, largo) {
    var dt = dataPrincipal(p);
    var tipo = mapaTipo[p.tipo] ? mapaTipo[p.tipo].nome : '';
    var url = 'produto.html?id=' + encodeURIComponent(p.id);
    var pr = preco(p.preco);
    return '<article class="card' + (largo ? ' card-largo' : '') + '">' +
      '<a class="card-capa" href="' + url + '" tabindex="-1" aria-hidden="true">' +
        '<img src="' + esc(p.capa) + '" width="600" height="500" loading="lazy" alt="">' +
        '<span class="etiquetas">' +
          (dt ? '<span class="etq etq-data' + (idsAgora[dt.id] ? ' quente' : '') + '">' + ic('calendario') + esc(dt.quando) + '</span>' : '') +
          (!temLink(p) ? '<span class="etq etq-breve">Em breve</span>' : p.novo ? '<span class="etq etq-novo">Novo</span>' : '') +
        '</span>' +
      '</a>' +
      '<div class="card-corpo">' +
        '<span class="card-tipo">' + esc(tipo) + (p.paginas ? ' • ' + p.paginas + ' páginas' : '') + '</span>' +
        '<h3><a href="' + url + '">' + esc(p.nome) + '</a></h3>' +
        '<span class="card-anos">' + esc(anosTexto(p)) + '</span>' +
        (largo ? '<ul class="card-itens">' + (p.itens || []).slice(0, 5).map(function (i) { return '<li>' + ic('check') + esc(i) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="card-rodape">' +
          (pr ? '<span class="preco">' + pr + '</span>' : '<span class="preco-info">Veja o preço</span>') +
          '<div class="card-botoes">' +
            '<a class="btn btn-contorno btn-p" href="' + url + '">Detalhes</a>' +
            (temLink(p) ? '<a class="btn btn-comprar btn-p" href="' + esc(p.link_kiwify) + '" aria-label="Comprar ' + esc(p.nome) + '">Comprar</a>'
              : '<a class="btn btn-whats btn-p" href="' + esc(L.contatos.canalWhatsApp) + '" target="_blank" rel="noopener" aria-label="Avise-me quando ' + esc(p.nome) + ' chegar">Avise-me</a>') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</article>';
  }
  function grade(lista) { return lista.map(function (p) { return cartao(p); }).join(''); }

  /* ================= Página inicial ================= */
  function paginaInicio() {
    var fx = $('#faixa-somativa'), cb = porId['combo-simave-escola'];
    var ini = new Date(2026, 9, 19), fim = new Date(2026, 9, 30);
    if (fx && cb && HOJE <= fim) {
      var n = dias(HOJE, ini);
      fx.innerHTML = '<div class="faixa-somativa">' +
        '<div class="fs-texto"><span class="fs-etq">' + ic('calendario') + (n > 0 ? 'Faltam ' + plural(n, 'dia', 'dias') + ' para a Avaliação Somativa' : 'Avaliação Somativa acontecendo') + ' (19 a 30/10)</span>' +
        '<h2>Simulados no estilo SIMAVE com gabarito comentado</h2>' +
        '<p>Português e Matemática do 2º, 5º e 9º ano e do 3º ano do Ensino Médio, com questões por descritor e planilha da turma. Material independente, não oficial.</p>' +
        '<div class="fs-botoes"><a class="btn btn-comprar" href="produto.html?id=combo-simave-escola">' + ic('sacola') + 'Pacote para a escola: ' + preco(cb.preco) + '</a>' +
        '<a class="btn btn-contorno" href="' + linkLoja('assunto', 'avaliacoes-externas') + '">Ver simulados avulsos</a></div></div>' +
        '<a class="fs-capa" href="produto.html?id=combo-simave-escola"><img src="' + esc(cb.capa) + '" alt="Pacote SIMAVE Escola" loading="lazy"></a></div>';
      $('#sec-somativa').hidden = false;
    }
    // Atalhos de assunto no topo
    var chips = $('#atalhos');
    if (chips) {
      chips.innerHTML = L.assuntos.filter(function (a) { return contarAssunto(a.id); }).slice(0, 6).map(function (a) {
        return '<a class="chip" href="' + linkLoja('assunto', a.id) + '"><span class="emo" aria-hidden="true">' + a.icone + '</span>' + esc(a.nome) + '</a>';
      }).join('');
    }

    // Temas para trabalhar agora (abas)
    var ag = $('#agora');
    if (ag && AGORA.length) {
      var abas = AGORA.map(function (x, i) {
        return '<button type="button" role="tab" id="aba-' + x.d.id + '" aria-controls="painel-' + x.d.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
          esc(x.d.nome) + '<small>' + esc(x.d.quando) + '</small></button>';
      }).join('');
      var paineis = AGORA.map(function (x, i) {
        var prods = produtosDaData(x.d.id);
        return '<div class="painel" role="tabpanel" id="painel-' + x.d.id + '" aria-labelledby="aba-' + x.d.id + '"' + (i === 0 ? '' : ' hidden') + '>' +
          '<div class="painel-info">' +
            '<span class="contagem">' + ic('relogio') + esc(contagem(x)) + '</span>' +
            '<h3>' + esc(x.d.nome) + '</h3>' +
            '<p class="quando">' + ic('calendario') + esc(x.d.quando) + '</p>' +
            '<p>' + (x.inf.ativa ? 'Está chegando! Materiais' : 'Comece a preparar: materiais') + ' prontos para imprimir, montar e usar com a turma.</p>' +
            '<a class="btn btn-escuro" href="' + linkLoja('data', x.d.id) + '">Ver ' + plural(prods.length, 'material', 'materiais') + ' da data</a>' +
          '</div>' +
          '<div class="grade-produtos' + (prods.length === 1 ? ' um' : '') + '">' + (prods.length === 1 ? cartao(prods[0], true) : grade(prods)) + '</div>' +
        '</div>';
      }).join('');
      ag.innerHTML = '<div class="abas" role="tablist" aria-label="Datas em evidência">' + abas + '</div>' + paineis;
      var bts = ag.querySelectorAll('[role=tab]');
      function ativar(b) {
        bts.forEach(function (o) {
          var sel = o === b;
          o.setAttribute('aria-selected', sel); o.tabIndex = sel ? 0 : -1;
          document.getElementById(o.getAttribute('aria-controls')).hidden = !sel;
        });
      }
      bts.forEach(function (b, i) {
        b.addEventListener('click', function () { ativar(b); });
        b.addEventListener('keydown', function (e) {
          var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
          if (j == null) return;
          var n = bts[(j + bts.length) % bts.length]; ativar(n); n.focus();
        });
      });
    } else if (ag) { ag.closest('section').hidden = true; }

    // Prepare o que vem por aí
    var vem = $('#vem');
    var proximas = DATAS.filter(function (x) { return !idsAgora[x.d.id]; }).slice(0, 4);
    if (vem && proximas.length) {
      vem.innerHTML = proximas.map(function (x) {
        var p = produtosDaData(x.d.id)[0];
        return '<a class="dcard" href="' + linkLoja('data', x.d.id) + '">' +
          '<span class="dcard-img"><img src="' + esc(p.capa) + '" width="600" height="500" loading="lazy" alt=""></span>' +
          '<span class="dcard-txt">' +
            '<span class="dcard-quando">' + ic('calendario') + esc(x.d.quando) + '</span>' +
            '<b>' + esc(x.d.nome) + '</b>' +
            '<span class="dcard-meta">' + esc(contagem(x)) + ' • ' + plural(x.n, 'material', 'materiais') + '</span>' +
          '</span></a>';
      }).join('');
    } else if (vem) { vem.closest('section').hidden = true; }

    // Destaques
    var dest = $('#destaques');
    if (dest) {
      var lista = P.filter(function (p) { return p.destaque; });
      if (!lista.length) lista = P.slice(-4);
      dest.innerHTML = grade(lista.slice(0, 8));
    }

    // Assuntos
    var as = $('#assuntos-home');
    if (as) as.innerHTML = L.assuntos.filter(function (a) { return contarAssunto(a.id); }).map(blocoAssunto).join('');
  }

  function blocoAssunto(a) {
    var n = contarAssunto(a.id);
    return '<a class="tile" href="' + linkLoja('assunto', a.id) + '" style="--cor:' + esc(a.cor) + '">' +
      '<span class="tile-ic emo" aria-hidden="true">' + a.icone + '</span>' +
      '<b>' + esc(a.nome) + '</b><small>' + plural(n, 'material', 'materiais') + '</small></a>';
  }

  /* ================= Loja (busca e filtros) ================= */
  function paginaLoja() {
    var u = paramsURL();
    function conj(k) { var s = {}; (u.get(k) || '').split(',').filter(Boolean).forEach(function (v) { s[v] = true; }); return s; }
    var st = { q: u.get('q') || '', assunto: conj('assunto'), tipo: conj('tipo'), ano: conj('ano'), data: conj('data'), ordem: u.get('ordem') || 'relevancia' };

    var aside = $('#filtros');
    function opcao(grupo, id, nome, n, extra) {
      return '<label class="opt' + (extra || '') + '"><input type="checkbox" name="' + grupo + '" value="' + esc(id) + '"' + (st[grupo][id] ? ' checked' : '') + '>' +
        '<span>' + esc(nome) + '</span><small>' + n + '</small></label>';
    }
    var htmlAssuntos = L.assuntos.filter(function (a) { return contarAssunto(a.id); }).map(function (a) {
      var subs = (a.sub || []).filter(function (s) { return contarAssunto(s.id); });
      var algumSub = subs.some(function (s) { return st.assunto[s.id]; });
      return '<div class="grupo-assunto">' + opcao('assunto', a.id, a.nome, contarAssunto(a.id)) +
        (subs.length ? '<details' + (algumSub ? ' open' : '') + '><summary>Subtemas</summary>' +
          subs.map(function (s) { return opcao('assunto', s.id, s.nome, contarAssunto(s.id), ' opt-sub'); }).join('') + '</details>' : '') +
        '</div>';
    }).join('');
    var tipos = L.tipos.filter(function (t) { return contarTipo(t.id); });
    var anos = L.anos.filter(function (a) { return contarAno(a.id); });

    aside.innerHTML =
      '<div class="filtros-topo"><h2>Filtrar</h2><button type="button" class="link" id="limpar">Limpar tudo</button></div>' +
      '<label class="sr" for="busca-loja">Buscar na loja</label>' +
      '<div class="busca busca-loja"><input id="busca-loja" type="search" placeholder="Buscar na loja..." value="' + esc(st.q) + '" autocomplete="off"><span>' + ic('busca') + '</span></div>' +
      '<fieldset><legend>Assunto</legend>' + htmlAssuntos + '</fieldset>' +
      (tipos.length ? '<fieldset><legend>Tipo de recurso</legend>' + tipos.map(function (t) { return opcao('tipo', t.id, t.nome, contarTipo(t.id)); }).join('') + '</fieldset>' : '') +
      (anos.length ? '<fieldset><legend>Ano / etapa</legend>' + anos.map(function (a) { return opcao('ano', a.id, a.nome, contarAno(a.id)); }).join('') + '</fieldset>' : '') +
      (DATAS.length ? '<fieldset><legend>Data comemorativa</legend>' + DATAS.map(function (x) { return opcao('data', x.d.id, x.d.nome, x.n); }).join('') + '</fieldset>' : '') +
      '<button type="button" class="btn btn-comprar ver-resultados" id="ver-resultados">Ver resultados</button>';

    var sel = $('#ordem'); sel.value = st.ordem;
    var busca = $('#busca-loja');

    function atualizarURL() {
      var p = new URLSearchParams();
      if (st.q) p.set('q', st.q);
      ['assunto', 'tipo', 'ano', 'data'].forEach(function (k) { var v = Object.keys(st[k]); if (v.length) p.set(k, v.join(',')); });
      if (st.ordem !== 'relevancia') p.set('ordem', st.ordem);
      var h = paramsURL().get('hoje'); if (h) p.set('hoje', h);
      var s = p.toString();
      try { history.replaceState(null, '', location.pathname + (s ? '?' + s : '')); } catch (e) { /* arquivo local */ }
    }

    function filtrar() {
      var toks = norm(st.q).split(/\s+/).filter(Boolean);
      var ks = { assunto: Object.keys(st.assunto), tipo: Object.keys(st.tipo), ano: Object.keys(st.ano), data: Object.keys(st.data) };
      var r = P.filter(function (p) {
        if (toks.length && !toks.every(function (t) { return p._busca.indexOf(t) >= 0; })) return false;
        if (ks.assunto.length && !ks.assunto.some(function (a) { return p._assuntos[a]; })) return false;
        if (ks.tipo.length && ks.tipo.indexOf(p.tipo) < 0) return false;
        if (ks.ano.length && !(p.anos || []).some(function (a) { return st.ano[a]; })) return false;
        if (ks.data.length && !datasDe(p).some(function (d) { return st.data[d]; })) return false;
        return true;
      });
      var semPreco = function (p, v) { return p.preco == null ? v : p.preco; };
      var agoraP = function (p) { return datasDe(p).some(function (d) { return idsAgora[d]; }) ? 0 : 1; };
      r.sort({
        relevancia: function (a, b) { return (agoraP(a) - agoraP(b)) || ((b.destaque ? 1 : 0) - (a.destaque ? 1 : 0)) || (a._ordem - b._ordem); },
        'menor-preco': function (a, b) { return (semPreco(a, 1e9) - semPreco(b, 1e9)) || (a._ordem - b._ordem); },
        'maior-preco': function (a, b) { return (semPreco(b, -1) - semPreco(a, -1)) || (a._ordem - b._ordem); },
        novidades: function (a, b) { return b._ordem - a._ordem; }
      }[st.ordem] || function (a, b) { return a._ordem - b._ordem; });
      return r;
    }

    function titulo() {
      var ch = [];
      Object.keys(st.assunto).forEach(function (a) { if (mapaAssunto[a]) ch.push(mapaAssunto[a].nome); });
      Object.keys(st.tipo).forEach(function (a) { if (mapaTipo[a]) ch.push(mapaTipo[a].nome); });
      Object.keys(st.ano).forEach(function (a) { if (mapaAno[a]) ch.push(mapaAno[a].nome); });
      Object.keys(st.data).forEach(function (a) { if (mapaData[a]) ch.push(mapaData[a].nome); });
      return ch;
    }

    function render() {
      var r = filtrar();
      var ch = titulo();
      $('#loja-titulo').textContent = ch.length === 1 && !st.q ? ch[0] : (st.q ? 'Resultados para “' + st.q + '”' : 'Todos os materiais');
      document.title = ($('#loja-titulo').textContent) + ' | Loja Prof. Luiz Atividades Pedagógicas';
      $('#contagem').textContent = plural(r.length, 'material encontrado', 'materiais encontrados');
      var n = ch.length + (st.q ? 1 : 0);
      $('#n-filtros').textContent = n ? '(' + n + ')' : '';
      var chips = [];
      if (st.q) chips.push({ k: 'q', v: st.q, nome: '“' + st.q + '”' });
      ['assunto', 'tipo', 'ano', 'data'].forEach(function (k) {
        var m = { assunto: mapaAssunto, tipo: mapaTipo, ano: mapaAno, data: mapaData }[k];
        Object.keys(st[k]).forEach(function (v) { if (m[v]) chips.push({ k: k, v: v, nome: m[v].nome }); });
      });
      $('#chips-ativos').innerHTML = chips.map(function (c) {
        return '<button type="button" class="chip chip-ativo" data-k="' + c.k + '" data-v="' + esc(c.v) + '" aria-label="Remover filtro ' + esc(c.nome) + '">' + esc(c.nome) + ic('x') + '</button>';
      }).join('');
      $('#resultados').innerHTML = r.length ? grade(r) :
        '<div class="vazio"><b>Nenhum material encontrado.</b><p>Tente outra palavra ou tire algum filtro.</p><button type="button" class="btn btn-contorno" id="limpar2">Limpar filtros</button></div>';
      var l2 = $('#limpar2'); if (l2) l2.addEventListener('click', limpar);
      $('#ver-resultados').textContent = 'Ver ' + plural(r.length, 'resultado', 'resultados');
      atualizarURL();
    }

    function limpar() {
      st.q = ''; st.assunto = {}; st.tipo = {}; st.ano = {}; st.data = {};
      busca.value = '';
      aside.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.checked = false; });
      var bt = $('#busca-topo'); if (bt) bt.value = '';
      render();
    }

    aside.addEventListener('change', function (e) {
      var c = e.target; if (c.type !== 'checkbox') return;
      if (c.checked) st[c.name][c.value] = true; else delete st[c.name][c.value];
      render();
    });
    var t;
    busca.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { st.q = busca.value.trim(); render(); }, 180); });
    var formTopo = $('#topo .busca');
    if (formTopo) formTopo.addEventListener('submit', function (e) {
      e.preventDefault(); st.q = $('#busca-topo').value.trim(); busca.value = st.q; render();
      $('#loja-titulo').scrollIntoView({ block: 'start' });
    });
    sel.addEventListener('change', function () { st.ordem = sel.value; render(); });
    $('#limpar').addEventListener('click', limpar);
    $('#chips-ativos').addEventListener('click', function (e) {
      var b = e.target.closest('.chip-ativo'); if (!b) return;
      var k = b.getAttribute('data-k'), v = b.getAttribute('data-v');
      if (k === 'q') { st.q = ''; busca.value = ''; var bt = $('#busca-topo'); if (bt) bt.value = ''; }
      else { delete st[k][v]; var cb = aside.querySelector('input[name="' + k + '"][value="' + v + '"]'); if (cb) cb.checked = false; }
      render();
    });
    var btF = $('#bt-filtros');
    btF.addEventListener('click', function () {
      var ab = aside.classList.toggle('aberto'); btF.setAttribute('aria-expanded', ab);
    });
    $('#ver-resultados').addEventListener('click', function () {
      aside.classList.remove('aberto'); btF.setAttribute('aria-expanded', 'false');
      $('#resultados').scrollIntoView({ block: 'start' });
    });
    render();
  }

  /* ================= Categorias ================= */
  function paginaCategorias() {
    var box = $('#lista-categorias');
    var ativos = L.assuntos.filter(function (a) { return contarAssunto(a.id); });
    box.innerHTML = ativos.map(function (a) {
      var subs = (a.sub || []).filter(function (s) { return contarAssunto(s.id); });
      return '<article class="cat" style="--cor:' + esc(a.cor) + '" data-busca="' + esc(norm(a.nome + ' ' + subs.map(function (s) { return s.nome; }).join(' '))) + '">' +
        '<a class="cat-cab" href="' + linkLoja('assunto', a.id) + '">' +
          '<span class="tile-ic emo" aria-hidden="true">' + a.icone + '</span>' +
          '<span><h2>' + esc(a.nome) + '</h2><small>' + plural(contarAssunto(a.id), 'material', 'materiais') + '</small></span>' +
          ic('dir', 'cat-seta') +
        '</a>' +
        (subs.length ? '<div class="cat-subs">' + subs.map(function (s) {
          return '<a class="chip" data-busca="' + esc(norm(s.nome)) + '" href="' + linkLoja('assunto', s.id) + '">' + esc(s.nome) + '<small>' + contarAssunto(s.id) + '</small></a>';
        }).join('') + '</div>' : '') +
      '</article>';
    }).join('');

    $('#lista-recursos').innerHTML = L.tipos.filter(function (t) { return contarTipo(t.id); }).map(function (t) {
      return '<a class="tile tile-largo" href="' + linkLoja('tipo', t.id) + '" style="--cor:#ef6c00"><span class="tile-ic emo" aria-hidden="true">' + t.icone + '</span>' +
        '<span><b>' + esc(t.nome) + '</b><small>' + esc(t.desc) + ' • ' + plural(contarTipo(t.id), 'material', 'materiais') + '</small></span></a>';
    }).join('');
    $('#lista-anos').innerHTML = L.anos.filter(function (a) { return contarAno(a.id); }).map(function (a) {
      return '<a class="chip chip-grande" href="' + linkLoja('ano', a.id) + '">' + esc(a.nome) + '<small>' + contarAno(a.id) + '</small></a>';
    }).join('');
    $('#lista-datas').innerHTML = DATAS.map(function (x) {
      return '<a class="chip chip-grande" href="' + linkLoja('data', x.d.id) + '">' + ic('calendario') + esc(x.d.nome) + '<small>' + x.n + '</small></a>';
    }).join('');

    var inp = $('#busca-cat'), vazio = $('#cat-vazio');
    inp.addEventListener('input', function () {
      var q = norm(inp.value.trim()), algum = false;
      box.querySelectorAll('.cat').forEach(function (c) {
        var ok = !q || c.getAttribute('data-busca').indexOf(q) >= 0;
        c.hidden = !ok; if (ok) algum = true;
        c.querySelectorAll('.cat-subs .chip').forEach(function (s) { s.classList.toggle('marcado', !!q && s.getAttribute('data-busca').indexOf(q) >= 0); });
      });
      vazio.hidden = algum;
    });
  }

  /* ================= Produto ================= */
  function setMeta(sel, attr, val) { var m = document.querySelector(sel); if (m) m.setAttribute(attr, val); }

  function paginaProduto() {
    var id = paramsURL().get('id');
    var p = porId[id];
    var main = $('#produto');
    if (!p) {
      main.innerHTML = '<div class="container"><div class="vazio vazio-pagina"><b>Material não encontrado.</b><p>Ele pode ter mudado de nome ou saído da loja.</p><a class="btn btn-comprar" href="loja.html">Ver todos os materiais</a></div></div>';
      $('#relacionados').innerHTML = grade(P.filter(function (o) { return o.destaque; }).slice(0, 4));
      return;
    }
    var dt = dataPrincipal(p);
    var infoDt = dt ? DATAS.filter(function (x) { return x.d.id === dt.id; })[0] : null;
    var pr = preco(p.preco);
    var imgs = [{ src: p.capa, alt: 'Capa do ' + p.nome, capa: true }].concat((p.previas || []).map(function (s, i) {
      return { src: s, alt: 'Prévia da página ' + (i + 1) + ' do ' + p.nome };
    }));
    var principal = null;
    Object.keys(p._assuntos).some(function (a) { if (!mapaAssunto[a].pai) { principal = mapaAssunto[a]; return true; } });

    var titulo = p.nome + ' | Prof. Luiz Atividades Pedagógicas';
    var desc = (p.descricao || '').slice(0, 155);
    document.title = titulo;
    setMeta('meta[name=description]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', titulo);
    setMeta('meta[property="og:description"]', 'content', desc);

    var tags = Object.keys(p._assuntos).map(function (a) {
      return '<a class="chip" href="' + linkLoja('assunto', a) + '">' + esc(mapaAssunto[a].nome) + '</a>';
    }).join('');

    main.innerHTML =
      '<div class="container">' +
      '<nav class="migalhas" aria-label="Você está em"><a href="index.html">Início</a><span>/</span><a href="loja.html">Loja</a>' +
        (principal ? '<span>/</span><a href="' + linkLoja('assunto', principal.id) + '">' + esc(principal.nome) + '</a>' : '') +
        '<span>/</span><b>' + esc(p.nome) + '</b></nav>' +
      '<div class="prod">' +
        '<div class="galeria">' +
          '<div class="visor">' +
            '<span class="contador" id="g-cont" aria-live="polite"></span>' +
            '<button class="seta esq" type="button" id="g-ant" aria-label="Imagem anterior">' + ic('esq') + '</button>' +
            '<div class="trilho" id="g-trilho" tabindex="0" aria-label="Imagens do material">' +
              imgs.map(function (im, i) {
                return '<figure class="' + (im.capa ? 'e-capa' : 'e-pagina') + '"><img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '"' + (i ? ' loading="lazy"' : ' fetchpriority="high"') + '></figure>';
              }).join('') +
            '</div>' +
            '<button class="seta dir" type="button" id="g-prox" aria-label="Próxima imagem">' + ic('dir') + '</button>' +
          '</div>' +
          '<div class="miniaturas" id="g-mini">' +
            imgs.map(function (im, i) {
              var m = im.capa ? im.src : miniatura(im.src);
              return '<button type="button" class="miniatura' + (im.capa ? ' m-capa' : '') + '" data-i="' + i + '" aria-label="Ver imagem ' + (i + 1) + '"><img src="' + esc(m) + '" data-full="' + esc(im.src) + '" alt="" loading="lazy"></button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="compra-box">' +
          '<div class="etiquetas-linha">' +
            '<span class="etq etq-tipo">' + esc(mapaTipo[p.tipo] ? mapaTipo[p.tipo].nome : '') + '</span>' +
            (dt ? '<span class="etq etq-data' + (idsAgora[dt.id] ? ' quente' : '') + '">' + ic('calendario') + esc(dt.nome) + ': ' + esc(dt.quando) + '</span>' : '') +
            (!temLink(p) ? '<span class="etq etq-breve">Em breve</span>' : p.novo ? '<span class="etq etq-novo">Novo</span>' : '') +
          '</div>' +
          '<h1>' + esc(p.nome) + '</h1>' +
          '<p class="prod-desc">' + esc(p.descricao) + '</p>' +
          '<ul class="ficha">' +
            (anosTexto(p) ? '<li><span>Ano / etapa</span><b>' + esc(anosTexto(p)) + '</b></li>' : '') +
            (p.paginas ? '<li><span>Páginas</span><b>' + p.paginas + ' páginas</b></li>' : '') +
            '<li><span>Formato</span><b>PDF em A4 para imprimir</b></li>' +
            '<li><span>Entrega</span><b>Acesso por e-mail logo após o pagamento</b></li>' +
          '</ul>' +
          '<div class="preco-box">' +
            (pr ? '<span class="preco preco-g">' + pr + '</span>' : '<span class="preco-info">Veja o preço na página de compra</span>') +
            (infoDt ? '<span class="contagem">' + ic('relogio') + esc(contagem(infoDt)) + (infoDt.d.dia ? ' para ' + esc(infoDt.d.quando) : '') + '</span>' : '') +
          '</div>' +
          (temLink(p) ? '<a class="btn btn-comprar btn-grande btn-bloco" href="' + esc(p.link_kiwify) + '">' + ic('sacola') + 'Comprar na Kiwify</a>' +
              (p.amostra ? '<a class="btn btn-contorno btn-grande btn-bloco btn-amostra" href="' + esc(p.amostra) + '" target="_blank" rel="noopener">' + ic('pagina') + 'Baixar amostra grátis (PDF)</a>' : '') +
              (p._assuntos['avaliacoes-externas'] && p.id !== 'combo-simave-escola' && porId['combo-simave-escola'] ? '<a class="upsell" href="produto.html?id=combo-simave-escola"><b>Vai aplicar na escola toda?</b> O pacote <u>SIMAVE Escola</u> traz os 8 simulados + bônus por ' + preco(porId['combo-simave-escola'].preco) + ', com uso liberado para os professores da escola.</a>' : '')
            : '<p class="aviso-breve">Este material chega à loja nos próximos dias. Entre no Canal do WhatsApp para ser avisado(a) no lançamento.</p>' +
              '<a class="btn btn-whats btn-grande btn-bloco" href="' + esc(L.contatos.canalWhatsApp) + '" target="_blank" rel="noopener">' + ic('whatsapp') + 'Avise-me no Canal do WhatsApp</a>') +
          '<ul class="garantias">' +
            '<li>' + ic('cartao') + 'Pix, cartão ou boleto</li>' +
            '<li>' + ic('escudo') + 'Pagamento seguro pela Kiwify</li>' +
            '<li>' + ic('impressora') + 'Imprima quantas vezes precisar para as suas turmas</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="prod-detalhes">' +
        '<section><h2>O que vem no material</h2><ul class="itens">' +
          (p.itens || []).map(function (i) { return '<li>' + ic('check') + esc(i) + '</li>'; }).join('') +
        '</ul></section>' +
        '<section class="prod-lado"><h2>Assuntos</h2><div class="tags">' + tags + '</div>' +
          '<p class="nota">Licença de uso para quem comprou, em suas turmas. Proibida a revenda e o compartilhamento do arquivo.</p></section>' +
      '</div>' +
      '</div>';

    // Relacionados
    var rel = P.filter(function (o) { return o.id !== p.id; }).map(function (o) {
      var s = 0;
      Object.keys(o._assuntos).forEach(function (a) { if (p._assuntos[a]) s += mapaAssunto[a].pai ? 2 : 1; });
      if (o.tipo === p.tipo) s += 0.5;
      if (datasDe(o).some(function (d) { return datasDe(p).indexOf(d) >= 0; })) s += 3;
      (o.anos || []).forEach(function (a) { if ((p.anos || []).indexOf(a) >= 0) s += 0.5; });
      return { o: o, s: s };
    }).sort(function (a, b) { return (b.s - a.s) || (a.o._ordem - b.o._ordem); }).slice(0, 4).map(function (x) { return x.o; });
    var relBox = $('#relacionados');
    if (rel.length) relBox.innerHTML = grade(rel); else relBox.closest('section').hidden = true;

    // Dados estruturados (Google)
    var ld = { '@context': 'https://schema.org', '@type': 'Product', name: p.nome, description: p.descricao, image: [p.capa].concat(p.previas || []).map(function (s) { return new URL(s, location.href).href; }), brand: { '@type': 'Brand', name: 'Prof. Luiz Atividades Pedagógicas' } };
    if (p.preco != null && temLink(p)) ld.offers = { '@type': 'Offer', price: Number(p.preco).toFixed(2), priceCurrency: 'BRL', availability: 'https://schema.org/InStock', url: p.link_kiwify };
    var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(ld); document.head.appendChild(sc);

    // Galeria
    var trilho = $('#g-trilho'), figs = trilho.querySelectorAll('figure'), minis = document.querySelectorAll('#g-mini .miniatura');
    var ant = $('#g-ant'), prox = $('#g-prox'), cont = $('#g-cont'), atual = 0;
    document.querySelectorAll('#g-mini img').forEach(function (im) {
      im.addEventListener('error', function () { var f = im.getAttribute('data-full'); if (im.src.indexOf(f) < 0) im.src = f; });
    });
    function marcar(i) {
      atual = i;
      cont.textContent = (i + 1) + ' de ' + figs.length;
      ant.disabled = i === 0; prox.disabled = i === figs.length - 1;
      minis.forEach(function (m, j) { m.setAttribute('aria-current', j === i ? 'true' : 'false'); });
    }
    function ir(i) {
      i = Math.max(0, Math.min(figs.length - 1, i));
      trilho.scrollTo({ left: i * trilho.clientWidth, behavior: 'smooth' });
      marcar(i);
    }
    var tm;
    trilho.addEventListener('scroll', function () {
      clearTimeout(tm);
      tm = setTimeout(function () { marcar(Math.round(trilho.scrollLeft / trilho.clientWidth)); }, 60);
    }, { passive: true });
    ant.addEventListener('click', function () { ir(atual - 1); });
    prox.addEventListener('click', function () { ir(atual + 1); });
    minis.forEach(function (m) { m.addEventListener('click', function () { ir(+m.getAttribute('data-i')); }); });
    trilho.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); ir(atual + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); ir(atual - 1); }
    });
    marcar(0);
  }

  /* ================= Início ================= */
  montarTopo();
  montarRodape();
  if (pagina === 'inicio') paginaInicio();
  if (pagina === 'loja') paginaLoja();
  if (pagina === 'categorias') paginaCategorias();
  if (pagina === 'produto') paginaProduto();
})();
