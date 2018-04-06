var view ={};

view.drawRecherches=function(recherches){
  document.getElementById('recherches-stockees').innerHTML="";
  for (var i=0;recherches.length>i;i++){
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"controler.selectionner_recherche(this)\" >"+recherches[i]+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"controler.supprimer_recherche(this)\" /> </p>";
	}
}

view.getZone_Saisie=function(){
  return  document.getElementById("zone_saisie").value;
}

view.enleverChargement=function(){
	document.getElementById('wait').style.display = "none";
}
view.ajouterChargement = function(){
	$("#wait").css("display","block");
}

view.addNouvelleSauvegarde= function(recherche){
  $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherche.url+ " target=\"_blank\">"+recherche.titre+"</a><span class=\"date_news\">"+recherche.date+"</span><span class=\"action_news\" onclick=\"controler.supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
}
view.addNouvelle= function(recherche){
  $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherche.url+ " target=\"_blank\">"+recherche.titre+"</a><span class=\"date_news\">"+recherche.date+"</span><span class=\"action_news\" onclick=\"controler.sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
}

view.setZone_saisie= function(recherche_courante){
	$("#zone_saisie").val(recherche_courante);
}

view.afficheRecherche_courante_news=function(recherche_courante_news,i){
  $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherche_courante_news[i].url+ " target=\"_blank\">"+recherche_courante_news[i].titre+"</a><span class=\"date_news\">"+recherche_courante_news[i].date+"</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
}

view.sauver_nouvelle=function(e){
  $(e).children().attr("src","disk15.jpg"); //changement image
  $(e).attr("onclick","controler.supprimer_nouvelle(this)"); //changement de methode sur le clic
}

view.supprimer_nouvelle=function(e){

	$(e).children().attr("src","horloge15.jpg");//changement image
	$(e).attr("onclick","controler.sauver_nouvelle(this)"); //changement de methode sur le clic
}
