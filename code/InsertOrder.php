<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "./Connection.php";

$postdata = file_get_contents("php://input");
	if(isset($postdata) && !empty($postdata)){
		$request = json_decode($postdata);
		$CustomerName = $request->Nume;
        $Email = $request->Email;
		$OrderNumber = $request->OrderNumber;
        $OrderDate = $request->OrderDate;
        $Oras = $request->Oras;
		$Judet = $request->Judet;
		$Strada = $request->Strada;
		$Numar = $request->Numar;
        $Bloc = $request->Bloc;
        $Scara = $request->Scara;
		$CodPostal = $request->CodPostal;
		$Total = $request->Total;

		$sql1 = "
        INSERT INTO [NOKIA].[ORDER] 
        (CustomerName,Email,OrderNumber,OrderDate,Oras,Judet
		,Strada,Numar,Bloc,Scara,CodPostal,Total)
        VALUES 
        ('$CustomerName','$Email','$OrderNumber','$OrderDate','$Oras',
		'$Judet','$Strada','$Numar','$Bloc','$Scara','$CodPostal','$Total')
        ";
		

		try{
			$statement = $conn->prepare($sql1);
			$statement->execute();
		}catch (PDOException $e){
			echo "Databse Error: " , $e->getMessage();
		}catch(Exception $e){
			echo "General Error: " , $e->getMessage();
		}
		
	}
?>