<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "./Connection.php";

$postdata = file_get_contents("php://input");
	if(isset($postdata) && !empty($postdata)){
		$request = json_decode($postdata);
		$id = $request->id;
		$fname = $request->firstName;
		$lname = $request->lastName;
		$email = $request->email;
		$phone = $request->phone;
		$city = $request->city;
		$country = $request->country;
		

		$sql1 = "
        UPDATE [NOKIA].[CUSTOMER] 
        SET Nume='$lname' ,Prenume='$fname', Telefon='$phone', Oras='$city', Tara='$country'
        where USERS_ID='$id'
        ";
		$sql2="
		UPDATE [NOKIA].[USERS]
		SET Email='$email'
		where ID='$id'
		";

		try{
			$statement = $conn->prepare($sql1);
			$statement->execute();
			$statement1 = $conn->prepare($sql2);
			$statement1->execute();
		}catch (PDOException $e){
			echo "Databse Error: " , $e->getMessage();
		}catch(Exception $e){
			echo "General Error: " , $e->getMessage();
		}
		
	}
?>