


    document.addEventListener("deviceready", onDeviceReady, false);
	//onDeviceReady();
	

    function onDeviceReady() {
      
        $.ajax({
        url: "http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem"
    }).then(function(data) {
       
	   $.each(data, function(index,item) {        
			$("#ToDoItems").append("<input type='checkbox' id='chk" + item.id + "'/>" + item.Text + "<br/>");
			
			if(item.Complete==1)
			{
				$('#chk' + item.id).attr('checked',true);
				
			}
		});
       
    });
			
			
			
			
			
        
    }

   
