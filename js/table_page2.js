
  
  
  var table1 = $('#data1').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  
  });
  
  
  
  var table_1 = $('#data_1').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  });
  
  
  
  var table2 = $('#data2').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  
  });
  
  
  
  var table_2 = $('#data_2').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  });
  
  
  
  var table3 = $('#data3').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  
  });
  
  
  
  var table_3 = $('#data_3').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  });
  
  
  
  var table4 = $('#data4').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  
  });
  
  
  
  var table_4 = $('#data_4').DataTable({
  
    "info": false,
    "order": [
      [0, "desc"]
    ],
    "dom": '<"top">t<"bottom"p><"clear">',
    "pageLength": 15,
  
    "aoColumns": [{
        "sType": 'Num'
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "fnDrawCallback": function() {
      $(".previous").text(" ");
      $(".next").text(" ");
    }
  
  });


  var currentdateTime = new Date();
  var deltaDate = new Date();
  var startTime = new Date();
  var endTime = new Date();
  var startTimeFormated = formatDates(startTime);
  deltaDate.setDate(deltaDate.getDate() - 2);
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  
  function formatDates(currentdate) {
    var addZero = function(i) {
      return i < 10 ? i = "0" + i : i;
    }
  
    return addZero(currentdate.getDate()) + "-" +
      addZero((currentdate.getMonth() + 1)) + " " +
      addZero(currentdate.getHours()) + ":" +
      addZero(currentdate.getMinutes());
  }
  
  var nowDateString = formatDates(currentdateTime);
  
  // Set current date
  $('.update_Estado span').empty().append(nowDateString);
  
  //Set start date
  
  $('.grid-view td[data-order]').each(function() {
    startTime = randomDate(deltaDate, currentdateTime);
    startTime = startTime;
    endTime = new Date(startTime.getTime());
    endTime.setMinutes(endTime.getMinutes() - getRandomInt(15, 50));
  
    $(this).empty().append(formatDates(startTime));
    $(this).parent().find('td:nth-child(7)').empty().append(formatDates(endTime));
  
  });