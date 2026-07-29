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

## Restrições finais

- Nenhuma outra alteração: não tocar em textos (além da tagline do item 4), estrutura HTML (além da troca logo texto→imagem), variáveis de cor, JS ou responsividade.
- Conferir o resultado nas três páginas existentes (index, drop, produto) em desktop e mobile após a troca.
