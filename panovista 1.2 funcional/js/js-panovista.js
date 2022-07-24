$(window).load(function(){
	
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
		function movimientoImagen(desplazamientoEnX,imgWidth,containerWidth){
			
			resultado = (-desplazamientoEnX)*(imgWidth/containerWidth);
			
			return resultado;
		}
	
	var arrayContenedoresPanoVista = $(".contenedor-pano-vista");
	var arrayImagenesPanoVista = $(".pano-vista-img");

	for(i=0;i<arrayContenedoresPanoVista.length;i++){
		
		var contenedorPanoVistaActual = arrayContenedoresPanoVista[i];
		var imagenPanoVistaActual = arrayImagenesPanoVista[i];
		contenedorPanoVistaActual.setAttribute("id", "contenedorPanoVista"+i);
		imagenPanoVistaActual.setAttribute("id", "imagenPanoVista"+i);
		$("#contenedorPanoVista"+i).append('<div id="fondoDeslizador'+i+'" class="fondo-deslizador"><div id="despTrack'+i+'" class="desp-track"><div id="despTrackMover'+i+'" class="desp-track-mover"><div id="despTrackMoverDiseño'+i+'" class="desp-track-mover-diseño"></div></div></div>');
		
		var anchoContenedorPanoVistaActual = $("#contenedorPanoVista"+i).width();
		var altoContenedorPanoVistaActual = $("#contenedorPanoVista"+i).height();
		
		var anchoImagen = $("#imagenPanoVista"+i).width();
		var altoImagen = $("#imagenPanoVista"+i).height();
		
		var anchoTrackMover = calculoTrackMover(anchoContenedorPanoVistaActual,anchoImagen);
		
		$("#imagenPanoVista"+i).css({"left":posicionInicialImagen(anchoImagen,anchoContenedorPanoVistaActual)});
		$("#fondoDeslizador"+i).css({"width":anchoContenedorPanoVistaActual,"top":altoContenedorPanoVistaActual-10,"left":0});
		$("#despTrack"+i).css({"width":anchoContenedorPanoVistaActual});
		$("#despTrackMover"+i).css({"width":anchoTrackMover,"left":posicionInicialTrackMover(anchoTrackMover,anchoContenedorPanoVistaActual)});
		$("#despTrackMover"+i).draggable({axis:"x",containment: "#despTrack"+i,revert:true});
		
		$( "#despTrackMover"+i ).draggable(
		{
			drag: function( event, ui ) {
				
				var despX = ui.position.left;
				var objetoCausanteTexto = ui.helper.context.id;
				var numeroObjetoCausante = objetoCausanteTexto.substr(14, 3);
				var objetoCausante = $("#despTrackMover"+numeroObjetoCausante);
				var objetoPaciente = $("#imagenPanoVista"+numeroObjetoCausante);
				var anchoObjetoCausante = objetoPaciente.width();
				var anchoObjetoPaciente = objetoPaciente.width();
				var anchoContenedorPanoVistaActual = $("#contenedorPanoVista"+numeroObjetoCausante).width();
				
				$("#imagenPanoVista"+numeroObjetoCausante).draggable({axis:"x"});
				$("#imagenPanoVista"+numeroObjetoCausante).css({"left":((-despX)*(anchoObjetoPaciente/anchoContenedorPanoVistaActual)),"transition": "initial"});
				console.log(anchoObjetoPaciente);
			},
				
			stop: function( event, ui ) {
			
				var despX = ui.position.left;
				var objetoCausanteTexto = ui.helper.context.id;
				var numeroObjetoCausante = objetoCausanteTexto.substr(14, 3);
				var objetoCausante = $("#despTrackMover"+numeroObjetoCausante);
				var objetoPaciente = $("#imagenPanoVista"+numeroObjetoCausante);
				var anchoObjetoCausante = objetoPaciente.width();
				var anchoObjetoPaciente = objetoPaciente.width();
				var anchoContenedorPanoVistaActual = $("#contenedorPanoVista"+numeroObjetoCausante).width();
				
				$("#imagenPanoVista"+numeroObjetoCausante).css({"left":-((anchoObjetoPaciente-anchoContenedorPanoVistaActual)/2),"transition": "left 2s linear 0s"});
				$("#imagenPanoVista"+numeroObjetoCausante).draggable("disable");
			}
		});
	};
});
	