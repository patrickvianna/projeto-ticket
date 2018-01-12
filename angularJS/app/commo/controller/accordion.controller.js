angular.module('myApp').directive("uiAccordion", function () {
	return {
		templateUrl: "template/accordionVm.html",
		scope: {
			ticketObject: "="
		},
	    	require: "^uiAccordions", // '^' por que esta no elemento pai, uiAccordions
		link: function (scope, element, attrs, ctrl){
			ctrl.registerAccordion(scope);
			scope.open = function () 
			{
				ctrl.closeAll();
				scope.isOpened = !scope.isOpened;
			};
		}
	};
});