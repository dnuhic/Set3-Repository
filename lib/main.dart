import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:pdf/pdf.dart';
import 'package:tasklist/categories_page.dart';
import 'package:tasklist/edit_order_page.dart';
import 'package:tasklist/order_page.dart';
import 'package:tasklist/reciept_page.dart';

import 'UI/background/background.dart';
import 'login_page.dart';
//import 'login_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
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
      home: LoginScreen(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}



class _MyHomePageState extends State<MyHomePage> {
    int _selectedIndex = 0;
    PageController pageController = PageController();
    void onTapped(int index){
      setState(() {
        _selectedIndex = index;
      });
      pageController.jumpToPage(index);
    }

  @override
  Widget build(BuildContext context) {
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
          OrderPage(),
          EditOrderPage(),
          CategoriesPage(),
          RecieptPage()
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(icon: Icon(Icons.add_chart), label: "Add Order"),
          BottomNavigationBarItem(icon: Icon(Icons.create_rounded), label: "Edir Order"),
          BottomNavigationBarItem(icon: Icon(Icons.category), label: "Categories"),
          BottomNavigationBarItem(icon: Icon(Icons.receipt), label: "Receipt"),
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
