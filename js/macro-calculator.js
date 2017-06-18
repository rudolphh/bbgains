

/*
 If < 40% bodyfat
	 Protein = 1.2 * LBM 
 else 
	Protein = 45% tdee
 
 Fat = .3 * LBM ( )
*/


function calculateMacro(macroType) {
		
	var data = calculateBodyFat();
	if(data){
	
	switch(macroType) {
		case (macroType == "protein") :
		

		var proteinPercent = $(".deficit-macros input[name=='protein']").val(); 		// get protein input
		
	
		break;
		
		case (macroType == "fat") :
	
		break;
		
		case (macroType == "carbs") :

		break;				
		
	}// end switch
	
	}
	
}// end calculateMacro()


function calculateFat() { 

}// end calculateFat


function calculateCarbs() { 

}// end calculateCarbs




function updateMacros() {
	
	
	
}// end updateMacros

