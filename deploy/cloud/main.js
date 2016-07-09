require('cloud/app.js');
Parse.Cloud.afterSave("_User", function(request) {
	var createdAt = request.object.get("createdAt");
	var updatedAt = request.object.get("updatedAt");
	var objectExisted = (createdAt.getTime() != updatedAt.getTime());
	if(!objectExisted)
		{			
			var payLoad =
			{
				email:"",
				OptIn:"",
				SubsID:""
			}
		 //  	Parse.Cloud.httpRequest({
			// 	url: '159.203.204.76:8910/',
			// 	followRedirects: true,
			// 	method: 'POST',
			// 	body: payLoad,
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 		'Accept': 'application/json'
			// 	}
			// }).then(function(httpResponse) {});
		}
});

// oli@golly.com, true, PINACOLADA9000000001
// jugal.lalriya@gmail.com, true, PINACOLADA9000000002