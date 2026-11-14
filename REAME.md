# SPARTA Test Automation Architectuur – Demo Project

Dit project is een referentie-implementatie van de **SPARTA-architectuur** met **Playwright** en **TypeScript**, gericht op het testen van een REST API (`://typicode.com`).

Het doel van deze opzet is het strikt scheiden van **wat** we testen (functionele testscenario's) en **hoe** dit technisch wordt uitgevoerd (endpoints, requests en foutafhandeling).

---

## De 4 lagen van SPARTA

De architectuur is opgebouwd uit vier afgebakende lagen met elk een eigen verantwoordelijkheid:

```text
┌─────────────────────────────────────────────────────────┐
│ 1. TESTLAAG (tests/ & data/)                            │
│    Wat wil je testen? Leesbare scenario's + testdata.   │
├─────────────────────────────────────────────────────────┤
│ 2. CONFIGURATIELAAG (config/ & playwright.config.ts)    │
│    Onder welke omstandigheden? Fixtures, URLs, sessies. │
├─────────────────────────────────────────────────────────┤
│ 3. ACT & ASSERT-LAAG (act-assert/)                      │
│    Wat kan de tester doen & controleren? Keywords.      │
├─────────────────────────────────────────────────────────┤
│ 4. INTERACTIELAAG (interactie/)                         │
│    Hoe werkt het onder de motorkap? API-calls & UI.     │
└─────────────────────────────────────────────────────────┘
```

### Overzicht van verantwoordelijkheden

| Laag | Map / Bestanden | Bevat WEL | Bevat NIET |
| :--- | :--- | :--- | :--- |
| **1. Test** | `tests/posts.spec.ts`<br>`data/posts.json` | • Functionele testscenario's<br>• Keywords uit Act & Assert<br>• Data-driven invoer (JSON) | • Endpoints of selectors<br>• HTTP-statuscodes<br>• `expect()`-validaties<br>• `if/else` of testlogica |
| **2. Configuratie** | `playwright.config.ts`<br>`config/fixtures.ts` | • `baseURL` & headers<br>• Playwright Test Fixtures<br>• Context- en sessie-isolatie | • Testscenario's<br>• API-calls of DOM-acties<br>• Validaties |
| **3. Act & Assert** | `act-assert/PostActions.ts`<br>`act-assert/PostAssertions.ts` | • **Invokers** (acties)<br>• **Asserters** (`expect()`-checks)<br>• Herbruikbare keywords | • Endpoints of selectors<br>• Response-parsing<br>• Testdatabeheer |
| **4. Interactie** | `interactie/PostApiClient.ts` | • HTTP-requests (`GET`, `POST`)<br>• Response-parsing<br>• Technische foutafhandeling (5xx) | • Functionele `expect()`-checks<br>• Testscenario's<br>• Omgevingsinstellingen |

---

## Waarom deze architectuur?

1. **Onderhoudbaarheid (Single Point of Change):** Verandert een API-endpoint of datastructuur? Dan hoeft alleen de **Interactielaag** aangepast te worden. Alle testscenario's blijven ongewijzigd.
2. **Leesbaarheid & Samenwerking:** Doordat de **Testlaag** vrij is van technische code en `expect()`-regels, kunnen ook minder technische teamleden scenario's lezen en nieuwe testgevallen toevoegen in `data/posts.json`.
3. **Zuivere scheiding tussen Actie en Validatie:** De **Interactielaag** haalt uitsluitend ruwe data op en bewaakt de technische uitvoering (zoals serverfouten `>= 500`). De **Act & Assert-laag** beoordeelt vervolgens of deze data functioneel klopt via Playwright `expect()`.
4. **Isolatie & Parallelisatie:** Via de **Configuratielaag** (Playwright Fixtures) krijgt elke test zijn eigen geïsoleerde context en dependencies geïnjecteerd, waardoor tests veilig parallel gedraaid kunnen worden.

---

## Hoe een test door de lagen stroomt

Bij het uitvoeren van `Kan een nieuwe post aanmaken` gebeurt het volgende:

1. **Configuratie (`fixtures.ts`):** Injecteert een schone instantie van `PostActions` en `PostAssertions` in de test en stelt de `baseURL` beschikbaar.
2. **Test (`posts.spec.ts`):** Leest de testdata uit `posts.json` en roept het keyword `postAct.maakNieuwePostAan(...)` aan.
3. **Act & Assert (`PostActions.ts`):** Vertaalt de functionele actie naar een aanroep op de Interactielaag.
4. **Interactie (`PostApiClient.ts`):** Voert de daadwerkelijke `POST /posts` call uit, controleert op technische serverfouten en geeft een getypeerde `PostResponse` terug.
5. **Act & Assert (`PostAssertions.ts`):** Ontvangt het resultaat en valideert via `expect()` de statuscode (`201`), titel, `userId` en het gegenereerde `id`.

---

## Installatie & Uitvoeren

### Vereisten
* Node.js (v18 of hoger)

### Installatie
```bash
npm install
```

### Tests uitvoeren
Draai alle tests in headless modus:
```bash
npx playwright test
```

Bekijk het HTML-testrapport na afloop:
```bash
npx playwright show-report
```
