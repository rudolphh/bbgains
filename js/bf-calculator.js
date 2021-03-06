
/*   Calculate Body Fat using the YMCA (or Navy Test) formula

	- Body Fat
	- Fat Mass 
	- Lean Mass
*/


var female = (function() {
    var height //shared variable available only inside your module
	 var weight;
	 var system;
	 
    return {
        height: function(arg1) {
        		if (arg1 == undefined){
            	return height; // this function can access my_var
         	}
         	else { height = arg1; }
        },
        weight: function(arg1) {
        		if (arg1 == undefined){
            	return weight; // this function can access my_var
         	}
         	else { weight = arg1; }
        },
       system: function(arg1) {
        		if (arg1 == undefined){
            	return weight; // this function can access my_var
         	}
         	else { system = arg1; }
        }
    };

})();


var male = (function() {
    var height; //shared variable available only inside your module
	 var weight;
	 var system;
	 
    return {
        height: function(arg1) {
        		if (arg1 == undefined){
            	return height; // this function can access my_var
         	}
         	else { height = arg1; }
        },
        weight: function(arg1) {
        		if (arg1 == undefined){
            	return weight; // this function can access my_var
         	}
         	else { weight = arg1; }
        },
        system: function(arg1) {
        		if (arg1 == undefined){
            	return weight; // this function can access my_var
         	}
         	else { system = arg1; }
        }
    };

})();





// log10 function as javascript Math class only allows for natural log base e
function log10(f)
{
	return Math.log(f)/Math.log(10.);
}

// =86.01*LOG10(waist-neck)-70.041*LOG10(height)+36.76
function getMaleBodyFat(waist, neck, height,system) {
	
	var bf;
	
	if(system == "metric"){
		bf = 	495 / (1.0324 - .19077 * log10(+waist - +neck) + .15456 * log10(height)) - 450
	}
	else{
		bf = 86.01*log10(waist-neck)-70.041*log10(height)+36.76;
	}
	
	return bf;
	
}

// =163.205*LOG10(waist+hip-neck)-97.684*LOG10(height)-78.387
function getFemaleBodyFat(waist, hip, neck, height, system) {

	var bf;
	
	if(system == "metric"){
		bf = 495 / (1.29579 - .35004 * log10(+waist + +hip - +neck) + .22100 * log10(height)) - 450;

	} 
	else{
		bf = 163.205*log10(+waist + +hip - +neck)-97.684*log10(height)-78.387;
	}
	
	return bf;
	
}



function getLeanBodyMass(weight, bodyFat, system){
	var bf = bodyFat * .01;
	var leanBodyMass;
	/*
	if(system == "metric"){
		leanBodyMass = (1 - bf) * (weight * 2.2);
	} else {
		leanBodyMass = (1 - bf) * weight;
	}
	*/
	return ((1-bf) * weight); 
	
	//leanBodyMass;
}

function roundTwoDec(num){

	return Math.round(num * 100) / 100;
}

function calculateBodyFat() {
	
	var bf, fatBodyMass, leanBodyMass;
	
	var system = $(".bf-calculator input[name='system']:checked").val();
	var weight = $(".bf-calculator input[name='weight']").val();
	var height = $(".bf-calculator input[name='height']").val();
	
	// measurement variables -- hip only for female (below)
	var neck;
	var waist;
	var hip;
	
	if (!(weight && height)){ return; }
		
	if($('#female-measurements').is(':visible')){
		
		neck = $("#female-measurements input[name='neck']").val();
		waist = $("#female-measurements input[name='waist']").val();
		hip = $("#female-measurements input[name='hip']").val();
		
		if(neck && waist && hip){
			bf = getFemaleBodyFat(waist, hip, neck, height,system);
		}
		else { return; }
	
	}
	// else calculate for male
	else{
		neck = $("#male-measurements input[name='neck']").val();
		waist = $("#male-measurements input[name='waist']").val();
		
		if(neck && waist){
			bf = getMaleBodyFat(waist, neck, height,system);
		}
		else { return; }
	}
	
	leanBodyMass = getLeanBodyMass(weight, bf, system);
	fatBodyMass = weight - leanBodyMass;
	
	return {
		bf: roundTwoDec(bf),
		fm: roundTwoDec(fatBodyMass),
		lm: roundTwoDec(leanBodyMass)
	}

}




