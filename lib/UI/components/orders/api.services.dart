import 'dart:async' as async;
import 'dart:convert' as convert;
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:tasklist/main.dart';

import '../createOrder/saved_order_body.dart';

class APIServices {
  String baseUrl = "https://10.0.2.2:7206";

  static Future fetchDoneUserOrders(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/UserOrderModels/myuserorders/' + id.toString()));
  }

  static Future fetchStores() async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/shopmodels/notDeletedShops'));
  }

  static Future fetchProducts(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/productsFromShop/' + id.toString()));
  }

  static Future sendOrder(SavedOrderBody body, String action) async {
    return await http
        .post(Uri.parse(
        MyApp.getBaseUrl() + '/api/userordermodels/' + action),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body));
  }

  static Future sendOrderEdit(SavedOrderBody body, String action, int userOrderId) async {
    return await http
        .put(Uri.parse(
        MyApp.getBaseUrl() + '/api/userordermodels/' + action + "/" + userOrderId.toString()),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(body));
  }

  static Future deleteOrder(int id) async {
    return await http
        .delete(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/' + id.toString()));
  }

  static Future fetchCashRegistersFromShop(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/cashregistermodels/cashregisterfromshop/' + id.toString()));
  }

  static Future fetchProductsFromUserOrder(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/savedUserOrderProducts/' + id.toString()));
  }

  static Future fetchTablesFromShop(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/tablemodels/tablesWithProductsFromShop/' + id.toString()));
  }

  static Future fetchUserOrderFromTable(int id) async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/api/userordermodels/userOrderFromTable/' + id.toString()));
  }
}


