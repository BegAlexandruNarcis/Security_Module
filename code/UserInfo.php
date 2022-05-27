<?php 
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "./Connection.php";

$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $id = $request->id;
    $sql = "
            SELECT
                    Nume,Prenume, Telefon, Oras, Tara             
            FROM [NOKIA].[Customer] where ID = '$id'
            ";
    try{
        $statement = $conn->prepare($sql);
        $statement->execute();
    }catch (PDOException $e){
        echo "Databse Error: " , $e->getMessage();
    }catch(Exception $e){
        echo "General Error: " , $e->getMessage();
    }
    $arr = $statement->fetchAll(PDO::FETCH_ASSOC);
	print json_encode($arr);
}
