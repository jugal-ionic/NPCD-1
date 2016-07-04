require('cloud/app.js');
// Parse.Cloud.afterSave("_User", function(request) {
// 	var createdAt = request.object.get("createdAt");
// 	var updatedAt = request.object.get("updatedAt");
// 	var objectExisted = (createdAt.getTime() != updatedAt.getTime());
// 	if(!objectExisted)
// 		{			
// 		  	query = new Parse.Query("User");
// 		  	query.get(request.object.id, {
// 			    success: function(post) {
// 			      post.set("SubscriberKey","PINACOLADATEST9");
// 			      post.save();
// 			    },
// 			    error: function(error) {
// 			      console.error("Got an error " + error.code + " : " + error.message);
// 			    }
// 		  	});
// 		}
// });