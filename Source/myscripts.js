window.onload = function() {
	const table = document.getElementById('sortable');
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		var tablink = tabs[0].url;
		if (tablink.startsWith("https://app.studytogether.com/users")) {
			getfetch(tablink.split('/').slice(-1))
			document.getElementById('copy-btn').style.display = "visible"
		}
		else {
			document.getElementById("fetchID").innerHTML = "Not available for this website"
			document.getElementById('copy-btn').style.display = "none"
		}
	})
}
	
async function getfetch(id) {
	var token = ""
	chrome.cookies.getAll({domain: "app.studytogether.com"}, function(cookies) {
		token = cookies[cookies.length - 1].value
	});
	const obj = await fetch("https://s-st.widgetbot.co/api/graphql", {
  "headers": {
	"accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": `${token}`,
    "content-type": "application/json",
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrerPolicy": "no-referrer",
  "body": `[{\"operationName\":\"UserTag\",\"variables\":{\"guild\":\"595999872222756885\",\"user\":\"${id}\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"c53f21f38f0a7397ed2bc04c6fc7080b9eb7259e894edec85a355ce599a0e68d\"}}}]`,
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
	}).then(x => x.text())
	document.getElementById("fetchID").innerHTML = "Widget ID: "+ JSON.parse(obj)[0].data.userData.id + "    "
  var discordID = JSON.parse(obj)[0].data.userData.avatarUrl
  if(discordID.startsWith('https://cdn.discordapp.com')){
    const btn = document.getElementById('discord-copy-btn')
    btn.addEventListener('click', copy(`${discordID.slice(35,53)}`))
    btn.removeAttribute("hidden")
    document.getElementById("discordID").innerHTML = "Discord ID: " + discordID.slice(35,53)
  }
    
  document.getElementById('copy-btn').addEventListener('click', copy(`${JSON.parse(obj)[0].data.userData.id}`))
}

function copy(text) {
  const ta = document.createElement('textarea');
  ta.style.cssText = 'opacity:0; position:fixed; width:1px; height:1px; top:0; left:0;';
	ta.value = text;
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  document.execCommand('copy');
  ta.remove();
}