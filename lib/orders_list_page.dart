import 'package:flutter/material.dart';

import 'package:tasklist/UI/components/categories_comps/cart_card.dart';
import 'package:tasklist/size_config.dart';
import 'UI/background/background.dart';
import 'UI/components/order_comps/order_list_card.dart';

class OdersListPage extends StatefulWidget {
  @override
  State<OdersListPage> createState() => _OdersListPageState();
}

class _OdersListPageState extends State<OdersListPage> {
  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    SizeConfig().init(context);
    return Scaffold(
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
                    "Orders",
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
                            child: OrdersCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: OrdersCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: OrdersCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: OrdersCard(),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 5),
                            child: OrdersCard(),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      );
  }
}