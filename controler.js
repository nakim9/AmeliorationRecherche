var controler = {};

controler.init =function()
{
  model.init();
  view.drawRecherches(model.getRecherches());
}

 controler.ajouter_recherche =function()
{
	var valeurRecherche = view.getZone_Saisie();
  model.ajouter_recherche(valeurRecherche);
  view.drawRecherches(model.getRecherches())
}

 controler.supprimer_recherche =function(e)
{
	var recherche=e.parentNode.textContent;
  model.supprimer_recherche(recherche);
  view.drawRecherches(model.getRecherches());
	setCookie("recherches",JSON.stringify(model.getRecherches()),1000);

}

controler.selectionner_recherche=function(e)
{
  model.setRecherche_courante($(e).html());
  view.setZone_saisie(recherche_courante);
	var res = getCookie(recherche_courante);
	if(res!=""){
    model.setRecherche_courante_news(JSON.parse(res));
	}
	$("#resultats").empty();//jjjjjjjjjj
	for (var i=0 ; i<recherche_courante_news.length ; i++){
		$("#resultats").append("<p class=\"titre_result\"><a class=\"titre_news\" href="+recherche_courante_news[i].url+ " target=\"_blank\">"+recherche_courante_news[i].titre+"</a><span class=\"date_news\">"+recherche_courante_news[i].date+"</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
	}
}

controler.rechercher_nouvelles=function()
{
	$("#resultats").empty();//jjjjjjjj
  view.ajouterChargement();
	var valeurRecherche = view.getZone_Saisie();
	//Mise à jour de recherche_courante_news si un cookie existe
  model.miseAJourRecherche_courante_news(getCookie(valeurRecherche));
	//envoi de le requête php de recherche
	valeurRecherche = valeurRecherche.trim(); //trim pour enlever les espaces avant et après un string
	valeurRecherche = encodeURIComponent(valeurRecherche);
	$.get("search.php?data="+valeurRecherche,controler.maj_resultats);
}


controler.maj_resultats=function(res)
{
  view.enleverChargement();
	var recherches=JSON.parse(res);
	if(model.getRecherche_courante_news().length != 0){
		var recherches_sauvgardees = JSON.parse(model.getRecherche_courante_news());
	}
	else{
		var recherches_sauvgardees = new Array();
	}
	for(var i=0; i<recherches.length;i++){

		var j =0;
		while (j < recherches_sauvgardees.length
			&& !(recherches_sauvgardees[j].titre == recherches[i].titre
			&& recherches_sauvgardees[j].date == recherches[i].date)) {
				j++;
		}
		if(j == recherches_sauvgardees.length){
			view.addNouvelle(recherches[i].url,recherches[i].titre,recherches[i].date);
		}
		else{
			view.addNouvelleSauvegarde(recherches[i].url,recherches[i].titre,recherches[i].date);
		}

	}
}
