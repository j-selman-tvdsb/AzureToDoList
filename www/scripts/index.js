document.addEventListener("deviceready", init, false);
	//init();
	var online;
	

	function init() {

  //listen for changes
	  document.addEventListener("offline", onOffline, false);
	  document.addEventListener("online", onOnline, false);
	  online = window.navigator.onLine;
	  	  
	   if ( online ) {
		online=true
		addOffLineData();   
		
		}
		else {
			
			online=false;
			onOffline();
		
		}

	}

		

	function onOffline()
	{
		online=false;
		
		var db= openDatabase('OffLineDatabase', '1.0', 'Off Line Database', 2 * 1024 * 1024);

		db.transaction(function (tx) {  
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS todoitem(id,text,complete)');
		});
		
		showOfflineData();
		
	}	
	
	function onOnline()
	{
		online=true;
		addOffLineData();   
		
	}
    
	
	function addOffLineData()
	{
		 var db= openDatabase('OffLineDatabase', '1.0', 'Off Line Database', 2 * 1024 * 1024);
	   db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM todoitem', [], function (tx, results) {
				var len = results.rows.length, i;
      
			  for (i = 0; i < len; i++){
				 
				 addData(results.rows.item(i).text);
				 //now delete the row
				 tx.executeSql('Delete FROM todoitem where text=?', [results.rows.item(i).text], null,function(tx,e){alert(e.message);});
			  }

      
		});
		
		showToDoList();
		
		});
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
	
	offline = false;
		
	}
	
	function showID(thisCheckbox)
	{
		
		if(thisCheckbox.checked)
		{
				markAsCompleted(thisCheckbox.id);
		}
		
	}

	
	function addData(itemToAdd) {
		
		if(online)
		{
			$("#txtToDoItem").prop('disabled',true);
			$("#btnSubmit").prop('disabled',true);
			
			jQuery.support.cors = true;
			var toDoItem = {
				 Text: itemToAdd
			};       
			
			$.ajax({
				url: 'http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem',
				type: 'POST',
				data:JSON.stringify(toDoItem),            
				contentType: "application/json;charset=utf-8",
				success: function (data) {
					$("#txtToDoItem").val('');
					$("#txtToDoItem").prop('disabled',false);
					$("#btnSubmit").prop('disabled',false);
					showToDoList();
				},
				error: function (x, y, z) {
					alert('I might be here instead');
				}
			});
		}else
		{
			var db= openDatabase('OffLineDatabase', '1.0', 'Off Line Database', 2 * 1024 * 1024);
			db.transaction(function (tx) {
				
				
			    tx.executeSql("INSERT INTO todoitem (id, text, complete) VALUES (?,?,?)",['kgyguyyuguyf',$("#txtToDoItem").val(),0],function(){alert('data inserted to offline database');},function(tx,e){alert('should be here');});
			  
			});
			
			
			
			showOfflineData();
		}
    }
	
	function showOfflineData()
	{
	   
	  $("#ToDoItems").html("");
	  
	   var db= openDatabase('OffLineDatabase', '1.0', 'Off Line Database', 2 * 1024 * 1024);
	   db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM todoitem', [], function (tx, results) {
				var len = results.rows.length, i;
      
	  $("#ToDoItems").append("The following items have been added in offline mode<ol>");
      for (i = 0; i < len; i++){
         
		 $("#ToDoItems").append("<li>" + results.rows.item(i).text + "</li>")
			

      }}, null);
	});
	
	$("#ToDoItems").append("</ol>");
		
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
	
   
