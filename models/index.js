"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
//var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD);
var db        = {};

const config = { //this will go in the .env
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  dialect: "mysql",
  use_env_variable: "JAWSDB_URL"
};
var sequelize = new Sequelize(process.env[config.use_env_variable], config);

sequelize.query("CREATE DATABASE IF NOT EXISTS `TrollsToll`;").then((err,res) => {
  if (err) {
    console.log(err)
  } else {
  console.log(res)
  }
})

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
