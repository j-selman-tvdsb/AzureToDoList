document.addEventListener("init", onDeviceReady, false);



	function init() {

  //listen for changes
  document.addEventListener(function(){alert('You are now offline');},offline,  false);
  document.addEventListener("showToDoList", online, false);

}

		

    
	
	function showToDoList()
	{
		$("#ToDoItems").html("");
		
		$.ajax({
        url: "http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem"
      }).then(function(data) {
       
	   $.each(data, function(index,item) {        
			$("#ToDoItems").append("<div id='div" + item.id + "' class='divToDoItems' data-theme='a' ><input type='checkbox' data-theme='a' class='chkbox' id='" + item.id + "' />" + item.Text + "<img src='deletebutton (1).gif' id='img" + item.id + "' class='imgDelete' style='visibility:hidden'></div>");
					
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
		$("#btnSubmit").prop('disabled',true);
		
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
		    		$("#btnSubmit").prop('disabled',false);
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
	
	
	function deleteItem(id_num) {
		
		
        jQuery.support.cors = true;
        var toDoItem = {
             id: id_num
        };       
        
        $.ajax({
            url: 'http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem',
            type: 'DELETE',
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
	
   
