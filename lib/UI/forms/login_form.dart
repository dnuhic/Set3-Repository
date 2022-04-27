import 'package:flutter/material.dart';
import 'package:requests/requests.dart';
import 'package:tasklist/main.dart';
import 'dart:convert';
import 'dart:developer' as developer;
import 'package:http/http.dart' as http;

class LoginForm extends StatefulWidget {
  const LoginForm({Key key}) : super(key: key);

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

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
                      child: TextField(
                        controller: _email,
                        decoration: InputDecoration(
                          hintStyle: TextStyle(fontSize: 20),
                          border: InputBorder.none,
                          icon: Icon(Icons.account_circle_rounded),
                          hintText: "Email",
                        ),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.only(left: 16, right: 32),
                      child: TextField(
                        controller: _password,
                        obscureText: true,
                        decoration: InputDecoration(
                          hintStyle: TextStyle(fontSize: 22),
                          border: InputBorder.none,
                          icon: Icon(Icons.account_circle_rounded),
                          hintText: "Password",
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Align(
                alignment: Alignment.centerRight,
                child: GestureDetector(
                  onTap: (() async {
                    final email = _email.text;
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => MyHomePage(0)),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                        content: Text('Error: Pogrešan email ili password'),
                        backgroundColor: Colors.red.shade300,
                      ));
                    }
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
  
  try{
    Response response = await Requests.post(
      'https://10.0.2.2:7194/Authentication',
      body: {'email': email, 'password': password},
      headers: {
        "Content-Type": "application/json; charset=UTF-8", 
        "Access-Control-Allow-Credentials": true.toString() 
      },
      bodyEncoding: RequestBodyEncoding.JSON,
    );


    return response;
  }
  catch (e) {
    developer.log(e);
  }
}
