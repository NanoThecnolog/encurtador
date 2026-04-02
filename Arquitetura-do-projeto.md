# Aplicação de Encurtamento de URL

## Requisitos Funcionais

- **Encurtamento de URL**: Receber uma URL longa e retornar uma versão encurtada.
- **Redirecionamento**: Dada uma URL curta, redirecionar para a URL original.

---

## Requisitos Não Funcionais

- Suportar **100 milhões de URLs geradas por dia**.
- O tamanho da URL encurtada deve ser **mínimo possível**.
- Utilizar caracteres **[0-9, a-z, A-Z] (base62)**.
- Proporção de carga: **1 escrita : 10 leituras**.
- Tamanho médio de cada URL armazenada: **100 bytes**.
- Persistência mínima dos dados: **10 anos**.
- Disponibilidade: **alta disponibilidade (24/7)**.

---

## Cálculos e Estimativas

### Escrita (Write Throughput)
100.000.000 / dia ≈ 1.160 requisições por segundo (RPS)

### Leitura (Read Throughput)
1.160 * 10 = 11.600 RPS

### Volume Total (10 anos)
100.000.000 * 365 * 10 = 365 bilhões de registros

### Armazenamento
365 bilhões * 100 bytes = 36.5 TB

### Espaço de Endereçamento (Base62)

62 caracteres possíveis:
10 (0-9) + 26 (a-z) + 26 (A-Z) = 62

Capacidade:
- 6 caracteres  → ~56 bilhões combinações
- 7 caracteres  → ~3.5 trilhões combinações

**Conclusão**: 7 caracteres atendem com folga o volume estimado para 10 anos.

---

## Banco de Dados

**Cassandra**

Justificativa:
- Alta escalabilidade horizontal
- Alta disponibilidade
- Baixa latência
- Ideal para grandes volumes distribuídos

---

## Modelagem de Dados

Tabela principal:

- `shortcode` (PK)
- `long_url`
- `created_at`

Extensões futuras:
- `user_id`
- `access_count`
- `expires_at`

---

## Estratégia de Geração de Shortcode

### Problemas com abordagens comuns

**Hashes tradicionais (MD5, SHA):**
- Base16 (não atende base62)
- Aumentam tamanho da URL
- Possíveis colisões

**Aleatoriedade:**
- Necessidade de verificação no banco
- Aumento de latência
- Paradoxo do aniversário (colisões crescentes)

---

## Solução

### Conversão determinística

Fluxo:
1. Gerar ID único incremental
2. Converter para base62
3. Utilizar como shortcode

Vantagens:
- Sem colisões
- Sem consultas extras
- Alta performance

---

## Geração de ID

Requisitos:
- Único
- Distribuído
- Ordenável

Solução:
- Redis (INCR)
- Cluster para alta disponibilidade

---

## Segurança

Uso de **Hashids** com `secret_key`

Benefícios:
- Ofuscação
- Dificulta enumeração
- Proteção contra scraping

---

## Inicialização

- Iniciar contador com valor alto

Objetivo:
- Evitar padrões previsíveis
- Reduzir risco de enumeração

---

## Arquitetura

Componentes:

- Load Balancer
- Aplicações stateless (horizontal)
- Redis Cluster (ID + cache)
- Cassandra Cluster (persistência)

---

## Cache

Uso:
- Reduzir latência
- Diminuir carga no DB

Estratégia:
- Cache de URLs populares
- TTL configurável

Status codes:
- 302 → com cache (permite métricas)
- 301 → sem cache

---

## Evolução

- Autenticação
- Dashboard e métricas
- Limites por usuário
- Planos pagos
- Expiração de links
- URLs customizadas

---

## Bibliotecas

- base62
- hashids

---

## Considerações

Arquitetura orientada a:
- Escalabilidade
- Disponibilidade
- Performance
- Previsibilidade
