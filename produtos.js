/* =========================================================================
   PRODUTOS DA LOJA: Prof. Luiz Atividades Pedagógicas
   -------------------------------------------------------------------------
   Este é o ÚNICO arquivo que você edita para colocar produto novo, mudar
   preço ou link. Passo a passo no COMO-PUBLICAR.md.

   Cada produto (lá embaixo, em window.PRODUTOS) tem estes campos:

     id           Nome curto e único, sem acento e sem espaço (vai no endereço:
                  produto.html?id=kit-dia-das-criancas).
     nome         Nome que aparece na loja.
     tipo         Um destes: "explicativo", "exercicios", "simulado",
                  "painel", "jogo", "kit"  (veja LOJA.tipos).
     assuntos     Lista de assuntos/subassuntos (veja LOJA.assuntos).
                  Ex.: ["alfabetizacao", "consciencia-fonologica"].
     anos         Lista de anos/etapas: "ei" (Ed. Infantil), "1" a "5", "aee".
     publico      (opcional) Texto que substitui os anos no cartão.
     data         Data comemorativa (veja LOJA.datas) ou null.
                  Pode ser uma lista: ["dia-do-saci", "folclore"].
     preco        Número com PONTO: 12.90  (ou null para "Veja o preço").
     paginas      Número de páginas do PDF.
     capa         Imagem da capa (1200x1000 ou 600x500).
     previas      Lista de imagens das páginas de prévia.
     descricao    Um parágrafo sobre o material.
     itens        Lista "O que vem no material".
     link_kiwify  Link de compra. Produto SEM link fica escondido do site,
                  a não ser que tenha em_breve: true (aparece como "Em breve",
                  com botão para o Canal do WhatsApp).
     destaque     true = aparece em "Destaques da loja" na página inicial.
     novo         true = mostra a etiqueta "Novo".

   A ordem da lista importa: coloque os produtos NOVOS NO FIM
   (o filtro "Novidades" mostra primeiro os últimos da lista).
   ========================================================================= */

