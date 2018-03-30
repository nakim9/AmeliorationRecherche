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
	var valeurRecherche = document.getElementById("zone_saisie").value;
	valeurRecherche = encodeURIComponent(valeurRecherche);
	$.get("search.php?data="+valeurRecherche,maj_resultats);

}


function maj_resultats(res)
{
<<<<<<< HEAD

	var recherches=JSON.parse(res);
	console.log(recherches);
	document.getElementById('wait').style.display = "none";

=======
	document.getElementById('wait').style.display = "none";

	var recherches=JSON.parse(res);
	for(var i=0; i<recherches.length;i++){
		document.getElementById('resultats').innerHTML += "<p class=\"titre_result\"><a class=\"titre_news\" href="+recherches[i].url+ " target=\"_blank\">"+recherches[i].titre+"</a><span class=\"date_news\">"+recherches[i].date+"</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\">< img src=\"horloge15.jpg\"/></span></p>";
	}




>>>>>>> 735115b1f77a48dad885e9e09022bc0eadb3f82d
}


function sauver_nouvelle(e)
{
	console.log($(e).parent().children(".titre_news"));

}


function supprimer_nouvelle(e)
{

}
