---
name: revisao-camadas
description: Revisa mudanças do Orion Music (site de gravadora e escola de música) em três pontos que lint não pega: fronteira entre camadas (domain, application, infrastructure, presentation), glossário do domínio (lançamento, artista, escola) e testes que não conferem o cenário. Use ao revisar uma PR ou diff deste projeto.
---

# Revisão de camadas, glossário e testes — Orion Music

Revise só o diff da PR. Lint, typecheck, build e testes já rodam no CI; não repita o que eles pegam.

## O que olhar

1. **Fronteira entre camadas** (`src/`)
   - `domain` não importa de `application`, `infrastructure`, `presentation`, `next` nem `react`.
   - `application` importa só de `domain`. Nunca de `infrastructure` (nem a implementação in-memory).
   - `presentation`, `app` e `mcp` obtêm use cases via `src/infrastructure/container.ts`, sem instanciar repositórios nem importar de `infrastructure/catalog/*`.
   - Use case devolve DTO simples (tipos próprios e datas em ISO string), não a entidade do domínio.
2. **Glossário do domínio**
   - Termos: Lançamento (`Release`: single, ep, album), Artista (`Artist`), Escola (`school`).
   - Nome novo que mistura ou foge desses termos (ex.: `Track`/`Song` para lançamento, `Band`/`Musician` para artista) é achado. Texto de interface em português; identificadores em inglês.
3. **Teste que não confere o cenário**
   - Todo use case novo ou alterado em `src/application/` precisa de teste em `tests/`.
   - Marque asserções que só conferem tamanho, existência ou "não lançou erro". Marque também o caminho de erro ou vazio sem teste (ex.: id inexistente retornando `null`, artista não encontrado).

## Classificação

- **bloqueia**: viola a fronteira de camadas, ou use case novo sem nenhum teste.
- **sugestão**: nome fora do glossário, asserção fraca, caminho de borda sem teste.
- **dúvida**: não dá para decidir só pelo diff; pergunte, sem afirmar.

Não aponte estilo, formatação nem refatoração "para ficar mais limpo". Se não houver achado, diga isso e liste o que você conferiu.

## Formato de saída

Um bloco por achado, em Markdown:

```
### [bloqueia | sugestão | dúvida] título curto
- **Arquivo:** `caminho/arquivo.ts:linha`
- **Problema:** o que está errado, em uma frase.
- **Por que importa:** consequência concreta para o projeto.
```

Termine com a seção **O que não vi**: o que a PR muda e esta revisão não cobre.
