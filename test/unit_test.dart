import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/testing.dart';
import 'package:tasklist/UI/components/createOrder/saved_order_body.dart';
import 'package:tasklist/UI/components/createOrder/shop.dart';
import 'package:tasklist/UI/components/orders/api.services.dart';
import 'package:tasklist/UI/components/orders/userordermodel.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;
import 'package:mockito/annotations.dart';

class MockClient extends Mock implements http.Client {}

class MockApiService implements APIServices{
  @override
  String baseUrl;

  static String url = "https://localhost:7194";

  static Future fetchUserOrder(int id) async {
    return await http
        .get(Uri.parse(url + '/api/UserOrderModels/myuserorders/' + id.toString()));
  }

  static Future fetchStores() async {
    return await http
        .get(Uri.parse(url + '/shopmodels/notDeletedShops'));
  }

  static Future fetchProducts(int id) async {
    return await http
        .get(Uri.parse(url + '/api/userordermodels/productsFromShop/' + id.toString()));
  }

  static Future sendOrder(SavedOrderBody body, String action) async {
    return await http
        .post(Uri.parse(
        url + '/api/userordermodels/' + action),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(body));
  }

  static Future sendOrderEdit(SavedOrderBody body, String action, int userOrderId) async {
    return await http
        .put(Uri.parse(
        url + '/api/userordermodels/' + action + "/" + userOrderId.toString()),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(body));
  }

  static Future deleteOrder(int id) async {
    return await http
        .delete(Uri.parse(url + '/api/userordermodels/' + id.toString()));
  }

  static Future fetchCashRegistersFromShop(int id) async {
    return await http
        .get(Uri.parse(url + '/api/cashregistermodels/cashregisterfromshop/' + id.toString()));
  }

  static Future fetchProductsFromUserOrder(int id) async {
    return await http
        .get(Uri.parse(url + '/api/userordermodels/savedUserOrderProducts/' + id.toString()));
  }
}

void main(){
  
  test('checks if fetchstore returns instance of Shop', () async{
    
    final response = await MockApiService.fetchStores();
      print(response.body);
      expect(
        Shop.fromJson(jsonDecode(response.body)[0]),
        isA<Shop>()
      );
  });
  test('checks if fetchstore returns instance of Shop', () async{
    final client = MockClient();
    when(client.get(Uri.parse('https://localhost:7194' + '/shopmodels/notDeletedShops')))
          .thenAnswer((_) async =>
              http.Response('{"id":1,"name":"Prvi shop","adress":"Sarjevo","stockId":1,"deleted":false}', 200));
    final response = await MockApiService.fetchStores();
      expect(
        Shop.fromJson(jsonDecode(response.body)[0]),
        isA<Shop>()
      );
  });
  
}