window.LOJA = {
  contatos: {
    canalWhatsApp: "https://whatsapp.com/channel/0029Vb8o31B8fewl8BBT7V2B",
    instagram: "https://www.instagram.com/prof.luiz.atividades/",
    facebook: "https://www.facebook.com/profile.php?id=61594672984541"
  },

  /* Tipos de recurso (menu POR RECURSO e filtro da loja). */
  tipos: [
    { id: "explicativo", nome: "Material explicativo", desc: "Resumos, mapas mentais e cartazes explicativos", icone: "💡" },
    { id: "exercicios",  nome: "Exercícios e atividades", desc: "Folhas de atividades para imprimir", icone: "✏️" },
    { id: "simulado",    nome: "Simulado", desc: "Provas e simulados com gabarito", icone: "📝" },
    { id: "painel",      nome: "Banner e painel", desc: "Painéis, murais e banners para a sala", icone: "🖼️" },
    { id: "jogo",        nome: "Jogo", desc: "Jogos pedagógicos para imprimir", icone: "🎲" },
    { id: "kit",         nome: "Kit completo", desc: "Atividades, jogos e recursos num só arquivo", icone: "📦" }
  ],

  /* Anos / etapas. */
  anos: [
    { id: "ei",  nome: "Educação Infantil", curto: "Ed. Infantil" },
    { id: "1",   nome: "1º ano", curto: "1º" },
    { id: "2",   nome: "2º ano", curto: "2º" },
    { id: "3",   nome: "3º ano", curto: "3º" },
    { id: "4",   nome: "4º ano", curto: "4º" },
    { id: "5",   nome: "5º ano", curto: "5º" },
    { id: "9",   nome: "9º ano", curto: "9º" },
    { id: "em",  nome: "Ensino Médio", curto: "EM" },
    { id: "aee", nome: "AEE e Inclusão", curto: "AEE" }
  ],

  /* Assuntos e subassuntos (menu POR ASSUNTO, filtro e página Categorias).
     Assunto sem nenhum produto fica escondido automaticamente. */
  assuntos: [
    { id: "alfabetizacao", nome: "Alfabetização", icone: "🔤", cor: "#ef6c00", sub: [
      { id: "leitura-e-escrita", nome: "Leitura e Escrita" },
      { id: "consciencia-fonologica", nome: "Consciência Fonológica" },
      { id: "sondagem-escrita", nome: "Sondagem de Escrita" }
    ]},
    { id: "lingua-portuguesa", nome: "Língua Portuguesa", icone: "📖", cor: "#0288d1", sub: [
      { id: "leitura-e-interpretacao", nome: "Leitura e Interpretação" },
      { id: "ortografia", nome: "Ortografia" },
      { id: "gramatica", nome: "Gramática" },
      { id: "producao-de-texto", nome: "Produção de Texto" }
    ]},
    { id: "matematica", nome: "Matemática", icone: "🔢", cor: "#1e88e5", sub: [
      { id: "sistema-de-numeracao", nome: "Sistema de Numeração" },
      { id: "adicao-e-subtracao", nome: "Adição e Subtração" },
      { id: "sistema-monetario", nome: "Sistema Monetário" },
      { id: "problemas", nome: "Situações-Problema" },
      { id: "avaliacao-diagnostica", nome: "Avaliação Diagnóstica" }
    ]},
    { id: "datas-comemorativas", nome: "Datas Comemorativas", icone: "🎈", cor: "#e53935", sub: [
      { id: "lembrancinhas", nome: "Lembrancinhas" },
      { id: "certificados", nome: "Certificados e Diplomas" }
    ]},
    { id: "recursos-sala", nome: "Recursos para a Sala de Aula", icone: "🏫", cor: "#8e24aa", sub: [
      { id: "painel-mural", nome: "Painel e Mural" },
      { id: "decoracao", nome: "Decoração" },
      { id: "rotina", nome: "Rotina e Combinados" }
    ]},
    { id: "jogos", nome: "Jogos e Dinâmicas", icone: "🎲", cor: "#2e7d32", sub: [
      { id: "bingo", nome: "Bingo" },
      { id: "caca-palavras", nome: "Caça-palavras e Cruzadinhas" }
    ]},
    { id: "inclusao", nome: "Inclusão", icone: "💛", cor: "#f9a825", sub: [
      { id: "atividades-adaptadas", nome: "Atividades Adaptadas" },
      { id: "rotina-visual", nome: "Rotina Visual" }
    ]},
    { id: "historia-geografia", nome: "História e Cultura", icone: "🌎", cor: "#6d4c41", sub: [
      { id: "cultura-afro-brasileira", nome: "Cultura Afro-brasileira" },
      { id: "folclore-brasileiro", nome: "Folclore Brasileiro" }
    ]},
    { id: "avaliacoes-externas", nome: "Avaliações Externas (SIMAVE)", icone: "📝", cor: "#3949ab", sub: [
      { id: "simulado-lp", nome: "Simulados de Língua Portuguesa" },
      { id: "simulado-mt", nome: "Simulados de Matemática" }
    ]},
    { id: "ciencias", nome: "Ciências", icone: "🔬", cor: "#00897b", sub: [] },
    { id: "sequencias-didaticas", nome: "Sequências Didáticas", icone: "🧭", cor: "#5e35b1", sub: [] }
  ],

  /* Calendário das datas comemorativas.
       dia          Dia da data (DD/MM) para a contagem "Faltam X dias", ou null.
       quando       Texto curto da data.
       destaqueDe / destaqueAte   Janela (DD/MM) em que a data aparece em
                    "Temas para trabalhar agora" na página inicial.
     Data sem nenhum produto fica escondida automaticamente. */
  datas: [
    { id: "volta-as-aulas",      nome: "Volta às Aulas",          dia: null,    quando: "Fevereiro",       destaqueDe: "10/01", destaqueAte: "15/02" },
    { id: "dia-da-mulher",       nome: "Dia da Mulher",           dia: "08/03", quando: "8 de março",      destaqueDe: "20/02", destaqueAte: "06/03" },
    { id: "povos-indigenas",     nome: "Dia dos Povos Indígenas", dia: "19/04", quando: "19 de abril",     destaqueDe: "01/04", destaqueAte: "17/04" },
    { id: "dia-das-maes",        nome: "Dia das Mães",            dia: null,    quando: "Maio",            destaqueDe: "20/04", destaqueAte: "08/05" },
    { id: "meio-ambiente",       nome: "Dia do Meio Ambiente",    dia: "05/06", quando: "5 de junho",      destaqueDe: "20/05", destaqueAte: "03/06" },
    { id: "festa-junina",        nome: "Festa Junina",            dia: null,    quando: "Junho",           destaqueDe: "15/05", destaqueAte: "20/06" },
    { id: "dia-dos-pais",        nome: "Dia dos Pais",            dia: null,    quando: "Agosto",          destaqueDe: "20/07", destaqueAte: "07/08" },
    { id: "folclore",            nome: "Folclore",                dia: "22/08", quando: "22 de agosto",    destaqueDe: "01/08", destaqueAte: "20/08" },
    { id: "independencia",       nome: "Independência do Brasil", dia: "07/09", quando: "7 de setembro",   destaqueDe: "20/08", destaqueAte: "05/09" },
    { id: "dia-dos-animais",     nome: "Dia dos Animais",         dia: "04/10", quando: "4 de outubro",    destaqueDe: "20/09", destaqueAte: "03/10" },
    { id: "avaliacao-somativa",  nome: "Avaliação Somativa (SIMAVE)", dia: "19/10", quando: "19 a 30 de outubro", destaqueDe: "20/09", destaqueAte: "17/10" },
    { id: "dia-das-criancas",    nome: "Dia das Crianças",        dia: "12/10", quando: "12 de outubro",   destaqueDe: "29/09", destaqueAte: "08/10" },
    { id: "dia-do-professor",    nome: "Dia do Professor",        dia: "15/10", quando: "15 de outubro",   destaqueDe: "29/09", destaqueAte: "11/10" },
    { id: "dia-do-saci",         nome: "Dia do Saci e Halloween", dia: "31/10", quando: "31 de outubro",   destaqueDe: "13/10", destaqueAte: "29/10" },
    { id: "consciencia-negra",   nome: "Consciência Negra",       dia: "20/11", quando: "20 de novembro",  destaqueDe: "01/11", destaqueAte: "18/11" },
    { id: "fim-de-ano",          nome: "Fim de Ano e Natal",      dia: null,    quando: "Dezembro",        destaqueDe: "15/11", destaqueAte: "15/12" }
  ]
};

