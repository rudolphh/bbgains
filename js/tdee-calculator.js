

function getLeanBodyM(weight, bodyFat, system){
	var bf = bodyFat * .01;
	var leanBodyMass;
	if(system == "metric"){
		leanBodyMass = (1 - bf) * weight * 2.2;
	} else {
		leanBodyMass = (1- bf) * weight ;
	}
	
	return leanBodyMass;
}

function get_bmr(leanBodyMass) {
	var kg = leanBodyMass/2.2;
	var bmr = 370 + (21.6 * kg);	
	return bmr;
}


function calculateTDEE(){

	var weight = $(".bf-calculator input[name='weight']").val();
	var bodyFat = $(".tdee-calculator input[name='body-fat']").val();
	if(weight && bodyFat){
		var activityLevel = $(".tdee-calculator select[name='activity-level']").val();
		var customMultiplier = $(".tdee-calculator #custom-multiplier").val();
		var system = $(".bf-calculator input[name='system']:checked").val();
		var bmr, tdee, leanBodyMass;
		
		if(customMultiplier){
			activityLevel = customMultiplier;
		}
		
		leanBodyMass = getLeanBodyM(weight, bodyFat, system);
		//alert(leanBodyMass);
		
		bmr = get_bmr(leanBodyMass);
		
		tdee = bmr * activityLevel;
		var lbm = $(".bf-calculator input[name='system']:checked").val() == "metric" ? leanBodyMass / 2.2 : leanBodyMass;
		return {
			lbm: ~~lbm,
			tdee: ~~tdee,
			bmr: ~~bmr
		}
	}
	
	
}

function clearMacroCalc() {   

	$(".tdee-macro-calc input[name='body-weight']").val("");
	$(".tdee-macro-calc input[name='body-fat']").val("");
		
		$(".tdee-macro-calc input").trigger("change");
}


function updateTDEE(e){
	if(e && $(e.target).is(".tdee-calculator #activity-level")){
		$(".tdee-calculator #custom-multiplier").val($(".tdee-calculator #activity-level").val());
		$(".tdee-macro-calc #activity-level").val($(".tdee-calculator #activity-level").val());
		$(".tdee-macro-calc #activity-level").trigger("change");
	}
	
	var deficit = $(".tdee-calculator #deficit-level :selected").val();
	var surplus = $(".tdee-calculator #surplus-level :selected").val();	
	
	var data = calculateTDEE();
	if(data){
		var type = $(".tdee-calculator input[name='system']:checked").val() == "metric" ? "kgs." : "lbs.";
		$(".tdee-calculator .lbm-result").html(data.lbm);
		$(".tdee-calculator .bmr-result").html(data.bmr);
		$(".tdee-calculator .tdee-result").html(data.tdee);
		
		$(".tdee-calculator .deficit-result").html(Math.round((1-deficit)*data.tdee));
		$(".tdee-calculator .surplus-result").html(Math.round((1+ +surplus)*data.tdee));

	}
	else{
		$(".tdee-calculator .lbm-result").html("");
		$(".tdee-calculator .bmr-result").html("");
		$(".tdee-calculator .tdee-result").html("");
		$(".tdee-calculator .deficit-result").html("");
		$(".tdee-calculator .surplus-result").html("");
		
		//clearMacroCalc();
	}
	
}

$(".tdee-calculator input, .tdee-calculator select").on("input change keypress keyup", updateTDEE);

$(".tdee-calculator input[name='system']").on("change", function(){
	if($(".tdee-calculator input[name='system']:checked").val() == "metric"){
		// $(".tdee-calculator span.measurement-system").html("(kgs.)");
		$(".tdee-calculator input[name='weight']").val( Math.round($(".tdee-calculator input[name='weight']").val() / 2.2 ));
		//$(".tdee-macro-calc input[name='body-weight']").val( Math.round($(".tdee-calculator input[name='weight']").val() / 2.2 ));

	} else {
		// $(".tdee-calculator span.measurement-system").html("(lbs.)");
		$(".tdee-calculator input[name='weight']").val( Math.round($(".tdee-calculator input[name='weight']").val() * 2.2 ));
		//$(".tdee-macro-calc input[name='body-weight']").val( Math.round($(".tdee-calculator input[name='weight']").val() * 2.2 ));

	}
	updateTDEE();
});

// if we're changing the custom multiplier, change the activity level select element to custom
$(".tdee-calculator #custom-multiplier").on("input", function(e){
	if(!e.originalEvent){
		return;
	}
	$(".tdee-calculator #activity-level option[value='1']").prop("selected", true);
});

$(".tdee-calculator input[type='text'], .tdee-calculator input[type='number']").on("click", function(e){
	if(!e.originalEvent){
		return;
	}
	$(this).select();

});

updateTDEE();