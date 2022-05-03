import 'package:flutter/material.dart';
import 'package:flutter_tabler_icons/flutter_tabler_icons.dart';
import 'package:requests/requests.dart';
import 'package:tasklist/main.dart';
import 'dart:convert';
import 'dart:developer' as developer;
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../Database.dart';
import 'cash_register.dart';
import 'loginservice.dart';
import 'shop.dart';

class LoginForm extends StatefulWidget {
  final LoginService loginService;
  const LoginForm({Key key, this.loginService}) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

  List<CashRegister> cashRegisters = [];

  List<Shop> shops = [];

  Shop selectedShop;

  CashRegister selectedRegister;

  _getShops() {
    widget.loginService.fetchStores().then((response) => setState(() {
          Iterable list = json.decode(response.body);
          shops = list.map((model) => Shop.fromJson(model)).toList();
          selectedShop = shops[0];

          widget.loginService.fetchCashRegistersFromShop(selectedShop.id)
              .then((response) {
            setState(() {
              Iterable list = json.decode(response.body);
              print("Lista kasa:" + list.toString());
              cashRegisters =
                  list.map((model) => CashRegister.fromJson(model)).toList();
              selectedRegister = cashRegisters[0];
            });
          });
        }));
  }

  @override
  void initState() {
    super.initState();

    _getShops();
  }

  @override
  void dispose() {
    _email.dispose();
    _password.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          margin: const EdgeInsets.only(bottom: 60),
          child: const Text(
            "Login",
            style: TextStyle(
              fontSize: 35,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        SizedBox(
          height: 150,
          child: Stack(
            children: [
              Container(
                height: 150,
                margin: const EdgeInsets.only(
                  right: 70,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: const BorderRadius.only(
                    topRight: Radius.circular(100),
                    bottomRight: Radius.circular(100),
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 0,
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                        margin: const EdgeInsets.only(left: 16, right: 32),
                        child: DropdownButtonFormField<Shop>(
                          key: Key("drop-down-shop"),
                          decoration: InputDecoration(
                              // enabledBorder: OutlineInputBorder(
                              //   borderRadius: BorderRadius.circular(12),
                              //   borderSide: BorderSide(width: 0, color: Colors.blue),
                              // ),
                              ),
                          value: selectedShop,
                          items: shops
                              .map((shop) => DropdownMenuItem<Shop>(
                                    value: shop,
                                    child: Row(
                                      children: [
                                        Icon(
                                          Icons.store,
                                          color: Colors.black,
                                        ),
                                        Text(" " + shop.name,
                                            style: TextStyle(fontSize: 18)),
                                      ],
                                    ),
                                  ))
                              .toList(),
                          onChanged: (shop) => {
                            widget.loginService.fetchCashRegistersFromShop(shop.id)
                                .then((response) {
                              setState(() {
                                Iterable list = json.decode(response.body);
                                print("Lista kasa:" + list.toString());
                                cashRegisters = list
                                    .map(
                                        (model) => CashRegister.fromJson(model))
                                    .toList();
                                selectedRegister = cashRegisters[0];
                              });
                            }),
                            setState(() => {selectedShop = shop}),
                          },
                        )),
                    Container(
                        margin: const EdgeInsets.only(left: 16, right: 32),
                        child: DropdownButtonFormField<CashRegister>(
                          key: Key("drop-down-cashregister"),
                          decoration: InputDecoration(
                              // enabledBorder: OutlineInputBorder(
                              //   borderRadius: BorderRadius.circular(12),
                              //   borderSide: BorderSide(width: 0, color: Colors.blue),
                              // ),
                              ),
                          value: selectedRegister,
                          items: cashRegisters
                              .map((cashRegister) =>
                                  DropdownMenuItem<CashRegister>(
                                    value: cashRegister,
                                    child: Row(
                                      children: [
                                        Icon(
                                          TablerIcons.cash,
                                          color: Colors.black,
                                        ),
                                        Text(" " + cashRegister.name,
                                            style: TextStyle(fontSize: 18)),
                                      ],
                                    ),
                                  ))
                              .toList(),
                          onChanged: (cashRegister) => {
                            setState(() => {selectedRegister = cashRegister}),
                          },
                        )),
                  ],
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: GestureDetector(
                  key: Key('login-btn'),
                  onTap: (() async {
                    final shopId = selectedShop.id;
                    final registerId = selectedRegister.id;

                    print('Shop: ${shopId} Register: ${registerId}');
                    final register = InstalledRegister(1, registerId, shopId);
                    await SQLiteDbProvider.db.update(register);

                    MyApp.futureRegister = register;
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => MyHomePage(0)),
                    );

                    /*final email = _email.text;
                    final password = _password.text;

                    developer.log(email);
                    developer.log(password);

                    final res = await login(
                      email,
                      password,
                    );

                    ScaffoldMessenger.of(context).hideCurrentSnackBar();

                    final status = jsonDecode(res.content());

                    //if there is no error, get the user's accesstoken and pass it to HomeScreen
                    if (status["result"] != "ERROR") {
                      print(status["result"]);
                      MyApp.userId = int.parse(status["result"]);
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => MyHomePage(0)),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                        content: Text('Error: Incorrect email or password.'),
                        backgroundColor: Colors.red.shade300,
                      ));
                    }*/
                  }),
                  child: Container(
                    margin: const EdgeInsets.only(right: 15),
                    height: 80,
                    width: 80,
                    decoration: BoxDecoration(
                      boxShadow: [
                        BoxShadow(
                          color:
                              Color.fromARGB(255, 20, 67, 121).withOpacity(0.5),
                          spreadRadius: 5,
                          blurRadius: 7,
                          offset: const Offset(0, 3),
                        ),
                      ],
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        begin: Alignment.centerLeft,
                        end: Alignment.centerRight,
                        colors: [
                          Color(0xff19ab4b3),
                          Color(0xff254718f),
                        ],
                      ),
                    ),
                    child: const Icon(
                      Icons.arrow_forward_outlined,
                      color: Colors.white,
                      size: 32,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

Future<Response> login(String email, String password) async {
  try {
    Response response = await Requests.post(
      MyApp.getBaseUrl() + '/Authentication/mobile',
      body: {'email': email, 'password': password},
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Credentials": true.toString()
      },
      bodyEncoding: RequestBodyEncoding.JSON,
    );
    return response;
  } catch (e) {
    developer.log(e);
  }
}