window.PRODUTOS = [
  {
    id: "kit-familias-silabicas",
    nome: "Kit Famílias Silábicas",
    tipo: "kit",
    assuntos: ["alfabetizacao", "consciencia-fonologica", "leitura-e-escrita", "sondagem-escrita", "bingo", "caca-palavras"],
    anos: ["1", "2"],
    data: null,
    preco: 14.90, // preço atual na Kiwify
    paginas: 32,
    capa: "img/produtos/kit-alfabetizacao/capa.jpg",
    previas: ["img/produtos/kit-alfabetizacao/p4.jpg", "img/produtos/kit-alfabetizacao/p24.jpg", "img/produtos/kit-alfabetizacao/p27.jpg", "img/produtos/kit-alfabetizacao/p1.jpg"],
    descricao: "Tudo para trabalhar as sílabas simples com a turma, das vogais à leitura de frases. Cada família silábica tem uma folha completa, com cobrir, completar, contar sílabas, pintar e escrever.",
    itens: [
      "Vogais para revisão e diagnóstico",
      "14 famílias silábicas (B, C, D, F, G, J, L, M, N, P, R, S, T, V), uma folha por família",
      "80 sílabas móveis para recortar e formar palavras",
      "Bingo de sílabas com 8 cartelas diferentes",
      "Ditado ilustrado em 2 níveis",
      "Leitura de frases: leio e ligo",
      "Caça-palavras em 2 níveis",
      "Sondagem de escrita com orientações e ficha de acompanhamento da turma",
      "Certificado de pequeno leitor e gabarito completo"
    ],
    amostra: "amostras/kit-familias-silabicas.pdf",
    link_kiwify: "https://pay.kiwify.com.br/OP8FteN",
    destaque: true,
    novo: false
  },
  {
    id: "kit-dia-das-criancas",
    nome: "Kit Dia das Crianças",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "lembrancinhas", "certificados", "leitura-e-interpretacao", "caca-palavras"],
    anos: ["ei", "1", "2", "3"],
    data: "dia-das-criancas",
    preco: 12.90,
    paginas: 15,
    capa: "img/produtos/kit-dia-das-criancas/capa.jpg",
    previas: ["img/produtos/kit-dia-das-criancas/p3.jpg", "img/produtos/kit-dia-das-criancas/p6.jpg", "img/produtos/kit-dia-das-criancas/p4.jpg", "img/produtos/kit-dia-das-criancas/p8.jpg", "img/produtos/kit-dia-das-criancas/p12.jpg"],
    descricao: "Kit completo para o Dia das Crianças, pronto para imprimir: lembrancinhas coloridas para montar e atividades sobre o tema.",
    itens: [
      "12 etiquetas de pirulito",
      "8 tags para saquinho e cone de doces",
      "9 medalhas",
      "Eu sou especial e leitura com interpretação",
      "Direitos da criança (ECA)",
      "Entrevista sobre brincadeiras de antigamente",
      "Caça-palavras, página para colorir, desenho e escrita",
      "Certificado e gabarito"
    ],
    amostra: "amostras/kit-dia-das-criancas.pdf",
    link_kiwify: "https://pay.kiwify.com.br/6tMxjub",
    destaque: false,
    novo: false
  },
  {
    id: "kit-dia-do-professor",
    nome: "Kit Dia do Professor",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "lembrancinhas", "certificados", "painel-mural"],
    anos: [],
    publico: "Para a equipe escolar",
    data: "dia-do-professor",
    preco: 12.90,
    paginas: 14,
    capa: "img/produtos/kit-dia-do-professor/capa.jpg",
    previas: ["img/produtos/kit-dia-do-professor/p3.jpg", "img/produtos/kit-dia-do-professor/p8.jpg", "img/produtos/kit-dia-do-professor/p5.jpg", "img/produtos/kit-dia-do-professor/p7.jpg", "img/produtos/kit-dia-do-professor/p11.jpg"],
    descricao: "Lembrancinhas prontas para a coordenação e a direção homenagearem os professores no dia 15 de outubro. É só imprimir e montar.",
    itens: [
      "12 tags redondas e 8 tags para mimo",
      "4 cartões e 4 marca-páginas",
      "Caixinha para bombons",
      "8 vales-presente divertidos para a sala dos professores",
      "Certificado Professor(a) Nota 10",
      "Carta para os alunos escreverem",
      "Painel de bandeirolas FELIZ DIA DO PROFESSOR"
    ],
    amostra: "amostras/kit-dia-do-professor.pdf",
    link_kiwify: "https://pay.kiwify.com.br/FefvCTM",
    destaque: false,
    novo: false
  },
  {
    id: "kit-fim-de-ano",
    nome: "Kit Fim de Ano",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "certificados", "lembrancinhas", "caca-palavras"],
    anos: ["ei", "1", "2", "3", "4", "5"],
    data: "fim-de-ano",
    preco: 14.90,
    paginas: 16,
    capa: "img/produtos/kit-fim-de-ano/capa.jpg",
    previas: ["img/produtos/kit-fim-de-ano/p4.jpg", "img/produtos/kit-fim-de-ano/p3.jpg", "img/produtos/kit-fim-de-ano/p12.jpg", "img/produtos/kit-fim-de-ano/p13.jpg", "img/produtos/kit-fim-de-ano/p9.jpg", "img/produtos/kit-fim-de-ano/p15.jpg"],
    descricao: "Para encerrar o ano letivo: certificados de conclusão coloridos para cada ano e lembrancinhas de Natal para a festa de encerramento.",
    itens: [
      "6 certificados de conclusão coloridos (Ed. Infantil, 1º, 2º, 3º, 4º e 5º ano)",
      "Diploma Aluno(a) Destaque",
      "Retrospectiva \"Meu ano na escola\"",
      "Bilhete para as famílias",
      "12 tags e 4 cartões de Natal",
      "Caça-palavras, página para colorir e gabarito"
    ],
    amostra: "amostras/kit-fim-de-ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/YzR1FS1",
    destaque: false,
    novo: false
  },
  {
    id: "kit-consciencia-negra",
    nome: "Kit Consciência Negra",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "cultura-afro-brasileira", "leitura-e-interpretacao", "painel-mural", "caca-palavras"],
    anos: ["1", "2", "3", "4", "5"],
    data: "consciencia-negra",
    preco: 14.90,
    paginas: 15,
    capa: "img/produtos/kit-consciencia-negra/capa.jpg",
    previas: ["img/produtos/kit-consciencia-negra/p3.jpg", "img/produtos/kit-consciencia-negra/p5.jpg", "img/produtos/kit-consciencia-negra/p12.jpg", "img/produtos/kit-consciencia-negra/p9.jpg", "img/produtos/kit-consciencia-negra/p14.jpg"],
    descricao: "Kit para o 20 de novembro, Dia de Zumbi e da Consciência Negra: leituras, biografias, palavras de origem africana e um mural colorido com frases de respeito.",
    itens: [
      "Leitura sobre Zumbi e Palmares com interpretação",
      "Biografias de Dandara, Carolina Maria de Jesus e Luiz Gama, com perguntas",
      "Palavras de origem africana (2 páginas)",
      "Caça-palavras",
      "Eu e minha história",
      "Atividade sobre respeito",
      "Mural com 12 faixas coloridas",
      "Página para colorir e gabarito"
    ],
    amostra: "amostras/kit-consciencia-negra.pdf",
    link_kiwify: "https://pay.kiwify.com.br/yrdgo6k",
    destaque: false,
    novo: false
  },
  {
    id: "kit-volta-as-aulas",
    nome: "Kit Volta às Aulas",
    tipo: "kit",
    assuntos: ["recursos-sala", "decoracao", "rotina", "painel-mural", "sondagem-escrita", "avaliacao-diagnostica"],
    anos: ["1", "2", "3"],
    data: "volta-as-aulas",
    preco: 14.90,
    paginas: 18,
    capa: "img/produtos/kit-volta-as-aulas/capa.jpg",
    previas: ["img/produtos/kit-volta-as-aulas/p3.jpg", "img/produtos/kit-volta-as-aulas/p9.jpg", "img/produtos/kit-volta-as-aulas/p4.jpg", "img/produtos/kit-volta-as-aulas/p8.jpg", "img/produtos/kit-volta-as-aulas/p11.jpg", "img/produtos/kit-volta-as-aulas/p15.jpg"],
    descricao: "Tudo para a primeira semana de aula: crachás, sondagens iniciais, combinados da turma e decoração para a sala e a porta.",
    itens: [
      "8 crachás coloridos e plaquinhas de mesa dobráveis",
      "Tudo sobre mim",
      "Sondagem de escrita com orientações ao professor",
      "Sondagem de matemática",
      "8 cartazes de combinados da turma",
      "Quadro de aniversariantes com os 12 meses",
      "Bilhete de boas-vindas às famílias",
      "Bandeirolas BEM-VINDOS para a porta",
      "Caça-palavras e gabarito"
    ],
    amostra: "amostras/kit-volta-as-aulas.pdf",
    link_kiwify: "https://pay.kiwify.com.br/Eday2PZ",
    destaque: false,
    novo: false
  },
  {
    id: "kit-folclore-saci-halloween",
    nome: "Kit Folclore: Dia do Saci e Halloween",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "folclore-brasileiro", "leitura-e-interpretacao", "bingo", "caca-palavras"],
    anos: ["ei", "1", "2", "3"],
    data: ["dia-do-saci", "folclore"],
    preco: 12.90,
    paginas: 16,
    capa: "img/produtos/kit-saci-halloween/capa.jpg",
    previas: ["img/produtos/kit-saci-halloween/p4.jpg", "img/produtos/kit-saci-halloween/p9.jpg", "img/produtos/kit-saci-halloween/p11.jpg", "img/produtos/kit-saci-halloween/p8.jpg", "img/produtos/kit-saci-halloween/p15.jpg"],
    descricao: "Folclore brasileiro com um toque leve de Halloween, para o 31 de outubro: personagens, máscaras para recortar e bingo. Nada assustador.",
    itens: [
      "Leitura sobre o Saci com interpretação",
      "Fichas dos personagens: Saci, Curupira, Iara, Boitatá, Mula sem cabeça e Boto",
      "Ligue, complete as palavras, caça-palavras e cruzadinha",
      "Máscaras coloridas do Saci e da abóbora",
      "Bingo com 12 cartelas e fichas",
      "Crie seu personagem",
      "Página para colorir e gabarito"
    ],
    amostra: "amostras/kit-folclore-saci-halloween.pdf",
    link_kiwify: "https://pay.kiwify.com.br/8UEVf5D",
    destaque: false,
    novo: false
  },
  {
    id: "kit-alfabetizacao-adaptada",
    nome: "Kit Alfabetização Adaptada",
    tipo: "kit",
    assuntos: ["inclusao", "atividades-adaptadas", "rotina-visual", "alfabetizacao"],
    anos: ["aee", "ei", "1", "2", "3"],
    data: null,
    preco: 14.90,
    paginas: 18,
    capa: "img/produtos/kit-alfabetizacao-adaptada/capa.jpg",
    previas: ["img/produtos/kit-alfabetizacao-adaptada/p3.jpg", "img/produtos/kit-alfabetizacao-adaptada/p14.jpg", "img/produtos/kit-alfabetizacao-adaptada/p6.jpg", "img/produtos/kit-alfabetizacao-adaptada/p9.jpg", "img/produtos/kit-alfabetizacao-adaptada/p16.jpg"],
    descricao: "Atividades de alfabetização adaptadas para alunos com deficiência intelectual, TEA ou dificuldade de aprendizagem. Letra bastão grande, até 4 itens por página e uma instrução por vez.",
    itens: [
      "Vogais pontilhadas",
      "Ligar figura e palavra, pareamento e letra inicial",
      "Letra que falta",
      "Meu nome",
      "Alfabeto móvel com 40 letras",
      "Rotina visual: 12 cartões e quadro AGORA/DEPOIS",
      "Sílabas para montar palavras",
      "Gabarito e ficha de acompanhamento do aluno"
    ],
    amostra: "amostras/kit-alfabetizacao-adaptada.pdf",
    link_kiwify: "https://pay.kiwify.com.br/XpUK8TS",
    destaque: true,
    novo: true
  },
  {
    id: "kit-silabas-complexas",
    nome: "Kit Sílabas Complexas",
    tipo: "kit",
    assuntos: ["alfabetizacao", "consciencia-fonologica", "leitura-e-escrita", "ortografia", "sondagem-escrita", "bingo", "caca-palavras"],
    anos: ["1", "2"],
    data: null,
    preco: 14.90,
    paginas: 18,
    capa: "img/produtos/kit-silabas-complexas/capa.jpg",
    previas: ["img/produtos/kit-silabas-complexas/p3.jpg", "img/produtos/kit-silabas-complexas/p13.jpg", "img/produtos/kit-silabas-complexas/p6.jpg", "img/produtos/kit-silabas-complexas/p12.jpg", "img/produtos/kit-silabas-complexas/p15.jpg"],
    descricao: "A continuação do Kit Famílias Silábicas: uma folha para cada dificuldade, do NH aos encontros consonantais, com cobrir, completar a sílaba, contar sílabas, pintar e escrever.",
    itens: [
      "9 folhas: NH, LH, CH, R e RR, S e SS, Ç, QU e GU, sílabas travadas e encontros consonantais",
      "Ditado ilustrado",
      "Bingo de palavras com 8 cartelas e fichas",
      "Caça-palavras",
      "Sondagem com orientações",
      "Certificado e gabarito"
    ],
    amostra: "amostras/kit-silabas-complexas.pdf",
    link_kiwify: "https://pay.kiwify.com.br/YqBiUkh",
    destaque: true,
    novo: true
  },
  {
    id: "kit-matematica-1-ano",
    nome: "Kit Matemática 1º Ano",
    tipo: "kit",
    assuntos: ["matematica", "sistema-de-numeracao", "adicao-e-subtracao", "sistema-monetario", "problemas", "bingo"],
    anos: ["1"],
    data: null,
    preco: 14.90,
    paginas: 18,
    capa: "img/produtos/kit-matematica-1ano/capa.jpg",
    previas: ["img/produtos/kit-matematica-1ano/p3.jpg", "img/produtos/kit-matematica-1ano/p12.jpg", "img/produtos/kit-matematica-1ano/p14.jpg", "img/produtos/kit-matematica-1ano/p5.jpg", "img/produtos/kit-matematica-1ano/p11.jpg"],
    descricao: "Matemática do 1º ano para usar o ano todo: números até 100, contas com figuras, problemas ilustrados e um mercadinho com dinheirinho de brincadeira para recortar.",
    itens: [
      "Quadro numérico de 1 a 100 (completo e com lacunas)",
      "Contar e registrar, antecessor e sucessor",
      "Maior, menor ou igual",
      "Adição e subtração com figuras",
      "6 problemas ilustrados",
      "Dezenas e unidades com material dourado",
      "Mercadinho com etiquetas, lista de compras e dinheirinho de brincadeira",
      "Bingo dos números com 12 cartelas",
      "Gabarito"
    ],
    amostra: "amostras/kit-matematica-1-ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/fdHGprT",
    destaque: true,
    novo: true
  },

  /* ---- Pronto para entrar: só falta o link da Kiwify (sem link, fica escondido) ---- */
  {
    id: "kit-leitura-e-interpretacao",
    nome: "Kit Leitura e Interpretação de Texto",
    tipo: "kit",
    assuntos: ["lingua-portuguesa", "leitura-e-interpretacao"],
    anos: ["1", "2", "3"],
    data: null,
    preco: 14.90,
    paginas: 17,
    capa: "img/produtos/kit-leitura-interpretacao/capa.jpg",
    previas: ["img/produtos/kit-leitura-interpretacao/p4.jpg", "img/produtos/kit-leitura-interpretacao/p7.jpg", "img/produtos/kit-leitura-interpretacao/p3.jpg", "img/produtos/kit-leitura-interpretacao/p6.jpg", "img/produtos/kit-leitura-interpretacao/p13.jpg"],
    descricao: "10 textos originais separados por ano, em níveis de dificuldade: histórias, bilhete, receita, texto informativo, fábula e poema, cada um com atividades de interpretação.",
    itens: [
      "10 textos originais para o 1º, 2º e 3º ano",
      "Perguntas de interpretação",
      "Verdadeiro ou falso e ordem dos fatos",
      "Começo, meio e fim",
      "Rimas e ilustre a história",
      "Ficha de leitura para qualquer livro",
      "Gabarito"
    ],
    amostra: "amostras/kit-leitura-e-interpretacao.pdf",
    link_kiwify: "https://pay.kiwify.com.br/27BxiMZ",
    destaque: false,
    novo: true
  },
  /* ---- NOVOS (set/2026) ---- */
  {
    id: "kit-dia-dos-animais",
    nome: "Kit Dia dos Animais",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "painel-mural", "ciencias", "leitura-e-interpretacao", "caca-palavras"],
    anos: ["ei", "1", "2", "3"],
    data: "dia-dos-animais",
    preco: 9.90,
    paginas: 17,
    capa: "img/produtos/kit-dia-dos-animais/capa.jpg",
    previas: ["img/produtos/kit-dia-dos-animais/p3.jpg", "img/produtos/kit-dia-dos-animais/p5.jpg", "img/produtos/kit-dia-dos-animais/p6.jpg", "img/produtos/kit-dia-dos-animais/p11.jpg", "img/produtos/kit-dia-dos-animais/p16.jpg"],
    descricao: "Kit para o Dia dos Animais (4 de outubro), pronto para imprimir: painel colorido para a parede, máscaras de bichinhos para as crianças pintarem e atividades sobre animais domésticos e silvestres.",
    itens: [
      "Painel DIA DOS ANIMAIS com letras de carinhas de bichos, faixas e patinhas",
      "8 máscaras para colorir e recortar (cachorro, gato, coelho, porco, leão, vaca, sapo e coruja)",
      "Animais domésticos e silvestres",
      "Onde vivem e o que comem",
      "Cuidados com os pets",
      "Leitura, caça-palavras e página para colorir",
      "Gabarito"
    ],
    amostra: "amostras/kit-dia-dos-animais.pdf",
    link_kiwify: "https://pay.kiwify.com.br/THYNVPM",
    destaque: true,
    novo: true
  },
  {
    id: "moldura-dia-das-criancas",
    nome: "Moldura de Fotos Gigante Dia das Crianças",
    tipo: "painel",
    assuntos: ["datas-comemorativas", "decoracao", "painel-mural"],
    anos: ["ei", "1", "2", "3", "4", "5"],
    data: "dia-das-criancas",
    preco: 9.90,
    paginas: 16,
    capa: "img/produtos/kit-moldura-dia-das-criancas/capa.jpg",
    previas: ["img/produtos/kit-moldura-dia-das-criancas/p1.jpg", "img/produtos/kit-moldura-dia-das-criancas/p3.jpg", "img/produtos/kit-moldura-dia-das-criancas/p9.jpg", "img/produtos/kit-moldura-dia-das-criancas/p11.jpg", "img/produtos/kit-moldura-dia-das-criancas/p13.jpg"],
    descricao: "Moldura gigante para fotos da festa do Dia das Crianças, montada com folhas A4. Fica com 75 x 58 cm e tem espaço para o nome da turma.",
    itens: [
      "10 peças coloridas com marcas de colagem",
      "Guia de montagem passo a passo",
      "10 plaquinhas de falas divertidas",
      "Coroa e óculos de estrela",
      "Bandeirolas “É DIA DE BRINCAR!”",
      "Página para colar a foto da turma"
    ],
    amostra: "amostras/moldura-dia-das-criancas.pdf",
    link_kiwify: "https://pay.kiwify.com.br/zlq9QDz",
    destaque: false,
    novo: true
  },
  {
    id: "chaveiros-dia-do-professor",
    nome: "Chaveiros e Marcadores Dia do Professor",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "lembrancinhas"],
    anos: [],
    publico: "Para a equipe escolar",
    data: "dia-do-professor",
    preco: 7.90,
    paginas: 13,
    capa: "img/produtos/kit-chaveiros-professor/capa.jpg",
    previas: ["img/produtos/kit-chaveiros-professor/p3.jpg", "img/produtos/kit-chaveiros-professor/p4.jpg", "img/produtos/kit-chaveiros-professor/p5.jpg", "img/produtos/kit-chaveiros-professor/p8.jpg", "img/produtos/kit-chaveiros-professor/p10.jpg"],
    descricao: "Lembrancinhas delicadas para o Dia do Professor, prontas para imprimir, plastificar e montar, com frases de homenagem originais.",
    itens: [
      "12 chaveiros em duas paletas (azul e rosa)",
      "8 marcadores de página",
      "Versos dos chaveiros e cartelas “Feito com carinho para você”",
      "Chaveiros com linhas para a criança escrever",
      "Passo a passo de montagem"
    ],
    amostra: "amostras/chaveiros-dia-do-professor.pdf",
    link_kiwify: "https://pay.kiwify.com.br/1r9ZbYD",
    destaque: false,
    novo: true
  },
  {
    id: "kit-cabelo-maluco",
    nome: "Kit Dia do Cabelo Maluco",
    tipo: "kit",
    assuntos: ["datas-comemorativas", "lembrancinhas", "producao-de-texto", "caca-palavras"],
    anos: ["ei", "1", "2", "3"],
    data: "dia-das-criancas",
    preco: 9.90,
    paginas: 14,
    capa: "img/produtos/kit-cabelo-maluco/capa.jpg",
    previas: ["img/produtos/kit-cabelo-maluco/p3.jpg", "img/produtos/kit-cabelo-maluco/p4.jpg", "img/produtos/kit-cabelo-maluco/p6.jpg", "img/produtos/kit-cabelo-maluco/p7.jpg", "img/produtos/kit-cabelo-maluco/p11.jpg"],
    descricao: "Tudo para o Dia do Cabelo Maluco da Semana da Criança: chaveiros, placa para fotos, bilhete para as famílias e atividades.",
    itens: [
      "12 chaveiros de carinhas com cabelos malucos (colorido e para colorir)",
      "Bilhete-convite para as famílias",
      "Placa “Hoje é dia de cabelo maluco!” e plaquinhas de falas para fotos",
      "Desenhe um cabelo maluco e produção de texto",
      "Leitura, contagem com problemas e caça-palavras",
      "Certificado e gabarito"
    ],
    amostra: "amostras/kit-cabelo-maluco.pdf",
    link_kiwify: "https://pay.kiwify.com.br/oDE1yXt",
    destaque: false,
    novo: true
  },
  {
    id: "jornalzinho-outubro",
    nome: "Jornalzinho da Turma – Outubro",
    tipo: "exercicios",
    assuntos: ["lingua-portuguesa", "leitura-e-interpretacao", "producao-de-texto", "datas-comemorativas", "caca-palavras"],
    anos: ["1", "2", "3", "4", "5"],
    data: ["dia-das-criancas", "dia-do-professor"],
    preco: 9.90,
    paginas: 12,
    capa: "img/produtos/kit-jornalzinho-outubro/capa.jpg",
    previas: ["img/produtos/kit-jornalzinho-outubro/p3.jpg", "img/produtos/kit-jornalzinho-outubro/p5.jpg", "img/produtos/kit-jornalzinho-outubro/p6.jpg", "img/produtos/kit-jornalzinho-outubro/p7.jpg", "img/produtos/kit-jornalzinho-outubro/p11.jpg"],
    descricao: "Jornal escolar de outubro em duas versões (1º e 2º ano; 3º ao 5º ano): Outubro Rosa, Dia das Crianças, Dia do Professor e Primavera, mais um jornal em branco para a turma escrever as próprias notícias.",
    itens: [
      "Versão 1º e 2º ano (letra maiúscula, textos curtos)",
      "Versão 3º ao 5º ano (textos maiores com interpretação)",
      "Caça-palavras e código secreto",
      "Jornal em branco “Notícias da nossa turma” nas duas versões",
      "4 cartões de carinho do Outubro Rosa",
      "Gabarito"
    ],
    amostra: "amostras/jornalzinho-outubro.pdf",
    link_kiwify: "https://pay.kiwify.com.br/zzNhLbX",
    destaque: false,
    novo: true
  },
  {
    id: "simulado-simave-lp-2ano",
    nome: "Simulado SIMAVE Língua Portuguesa 2º ano",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-lp", "alfabetizacao", "leitura-e-escrita"],
    anos: ["2"],
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 19,
    capa: "img/produtos/lp-2ano/capa.jpg",
    previas: ["img/produtos/lp-2ano/p6.jpg", "img/produtos/lp-2ano/p9.jpg", "img/produtos/lp-2ano/p15.jpg"],
    descricao: "Simulado de alfabetização no estilo SIMAVE/PROALFA, com 16 questões inéditas em letra maiúscula e roteiro para o professor ler em voz alta. Material independente, não oficial.",
    itens: [
      "14 questões de múltipla escolha e 2 de escrita",
      "Roteiro do aplicador",
      "Folha de respostas e cartão-gabarito",
      "Gabarito comentado com critérios de escrita por nível",
      "Planilha da turma e síntese por descritor"
    ],
    amostra: "amostras/simulado-simave-lp-2ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/0nQXvu1",
    destaque: false,
    novo: true
  },
  {
    id: "simulado-simave-mt-2ano",
    nome: "Simulado SIMAVE Matemática 2º ano",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-mt", "matematica", "avaliacao-diagnostica"],
    anos: ["2"],
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 21,
    capa: "img/produtos/mt-2ano/capa.jpg",
    previas: ["img/produtos/mt-2ano/p4.jpg", "img/produtos/mt-2ano/p9.jpg", "img/produtos/mt-2ano/p10.jpg"],
    descricao: "Simulado de Matemática no estilo SIMAVE/PROALFA, com 20 questões inéditas em letra maiúscula: números, contas, problemas, formas, medidas, calendário, dinheiro e gráficos. Material independente, não oficial.",
    itens: [
      "18 questões de múltipla escolha e 2 abertas",
      "Roteiro do aplicador",
      "Folha de respostas, gabarito e mapa de descritores",
      "Gabarito comentado",
      "Planilha da turma e síntese por descritor"
    ],
    amostra: "amostras/simulado-simave-mt-2ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/OKkiopU",
    destaque: false,
    novo: true
  },
  {
    id: "simulado-simave-lp-5ano",
    nome: "Simulado SIMAVE Língua Portuguesa 5º ano",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-lp", "lingua-portuguesa", "leitura-e-interpretacao"],
    anos: ["5"],
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 18,
    capa: "img/produtos/lp-5ano/capa.jpg",
    previas: ["img/produtos/lp-5ano/p6.jpg", "img/produtos/lp-5ano/p13.jpg", "img/produtos/lp-5ano/p17.jpg"],
    descricao: "Simulado de Língua Portuguesa no estilo SIMAVE/PROEB, com 22 questões inéditas e textos variados (fábula, notícia, tirinha, bilhete, poema, cartaz). Material independente, não oficial.",
    itens: [
      "22 questões de múltipla escolha",
      "Folha de respostas",
      "Gabarito com descritores",
      "Gabarito comentado",
      "Planilha da turma por descritor"
    ],
    amostra: "amostras/simulado-simave-lp-5ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/n7p4EuM",
    destaque: true,
    novo: true
  },
  {
    id: "simulado-simave-mt-5ano",
    nome: "Simulado SIMAVE Matemática 5º ano",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-mt", "matematica", "problemas"],
    anos: ["5"],
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 19,
    capa: "img/produtos/mt-5ano/capa.jpg",
    previas: ["img/produtos/mt-5ano/p7.jpg", "img/produtos/mt-5ano/p8.jpg", "img/produtos/mt-5ano/p14.jpg"],
    descricao: "Simulado de Matemática no estilo SIMAVE/PROEB, com 22 questões inéditas com malhas, reta numérica, dinheiro, tabela e gráfico. Material independente, não oficial.",
    itens: [
      "22 questões de múltipla escolha",
      "Folha de respostas e cartão-gabarito",
      "Gabarito comentado com resolução e análise dos distratores",
      "Planilha da turma por descritor"
    ],
    amostra: "amostras/simulado-simave-mt-5ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/xd4KnhJ",
    destaque: true,
    novo: true
  },
  {
    id: "simulado-simave-lp-9ano",
    nome: "Simulado SIMAVE Língua Portuguesa 9º ano",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-lp", "lingua-portuguesa", "leitura-e-interpretacao"],
    anos: ["9"],
    publico: "9º ano",
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 21,
    capa: "img/produtos/lp-9ano/capa.jpg",
    previas: ["img/produtos/lp-9ano/p6.jpg", "img/produtos/lp-9ano/p9.jpg", "img/produtos/lp-9ano/p16.jpg"],
    descricao: "Simulado de Língua Portuguesa no estilo SIMAVE/PROEB, com 26 questões inéditas e textos de vários gêneros (crônica, artigo de opinião, tirinha, notícia, poema, conto, anúncio). Material independente, não oficial.",
    itens: [
      "26 questões de múltipla escolha",
      "Folha de respostas e cartão-gabarito",
      "Gabarito comentado",
      "Planilha da turma por descritor"
    ],
    amostra: "amostras/simulado-simave-lp-9ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/rR6BFlg",
    destaque: false,
    novo: true
  },
  {
    id: "simulado-simave-mt-9ano",
    nome: "Simulado SIMAVE Matemática 9º ano",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-mt", "matematica", "problemas"],
    anos: ["9"],
    publico: "9º ano",
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 20,
    capa: "img/produtos/mt-9ano/capa.jpg",
    previas: ["img/produtos/mt-9ano/p9.jpg", "img/produtos/mt-9ano/p11.jpg", "img/produtos/mt-9ano/p15.jpg"],
    descricao: "Simulado de Matemática no estilo SIMAVE/PROEB, com 26 questões inéditas: inteiros e racionais, porcentagem, equações, sistemas, Pitágoras, área, volume e gráficos. Material independente, não oficial.",
    itens: [
      "26 questões de múltipla escolha",
      "Folha de respostas e cartão-gabarito",
      "Gabarito comentado com resolução",
      "Planilha da turma por descritor"
    ],
    amostra: "amostras/simulado-simave-mt-9ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/5BHVya5",
    destaque: false,
    novo: true
  },
  {
    id: "simulado-simave-lp-3em",
    nome: "Simulado SIMAVE Língua Portuguesa 3º ano EM",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-lp", "lingua-portuguesa", "leitura-e-interpretacao"],
    anos: ["em"],
    publico: "3º ano do Ensino Médio",
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 20,
    capa: "img/produtos/lp-3em/capa.jpg",
    previas: ["img/produtos/lp-3em/p4.jpg", "img/produtos/lp-3em/p9.jpg", "img/produtos/lp-3em/p15.jpg"],
    descricao: "Simulado de Língua Portuguesa no estilo SIMAVE/PROEB, com 26 questões inéditas que cobrem os 24 descritores da matriz do 3º ano do Ensino Médio. Serve também como revisão para o ENEM. Material independente, não oficial.",
    itens: [
      "9 textos de gêneros variados e 26 questões",
      "Folha de respostas e cartão-gabarito",
      "Mapa de descritores",
      "Gabarito comentado",
      "Planilha da turma e síntese por descritor"
    ],
    amostra: "amostras/simulado-simave-lp-3em.pdf",
    link_kiwify: "https://pay.kiwify.com.br/bo44Vh8",
    destaque: false,
    novo: true
  },
  {
    id: "simulado-simave-mt-3em",
    nome: "Simulado SIMAVE Matemática 3º ano EM",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-mt", "matematica", "problemas"],
    anos: ["em"],
    publico: "3º ano do Ensino Médio",
    data: "avaliacao-somativa",
    preco: 9.90,
    paginas: 19,
    capa: "img/produtos/mt-3em/capa.jpg",
    previas: ["img/produtos/mt-3em/p6.jpg", "img/produtos/mt-3em/p8.jpg", "img/produtos/mt-3em/p14.jpg"],
    descricao: "Simulado de Matemática no estilo SIMAVE/PROEB, com 26 questões inéditas, cada uma de um descritor: geometria analítica, trigonometria, funções, PA e PG, porcentagem, contagem e probabilidade. Serve também como revisão para o ENEM. Material independente, não oficial.",
    itens: [
      "26 questões de múltipla escolha",
      "Folha de respostas e cartão-gabarito",
      "Mapa de descritores",
      "Gabarito comentado com resolução",
      "Planilha da turma e síntese por descritor"
    ],
    amostra: "amostras/simulado-simave-mt-3em.pdf",
    link_kiwify: "https://pay.kiwify.com.br/pMMvq2I",
    destaque: false,
    novo: true
  },
  {
    id: "combo-simave-escola",
    nome: "SIMAVE Escola: 8 Simulados + Bônus",
    tipo: "simulado",
    assuntos: ["avaliacoes-externas", "simulado-lp", "simulado-mt", "lingua-portuguesa", "matematica"],
    anos: ["2", "5", "9", "em"],
    publico: "Escolas: 2º, 5º e 9º ano e 3º ano do Ensino Médio",
    data: "avaliacao-somativa",
    preco: 49.90,
    paginas: 164,
    capa: "img/produtos/combo-simave-escola/capa.jpg",
    previas: ["img/produtos/lp-5ano/p6.jpg", "img/produtos/mt-9ano/p9.jpg", "img/produtos/lp-2ano/p6.jpg", "img/produtos/lp-5ano/p17.jpg"],
    descricao: "Pacote para a escola com os 8 simulados no estilo SIMAVE/PROEB (Português e Matemática do 2º, 5º e 9º ano e do 3º ano do Ensino Médio), mais um Simulado 5º Ano de bônus. Uso liberado para todos os professores de uma escola. Material independente, não oficial.",
    itens: [
      "8 simulados: LP e MT do 2º, 5º e 9º ano e 3º EM",
      "Bônus: Simulado 5º Ano de Português e Matemática",
      "Questões inéditas organizadas por descritor",
      "Gabarito comentado e planilha da turma",
      "Uso liberado para os professores de uma escola",
      "Economia de R$ 29,30 em relação aos avulsos"
    ],
    link_kiwify: "https://pay.kiwify.com.br/b0up1S0",
    destaque: true,
    novo: true
  },
  {
    id: "kit-tabuada",
    nome: "Kit Tabuada e Multiplicação",
    tipo: "kit",
    assuntos: ["matematica", "problemas", "jogos", "bingo"],
    anos: ["3", "4", "5"],
    data: null,
    preco: 14.90,
    paginas: 18,
    capa: "img/produtos/kit-tabuada/capa.jpg",
    previas: ["img/produtos/kit-tabuada/p3.jpg", "img/produtos/kit-tabuada/p5.jpg", "img/produtos/kit-tabuada/p8.jpg", "img/produtos/kit-tabuada/p13.jpg", "img/produtos/kit-tabuada/p14.jpg"],
    descricao: "Tabuadas do 2 ao 10 ilustradas com truques, quadro da tabuada, roda, cruzadinha, caça-números, problemas, desafios, dominó e bingo da tabuada para recortar e certificado Mestre da Tabuada.",
    itens: [
      "Tabuadas do 2 ao 10 ilustradas, com truques",
      "Quadro da tabuada completo e para completar",
      "Roda da tabuada, cruzadinha e caça-números",
      "Problemas e desafios de multiplicação",
      "Dominó e bingo da tabuada para recortar",
      "Certificado Mestre da Tabuada",
      "Gabarito"
    ],
    amostra: "amostras/kit-tabuada.pdf",
    link_kiwify: "https://pay.kiwify.com.br/mrYL0O0",
    destaque: false,
    novo: true
  },
  {
    id: "kit-matematica-2-ano",
    nome: "Kit Matemática 2º Ano",
    tipo: "kit",
    assuntos: ["matematica", "sistema-de-numeracao", "adicao-e-subtracao", "sistema-monetario", "problemas"],
    anos: ["2"],
    data: null,
    preco: 14.90,
    paginas: 17,
    capa: "img/produtos/kit-matematica-2ano/capa.jpg",
    previas: ["img/produtos/kit-matematica-2ano/p6.jpg", "img/produtos/kit-matematica-2ano/p11.jpg", "img/produtos/kit-matematica-2ano/p12.jpg", "img/produtos/kit-matematica-2ano/p13.jpg", "img/produtos/kit-matematica-2ano/p14.jpg"],
    descricao: "Números até 1000 com material dourado, adição e subtração com e sem reagrupamento, problemas, dobro e metade, ideia de multiplicação, relógio, dinheiro e troco, tabela e gráfico.",
    itens: [
      "Números até 1000 com material dourado",
      "48 contas armadas com e sem reagrupamento",
      "Problemas de adição e subtração",
      "Dobro, metade e ideia de multiplicação",
      "Relógio, dinheiro e troco",
      "Tabela e gráfico",
      "Gabarito completo"
    ],
    amostra: "amostras/kit-matematica-2-ano.pdf",
    link_kiwify: "https://pay.kiwify.com.br/CIjmigO",
    destaque: false,
    novo: true
  },
  {
    id: "mapas-mentais-lingua-portuguesa",
    nome: "Mapas Mentais de Língua Portuguesa",
    tipo: "explicativo",
    assuntos: ["lingua-portuguesa", "gramatica", "painel-mural"],
    anos: ["3", "4", "5"],
    data: null,
    preco: 9.90,
    paginas: 17,
    capa: "img/produtos/prod-mapas-mentais-portugues/capa.jpg",
    previas: ["img/produtos/prod-mapas-mentais-portugues/p3.jpg", "img/produtos/prod-mapas-mentais-portugues/p5.jpg", "img/produtos/prod-mapas-mentais-portugues/p8.jpg", "img/produtos/prod-mapas-mentais-portugues/p9.jpg", "img/produtos/prod-mapas-mentais-portugues/p15.jpg"],
    descricao: "10 mapas mentais coloridos para cartaz (substantivo, adjetivo, verbo, artigo, pronome, pontuação, sílaba tônica, tipos de frase, sinônimo e antônimo, singular e plural) e resumos em preto e branco para colar no caderno.",
    itens: [
      "10 mapas mentais coloridos, um por tema",
      "10 resumos em preto e branco para colorir",
      "Ótimo como cartaz na sala",
      "Para o 3º, 4º e 5º ano"
    ],
    amostra: "amostras/mapas-mentais-lingua-portuguesa.pdf",
    link_kiwify: "https://pay.kiwify.com.br/DHAgE9p",
    destaque: false,
    novo: true
  }
];
