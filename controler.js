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
  view.setZone_saisie(model.getRecherche_courante());
	var res = getCookie(model.getRecherche_courante());
	if(res!=""){
    model.setRecherche_courante_news(JSON.parse(res));
	}
	$("#resultats").empty();////Je sais pas trop a quoi sa sert et ou le metre
	for (var i=0 ; i<model.getRecherche_courante_news().length ; i++){
    view.afficheRecherche_courante_news(model.getRecherche_courante_news(),i);
	}
}

controler.rechercher_nouvelles=function()
{
	$("#resultats").empty();//Je sais pas trop a quoi sa sert et ou le metre
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
			view.addNouvelle(recherches[i]);
		}
		else{
			view.addNouvelleSauvegarde(recherches[i]);
		}
	}
}


controler.sauver_nouvelle=function(e)
{
	recherche_courante = view.getZone_Saisie();
  view.sauver_nouvelle(e);

	var tmp = new Object(); //création d'un objet temporaire que l'on va passer en string
	tmp["titre"] = $(e).parent().children(".titre_news").html(); //application du titre
	tmp["date"] = $(e).parent().children(".date_news").html(); //application de la date
	tmp["url"] = $(e).parent().children(".titre_news").attr("href"); //application de l'adresse

	if(indexOf(model.getRecherche_courante_news(),tmp) == -1){ //verification pour eviter les doublons (-1 si tmp n'est pas dans la list)
		model.pushRecherche_courante_news(tmp);
	}
	setCookie(model.getRecherche_courante(),JSON.stringify(model.getRecherche_courante_news()),1000);
}

controler.supprimer_nouvelle=function(e){
  view.supprimer_nouvelle(e);
	var tmp = new Object(); //création d'un objet temporaire que l'on va passer en string
	tmp["titre"] = $(e).parent().children(".titre_news").html(); //application du titre
	tmp["date"] = $(e).parent().children(".date_news").html(); //application de la date
	tmp["url"] = $(e).parent().children(".titre_news").attr("href"); //application de l'adresse
	if(indexOf(model.getRecherche_courante_news(),tmp) != -1){ //verification pour eviter les doublons (-1 si tmp n'est pas dans la list)
    model.supprRecherche_courante_news(tmp);
	}
	setCookie(model.getRecherche_courante(),JSON.stringify(model.getRecherche_courante_news()),1000);
}
