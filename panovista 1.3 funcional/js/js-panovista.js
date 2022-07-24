$(window).load(function(){
	
	/* Función para calcular la longitud del TrackMover */
	
	function calculoTrackMover(containerWidth,imgWidth){
		resultado = (containerWidth*containerWidth/imgWidth);
		return resultado;
	}
	
	/* Función para calcular la posición inicial de la imagen para que quede centrada de inicio */

	function posicionCentradaImagen(imgWidth,containerWidth){
		resultado = -((imgWidth-containerWidth)/2);
		return resultado;
	}
	
	/* Función para calcular la posición inicial del TrackMover para que quede centrado de inicio */

	function posicionCentradaTrackMover(trackMoverWidth,containerWidth){
		resultado = ((containerWidth-trackMoverWidth)/2);
		return resultado;
	}
	
	/* Función para evitar el scroll de la ventana */
	
	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
		e.preventDefault();
		e.returnValue = false;
	}
		
	/* Función para evitar el scroll de la ventana con el movimiento de la rueda del ratón */
	
	function unScrollWindow() {
		window.onwheel = preventDefault;
	}
	
	/* Función para permitir el scroll de la ventana */
	
	function scrollWindow() {
		window.onwheel = null;
	}
	
	function scrollImage() {
		
		var numeroElementoCausanteId = this.getAttribute("id").substr(19, 3);
		var elementoAfectado = document.getElementById("imagenPanoVista"+numeroElementoCausanteId);
		
		elementoAfectado.onwheel = function(e){
		
			console.log(event);
		
			var delta = parseFloat(event.wheelDelta);
			var numElemCau = numeroElementoCausanteId;
			var contenedorAncho = $("#contenedorPanoVista"+numeroElementoCausanteId).width();
			var imagen =document.getElementById("imagenPanoVista"+numeroElementoCausanteId);
			var imagenIzquierda = parseFloat(imagen.style.left);
			var imagenAncho = parseFloat($("#imagenPanoVista"+numeroElementoCausanteId).width());
			var trackMover = document.getElementById("despTrackMover"+numeroElementoCausanteId);
			var trackMoverIzquierda = parseFloat(trackMover.style.left);
			var trackMoverAncho = parseFloat($("#despTrackMover"+numeroElementoCausanteId).width());
			var maximoDesplIzquierdaImagen = (contenedorAncho-imagenAncho);
			var maximoDesplDerechaImagen = 0;
			var maximoDesplIzquierdaTrackMover = 0;
			var maximoDesplDerechaTrackMover = (contenedorAncho-(calculoTrackMover(contenedorAncho,imagenAncho)));
			var ratio = parseFloat(imagenAncho/contenedorAncho);
			var posicionActualImagen = imagenIzquierda += delta;
			var posicionActualTrackMover = trackMoverIzquierda -= delta/ratio;
			trackMover.style.transition = "left 1s linear 0s";
			imagen.style.transition = "left 1s linear 0s";
			
			if(posicionActualImagen<=maximoDesplIzquierdaImagen){
				this.style.left = maximoDesplIzquierdaImagen+"px";
				trackMover.style.left = maximoDesplDerechaTrackMover+"px";
				
				window.setTimeout(function(){
					
					var regresarPosicionImagen = posicionCentradaImagen(imagenAncho,contenedorAncho)+"px";
					var regresarPosicionTrackMover = posicionCentradaTrackMover(trackMoverAncho,contenedorAncho)+"px";
					document.getElementById("imagenPanoVista"+numElemCau).style.left = regresarPosicionImagen;
					document.getElementById("despTrackMover"+numElemCau).style.left = regresarPosicionTrackMover;
				}
				,4000);
			}
			else{
				if(posicionActualImagen>=maximoDesplDerechaImagen){
					this.style.left = maximoDesplDerechaImagen+"px";
					trackMover.style.left = maximoDesplIzquierdaTrackMover+"px";
				
					window.setTimeout(function(){
						
						var regresarPosicionImagen = posicionCentradaImagen(imagenAncho,contenedorAncho)+"px";
						var regresarPosicionTrackMover = posicionCentradaTrackMover(trackMoverAncho,contenedorAncho)+"px";
						document.getElementById("imagenPanoVista"+numElemCau).style.left = regresarPosicionImagen;
						document.getElementById("despTrackMover"+numElemCau).style.left = regresarPosicionTrackMover;
					}
					,4000);
				}
				else{
					this.style.left = posicionActualImagen+"px";
					trackMover.style.left = posicionActualTrackMover+"px";
					
					
					window.setTimeout(function(){
						
						var regresarPosicionImagen = posicionCentradaImagen(imagenAncho,contenedorAncho)+"px";
						var regresarPosicionTrackMover = posicionCentradaTrackMover(trackMoverAncho,contenedorAncho)+"px";
						document.getElementById("imagenPanoVista"+numElemCau).style.left = regresarPosicionImagen;
						document.getElementById("despTrackMover"+numElemCau).style.left = regresarPosicionTrackMover;
					}
					,6000);
				}
			}
		};
	}
	
	
		/*var keys = {37: 1, 38: 1, 39: 1, 40: 1};
		function preventDefaultForScrollKeys(e) {
			if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
			}
		}	
		
			if (window.addEventListener){
			}
			window.addEventListener('DOMMouseScroll', preventDefault, false);
			window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE 
				//
				//window.ontouchmove  = preventDefault; // mobile 
				//document.onkeydown  = preventDefaultForScrollKeys;
			
			
				var objetoSeleccionadoActual = document.getElementById("imagenPanoVista0");
				objetoSeleccionadoActual.onwheel = MouseWheelHandler;
				objetoSeleccionadoActual.onmousewheel = MouseWheelHandler;*/
		/*function MouseWheelHandler(event) {
			
			var objetoSeleccionadoActual = document.getElementById("imagenPanoVista0");
			// cross-browser wheel delta
			var event = window.event || event; // old IE support
			var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
			objetoSeleccionadoActual.style.offsetLeft += 50 + "px";
			console.log( event );
			
		}*/
	
	var arrayContenedoresPanoVista = $(".contenedor-pano-vista");
	var arrayImagenesPanoVista = $(".pano-vista-img");

	for(i=0;i<arrayContenedoresPanoVista.length;i++){
		
		var contenedorPano = arrayContenedoresPanoVista[i];
		var imagenPano = arrayImagenesPanoVista[i];
		contenedorPano.setAttribute("id", "contenedorPanoVista"+i);
		imagenPano.setAttribute("id", "imagenPanoVista"+i);
		$("#contenedorPanoVista"+i).append('<div id="fondoDeslizador'+i+'" class="fondo-deslizador"><div id="despTrack'+i+'" class="desp-track"><div id="despTrackMover'+i+'" class="desp-track-mover"><div id="despTrackMoverDiseño'+i+'" class="desp-track-mover-diseño"></div></div></div>');
		
		/* Agregamos los EventListener pertinentes al contenedorPano */
		
		contenedorPano.addEventListener("mouseover",unScrollWindow); 	/* Al entrar en el contenedor ejecuta la función unScrollWindow */
		contenedorPano.addEventListener("mouseover",scrollImage);		/* Al entrar en el contenedor ejecuta la función scrollImage */
		contenedorPano.addEventListener("mouseout",scrollWindow);		/* Al salir del contenedor ejecuta la función scrollWindow */
		
		var anchoContenedor = $("#contenedorPanoVista"+i).width();
		var altoContenedorPanoVistaActual = $("#contenedorPanoVista"+i).height();
		var anchoImagen = $("#imagenPanoVista"+i).width();
		var anchoTrackMover = calculoTrackMover(anchoContenedor,anchoImagen);
		
		$("#imagenPanoVista"+i).css({"left":posicionCentradaImagen(anchoImagen,anchoContenedor)});
		$("#fondoDeslizador"+i).css({"width":anchoContenedor,"top":altoContenedorPanoVistaActual-10,"left":0});
		$("#despTrack"+i).css({"width":anchoContenedor});
		$("#despTrackMover"+i).css({"width":anchoTrackMover,"left":posicionCentradaTrackMover(anchoTrackMover,anchoContenedor)});
		$("#despTrackMover"+i).draggable({axis:"x",containment: "#despTrack"+i,revert:true});
		$( "#despTrackMover"+i ).draggable(
		{
			start: function( event, ui ) {
				
				var despTrackMoverId = ui.helper.context.id;
				var numeroObjetoCausante = despTrackMoverId.substr(14, 3);
				var anchoImagen = $("#imagenPanoVista"+numeroObjetoCausante).width();
				var anchoContenedor = $("#contenedorPanoVista"+numeroObjetoCausante).width();
				
				$("#despTrackMover"+numeroObjetoCausante).css({"transition": "initial"});
			},
			drag: function( event, ui ) {
				
				var despX = ui.position.left;
				var despTrackMoverId = ui.helper.context.id;
				var numeroObjetoCausante = despTrackMoverId.substr(14, 3);
				var anchoImagen = $("#imagenPanoVista"+numeroObjetoCausante).width();
				var anchoContenedor = $("#contenedorPanoVista"+numeroObjetoCausante).width();
				
				$("#imagenPanoVista"+numeroObjetoCausante).css({"left":((-despX)*(anchoImagen/anchoContenedor)),"transition": "initial"});
			},
				
			stop: function( event, ui ) {
				
				var despTrackMoverId = ui.helper.context.id;
				var numeroObjetoCausante = despTrackMoverId.substr(14, 3);
				var anchoImagen = $("#imagenPanoVista"+numeroObjetoCausante).width();
				var anchoContenedor = $("#contenedorPanoVista"+numeroObjetoCausante).width();
				
				$("#imagenPanoVista"+numeroObjetoCausante).css({"left":-((anchoImagen-anchoContenedor)/2),"transition": "left 2s linear 0s"});
			}
		});
	};
});
	