# PROMPT — Correção: banner "Drop 01" do menu mobile quebrado no celular

## Problema

No site ONIMA (`C:\Users\Admin\Downloads\Onima`), o banner do Drop 01 que aparece dentro do accordion **COLEÇÃO** do menu mobile quebra completamente quando aberto em um celular real (iOS Safari / Chrome mobile). Em navegador desktop com o modo responsivo ele aparece correto, então o bug **só se manifesta no celular**.

Imagens de referência na pasta `Correção/`:
- `Deveria estar.png` — resultado correto: sobretítulo `DROP 01` pequeno no topo, título em 2 linhas ("A FORMA, QUANDO PRECISA, TORNA-SE / PRESENÇA.") e botão outline `EXPLORAR` abaixo, tudo dentro da imagem, alinhado à esquerda.
- `Como esta.png` — como está hoje no celular: o texto fica espremido numa coluna estreitíssima quebrando **uma palavra por linha** ("A / FORMA, / QUANDO / PRECISA, / TORNA- / SE / PRESENÇA."), o sobretítulo `DROP 01` vaza para **fora e acima** da imagem, e o botão `EXPLORAR` estoura para fora da borda inferior do banner.

## Causa raiz (já diagnosticada — corrigir exatamente isto)

Em [css/style.css:747](css/style.css:747), a regra `.on-menu__banner` **não declara `display`**:

```css
.on-menu__banner {
  position: relative;
  margin: 6px 0 26px;
  overflow: hidden;
}
```

No HTML esse elemento é um `<a class="on-menu__banner">` (ex.: [index.html:113](index.html:113)), ou seja, continua sendo **inline**. Como consequência:

1. O filho `.on-menu__banner-content`, que é `position: absolute` com `top/right/bottom/left: 0`, usa como bloco contentor os *fragmentos da caixa inline* do `<a>` — que no Safari iOS resolvem para uma largura mínima, e não para a largura total da imagem. Por isso o texto se comprime em uma coluna de poucos pixels e quebra palavra por palavra.
2. `overflow: hidden` **não recorta** conteúdo em elemento inline não substituído, por isso o texto escapa acima e abaixo do banner em vez de ficar contido.

Navegadores desktop resolvem esse caso de forma mais permissiva, o que explica o bug aparecer só no celular.

Observação: todos os outros banners do site já têm `display: block` (`.on-banner` em [css/style.css:972](css/style.css:972), `.on-account__banner`, `.on-post-card__media`, `.on-product-card`). O `.on-menu__banner` é o único que ficou de fora — não há outro ponto com o mesmo defeito.

## Correção pedida

1. Adicionar `display: block;` em `.on-menu__banner` (e `width: 100%;` por garantia), mantendo `position: relative`, `margin` e `overflow: hidden` como estão.
2. Reforço defensivo em `.on-menu__banner-title`: trocar `max-width: 300px` por `max-width: 100%` (ou manter o 300px junto com `max-width: 100%`), garantindo que nunca dependa de uma largura fixa maior que o contêiner. Adicionar `overflow-wrap: break-word;`.
3. Garantir que `.on-menu__banner-content` continue com `padding: 20px 24px` e `box-sizing: border-box`, para o texto e o botão respeitarem as bordas do banner em telas de 360–430px de largura.
4. Não alterar mais nada: nem a imagem, nem a proporção `aspect-ratio: 223 / 100`, nem os textos, nem cores ou fontes.

A correção é só no `css/style.css` — como todas as 9 páginas usam a mesma classe, o conserto vale para `index.html`, `drop.html`, `produto.html`, `journal.html`, `journal-post.html`, `sobre.html`, `login.html`, `cadastro.html` e `trocas.html` de uma vez. Não é preciso editar HTML.

## Critérios de aceite

Abrindo o menu mobile e expandindo COLEÇÃO, em largura de 360px, 390px e 430px:
- `DROP 01`, o título e o botão `EXPLORAR` ficam **todos dentro** da área da imagem, sem vazar por cima nem por baixo.
- O título ocupa no máximo 2 linhas, quebrando por frase e não por palavra, igual a `Correção/Deveria estar.png`.
- O botão `EXPLORAR` fica alinhado à esquerda, com a largura do próprio texto, sem esticar.
- Nenhuma regressão nos demais banners (home, journal, drawer de conta).

## Verificação

Testar **em celular real ou no Safari iOS** (o simulador responsivo do Chrome desktop não reproduz o bug, então validar só nele não é suficiente). Comparar o resultado lado a lado com `Correção/Deveria estar.png`.
