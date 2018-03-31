var controler = {};

function init()
{
  model.init();
}

function ajouter_recherche()
{
	var valeurRecherche = document.getElementById("zone_saisie").value;
  model.ajouter_recherche(valeurRecherche);
}

function supprimer_recherche(e)
{
	var node=e.parentNode;
  
	node.remove();
	setCookie("recherches",JSON.stringify(recherches),1000);

}

function rechercher_nouvelles()
{
	$("#resultats").empty();
	$("#wait").css("display","block");
	var valeurRecherche = document.getElementById("zone_saisie").value;
	valeurRecherche = encodeURIComponent(valeurRecherche);
	$.get("search.php?data="+valeurRecherche,maj_resultats);
}
