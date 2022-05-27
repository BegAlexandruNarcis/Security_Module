<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "./Connection.php";

$postdata = file_get_contents("php://input");
	if(isset($postdata) && !empty($postdata)){
		$request = json_decode($postdata);
		$email = $request->email;
		$password = $request->password;

		$sql1 = "
        INSERT INTO [NOKIA].[USERS] 
        (Roles,Email,Passwd) 
        VALUES 
        ('1','$email','$password')
        ";
		$sql2 = "
        INSERT INTO [NOKIA].[Customer] 
        (Users_ID,Nume,Prenume,Telefon,Oras,Tara) 
        VALUES 
        ((Select ID from [NOKIA].[USers] where email='$email'),'','','','','')
        ";

		try{
			$statement = $conn->prepare($sql1);
			$statement->execute();
			$statement = $conn->prepare($sql2);
			$statement->execute();
		}catch (PDOException $e){
			echo "Databse Error: " , $e->getMessage();
		}catch(Exception $e){
			echo "General Error: " , $e->getMessage();
		}
		
	}
?>