function updateBF(e){


	var data = calculateBodyFat();
	if(data){
		var type = $(".bf-calculator input[name='system']:checked").val() == "metric" ? "kgs." : "lbs.";
		$(".bf-calculator .bf-result").html(data.bf);
		$(".bf-calculator .fm-result").html(data.fm);
		$(".bf-calculator .lm-result").html(data.lm);
		
		$(".tdee-calculator #weight").val($(".bf-calculator input[name='weight']").val());
		$(".tdee-macro-calc input[name='body-weight']").val($(".bf-calculator input[name='weight']").val());
		
		$(".tdee-calculator #body-fat").val(data.bf);
		$(".tdee-macro-calc input[name='body-fat']").val(data.bf);
		
		$(".tdee-calculator #body-fat").trigger("change");
		$(".tdee-macro-calc input[name='body-fat']").trigger("change");
		
	}
	else {
		$(".bf-calculator .bf-result").html("");
		$(".bf-calculator .fm-result").html("");
		$(".bf-calculator .lm-result").html("");
		
		$(".tdee-calculator #weight").val("");
		$(".tdee-macro-calc input[name='body-weight']").val("");
		
		$(".tdee-calculator #body-fat").val("");
		$(".tdee-macro-calc input[name='body-fat']").val("");
		
		$(".tdee-calculator #body-fat").trigger("change");
		$(".tdee-macro-calc input[name='body-fat']").trigger("change");
	}
	
}

$(".bf-calculator input").on("input change keypress keyup", updateBF);

function convertToInches(cm) {
	return cm/2.54;
}

function convertToCm(inches) {
	return inches*2.54
}

function changeSystem(gender, system) {
	
	gender.system(system);
	
	if(system == "metric"){
		gender.weight(Math.round(gender.weight()/2.2));
		gender.height(Math.round(convertToCm(gender.height())));
	}
	else if (system == "imperial"){
		gender.weight(Math.round(gender.weight()*2.2));
		gender.height(Math.round(convertToInches(gender.height())));		
	}
}

$(".bf-calculator input[name='system']").on("change", function(){
	
	var system = $(".bf-calculator input[name='system']:checked").val();
	//var gender = '#'+userChoice+'-measurements';// the measurement div we want to show
	    	
	if($('#female-measurements').is(':hidden') && female.system() != system) 	
		changeSystem(female, system);
	if($('#male-measurements').is(':hidden') && male.system() != system) 	
		changeSystem(male, system);
	
	if(system == "metric" ) {
		// $(".tdee-calculator span.measurement-system").html("(kgs.)");
		
		$(".tdee-macro-calc input[value='metric']").prop("checked", true);
		$(".tdee-macro-calc input[value='imperial']").prop("checked", false);
		
		$(".bf-form input[type='number']").each(function() {
    		var val = $(this).val();
    		
    		if(!isNaN(Math.round(val)) && val > 0){
	          if($(this).prop("name") == "weight"){
	          	$(this).val( Math.round($(this).val()/2.2));
	          }
	          else { $(this).val( Math.round(convertToCm( $(this).val() ))); }
       	}
      
      });

	} else {
		
		$(".tdee-macro-calc input[value='imperial']").prop("checked", true);
		$(".tdee-macro-calc input[value='metric']").prop("checked", false);
		
		$(".bf-form input[type='number']").each(function() {
    		
    		var val = $(this).val();
    		
    		if(!isNaN(Math.round(val)) && val > 0){
	          if($(this).prop("name") == "weight"){
	          	$(this).val( Math.round($(this).val() * 2.2));
	          }
	          else { $(this).val( Math.round(convertToInches( $(this).val() ))); }
       	}
      
      });	

	}
	updateBF();
});



$(".bf-calculator input[type='text'], .bf-calculator input[type='number']").on("click", function(e){
	if(!e.originalEvent){
		return;
	}
	$(this).select();

});



updateBF();