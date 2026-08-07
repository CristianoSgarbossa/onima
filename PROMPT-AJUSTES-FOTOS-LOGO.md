# PROMPT — Ajustes pontuais: fotos reais, monograma e logotipo

No site ONIMA já construído em `C:\Users\Admin\Downloads\Onima` (index.html, drop.html, produto.html + css/style.css + js/main.js), altere **somente** os três pontos abaixo. Não mexa em layout, textos, cores, espaçamentos nem em nenhuma outra parte do site.

---

## 1. Substituir as fotos do site pelas fotos verdadeiras (pasta `fotos/`)

As fotos definitivas estão em `C:\Users\Admin\Downloads\Onima\fotos\`. Otimize cada uma (redimensionar para a largura máxima usada no slot, salvar como JPG qualidade ~80) e salve em `assets/img/` substituindo as imagens atuais, mantendo os mesmos nomes de arquivo já referenciados no HTML/CSS. Mapeamento:

| Foto em `fotos/` | Conteúdo | Substitui em `assets/img/` |
|---|---|---|
| `ChatGPT Image 14 de jul. de 2026, 17_14_36.png` | modelo sentada no cubo (body rosa) | `hero.jpg` e `hero-mobile.jpg` (crops diferentes) |
| `723ba4c8-d13e-483d-a549-ad3c55038845.png` | still top rosa | `cat-tops.jpg` |
| `8b77864c-6b43-4d0b-9984-59c4f726a6c5.png` | still shorts rosa | `cat-saias-shorts.jpg` |
| `ea3543c3-00f4-4fd5-84f7-fb2b6a3e1fc9.png` | still regata rosa | `cat-blusas.jpg` |
| `53275040-a573-4203-8ea4-3f0b137b87b1.png` | still legging rosa | `cat-leggings.jpg` e `produto-still.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 17_12_40.png` | modelo de costas, body decote nas costas | `banner-colecao.jpg` |
| `fe279c6c-27e7-44dc-894f-e02e759a5992.png` | close costas com top (luz quente) | `banner-edicao.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 16_52_36.png` | modelo andando na cidade (look vinho) | `banner-estudio.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 16_44_14.png` | bailarina P&B na barra | `journal.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 16_47_02.png` | macro de tecido rosa com costura | `fabric.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 17_18_35.png` | modelo sentada com top triângulo + legging | `prod-legging-saia.jpg` e `produto-modelo.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 17_26_36.png` | modelo em pé com jaqueta + legging | `prod-jaqueta.jpg` |
| `54e2e712-e90f-433b-a0ef-50cafe75daab.png` | modelo alongando com blusa transpassada | `prod-blusa-transpassada.jpg` |
| `fe279c6c-27e7-44dc-894f-e02e759a5992.png` (crop fechado) ou manter atual se ficar melhor | close top | `prod-top-triangulo.jpg` |
| `95ec6931caecafb5c6502b71a8ec1e1d.jpg` e `be0a125172dd8881c641b30e9307e6eb.jpg` | editoriais (duas modelos no sofá / luz quente) | reservar para os cards do Journal (`journal-post`), usar como `journal-1.jpg` e `journal-2.jpg` |
| `ChatGPT Image 14 de jul. de 2026, 16_52_36.png` já usada acima | — | `menu-drop.jpg` pode usar crop vertical da foto do hero |

Regras:
- Respeitar o `aspect-ratio` de cada slot já definido no CSS (as fotos entram com `object-fit: cover`, então basta garantir resolução suficiente; ajustar `object-position` se o enquadramento cortar rosto/produto).
- Não renomear classes nem alterar caminhos no HTML — só trocar os arquivos de imagem.

## 2. Monograma correto

O monograma oficial (letras N + A dentro de um círculo/O, estilo serifado fino) está em `fotos/WhatsApp Image 2026-07-24 at 09.56.52.jpeg` (símbolo off-white sobre fundo rosé).

- Gerar a partir dele um PNG com fundo transparente (e, se possível, um SVG traçado) em duas versões: símbolo off-white (para usar sobre fundos rosy) e símbolo rosy (para fundos claros).
- Substituir o monograma placeholder atual em todos os lugares onde ele aparece: bloco da newsletter ONIMA NEWS (canto direito) e favicon do site (`<link rel="icon">` em todas as páginas).
- Manter o tamanho/posicionamento atuais — trocar apenas a arte.

## 3. Logotipo "onima" — seguir a fonte do design

O logotipo "onima" do site está renderizado como texto com fonte diferente da do design. No mockup, o logo é um **logotipo próprio**: minúsculas geométricas arredondadas, traço uniforme, com o ponto do "i" destacado (ver `SITE/DESKTOP/Sacola.png` ou qualquer mockup — logo centralizado no header).

- Extrair o logotipo vetorial verdadeiro do arquivo `SITE/DESKTOP/VETOR/Site_Onima.ai` (é um PDF — usar PyMuPDF/`fitz`, já instalado, para exportar a área do logo em alta resolução ou como vetor; **não** recortar dos PNGs de mockup).
- Gerar `assets/img/logo-onima.svg` (ou PNG transparente @2x se o vetor não sair limpo) na cor Rosy `#A47D80`, e uma versão off-white se necessário.
- Substituir o logo de texto por `<img>` (com `alt="ONIMA"`) em **todos** os lugares: header de todas as páginas, footer e faixa da newsletter, mantendo exatamente os tamanhos atuais no CSS.
- O mesmo vale para o logo grande do footer.

