# 🍽️ FoodOrderingSystem Frontend
Interface simples em Angular construída para demonstrar a integração em tempo real com o backend do sistema de pedidos de comida via mensageria com RabbitMQ e simulação de pagamento assíncrono.

Este frontend tem como objetivo **visualizar e testar a mensageria** da API em tempo real via Webhook ou WebSocket.


## 📸 Demonstrações
__💳❌ Pagamento Cancelado__
![image](https://github.com/user-attachments/assets/0970929d-7222-47f8-981d-c588f1efc471)

__💳✅ Pagamento Confirmado__
![image](https://github.com/user-attachments/assets/baaaf19a-33b7-485f-8ec8-df65bbb1bd5b)

__📦✅ Pedido Confirmado__
![image](https://github.com/user-attachments/assets/2dd1462d-e788-43db-bfc8-9b34344d25a4)


## 🧰 Tecnologias utilizadas
- [Angular 17](https://angular.io)

- RxJS para manipulação reativa de eventos

- Tailwind para layout simples

- WebSocket (via WebSocket API do browser)

- Integração com backend em Kotlin + RabbitMQ

## ⚙️ Como rodar o projeto
**1. Instale as dependências**
```bash
npm install
```
**2. Rode o projeto localmente**
```bash
ng serve -o
```
Acesse: http://localhost:4200

## 🚀 Funcionalidades implementadas
- Conexão com o WebSocket do backend para escutar atualizações de status de pedido/pagamento

- Interface para visualizar em tempo real quando o pedido muda para pago, recusado ou confirmado

- Teste de resposta do sistema sem precisar recarregar ou consultar manualmente

## 💡 Objetivo do projeto
Este frontend foi desenvolvido para **apoiar a apresentação técnica** do backend FoodOrderingSystem, demonstrando como o **processamento assíncrono via RabbitMQ** pode ser refletido visualmente com **feedback imediato** ao usuário através de eventos em **tempo real.**

🛠️ _Desenvolvido por Leticia Takenaka_ </br>
📦 _Frontend de apoio ao [backend Kotlin com RabbitMQ e Docker](https://github.com/leticiatakenaka/food-ordering-system/edit/main/README.md)_
