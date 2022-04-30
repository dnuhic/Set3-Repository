import 'dart:async';
import 'dart:io';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';

class InstalledRegister {
  int id;
  int registerId;
  int shopId;

  static final columns = ["id", "registerId", "shopId"];

  InstalledRegister(this.id, this.registerId, this.shopId);

  factory InstalledRegister.fromMap(Map<String, dynamic> data) {
    return InstalledRegister(data['id'], data['registerId'], data['shopId']);
  }
  Map<String, dynamic> toMap() =>
      {"id": id, "registerId": registerId, "shopId": shopId};
}

class SQLiteDbProvider {
  SQLiteDbProvider._();
  static final SQLiteDbProvider db = SQLiteDbProvider._();
  static Database _database;

  Future<Database> get database async {
    if (_database != null) return _database;
    _database = await initDB();
    return _database;
  }

  initDB() async {
    Directory documentsDirectory = await getApplicationDocumentsDirectory();
    //print(documentsDirectory);
    String path = join(documentsDirectory.path, "Database.db");
    print(path);
    return await openDatabase(path, version: 1, onOpen: (db) {},
        onCreate: (Database db, int version) async {
      await db.execute("CREATE TABLE InstalledRegister ("
          "id INTEGER PRIMARY KEY,"
          "registerId INTEGER,"
          "shopId INTEGER)");

      await db.execute(
          "INSERT INTO InstalledRegister ('id', 'registerId', 'shopId') values (?, ?, ?)",
          [1, 0, 0]);
    });
  }

  Future<InstalledRegister> getRegister() async {
    final db = await database;
    var result = await db.query("InstalledRegister", where: "id = 1");
    return result.isNotEmpty ? InstalledRegister.fromMap(result.first) : Null;
  }

  update(InstalledRegister register) async {
    final db = await database;
    var result = await db.update("InstalledRegister", register.toMap(),
        where: "id = ?", whereArgs: [register.id]);
    return result;
  }
}
