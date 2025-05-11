const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.set("views", "./views")

//Khai báo thông số kết nối postgre

// Định nghĩa route để lấy và hiện dữ liệu

app.listen(port, () =>{
  console.log(`Ung dung dang chay voi port ${port}`);
});
//Khai báo thông số kết nối postgre
const { Client } = require('pg');
var pg = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: '5432',
  database: 'data_05',
});
// Tạo  route để lấy và hiện dữ liệu
app.get("/", async (reg, res)=> {
    await pg.connect()
    .catch( err => console.error('Lỗi kết nối đến PostgreSQL', err))
    .then(() => console.log('Connected to PostgreSQL database'));
 
    let sql = "select gid,adm1_vi from vnm_admbnda_adm1_gov_20201027";
    let data = await pg.query(sql);
    console.log(data.rows)
    res.render("map", { map_data:data.rows })
 })