		function calculoTrackMover(containerWidth,imgWidth){
			
			resultado = (containerWidth/(imgWidth/containerWidth));
			
			return resultado;
		}
		function ratioImagenContenedor(imgWidth,containerWidth){
			
			resultado = (imgWidth/containerWidth);
			
			return resultado;
		}
		function posicionInicialImagen(imgWidth,containerWidth){
			
			resultado = -((imgWidth-containerWidth)/2);
			
			return resultado;
		}
		function posicionInicialTrackMover(trackMoverWidth,containerWidth){
			
			resultado = ((containerWidth-trackMoverWidth)/2);
			
			return resultado;
		}

$(document).ready(function(){

	
		var anchoContenedor = $(".contenedor-pano-vista").width();
		var altoContenedor = $(".contenedor-pano-vista").height();
		var anchoImagen = $("#imagenPanoVista").width();
		var altoImagen = $("#imagenPanoVista").height();
		var botonDesplazamientoIzquierda = $(".desp-izquierda");
		var botonDesplazamientoDerecha = $(".desp-derecha");
		var botonDesplazamientoTrack = $(".desp-track");
		var anchoTrackMover = calculoTrackMover(anchoContenedor,anchoImagen);
		
		
		$(".contenedor-pano-vista").append('<div id="fondoDeslizador" class="fondo-deslizador"><div id="despTrack" class="desp-track"><div id="despTrackMover" class="desp-track-mover"><div id="despTrackMoverDiseño" class="desp-track-mover-diseño"></div></div></div>');
		$(".fondo-deslizador").css({"height":altoContenedor,"width":anchoContenedor,"top":altoContenedor-10,"left":0});
		
		$(".desp-track").css({"width":anchoContenedor,"top":0,"left":0});
		$(".desp-track-mover").css({"width":calculoTrackMover(anchoContenedor,anchoImagen),"left":posicionInicialTrackMover(anchoTrackMover,anchoContenedor)});
		$(".desp-track-mover").draggable({axis:"x",containment: "#despTrack",revert:true});
		$("#imagenPanoVista").css({"left":posicionInicialImagen(anchoImagen,anchoContenedor)});
	
	$( ".desp-track-mover" ).draggable({
		
		drag: function( event, ui ) {
			
			var anchoContenedor = $(".contenedor-pano-vista").width();
			var anchoImagen = $("#imagenPanoVista").width();
			var despX = ui.position.left;
			
			$("#imagenPanoVista").draggable({axis:"x"});
			$("#imagenPanoVista").css({"left":((-despX)*ratioImagenContenedor(anchoImagen,anchoContenedor)),"transition": "initial"});
		},
		
		stop: function( event, ui ) {
			
			var anchoContenedor = $(".contenedor-pano-vista").width();
			var anchoImagen = $("#imagenPanoVista").width();
			var despX = ui.position.left;
			
			$("#imagenPanoVista").css({"left":posicionInicialImagen(anchoImagen,anchoContenedor),"transition": "left 2s linear 0s"});
			$("#imagenPanoVista").draggable("disable");
		}
	});


	
	$("#contenedorPanoVista").hover(function (){
		
	}, function (){
		
		//$(".fondo-deslizador").remove();
		
	});

});
	