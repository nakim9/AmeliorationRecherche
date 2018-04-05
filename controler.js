var controler = {};

controler.init =function()
{
  model.init();
  view.drawRecherches(model.recherches);
}

 /*controler.ajouter_recherche =function()
{
	var valeurRecherche = document.getElementById("zone_saisie").value;
  model.ajouter_recherche(valeurRecherche);
}

 controler.supprimer_recherche =function(e)
{
	var node=e.parentNode;

	node.remove();
	setCookie("recherches",JSON.stringify(recherches),1000);

}*/

/* controler.rechercher_nouvelles =function()
{
	$("#resultats").empty();
	$("#wait").css("display","block");
	var valeurRecherche = document.getElementById("zone_saisie").value;
	valeurRecherche = encodeURIComponent(valeurRecherche);
	$.get("search.php?data="+valeurRecherche,maj_resultats);
}*/
