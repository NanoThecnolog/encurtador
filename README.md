# 🔗 URL Shortener Service

> Serviço de encurtamento de URLs projetado para alta escala, baixa latência e alta disponibilidade.

---

## 📌 Overview

Este projeto implementa um sistema de encurtamento de URLs capaz de suportar alto volume de tráfego, utilizando geração distribuída de IDs, cache em memória e arquitetura stateless.

Principais características:

- Alta escalabilidade horizontal
- Baixa latência em leitura
- Geração determinística de shortcodes
- Arquitetura resiliente

---

## 🚀 Features

- Encurtamento de URLs
- Redirecionamento via shortcode
- Geração de IDs únicos distribuídos (Redis INCR)
- Cache de alta performance
- Estrutura preparada para métricas e analytics

---

## 🏗️ Arquitetura

```
Client
  ↓
Load Balancer
  ↓
NestJS (Stateless)
  ↓
 ├── Redis (ID Generator + Cache)
 └── Database (Persistência)
```

---

## 🔄 Fluxos

### Encurtamento

```
1. Recebe URL longa
2. Redis INCR → gera ID único
3. ID → Hashids → base62
4. Persistência no banco
5. Retorno da URL encurtada
```

### Redirecionamento

```
1. Recebe shortcode
2. Busca no cache (Redis)
3. Fallback para banco
4. Atualiza cache
5. Redireciona (HTTP 302)
```

---

## 📦 Tech Stack

- **Backend:** NestJS
- **Linguagem:** TypeScript
- **Cache / ID Generator:** Redis
- **Persistência:** Cassandra (ou outro banco distribuído)
- **Encoding:** Base62
- **Ofuscação:** Hashids

---

## 📡 API

### 🔗 Encurtar URL

**POST** `/url/shorten`

#### Request

```json
{
  "url": "https://example.com"
}
```

#### Response (200)

```json
{
  "code": 200,
  "success": true,
  "data": {
    "longUrl": "https://example.com",
    "shortUrl": "abc123"
  }
}
```

---

### 🔁 Redirecionamento

**GET** `/:shortcode`

- Retorna `302 Found` redirecionando para a URL original

---

## 📁 Estrutura do Projeto

```
src/
 ├── modules/
 │    ├── url/
 │    ├── redirect/
 │    └── id-generator/
 │
 ├── infra/
 │    ├── redis/
 │    └── database/
 │
 ├── common/
 │    ├── filters/
 │    ├── utils/
 │    └── interfaces/
```

---

## 📊 Decisões Técnicas

### Redis como gerador de ID

- Uso de `INCR` (atômico)
- Sem colisões
- Alta performance
- Escalável horizontalmente

---

### Base62 + Hashids

- URLs curtas
- Melhor UX
- Ofuscação de sequência

---

### Cache

- Reduz latência
- Evita carga no banco
- Essencial para leitura em alta escala

---

## 📈 Escalabilidade

- Aplicação stateless → horizontal scaling
- Redis pode operar em cluster
- Banco distribuído (Cassandra)

---

## 🔒 Segurança

- Ofuscação com Hashids + salt
- Prevenção de enumeração sequencial
- Possibilidade de rate limiting (futuro)

---

## 🧪 Evoluções Futuras

- Autenticação de usuários
- Dashboard com métricas
- Rate limiting
- Expiração de URLs
- URLs customizadas
- Sistema de planos (SaaS)

---

## 📄 Licença

Este projeto está licenciado sob:

**CC-BY-NC-4.0 (Attribution-NonCommercial 4.0 International)**

---