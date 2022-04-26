import 'package:flutter/material.dart';

import 'package:tasklist/UI/components/categories_comps/cart_card.dart';
import 'package:tasklist/size_config.dart';
import 'UI/background/background.dart';

class CategoriesPage extends StatefulWidget {
  @override
  State<CategoriesPage> createState() => _CategoriesPageState();
}

class _CategoriesPageState extends State<CategoriesPage> {
  void submit() {
        //Update category
        Navigator.of(context, rootNavigator: true).pop();
      }

      Future openDialog(int categoryId) async => showDialog(context: context, builder: (context) => AlertDialog(
        title: Text('Add Category'),
        content: Column(
          children: [
            TextField(
              autofocus: true,
              decoration: InputDecoration(hintText: 'Category Name'),
            ),
            TextField(
              decoration: InputDecoration(hintText: 'PDV %'),
            ),
          ],
        ),
        actions: [
          TextButton(
            child: Text('Save'),
            onPressed: () {
              submit();
            },
          ),
          TextButton(
            child: Text('Cancel'),
            onPressed: submit,
          ),
        ],
      ),);

  // This widget is the root of your application.
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
                    "Kategorije",
                    style: TextStyle(fontWeight: FontWeight.w200 ,color: Colors.black, fontSize: 26)
                  ),
                ),
                Flexible(
                  child: Container(
                    height: size.height*0.65,
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
                              child: CategoriesCard(),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 5),
                              child: CategoriesCard(),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 5),
                              child: CategoriesCard(),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 5),
                              child: CategoriesCard(),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 5),
                              child: CategoriesCard(),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(6),
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      primary: Color(0xfff3c526e),
                      minimumSize: const Size.fromHeight(50), // NEW
                    ),
                    onPressed: () {
                      openDialog(-1);
                    },
                    child: Text(
                    "Add Category",
                    style: Theme.of(context).textTheme.headline4.copyWith(fontWeight: FontWeight.w200 ,color: Colors.white)
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