var express = require('express');
var db = require('./db.js');
var { Success, Error } = require('./response');

const bank = express.Router();

bank.get('/', function (req, res) {
    res.redirect('/bankindex.html');
});

bank.get('/bankcard', function (req, res) {
    res.redirect('/bankcard.html');
});

bank.get('/bankgooglePay', function (req, res) {
    res.redirect('/bankgooglePay.html');
});

bank.get('/bankjkos', function (req, res) {
    res.redirect('/bankjkos.html');
});

bank.get('/banklinePay', function (req, res) {
    res.redirect('/banklinePay.html');
});

bank.get('/banksamsungPay', function (req, res) {
    res.redirect('/banksamsungPay.html');
});

module.exports = bank;