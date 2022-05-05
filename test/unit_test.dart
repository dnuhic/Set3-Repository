import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:tasklist/UI/components/createOrder/cash_register.dart';
import 'package:tasklist/UI/components/createOrder/product.dart';
import 'package:tasklist/UI/components/createOrder/saved_order_body.dart';
import 'package:tasklist/UI/components/createOrder/shop.dart';
import 'package:tasklist/UI/components/orders/api.services.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;
import 'package:tasklist/UI/components/orders/userordermodel.dart';

class MockClient extends Mock implements http.Client {}

class MockApiService implements APIServices {
  @override
  String baseUrl;

  static String url = "https://localhost:7194";

  Future fetchDoneUserOrders(int id) async {
    return await http.get(
        Uri.parse(url + '/api/UserOrderModels/myuserorders/' + id.toString()));
  }

  Future fetchStores() async {
    return await http.get(Uri.parse(url + '/shopmodels/notDeletedShops'));
  }

  Future fetchProducts(int id) async {
    return await http.get(Uri.parse(
        url + '/api/userordermodels/productsFromShop/' + id.toString()));
  }

  Future sendOrder(SavedOrderBody body, String action) async {
    return await http.post(Uri.parse(url + '/api/userordermodels/' + action),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(body));
  }

  Future sendOrderEdit(
      SavedOrderBody body, String action, int userOrderId) async {
    return await http.put(
        Uri.parse(url +
            '/api/userordermodels/' +
            action +
            "/" +
            userOrderId.toString()),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(body));
  }

  Future deleteOrder(int id) async {
    return await http
        .delete(Uri.parse(url + '/api/userordermodels/' + id.toString()));
  }

  Future fetchCashRegistersFromShop(int id) async {
    return await http.get(Uri.parse(
        url + '/api/cashregistermodels/cashregisterfromshop/' + id.toString()));
  }

  Future fetchProductsFromUserOrder(int id) async {
    return await http.get(Uri.parse(
        url + '/api/userordermodels/savedUserOrderProducts/' + id.toString()));
  }

  Future fetchTablesFromShop(int id) async {
    return await http
        .get(Uri.parse(url + '/api/tablemodels/tablesWithProductsFromShop/' + id.toString()));
  }

  Future fetchUserOrderFromTable(int id) async {
    return await http
        .get(Uri.parse(url + '/api/userordermodels/userOrderFromTable/' + id.toString()));
  }
}

void main() {
  MockApiService mockApiService;

  setUp((){
    mockApiService = MockApiService();
  });
  test('checks if fetchstore returns instance of Shop', () async {
    //final client = MockClient();
    // when(client.get(Uri.parse('https://localhost:7194' + '/shopmodels/notDeletedShops')))
    //       .thenAnswer((_) async =>
    //           http.Response('{"id":1,"name":"Prvi shop","adress":"Sajevo","stockId":1,"deleted":false}', 200));
    final response = await mockApiService.fetchStores();
    print(response.body);
    expect(Shop.fromJson(jsonDecode(response.body)[0]), isA<Shop>());
  });
  test('checks if fetchstore returns right instances of Shop', () async {
    //final client = MockClient();
    // when(client.get(Uri.parse('https://localhost:7194' + '/shopmodels/notDeletedShops')))
    //       .thenAnswer((_) async =>
    //           http.Response('{"id":1,"name":"Prvi shop","adress":"Sajevo","stockId":1,"deleted":false}', 200));
    
    final firstExpectedShop = '{"id":1,"name":"Prvi shop","adress":"Sarajevo","stockId":1,"deleted":false}';
    final secondExpectedShop = '{"id":2,"name":"Drugi shop","adress":"Visoko","stockId":1,"deleted":false}';
        
    final shops = [Shop.fromJson(jsonDecode(firstExpectedShop)), Shop.fromJson(jsonDecode(secondExpectedShop))].toList();
    final shopsNames = shops.map((shop) => shop.name);
    
    final response = await mockApiService.fetchStores();
    expect(jsonDecode(response.body).map((shop) => Shop.fromJson(shop).name).toList(), shopsNames);
  });

  test('checks if fetchProducts returns right instances of Products', () async {
    
    final firstExpectedProduct = '{"id":1,"name":"Jabuka","categoryname":"Food","deleted":false,"quantity":10,"barcode":"Barcode","barcodetext":"BarcodeText","price":5,"measuringunit":"Gram"}';
        
    final products = [Product.fromJson(jsonDecode(firstExpectedProduct))].toList();
    final productsNames = products.map((product) => product.Name);
    
    final response = await mockApiService.fetchProducts(1);
    expect(jsonDecode(response.body).map((product) => Product.fromJson(product).Name).toList(), productsNames);
  });

  test('checks if fetchProducts returns right instances of Products', () async {
    
    final firstExpectedProduct = '{"id":1,"name":"Jabuka","categoryname":"Food","deleted":false,"quantity":10,"barcode":"Barcode","barcodetext":"BarcodeText","price":5,"measuringunit":"Gram"}';
        
    final products = [Product.fromJson(jsonDecode(firstExpectedProduct))].toList();
    final productsNames = products.map((product) => product.Name);
    
    final response = await mockApiService.fetchProducts(1);
    expect(jsonDecode(response.body).map((product) => Product.fromJson(product).Name).toList(), productsNames);
  });

  test('checks if fetchCashRegisters returns right instances of CashRegisters', () async {
    
    final firstExpectedCashRegister = '{"id":1,"shopId":1,"deleted":false,"name":"Kasa1Sarajevo","Descrription":"Prva klasa Sarajeva","installed":1}';
    final secondExpectedCashRegister = '{"id":2,"shopId":1,"deleted":false,"name":"Kasa2Sarajevo","Descrription":"Druga klasa Sarajeva","installed":1}';
        
    final cashRegisters = [CashRegister.fromJson(jsonDecode(firstExpectedCashRegister)), CashRegister.fromJson(jsonDecode(secondExpectedCashRegister))].toList();
    final cashRegistersNames = cashRegisters.map((cashRegister) => cashRegister.name).toList();
    
    final response = await mockApiService.fetchCashRegistersFromShop(1);
    expect(jsonDecode(response.body).map((cashRegister) => CashRegister.fromJson(cashRegister).name).toList(), cashRegistersNames);
  });

  test('checks if sendOrder and fetchProductsFromUserOrder and fetchDoneUserOrders work', () async {
    
    final savedOrder = SavedOrderBody(1, 3, 1, 1, [ProductQuantitys(1, 5)].toList());
    
    await mockApiService.sendOrder(savedOrder, "finish");
    
    final response = await mockApiService.fetchDoneUserOrders(1);
    final responseUserOrderModel = UserOrderModel.fromJson(jsonDecode(response.body)[0]);
    expect(responseUserOrderModel.userID, savedOrder.userId);
    expect(responseUserOrderModel.shopID, savedOrder.shopId);
    
    final responseProducts = await mockApiService.fetchProductsFromUserOrder(responseUserOrderModel.Id);
    final jsonProductOrder = jsonDecode(responseProducts.body)[0];
    final responseProductsOrderModel = ProductQuantitys(jsonProductOrder["productId"],5);
    expect(responseProductsOrderModel.productId, 1);
  });

}
