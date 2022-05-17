import 'dart:io';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sqflite/sqflite.dart';
import 'package:sqflite/sqlite_api.dart';
import 'package:tasklist/UI/components/editOrder/edit_order_page.dart';
import 'package:tasklist/UI/components/orders/api.services.dart';
import 'package:tasklist/UI/forms/loginservice.dart';
import 'package:tasklist/edit_order_page.dart';
import 'package:tasklist/UI/components/orders/orders_page.dart';
import 'package:tasklist/reciept_page.dart';

import 'Database.dart';
import 'UI/background/background.dart';
import 'UI/components/createOrder/new_order_page.dart';
import 'UI/components/tables/tables_page.dart';
import 'login_page.dart';
import 'orders_list_page.dart';
//import 'login_page.dart';
import 'dart:developer' as developer;

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}

void main() {
  HttpOverrides.global = MyHttpOverrides();
  WidgetsFlutterBinding.ensureInitialized();
  final database = SQLiteDbProvider.db.database;
  SQLiteDbProvider.db.getRegister().then((value) {
    Widget app = MyApp();
    MyApp.futureRegister = value;
    runApp(app);
  });

}

class MyApp extends StatelessWidget {
  static InstalledRegister futureRegister;

  MyApp({Key key}) : super(key: key);

  static getBaseUrl() {
    //return "https://set3-back.azurewebsites.net";
    return "https://10.0.2.2:7194";
  }
  

  

  static int userId;

  static InstalledRegister register;

  // setRegister() {
  //   futureRegister.then((value) {
  //   });
  // }

  getHomePage() {
    // setRegister();
    print(futureRegister.registerId);
    //return MyHomePage(2);
    if (futureRegister != null && futureRegister.registerId != 0 && futureRegister.shopId != 0) {
      return MyHomePage(0, apiServices: APIServices(), registerId: futureRegister.registerId, shopId: futureRegister.shopId);
    }
    return LoginScreen(loginService: LoginService(), apiServices: APIServices());
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'SET3_android',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: getHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  int selectedIndex;
  APIServices apiServices;
  int registerId;
  int shopId;
  MyHomePage(this.selectedIndex, {this.apiServices, this.registerId, this.shopId});

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;
  PageController pageController = PageController();
  void onTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    pageController.jumpToPage(index);
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    pageController = PageController(initialPage: widget.selectedIndex);

    setState(() {
      if (widget.selectedIndex < 2)
        _selectedIndex = widget.selectedIndex;
      else
        _selectedIndex = 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    developer.log(widget.shopId.toString());
    return Scaffold(
      backgroundColor: Colors.white,
      
      appBar: AppBar(
        backgroundColor: Color(0xfff3c526e),
        elevation: 0,
        title: Padding(
          padding: const EdgeInsets.only(top: 6.0),
          child: Text('SET3 Cash Counter',
              style: GoogleFonts.lato(
                  color: Colors.white,
                  fontSize: 15,
                  letterSpacing: 0.3,
                  fontWeight: FontWeight.normal)),
        ),
        centerTitle: true,
      ),
      body: PageView(
        physics: NeverScrollableScrollPhysics(),
        controller: pageController,
        children: [
          TablePage(apiServices: widget.apiServices, registerId: widget.registerId, shopId: widget.shopId),
          OrderPage(apiServices: widget.apiServices, registerId: widget.registerId, shopId: widget.shopId),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[

          BottomNavigationBarItem(icon: Icon(Icons.list, key: Key('tables')), label: "Units"),
          BottomNavigationBarItem(icon: Icon(Icons.list, key: Key('orders')), label: "Orders"),

        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Color(0xfff3c526e),
        unselectedItemColor: Colors.grey,
        onTap: onTapped
      ),
      // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}