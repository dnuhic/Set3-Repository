// See https://aka.ms/new-console-template for more information
using Microsoft.Data.Sqlite;

try
{
    Console.WriteLine(Directory.GetCurrentDirectory());
    string script = File.ReadAllText(Directory.GetCurrentDirectory() + "/sql-script.sql");

    List<string> upiti = new List<string>(script.Split(';'));
    var file = File.Create(Directory.GetCurrentDirectory() + "/database.db");
    file.Close();
    SqliteConnection sqlite = new SqliteConnection(@"Data Source=" + Directory.GetCurrentDirectory() + "\\database.db;");

    SqliteCommand cmd;
    sqlite.Open();
    foreach (string upit in upiti)
    {
        cmd = sqlite.CreateCommand();
        cmd.CommandText = upit + ';';
        cmd.ExecuteNonQuery();
    }

    sqlite.Close();




    Console.WriteLine(script);
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
