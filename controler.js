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
controler.rechercher_nouvelles=function()
{
	$("#resultats").empty();
	$("#wait").css("display","block");
	var valeurRecherche = $("#zone_saisie").val();
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
			view.addNouvelle();
		}
		else{
			view.addNouvelleSauvegarde();
		}

	}
}
