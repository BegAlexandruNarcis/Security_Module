<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "./Connection.php";

$postdata = file_get_contents("php://input");
	if(isset($postdata) && !empty($postdata)){
		$request = json_decode($postdata);
		$email = $request->email;
		$role= $request->role;

		$sql = "
        UPDATE [NOKIA].[USERS] 
        SET Roles=(Select ID from [NOKIA].[ROLES] where RoleName='$role')
        where email='$email'
        ";

		try{
			$statement = $conn->prepare($sql);
			$statement->execute();
		}catch (PDOException $e){
			echo "Databse Error: " , $e->getMessage();
		}catch(Exception $e){
			echo "General Error: " , $e->getMessage();
		}
		
	}
?>