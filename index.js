const express = require("express")
var mysql = require('mysql')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
config = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'nodedb'
}
var cn =mysql.createConnection(config);
// Get All========================================
app.get("/api/product",(req,res)=>{
	cn.query("select * from products",(err,respose)=>{
		if(err){
			res.json({
				error: true,
				message :err
			})
		}else{
			res.json({
				list : respose
			})
		}
	})
})
// Get By Id================================
app.get("/api/product/:id",(req,res)=>{
	cn.query("select * from products where id = ?",[req.params.id],(err,respose)=>{
		if(err){
			res.json({
				error: true,
				message :err
			})
		}else{
			res.json({
				list : respose
			})
		}
	})
})
// Save==================================
app.post("/api/product",(req,res)=>{
	var reqbody = req.body;
	console.log(reqbody);
	var sql = "insert into products(name,price,description) values(?,?,?)"
	cn.query(sql,[reqbody.name,reqbody.price,reqbody.description],(err,respose)=>{
		if(err){
			res.json({
				error: true,
				message :err
			})
		}else{
			res.json({
				message:"Save successfully",
				list : respose
			})
		}
	})
})
// Get By Id================================
app.delete("/api/product",(req,res)=>{
	if(req.body.id == "" || req.body.id == null){
		res.json({
			error : true,
			message: "Param id required"
		})
		return false
	}
	cn.query("delete from products where id = ?",[req.body.id],(err,respose)=>{
		if(err){
			res.json({
				error: true,
				message :err
			})
		}else{
			res.json({
				message : "delete success!"
			})
		}
	})
})
// Update==================================
app.put("/api/product/",(req,res)=>{
	var reqbody = req.body;
	console.log(reqbody);
	var sql = "update products set name=?,price=?,description=? where id=?"
	cn.query(sql,[reqbody.name,reqbody.price,reqbody.description,reqbody.id],(err,respose)=>{
		if(err){
			res.json({
				error: true,
				message :err
			})
		}else{
			res.json({
				message:"Update successfully",
				list : respose
			})
		}
	})
})
app.listen(8080,()=>{
	console.log("http://localhost:8080")
})
