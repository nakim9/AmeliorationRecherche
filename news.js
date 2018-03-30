var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	var valeurRecherche = document.getElementById("zone_saisie").value;
	if(recherches.indexOf(valeurRecherche)==-1){
		recherches.push(valeurRecherche);
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+valeurRecherche+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
	}
	setCookie("recherches",JSON.stringify(recherches),1000);

}

function supprimer_recherche(e)
{
	var node=e.parentNode;
	node.remove();
	setCookie("recherches",JSON.stringify(recherches),1000);

}


function selectionner_recherche(e)
{
	document.getElementById("zone_saisie").value=e.innerHTML;
	recherche_courante=e.innerHTML;

}


function init()
{
	var rech=getCookie("recherches");
	if(rech!=""){
		recherches=JSON.parse(rech);
	}
	for (var i=0;recherches.length>i;i++){

		console.log(recherches[0]);
		document.getElementById('recherches-stockees').innerHTML += "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\" >"+recherches[i]+" </label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\" /> </p>";
	}
}


function rechercher_nouvelles()
{
	$("#resultats").empty();
	$("#wait").css("display","block");
	$.get("search.php",maj_resultats);
}


function maj_resultats(res)
{
	document.getElementById('wait').style.display = "none";

}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}