## 4. Trocar a frase do footer

Em **todas as páginas**, substituir a tagline do footer (abaixo do logo grande):

- Texto atual: `DESIGN INTENCIONAL. MOVIMENTO NATURAL. PARA TODOS OS MOMENTOS.`
- Novo texto: `VISTA A VIDA QUE VOCÊ ESCOLHE VIVER.`

Manter o mesmo estilo (caixa alta, espaçamento de letras, cor e quebras de linha equilibradas — no mobile pode quebrar em 2 linhas: "VISTA A VIDA QUE VOCÊ / ESCOLHE VIVER.").

## 5. Barra de anúncio em slider (cupom + frete grátis)

Referência: `Fotos novas/WhatsApp Image 2026-07-29 at 10.42.26.jpeg` (site de referência com barra preta e setas — **usar apenas como referência de funcionamento, NÃO copiar o visual**).

Transformar a barra de anúncio do topo (hoje fixa com "Frete grátis para compras acima de R$ 490 | Troca grátis*") em um **slider rotativo** com 2 mensagens, em todas as páginas:

1. `Frete grátis para compras acima de R$ 490 | Troca grátis*`
2. `Cupom de Primeira Compra: PRIMEIRACOMPRA`

Regras de estilo — manter 100% a identidade ONIMA:
- Fundo continua Rosy `#A47D80`, texto off-white, fonte JUST Sans no mesmo tamanho atual (nada de preto/estilo da referência).
- Setas `‹` `›` discretas nas laterais (off-white, finas) para trocar a mensagem manualmente.
- Autoplay: troca sozinha a cada ~5s, com transição suave (fade ou slide horizontal); pausar autoplay ao passar o mouse.
- JS vanilla no `main.js` (módulo próprio), sem bibliotecas. Altura da barra não pode mudar entre mensagens.

## 6. Nova página: Trocas e Devoluções (`trocas.html`)

Referência de conteúdo e estrutura: `Fotos novas/WhatsApp Image 2026-07-29 at 10.45.03.jpeg`, `...10.45.04.jpeg` e `...10.45.04 (1).jpeg` (página de outra marca — **aproveitar a estrutura e as regras, mas reescrever para a ONIMA e aplicar totalmente a paleta e as fontes da ONIMA**, nunca o visual preto/branco da referência).

