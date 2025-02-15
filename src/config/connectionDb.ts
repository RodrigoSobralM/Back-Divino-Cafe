import mysql from "mysql2";

// Definir o tipo para o resultado da consulta para testar a conexão
type QueryResult = {
  solution: number;
};

export const connectDb = () => {
  const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connect.connect();

  // Query para testar se a conexão foi bem sucedida
  connect.query("SELECT 1 + 1 AS solution", function (err: mysql.QueryError | null, rows: QueryResult[]) {
    if (err) {
      console.error("❌ Erro na consulta:", err.message);
      return;
    }
    console.log("The solution is: ", rows[0].solution);
  });

  connect.end();
};
