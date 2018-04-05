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

view.addNouvelleSauvegarde= function(){
  $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherches[i].url+ " target=\"_blank\">"+recherches[i].titre+"</a><span class=\"date_news\">"+recherches[i].date+"</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
}
view.addNouvelle= function(){
  $("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherches[i].url+ " target=\"_blank\">"+recherches[i].titre+"</a><span class=\"date_news\">"+recherches[i].date+"</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
}