Estrutura da página (header, newsletter e footer padrão ONIMA; conteúdo em container de leitura ~720px):
- Título da página: `TROCAS E DEVOLUÇÕES` (caixa alta, Rosy, espaçado — padrão dos títulos de seção ONIMA) + breadcrumb discreto `Início / Trocas e Devoluções`.
- Intro: "Na ONIMA, queremos que cada peça vista exatamente como deveria. Se algo não ficou do jeito que você esperava, estamos aqui para resolver — com transparência e sem burocracia."
- Seção **Prazo**: "Você tem **7 dias corridos**, a contar da data de recebimento do pedido, para solicitar troca ou devolução."
- Seção **Como funciona a troca** (lista numerada):
  1. Solicite a troca dentro do prazo informado acima.
  2. No primeiro envio de troca de cada pedido, o frete de retorno é por nossa conta — te enviamos o código de postagem sem custo.
  3. Assim que a peça chega ao nosso centro de distribuição, nosso time avalia as condições do produto (etiqueta, embalagem e integridade da peça) e confirma se ela está apta para troca.
  4. Sendo aprovada, você recebe um **vale-crédito em até 2 dias úteis**, para usar como quiser em nosso site.
  - "O vale-crédito gerado tem validade de **120 dias** a partir da data de emissão."
  - "**Importante:** caso você deseje trocar novamente uma peça do mesmo pedido, o frete dessa nova postagem passa a ser por sua conta."
- Seção **Como funciona a devolução** (lista numerada):
  1. Solicite a devolução dentro do prazo de 7 dias corridos.
  2. Após a avaliação da peça pelo nosso time, o estorno é feito via **Pix, em até 15 dias corridos**.
  - "**Compras com brinde:** se a sua compra atingiu o valor mínimo que dava direito a um brinde e a devolução da(s) peça(s) fizer com que o pedido deixe de ser elegível para esse benefício, será necessário devolver o brinde junto com a(s) peça(s) para que a devolução seja efetuada. Caso o brinde não seja devolvido, o estorno será realizado descontando o valor correspondente ao brinde."
- Seção **O que não pode ser trocado ou devolvido**: "Peças adquiridas em **promoção** não são elegíveis para troca ou devolução, exceto em casos de defeito de fabricação — nesse caso, fale com a gente e resolvemos juntas."
- Seção **Condições para aprovação** — "Para que a troca ou devolução seja aprovada, a peça precisa estar:" (bullets):
  - Sem uso e sem lavagem;
  - Sem marcas de desodorante, maquiagem, perfume ou qualquer outro produto;
  - Com a etiqueta original afixada;
  - Na embalagem em que foi recebida (ou similar).
- Seção **Como fazer?** (lista numerada — usar link placeholder `#` por enquanto, o portal de trocas será definido depois):
  1. Clique no link do nosso portal de trocas.
  2. Para continuar, você vai precisar inserir o número do seu pedido e o e-mail cadastrado na compra.
  3. Siga as orientações do site. O código de postagem é gerado automaticamente.
- Seção **Não esqueça das regras** (lista numerada):
  1. O produto deve ser **empacotado de forma reforçada**. Caso não tenha a embalagem original, utilize qualquer outro pacote de papel pardo — sem propagandas.
  2. A peça deve estar em **perfeito estado e/ou sem sinais de uso**, sem avarias ou danos.
  3. A peça deve estar com **todas as etiquetas originais**.
- Seção **Sobre o envio** (lista numerada):
  1. A postagem deve acontecer em até **7 dias corridos** (para que o código gerado no site não expire). Ele é enviado direto para o e-mail associado à compra.
  2. O prazo de devolução é determinado pelos Correios. Você recebe o código de rastreio no momento da postagem e pode acompanhar o envio pelo Rastreamento dos Correios.
- Fecho: "Lembre-se sempre de conferir suas mensagens (inclusive spam e lixo eletrônico) ;)"

Estilo da página — paleta e fontes ONIMA:
- Fundo Off White `#F9F4F3`, títulos de seção em JUST Sans SemiBold caixa alta cor Rosy `#A47D80`, corpo em JUST Sans Regular cor Black `#474540`, destaques em SemiBold.
- Listas com espaçamento confortável; nada de preto puro, nada de negrito pesado estilo referência.
- Linkar esta página no footer (`Trocas e Devoluções` em ATENDIMENTO) e nos accordions de atendimento dos menus/drawers, em todas as páginas.

## Restrições finais

- Nenhuma outra alteração além dos itens 1–6: não tocar nos demais textos, estrutura, variáveis de cor ou responsividade.
- As imagens em `Fotos novas/` são referência de conteúdo/comportamento de outra marca — nunca copiar tipografia, cores ou logo delas; tudo entra com a identidade ONIMA.
- Conferir o resultado em todas as páginas em desktop e mobile após as alterações.
