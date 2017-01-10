document.addEventListener("deviceready", onDeviceReady, false);
	//onDeviceReady();
	
	

    function onDeviceReady() {
      
    	 
	   showToDoList();
	 
	        
    }
	
	function showToDoList()
	{
		$("#ToDoItems").html("");
		
		$.ajax({
        url: "http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem"
      }).then(function(data) {
       
	   $.each(data, function(index,item) {        
			$("#ToDoItems").append("<input type='checkbox' class='chkbox' id='" + item.id + "' onchange='showID(this);'/>" + item.Text + "<br/>");
					
		});
				       
    });
		
	}
	
	function showID(thisCheckbox)
	{
		
		if(thisCheckbox.checked)
		{
				markAsCompleted(thisCheckbox.id);
		}
		
	}

	
	function addData() {
		$("#txtToDoItem").prop('disabled',true);
		
        jQuery.support.cors = true;
        var toDoItem = {
             Text: $("#txtToDoItem").val()
        };       
        
        $.ajax({
            url: 'http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem',
            type: 'POST',
            data:JSON.stringify(toDoItem),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                alert(data);
				showToDoList();
				$("#txtToDoItem").val('');
				$("#txtToDoItem").prop('disabled',false);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
	
	
	function markAsCompleted(id_num) {
		
		
        jQuery.support.cors = true;
        var toDoItem = {
             id: id_num
        };       
        
        $.ajax({
            url: 'http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem',
            type: 'PUT',
            data:JSON.stringify(toDoItem),            
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                
				showToDoList();
				
				
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        });
    }
	
   
