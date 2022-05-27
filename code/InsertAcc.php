<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include "./Connection.php";

$postdata = file_get_contents("php://input");
	if(isset($postdata) && !empty($postdata)){
		$request = json_decode($postdata);
		$Item_ID = $request->Item_ID;
        $Item_Name = $request->Item_Name;
		$BuyPrice = $request->BuyPrice;
        $SellPrice = $request->SellPrice;
        $Qty = $request->Qty;
        $ShippingCost = $request->ShippingCost;
        $PackingFees = $request->PackingFees;
        $Taxes = $request->Taxes;

		$sql1 = "
        INSERT INTO [NOKIA].[ACCOUNTANT] 
        (Item_ID,ItemName,BuyPrice,SellPrice,Qty,ShippingCost,PackingFees,Taxes)
        VALUES 
        ('$Item_ID','$Item_Name','$BuyPrice','$SellPrice','$Qty','$ShippingCost','$PackingFees','$Taxes')
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