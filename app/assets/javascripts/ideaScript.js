$(window).bind('page:change', function() {
  console.log($(".header").html() != undefined)
  if($(".header").html() != undefined){
    var c = document.getElementById("myCanvas");
    var canvas = c.getContext("2d");
  }
  
  var drawImg = false;
  var img = new Image();
  var postUrl = "/createidea";
  
  if($(".editHeader").html() != undefined){
    drawImg = true;
    postUrl = "/editidea";
    img.src = $("img").attr("src");
    img.onload = function(){
      canvas.drawImage(img,0,0);
    }
  }

  var clicks = new Array();
  var clickDrag = new Array();
  var paint = false;
  var rgb = [80,80,80];

  function addClick(x, y, dragging){
    clicks.push({"x":x,"y":y,"r":rgb[0],"g":rgb[1],"b":rgb[2]});
    clickDrag.push(dragging);
  }

  function redraw(){
    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height); // Clears the canvas

    if(drawImg)
      canvas.drawImage(img,0,0);
    
    canvas.lineJoin = "round";
    canvas.lineWidth = 5;

    for(var i=0; i < clicks.length; i++) {	
      canvas.strokeStyle = "rgb("+clicks[i].r+","+clicks[i].g+","+clicks[i].b+")";
      canvas.beginPath();
      if(clickDrag[i] && i){
        canvas.moveTo(clicks[i-1].x,clicks[i-1].y);
      }
      else{
        canvas.moveTo(clicks[i].x-1, clicks[i].y);
      }
      canvas.lineTo(clicks[i].x, clicks[i].y);
      canvas.closePath();
      canvas.stroke();
    }
  };

  $(".submitIdea").click(function(){
    var dataURL = c.toDataURL('image/png');
    var data = {};
    data.image=dataURL;
    data.idea = $("#ideacontent").val();
    if(drawImg)
      data.editId = $("img").attr("alt");
    $.ajax({
      type: "POST",
      url: postUrl,
      data: data,
      success: function(data, textStatus, jqXHR) {
        //console.log("Data: "+data);
        //console.log(textStatus);
        console.log(jqXHR);
        window.location.replace("http://ruby-on-rails-114302.nitrousapp.com:3000/idea/"+jqXHR.responseJSON.id);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("Error=" + errorThrown);
      }
    });
  });

  $('#myCanvas').mousedown(function(e){

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  $('#myCanvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  $('#myCanvas').mouseup(function(e){
    paint = false;
  });

  $('#myCanvas').mouseleave(function(e){
    paint = false;
  });
});