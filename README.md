# 🚗 UtzilCar

**UtzilCar** es una plataforma que permite verificar la legalidad de vehículos mediante el escaneo de códigos QR. Este MVP (Producto Mínimo Viable) permite escanear un QR con la cámara del dispositivo y consultar información básica sobre el vehículo.

---

## 📸 Funcionalidades del MVP

- Escaneo de códigos QR usando la cámara del dispositivo.
- Consulta simulada de datos del auto (placa, dueño, estado legal).
- Visualización del estado legal del vehículo (`✅ Legal` o `❌ Ilegal`).

---

## 🛠️ Tecnologías usadas

- HTML, CSS y JavaScript
- Librería [`html5-qrcode`](https://github.com/mebjas/html5-qrcode)
- Replit como entorno de desarrollo

---

## 🚀 Cómo usarlo

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tobyasutzil/utzilcar.git
   cd utzilcar


    Escanea un código QR que contenga alguno de los siguientes textos:

        AUTO123 → Auto legal

        AUTO456 → Auto ilegal

Puedes generar los QR en: https://www.qr-code-generator.com/
🧪 Base de datos simulada

Este MVP usa una base de datos simulada en el frontend con los siguientes autos:

const autoDatabase = {
  "AUTO123": {
    placa: "ABC-123",
    dueño: "Juan Pérez",
    estado: "Legal"
  },
  "AUTO456": {
    placa: "XYZ-456",
    dueño: "María López",
    estado: "Ilegal"
  }
};

📌 Próximos pasos

    Conexión con backend para validar autos reales

    Smart contracts en Solidity para verificar legalidad en blockchain

    Uso de UtzilCoin (token ERC-20)

    Registro y validación de autos en blockchain

🙌 Autor

Desarrollado por @tobyasutzil
Este proyecto forma parte del MVP de UtzilCar para validar ideas de legalidad descentralizada de vehículos.
📄 Licencia

Este proyecto está bajo la Licencia MIT.


---

### ✅ ¿Qué debes hacer?

1. Crea un archivo llamado `README.md` en tu repositorio (si no existe ya).
2. Copia y pega ese contenido.
3. ¡Guarda y haz commit!

¿Te gustaría que te ayude a subirlo a GitHub o agregar otros pasos como cómo usar UtzilCoin o un smart contract?

    Escanea un código QR que contenga alguno de los siguientes textos:

        AUTO123 → Auto legal

        AUTO456 → Auto ilegal

Puedes generar los QR en: https://www.qr-code-generator.com/
🧪 Base de datos simulada

Este MVP usa una base de datos simulada en el frontend con los siguientes autos:

const autoDatabase = {
  "AUTO123": {
    placa: "ABC-123",
    dueño: "Juan Pérez",
    estado: "Legal"
  },
  "AUTO456": {
    placa: "XYZ-456",
    dueño: "María López",
    estado: "Ilegal"
  }
};

📌 Próximos pasos

    Conexión con backend para validar autos reales

    Smart contracts en Solidity para verificar legalidad en blockchain

    Uso de UtzilCoin (token ERC-20)

    Registro y validación de autos en blockchain

🙌 Autor

Desarrollado por @tobyasutzil
Este proyecto forma parte del MVP de UtzilCar para validar ideas de legalidad descentralizada de vehículos.
📄 Licencia

Este proyecto está bajo la Licencia MIT.


---
