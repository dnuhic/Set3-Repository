import 'package:http/http.dart' as http;

import '../../main.dart';

class LoginService {
  Future fetchStores() async {
    return await http
        .get(Uri.parse(MyApp.getBaseUrl() + '/shopmodels/notDeletedShops'));
  }

  Future fetchCashRegistersFromShop(int id) async {
    return await http.get(Uri.parse(MyApp.getBaseUrl() +
        '/api/cashregistermodels/cashregisterfromshop/' +
        id.toString()));
  }
}
