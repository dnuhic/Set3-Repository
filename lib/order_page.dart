import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:tasklist/UI/components/order_comps/cart_card.dart';
import 'package:tasklist/size_config.dart';

import 'UI/background/background.dart';
import 'UI/forms/login_form.dart';


class OrderPage extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    SizeConfig().init(context);
    return MaterialApp(
      title: 'Material App',
      home: Scaffold(
        body: Stack(
          children: [
            Background(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 10, top: 20),
                  child: Text(
                    "Konzum Centar",
                    style: Theme.of(context).textTheme.headline4.copyWith(fontWeight: FontWeight.w500 ,color: Colors.black)
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 10),
                  child: Text(
                    "Proizvodi",
                    style: TextStyle(fontWeight: FontWeight.w200 ,color: Colors.black, fontSize: 26)
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding:
                        EdgeInsets.symmetric(horizontal: getProportionateScreenWidth(5)),
                    child: Flexible(
                      child: ListView(
                        
                        scrollDirection: Axis.vertical,
                        shrinkWrap: true,
                        children: [
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: CartCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: CartCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: CartCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: CartCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: CartCard(),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Color(0xfff3c526e),
                      minimumSize: const Size.fromHeight(50), // NEW
                    ),
                    onPressed: () {},
                    child: Text(
                    "Create Order",
                    style: Theme.of(context).textTheme.headline4.copyWith(fontWeight: FontWeight.w200 ,color: Colors.white)
                  ),
                  ),
                ),
              ],
            )
            
          ],
        ),
      ),
    );
  }
}