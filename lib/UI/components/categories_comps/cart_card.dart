import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:tasklist/UI/components/order_comps/cart_counter.dart';
import 'package:tasklist/constants.dart';

import '../../../size_config.dart';

class CategoriesCard extends StatelessWidget {
  const CategoriesCard({
    Key key,
  }) : super(key: key);


  @override
  Widget build(BuildContext context) {
    void submit() {
      //Update category
      Navigator.of(context, rootNavigator: true).pop();
    }

    Future openDialog(int categoryId) async => showDialog(context: context, builder: (context) => AlertDialog(
      title: Text('Edit Product'),
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


    return Container(
      padding: const EdgeInsets.all(5),
      decoration: BoxDecoration(
        //border: Border.all(color: Color(0xfff3c526e), width: 2),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          SizedBox(
            width: 55,
            child: AspectRatio(
              aspectRatio: 1,
              child: Container(
                padding: EdgeInsets.all(getProportionateScreenWidth(10.toDouble())),
                decoration: BoxDecoration(
                  color: Color(0xfff3c526e).withAlpha(200),
                  borderRadius: BorderRadius.circular(16),
                  //border: Border.all(color: Color(0xfff3c526e), width: 2)
                ),
                child: Icon(Icons.category, color: Colors.white, size: 30,)
              ),
            ),
          ),
          SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Hrana",
                style: TextStyle(color: Colors.black, fontSize: 20),
                maxLines: 2,
              ),
              SizedBox(height: 10),
              Text.rich(
                TextSpan(
                  text: "PDV: 17%",
                  style: TextStyle(fontWeight: FontWeight.w600, color: Colors.black),
                ),
              )
            ],
          ),
          Spacer(),
          Material(
              color: Colors.transparent,
              child: IconButton(
                color: Color(0xfff3c526e).withAlpha(200),
                splashColor: Color(0xfff3c526e).withAlpha(200),
                splashRadius: 10,
                icon: Icon(Icons.create_rounded, color: Color(0xfff3c526e).withAlpha(200), size: 30,),
                onPressed: () {
                  openDialog(1);
                },
              ),
            ),
        ],
      ),
    );
  }
}