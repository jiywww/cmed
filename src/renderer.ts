import sqlite3 from "sqlite3";

let db = new sqlite3.Database("./mydb.sqlite3", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

// 进行数据库操作
db.serialize(() => {
  db.each(`SELECT * FROM your_table`, (err, row : any) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.info);
  });
});

// 关闭数据库连接
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
