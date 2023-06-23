// CREATE TABLE clientes (
// 	"id" serial PRIMARY KEY,
// 	"cnpj" TEXT NOT NULL UNIQUE
// );

// CREATE TABLE contas (
// 	"id" serial PRIMARY KEY,
// 	"cnpj_cliente" TEXT NOT NULL REFERENCES clientes("cnpj"),
// 	"valor_esperado" numeric NOT NULL,
// 	"valor_pago" numeric NOT NULL,
// 	"data_pagamento" DATE,
// 	"data_vencimento" DATE NOT NULL
// );

// Inserir os CNPJs na tabela de clientes
// INSERT INTO clientes("cnpj") VALUES ('11203274000102'), ('04210657000134');

// Inserir as contas a receber contas pagas


// INSERT INTO contas ("cnpj_cliente", "valor_esperado", "valor_pago", "data_pagamento", "data_vencimento")
// VALUES
//     ('11203274000102', 1000, 950, '2023-06-10', '2023-06-05'),
//     ('11203274000102', 2000, 1800, '2023-06-15', '2023-06-10'),
//     ('11203274000102', 3000, 2700, '2023-06-20', '2023-06-15'),
//     ('04210657000134', 1500, 1400, '2023-06-10', '2023-06-05'),
//     ('04210657000134', 2500, 2200, '2023-06-15', '2023-06-10'),
//     ('04210657000134', 3500, 3300, '2023-06-20', '2023-06-15');

//  Contas vencidas e não pagas


// INSERT INTO contas ("cnpj_cliente", "valor_esperado", "valor_pago", "data_pagamento", "data_vencimento")
// VALUES
//     ('11203274000102', 500, 0, NULL, '2023-06-05'),
//      ('04210657000134', 800, 0, NULL, '2023-06-08');


// Contas com vencimento futuro e não pagas


// INSERT INTO contas ("cnpj_cliente", "valor_esperado", "valor_pago", "data_pagamento", "data_vencimento")
// VALUES
//     ('11203274000102', 700, 0, NULL, '2023-06-25'),
//     ('11203274000102', 900, 0, NULL, '2023-06-30'),
//     ('04210657000134', 1200, 0, NULL, '2023-06-28'),
//     ('04210657000134', 1800, 0, NULL, '2023-06-30');
