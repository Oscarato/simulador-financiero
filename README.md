# Simulador de Ahorro Digital

Prueba técnica Frontend para la construcción de una aplicación web que permita
descubrir productos de ahorro, simular rentabilidad y registrar la intención
de apertura de un producto financiero.

Por Oscar Javier Jimenez Amaya

---

## Tecnologías utilizadas

- Next.js 15.5.12
- React 18
- TypeScript
- Tailwind CSS
- Node.js 18 LTS 
- Docker

---

## Estructura del proyecto

app/
products/
simulator/
onboarding/
data/
products.json
lib/
debounce.ts
interest.ts
types/
product.ts

## Páginas implementadas

### /products

Página que muestra el listado de productos de ahorro.

- La página utiliza Incremental Static Regeneration (ISR).

**Decisión SSR / ISR**  
Se eligió ISR mediante la constante `revalidate` ya que los productos no cambian
frecuentemente, pero deben poder actualizarse sin necesidad de redeploy.
Esto permite un buen balance entre rendimiento y actualización de datos.

---

### /simulator

Formulario para simular la rentabilidad de un producto de ahorro.

- Campos: monto inicial, aporte mensual y número de meses.
- Validaciones básicas para evitar valores inválidos.
- Cálculo de interés estimado mediante una fórmula simplificada.
- Resultado formateado como moneda (COP).

**Lógica de cálculo**  
La simulación utiliza un interés compuesto mensual aplicado sobre el total
acumulado. El objetivo es ilustrar el comportamiento del ahorro, no replicar
un producto financiero real.

---

### /onboarding

Formulario para registrar la intención de apertura de un producto.

- Campos: nombre, documento y correo electrónico.
- Simulación de validación de recaptcha.
- Si el recaptcha no es válido, se muestra un mensaje de error.
- En caso exitoso, se genera un código de solicitud simulado (UUID).

La lógica está diseñada para representar un flujo real de registro sin depender
de servicios externos.

---

## Estilos

Se utiliza Tailwind CSS para mantener una interfaz consistente y limpia,
evitando estilos personalizados innecesarios y facilitando el mantenimiento
del código.

---

## DEMO
https://simulador-financiero-jpzq.vercel.app/

## Ejecución del proyecto

### Requisitos

- Node.js 18 LTS  
  o  
- Docker (recomendado)

### Ejecución local

```bash
npm install
npm run dev